export interface QualityScoreDistribution {
  score: number;
  providers: number;
}

export interface RegionalData {
  region: string;
  specialty: string;
  totalPeerProviders: number;
  currentProviderQualityScore: number;
  medianQualityScore: number;
  maxQualityScore: number;
  qualityScoreDistribution: QualityScoreDistribution[];
}

export const regionalData: RegionalData = {
  region: "San Bernardino",
  specialty: "Primary Care",
  totalPeerProviders: 300,
  currentProviderQualityScore: 0.9,
  medianQualityScore: 1.45,
  maxQualityScore: 3.82,
  qualityScoreDistribution: [
    { score: 0.1, providers: 8 },
    { score: 0.2, providers: 12 },
    { score: 0.3, providers: 6 },
    { score: 0.4, providers: 15 },
    { score: 0.5, providers: 22 },
    { score: 0.6, providers: 18 },
    { score: 0.7, providers: 25 },
    { score: 0.8, providers: 28 },
    { score: 0.9, providers: 32 },
    { score: 1.0, providers: 35 },
    { score: 1.1, providers: 38 },
    { score: 1.2, providers: 42 },
    { score: 1.3, providers: 45 },
    { score: 1.4, providers: 48 },
    { score: 1.5, providers: 52 },
    { score: 1.6, providers: 45 },
    { score: 1.7, providers: 38 },
    { score: 1.8, providers: 32 },
    { score: 1.9, providers: 28 },
    { score: 2.0, providers: 25 },
    { score: 2.1, providers: 22 },
    { score: 2.2, providers: 18 },
    { score: 2.3, providers: 15 },
    { score: 2.4, providers: 12 },
    { score: 2.5, providers: 8 },
    { score: 2.6, providers: 6 },
    { score: 2.7, providers: 4 },
    { score: 2.8, providers: 3 },
    { score: 2.9, providers: 2 },
    { score: 3.0, providers: 1 },
    { score: 3.1, providers: 2 },
    { score: 3.2, providers: 3 },
    { score: 3.3, providers: 4 },
    { score: 3.4, providers: 6 },
    { score: 3.5, providers: 8 },
    { score: 3.6, providers: 12 },
    { score: 3.7, providers: 15 },
    { score: 3.8, providers: 18 },
    { score: 3.9, providers: 22 },
  ],
};
