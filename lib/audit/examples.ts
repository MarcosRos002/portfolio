import type { Claim } from "./types";

/** Preset synthetic claims — one clean, one per fault the demo can surface. */
export interface Example {
  key: string;
  label: string;
  hint: string;
  claim: Claim;
}

export const EXAMPLES: Example[] = [
  {
    key: "upcoding",
    label: "Up-code",
    hint: "moderate-complexity code for a minor illness",
    claim: {
      claimId: "DEMO-UPCODE",
      lines: [
        { cptCode: "99214", icd10Codes: ["J06.9"], units: 1, chargeCents: 21000 },
        { cptCode: "80053", icd10Codes: ["E11.9"], units: 1, chargeCents: 9000 },
      ],
    },
  },
  {
    key: "mismatch",
    label: "Code mismatch",
    hint: "procedure with no supporting diagnosis",
    claim: {
      claimId: "DEMO-MISMATCH",
      lines: [{ cptCode: "93000", icd10Codes: ["M54.5"], units: 1, chargeCents: 5000 }],
    },
  },
  {
    key: "units",
    label: "Unit excess",
    hint: "more units than plausible",
    claim: {
      claimId: "DEMO-UNITS",
      lines: [{ cptCode: "80053", icd10Codes: ["N18.3"], units: 6, chargeCents: 9000 }],
    },
  },
  {
    key: "duplicate",
    label: "Duplicate line",
    hint: "the same line billed twice",
    claim: {
      claimId: "DEMO-DUP",
      lines: [
        { cptCode: "71046", icd10Codes: ["J18.9"], units: 1, chargeCents: 8000 },
        { cptCode: "71046", icd10Codes: ["J18.9"], units: 1, chargeCents: 8000 },
      ],
    },
  },
  {
    key: "clean",
    label: "Clean claim",
    hint: "everything checks out",
    claim: {
      claimId: "DEMO-CLEAN",
      lines: [{ cptCode: "99213", icd10Codes: ["I10"], units: 1, chargeCents: 12000 }],
    },
  },
];
