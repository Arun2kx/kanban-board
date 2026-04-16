export type Status = "pending" | "in-progress" | "completed";

export interface Card {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: Status;
  title: string;
  color: string;
  accentColor: string;
  icon: string;
}

export const COLUMNS: Column[] = [
  {
    id: "pending",
    title: "Pending",
    color: "from-amber-500/20 to-amber-600/10",
    accentColor: "border-amber-400 bg-amber-400",
    icon: "⏳",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "from-blue-500/20 to-blue-600/10",
    accentColor: "border-blue-400 bg-blue-400",
    icon: "🔄",
  },
  {
    id: "completed",
    title: "Completed",
    color: "from-emerald-500/20 to-emerald-600/10",
    accentColor: "border-emerald-400 bg-emerald-400",
    icon: "✅",
  },
];
