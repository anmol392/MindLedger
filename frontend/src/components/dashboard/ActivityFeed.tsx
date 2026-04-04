import { Brain, Trophy, Wallet, BookOpen, Clock } from "lucide-react";

const activities = [
  { 
    title: "Solved Problem #42", 
    desc: "Riemann Hypothesis Verification (Partial)", 
    val: "+12.50 MNT", 
    icon: Brain, 
    color: "text-amber-400 bg-amber-500/10",
    time: "2h ago"
  },
  { 
    title: "Earned Achievement", 
    desc: "10-Day Streak Master", 
    val: "Badge Unlocked", 
    icon: Trophy, 
    color: "text-purple-400 bg-purple-500/10",
    time: "4h ago"
  },
  { 
    title: "Joined Contest", 
    desc: "Google Academy Sprint #4", 
    val: "-10 MNT Entry", 
    icon: BookOpen, 
    color: "text-blue-400 bg-blue-500/10",
    time: "12h ago"
  },
  { 
    title: "Rewards Distribution", 
    desc: "Paper #402 Published", 
    val: "+85.20 MNT", 
    icon: Wallet, 
    color: "text-teal-400 bg-teal-500/10",
    time: "1d ago"
  },
];

export function ActivityFeed() {
  return (
    <div className="bg-[#151B2B] border border-white/5 rounded-2xl p-8 backdrop-blur-xl">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-12">Cognitive Transaction Feed</h3>
      <div className="relative space-y-12">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-white/5 border-l border-white/5" />
        {activities.map((activity, index) => (
          <div key={index} className="relative flex items-start gap-8 z-10 transition-all hover:translate-x-1 group">
            <div className={`p-3 rounded-xl border border-white/10 shrink-0 shadow-lg shadow-black/20 ${activity.color}`}>
              <activity.icon className="size-6" />
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-0">
               <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-foreground transition-colors group-hover:text-teal-400">{activity.title}</h4>
                  <span className="text-sm font-mono font-bold text-foreground bg-white/5 px-2 py-0.5 rounded-lg">{activity.val}</span>
               </div>
               <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest truncate">{activity.desc}</p>
               <div className="flex items-center gap-1.5 opacity-50">
                  <Clock className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">{activity.time}</span>
               </div>
            </div>
          </div>
        ))}
        <button className="w-full h-12 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all">
          Fetch Full Archive History
        </button>
      </div>
    </div>
  );
}
