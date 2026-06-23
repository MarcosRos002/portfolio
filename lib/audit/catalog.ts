/**
 * ICD-10 / CPT reference catalog — a faithful TS port of the flagship's
 * `reference/catalog.py` (the single source of truth shared by the synthetic
 * data generator and the rules engine). Real-world code *formats* with plausible
 * support relationships, but synthetic teaching fixtures — never clinical
 * guidance, never PHI.
 */

export const ICD10: Record<string, string> = {
  "E11.9": "Type 2 diabetes mellitus without complications",
  I10: "Essential (primary) hypertension",
  "J06.9": "Acute upper respiratory infection, unspecified",
  "M54.5": "Low back pain",
  "I48.91": "Unspecified atrial fibrillation",
  "R07.9": "Chest pain, unspecified",
  "J18.9": "Pneumonia, unspecified organism",
  "R05.9": "Cough, unspecified",
  "N18.3": "Chronic kidney disease, stage 3",
  "R73.09": "Other abnormal glucose",
  "Z00.00": "General adult medical exam without abnormal findings",
};

export interface CptInfo {
  desc: string;
  maxUnits: number;
  supports: string[]; // ICD-10 codes that justify this procedure
  upcodeOf?: string; // base CPT this one over-codes, if any
}

export const CPT: Record<string, CptInfo> = {
  "99213": {
    desc: "Office/outpatient visit, established, low complexity",
    maxUnits: 1,
    supports: ["E11.9", "I10", "J06.9", "M54.5"],
  },
  "99214": {
    desc: "Office/outpatient visit, established, moderate complexity",
    maxUnits: 1,
    supports: ["E11.9", "I10", "J06.9", "M54.5"],
    upcodeOf: "99213",
  },
  "93000": {
    desc: "Electrocardiogram, complete",
    maxUnits: 1,
    supports: ["I10", "I48.91", "R07.9"],
  },
  "71046": {
    desc: "Radiologic exam, chest, 2 views",
    maxUnits: 1,
    supports: ["J18.9", "R05.9", "J06.9"],
  },
  "80053": {
    desc: "Comprehensive metabolic panel",
    maxUnits: 3,
    supports: ["E11.9", "N18.3", "R73.09"],
  },
  "99396": {
    desc: "Preventive visit, established, 40-64 years",
    maxUnits: 1,
    supports: ["Z00.00"],
  },
};

/** CPTs that over-code a simpler procedure (the demo classifier flags these). */
export const UPCODE_CPTS: string[] = Object.entries(CPT)
  .filter(([, info]) => info.upcodeOf)
  .map(([code]) => code);

export const isKnownCpt = (cpt: string): boolean => cpt in CPT;

export const supports = (cpt: string, icd10: string): boolean =>
  CPT[cpt]?.supports.includes(icd10) ?? false;

export const maxUnits = (cpt: string): number | null => CPT[cpt]?.maxUnits ?? null;
