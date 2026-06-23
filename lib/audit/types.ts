/** Demo audit types — a faithful TS mirror of the flagship's contracts. */

export type FaultType =
  | "cpt_icd_mismatch"
  | "unit_excess"
  | "duplicate_line"
  | "upcoding";

export type Severity = "info" | "low" | "medium" | "high";

export interface ClaimLine {
  cptCode: string;
  icd10Codes: string[];
  units: number;
  chargeCents: number;
}

export interface Claim {
  claimId: string;
  lines: ClaimLine[];
}

export interface Finding {
  category: FaultType | null;
  lineIndex: number;
  ruleId: string | null;
  severity: Severity;
  why: string;
  citations: string[];
}

export interface AuditResult {
  flagged: boolean;
  findings: Finding[];
  summary: string;
}
