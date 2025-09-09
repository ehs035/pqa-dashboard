import { Baby, Heart, Shield } from "lucide-react";

export interface UrgentAction {
  id: number;
  title: string;
  description: string;
  deadline: string;
  daysLeft: number;
  priority: "urgent" | "high" | "medium";
  icon: any;
  action: string;
  patients: number;
}

export const urgentActions: UrgentAction[] = [
  {
    id: 1,
    title: "Childhood Vaccination Roster",
    description: "Build email list for children 3-24 months approaching vaccination deadlines",
    deadline: "Dec 15, 2024",
    daysLeft: 12,
    priority: "high",
    icon: Baby,
    action: "Generate Roster",
    patients: 47,
  },
  {
    id: 2,
    title: "Annual Wellness Check Reminders",
    description: "Send reminders to patients due for annual wellness visits",
    deadline: "Dec 20, 2024",
    daysLeft: 17,
    priority: "high",
    icon: Heart,
    action: "Send Reminders",
    patients: 23,
  },
  {
    id: 3,
    title: "Flu Shot Follow-up Campaign",
    description: "Follow up with patients who haven't received flu vaccinations",
    deadline: "Dec 10, 2024",
    daysLeft: 7,
    priority: "urgent",
    icon: Shield,
    action: "Launch Campaign",
    patients: 89,
  },
];
