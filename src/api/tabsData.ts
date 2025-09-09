import { BarChart3, Lightbulb, XCircle, TrendingDown, ClipboardList } from "lucide-react";

export interface Tab {
  id: string;
  label: string;
  icon: any;
}

export const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "performance", label: "Performance of Quality Measures", icon: TrendingDown },
  { id: "opportunities", label: "Opportunities", icon: Lightbulb },
  { id: "missed", label: "Missed Opportunities", icon: XCircle },
  { id: "programs", label: "Programs", icon: ClipboardList },
];
