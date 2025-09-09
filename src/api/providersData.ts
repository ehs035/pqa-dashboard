export interface Provider {
  name: string;
  avatar: string;
  providerId: string;
  officeLocationId: string;
  estimatedAnnualPayment: number;
  potentialAnnualEarnings: number;
  qualityScore: number;
}

export const providers: Provider[] = [
  {
    name: "Dr. Sarah Johnson",
    avatar: "SJ",
    providerId: "P-2024-001",
    officeLocationId: "OL-789",
    estimatedAnnualPayment: 360000, // Reduced due to quality score 0.9 < 1.0
    potentialAnnualEarnings: 580000,
    qualityScore: 0.9,
  },
  {
    name: "Dr. Michael Chen",
    avatar: "MC",
    providerId: "P-2024-002",
    officeLocationId: "OL-790",
    estimatedAnnualPayment: 520000, // Quality score 1.2 > 1.0, full payment
    potentialAnnualEarnings: 620000,
    qualityScore: 1.2,
  },
  {
    name: "Dr. Emily Rodriguez",
    avatar: "ER",
    providerId: "P-2024-003",
    officeLocationId: "OL-791",
    estimatedAnnualPayment: 320000, // Reduced due to quality score 0.8 < 1.0
    potentialAnnualEarnings: 560000,
    qualityScore: 0.8,
  },
];
