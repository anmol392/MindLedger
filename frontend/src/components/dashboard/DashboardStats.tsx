import { Wallet, Brain, Zap, Trophy } from "lucide-react";

const stats = [
  { label: "Total MNT Earned", value: "1,250.40", icon: Wallet, color: "text-emerald-600" },
  { label: "Problems Solved", value: "145", icon: Brain, color: "text-amber-600" },
  { label: "Current Streak", value: "12 Days", icon: Zap, color: "text-orange-600" },
  { label: "Global Rank", value: "#245", icon: Trophy, color: "text-indigo-600" },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-black/5 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/20 transition-all group overflow-hidden relative shadow-soft">
          <div className={`p-3 rounded-xl bg-muted ${stat.color} group-hover:scale-110 transition-transform`}>
            <stat.icon className="size-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{stat.label}</p>
            <p className="text-2xl font-black text-[#0F172A] mt-1 tracking-tight">{stat.value}</p>
          </div>
          <div className={`absolute -right-4 -bottom-4 size-24 blur-3xl opacity-5 ${stat.color.replace('text', 'bg')}`} />
        </div>
      ))}
    </div>
  );
}
