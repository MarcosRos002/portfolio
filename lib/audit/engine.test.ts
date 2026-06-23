import { describe, it, expect } from "vitest";
import { auditClaim } from "./engine";
import type { Claim } from "./types";

function claim(lines: Claim["lines"]): Claim {
  return { claimId: "DEMO-1", lines };
}

describe("auditClaim — demo-mode (rules + demo classifier)", () => {
  it("passes a clean claim with no findings", () => {
    const r = auditClaim(claim([{ cptCode: "99213", icd10Codes: ["J06.9"], units: 1, chargeCents: 12000 }]));
    expect(r.flagged).toBe(false);
    expect(r.findings).toHaveLength(0);
  });

  it("flags CPT/ICD mismatch when no diagnosis supports the procedure", () => {
    // 99213 supports {E11.9,I10,J06.9,M54.5}; R07.9 does not.
    const r = auditClaim(claim([{ cptCode: "99213", icd10Codes: ["R07.9"], units: 1, chargeCents: 12000 }]));
    expect(r.findings.map((f) => f.category)).toContain("cpt_icd_mismatch");
  });

  it("flags unit excess above the CPT plausible maximum", () => {
    // 80053 max_units = 3.
    const r = auditClaim(claim([{ cptCode: "80053", icd10Codes: ["E11.9"], units: 5, chargeCents: 9000 }]));
    const f = r.findings.find((x) => x.category === "unit_excess");
    expect(f).toBeDefined();
    expect(f!.lineIndex).toBe(0);
  });

  it("flags an identical duplicated line", () => {
    const line = { cptCode: "93000", icd10Codes: ["I10"], units: 1, chargeCents: 5000 };
    const r = auditClaim(claim([line, { ...line, icd10Codes: ["I10"] }]));
    const f = r.findings.find((x) => x.category === "duplicate_line");
    expect(f).toBeDefined();
    expect(f!.lineIndex).toBe(1);
  });

  it("flags upcoding via the demo classifier (99214 over 99213)", () => {
    const r = auditClaim(claim([{ cptCode: "99214", icd10Codes: ["J06.9"], units: 1, chargeCents: 21000 }]));
    expect(r.findings.map((f) => f.category)).toContain("upcoding");
  });

  it("reports an unknown CPT as info, not a hard fault", () => {
    const r = auditClaim(claim([{ cptCode: "00000", icd10Codes: ["J06.9"], units: 1, chargeCents: 1000 }]));
    const f = r.findings.find((x) => x.ruleId === "R-UNKNOWN-CODE");
    expect(f).toBeDefined();
    expect(f!.category).toBeNull();
  });

  it("grounds findings with cited catalog text", () => {
    const r = auditClaim(claim([{ cptCode: "99214", icd10Codes: ["J06.9"], units: 1, chargeCents: 21000 }]));
    const up = r.findings.find((f) => f.category === "upcoding")!;
    expect(up.citations.length).toBeGreaterThan(0);
    expect(up.citations.join(" ")).toMatch(/99214/);
  });

  it("dedupes so rules and the classifier don't double-report the same line+category", () => {
    const r = auditClaim(claim([{ cptCode: "99214", icd10Codes: ["J06.9"], units: 1, chargeCents: 21000 }]));
    const keys = r.findings.map((f) => `${f.category}:${f.lineIndex}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
