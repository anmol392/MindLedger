import { Brain, Star, Zap, Trophy, ShieldCheck, Flame } from "lucide-react";

const badges = [
  { name: "First Solve", icon: Brain, unlocked: true, color: "text-blue-400 bg-blue-500/10", tier: "Tier 1" },
  { name: "10-Day Streak", icon: Flame, unlocked: true, color: "text-orange-400 bg-orange-500/10", tier: "Tier 2" },
  { name: "Olympiad Slayer", icon: Trophy, unlocked: true, color: "text-amber-400 bg-amber-500/10", tier: "Tier 5" },
  { name: "Paper Author", icon: ShieldCheck, unlocked: true, color: "text-teal-400 bg-teal-500/10", tier: "Tier 4" },
  { name: "Top 100 Global", icon: Star, unlocked: false, color: "text-purple-400 bg-purple-500/10", tier: "Tier 5" },
  { name: "Code Master", icon: Zap, unlocked: false, color: "text-teal-400 bg-teal-500/10", tier: "Tier 3" },
];

export function BadgeGrid() {
  return (
    <div className="bg-[#151B2B] border border-white/5 rounded-2xl p-8 backdrop-blur-xl">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-12">Cognitive Achievements</h3>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {badges.map((badge) => (
          <div 
            key={badge.name} 
            className={`group p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-4 transition-all hover:scale-105 hover:bg-white/[0.08] cursor-pointer ${!badge.unlocked && 'grayscale opacity-40'}`}
          >
            <div className={`p-4 rounded-full border border-white/10 shadow-xl shadow-black/40 ${badge.color} group-hover:scale-110 transition-transform`}>
               <badge.icon className="size-6" />
            </div>
            <div className="flex flex-col items-center gap-1">
               <span className="text-[10px] font-black uppercase tracking-widest text-[#00D4AA]">{badge.tier}</span>
               <h4 className="text-xs font-bold text-foreground text-center line-clamp-1">{badge.name}</h4>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <div className={`h-full ${badge.unlocked ? 'bg-teal-400' : 'bg-white/10'} w-full`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
