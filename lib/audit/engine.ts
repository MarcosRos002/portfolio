/**
 * Veritas demo-mode audit — a faithful client-side port of the flagship's
 * `AuditOrchestrator` running in demo mode: the deterministic RulesEngine plus
 * the $0 DemoClassifierModel, merged and grounded with cited catalog text. Pure
 * and deterministic — no network, no API key, no cost. The *full* agent (hybrid
 * RAG + the two-pass Claude classifier) lives in the claims-auditor repo.
 */

import { CPT, ICD10, isKnownCpt, maxUnits, supports, UPCODE_CPTS } from "./catalog";
import type { AuditResult, Claim, FaultType, Finding, Severity } from "./types";

const SEVERITY: Record<FaultType, Severity> = {
  upcoding: "high",
  cpt_icd_mismatch: "high",
  unit_excess: "medium",
  duplicate_line: "medium",
};

/** Cited catalog text for the codes on a line — mirrors the orchestrator `_ground`. */
function citationsFor(cptCode: string, icd10Codes: string[]): string[] {
  const cites: string[] = [];
  if (CPT[cptCode]) cites.push(`CPT ${cptCode} — ${CPT[cptCode].desc}`);
  for (const dx of icd10Codes) {
    if (ICD10[dx]) cites.push(`ICD-10 ${dx} — ${ICD10[dx]}`);
  }
  return cites;
}

/** The deterministic RulesEngine: mismatch, unit excess, duplicate, unknown code. */
function runRules(claim: Claim): Finding[] {
  const out: Finding[] = [];

  claim.lines.forEach((line, idx) => {
    const cpt = line.cptCode;
    const cites = citationsFor(cpt, line.icd10Codes);

    if (!isKnownCpt(cpt)) {
      out.push({
        category: null,
        lineIndex: idx,
        ruleId: "R-UNKNOWN-CODE",
        severity: "info",
        why: `Unknown CPT code "${cpt}"; cannot verify against the catalog.`,
        citations: cites,
      });
      return; // can't run code-aware checks on an unknown code
    }

    if (!line.icd10Codes.some((dx) => supports(cpt, dx))) {
      const dxList = line.icd10Codes.join(", ") || "(none)";
      out.push({
        category: "cpt_icd_mismatch",
        lineIndex: idx,
        ruleId: "R-CPT-ICD-COMPAT",
        severity: SEVERITY.cpt_icd_mismatch,
        why: `CPT ${cpt} (${CPT[cpt].desc}) is not supported by any listed diagnosis [${dxList}].`,
        citations: cites,
      });
    }

    const limit = maxUnits(cpt);
    if (limit !== null && line.units > limit) {
      out.push({
        category: "unit_excess",
        lineIndex: idx,
        ruleId: "R-UNIT-MAX",
        severity: SEVERITY.unit_excess,
        why: `CPT ${cpt} billed with ${line.units} units (plausible max ${limit}).`,
        citations: cites,
      });
    }
  });

  // claim-level duplicate check (identical cpt + sorted icd + units + charge)
  const seen = new Map<string, number>();
  claim.lines.forEach((line, idx) => {
    const key = JSON.stringify([
      line.cptCode,
      [...line.icd10Codes].sort(),
      line.units,
      line.chargeCents,
    ]);
    if (seen.has(key)) {
      out.push({
        category: "duplicate_line",
        lineIndex: idx,
        ruleId: "R-DUP-LINE",
        severity: SEVERITY.duplicate_line,
        why: `Line ${idx} (${line.cptCode}) duplicates line ${seen.get(key)}.`,
        citations: citationsFor(line.cptCode, line.icd10Codes),
      });
    } else {
      seen.set(key, idx);
    }
  });

  return out;
}

/** The $0 DemoClassifierModel: flags known up-code CPTs as upcoding. */
function runDemoClassifier(claim: Claim): Finding[] {
  return claim.lines.flatMap((line, idx) =>
    UPCODE_CPTS.includes(line.cptCode)
      ? [
          {
            category: "upcoding" as const,
            lineIndex: idx,
            ruleId: null,
            severity: SEVERITY.upcoding,
            why: `CPT ${line.cptCode} (${CPT[line.cptCode]?.desc}) is a higher-complexity code than the listed diagnoses typically support — ${CPT[line.cptCode]?.upcodeOf} is the defensible code.`,
            citations: citationsFor(line.cptCode, line.icd10Codes),
          },
        ]
      : [],
  );
}

/** Union of rules + classifier findings, deduped by (category, lineIndex). */
function merge(rules: Finding[], model: Finding[]): Finding[] {
  const out: Finding[] = [];
  const seen = new Set<string>();
  for (const f of [...rules, ...model]) {
    const key = `${f.category}:${f.lineIndex}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

export function auditClaim(claim: Claim): AuditResult {
  const findings = merge(runRules(claim), runDemoClassifier(claim));
  const high = findings.filter((f) => f.severity === "high").length;
  const flagged = findings.some((f) => f.category !== null);
  return {
    flagged,
    findings,
    summary: flagged
      ? `Flagged: ${findings.length} inconsistency(ies) found (${high} high-severity).`
      : findings.length
        ? `Clean: ${findings.length} note(s), no inconsistencies.`
        : "Clean: no inconsistencies found.",
  };
}
