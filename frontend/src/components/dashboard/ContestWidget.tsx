import { Calendar, Users, Trophy, ExternalLink } from "lucide-react";

const contests = [
  { 
    title: "Global Math Olympiad #42", 
    organizer: "Stanford University", 
    startsIn: "2h 45m", 
    prizePool: "500.00 MNT", 
    participants: 450, 
    color: "bg-emerald-50 text-emerald-600 border-emerald-100" 
  },
  { 
    title: "AlgoMaster Challenge", 
    organizer: "Google Academy", 
    startsIn: "1d 2h", 
    prizePool: "1,200.00 MNT", 
    participants: 1200, 
    color: "bg-amber-50 text-amber-600 border-amber-100" 
  },
  { 
    title: "Quantum Physics Sprint", 
    organizer: "MIT Physics Lab", 
    startsIn: "3d 8h", 
    prizePool: "350.00 MNT", 
    participants: 180, 
    color: "bg-blue-50 text-blue-600 border-blue-100" 
  },
];

export function ContestWidget() {
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-soft">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest pl-1">Upcoming Intellectual Matches</h3>
        <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1.5 transition-all">
          View All Contests <ExternalLink className="size-3" />
        </button>
      </div>
      <div className="space-y-6">
        {contests.map((contest) => (
          <div key={contest.title} className="group p-5 bg-muted border border-black/5 rounded-2xl transition-all hover:border-primary/10 hover:bg-white cursor-pointer hover:shadow-xl">
            <h4 className="font-black text-[#0F172A] group-hover:text-primary transition-colors">{contest.title}</h4>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 mb-6 flex items-center gap-2">
              Organized by <span className="text-[#0F172A]">{contest.organizer}</span>
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-black/5">
                <Calendar className="size-3.5 text-primary" />
                <span className="text-[10px] font-black text-[#0F172A]">Starts in {contest.startsIn}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${contest.color}`}>
                <Trophy className="size-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">{contest.prizePool}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-black/5">
                 <Users className="size-3.5 text-blue-600" />
                 <span className="text-[10px] font-black text-[#0F172A]">{contest.participants} REGISTERED</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
