export interface PerformanceHistoryData {
  month: string;
  current: number;
  previous: number;
}

export const performanceHistoryData: PerformanceHistoryData[] = [
  { month: "Jan", current: 35000, previous: 32000 },
  { month: "Feb", current: 38000, previous: 35000 },
  { month: "Mar", current: 42000, previous: 38000 },
  { month: "Apr", current: 39000, previous: 40000 },
  { month: "May", current: 45000, previous: 42000 },
  { month: "Jun", current: 48000, previous: 45000 },
  { month: "Jul", current: 46000, previous: 48000 },
  { month: "Aug", current: 50000, previous: 46000 },
  { month: "Sep", current: 45000, previous: 42000 },
];
