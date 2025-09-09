export interface Program {
  id: number;
  name: string;
  category: string;
  currentPatients: number;
  targetTier: number;
  currentTier: number;
  nextTierBonus: number;
  progress: number;
  status: string;
  weight: number;
  qualityImpact: number;
}

export const programs: Program[] = [
  {
    id: 1,
    name: "Blood Pressure Screening",
    category: "Preventive Care",
    currentPatients: 847,
    targetTier: 1000,
    currentTier: 2,
    nextTierBonus: 15000,
    progress: 84.7,
    status: "on-track",
    weight: 3,
    qualityImpact: 0.15,
  },
  {
    id: 2,
    name: "Diabetes Management",
    category: "Chronic Care",
    currentPatients: 623,
    targetTier: 750,
    currentTier: 2,
    nextTierBonus: 18000,
    progress: 83.1,
    status: "on-track",
    weight: 1,
    qualityImpact: 0.05,
  },
  {
    id: 3,
    name: "Childhood Immunization",
    category: "Preventive Care",
    currentPatients: 234,
    targetTier: 300,
    currentTier: 1,
    nextTierBonus: 12000,
    progress: 78.0,
    status: "at-risk",
    weight: 2,
    qualityImpact: 0.10,
  },
  {
    id: 4,
    name: "Cancer Screening",
    category: "Preventive Care",
    currentPatients: 156,
    targetTier: 200,
    currentTier: 1,
    nextTierBonus: 10000,
    progress: 78.0,
    status: "at-risk",
    weight: 2,
    qualityImpact: 0.10,
  },
];

// Sort programs by weight (highest impact first)
export const sortedPrograms = [...programs].sort((a, b) => b.weight - a.weight);
