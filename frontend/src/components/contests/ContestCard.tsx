import { Trophy, Users, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ContestCardProps {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  subjects: string[];
  prizePool: string;
  startsIn: string;
  participants: number;
  maxParticipants: number;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
}

export function ContestCard({ id, title, organizer, logo, subjects, prizePool, startsIn, participants, maxParticipants, status }: ContestCardProps) {
  return (
    <div className={`bg-white border rounded-3xl p-8 shadow-soft transition-all duration-500 overflow-hidden relative group hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 ${status === 'LIVE' ? 'border-primary' : 'border-black/5 hover:border-black/10'}`}>
      {status === 'LIVE' && (
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 animate-pulse">
           <div className="size-2 rounded-full bg-primary" />
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live Now</span>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
         <div className="size-12 rounded-2xl bg-muted border border-black/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {logo}
         </div>
         <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{organizer}</p>
            <h3 className="text-xl font-black text-[#0F172A] group-hover:text-primary transition-colors uppercase tracking-tight">{title}</h3>
         </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
         {subjects.map(s => (
            <span key={s} className="px-3 py-1 bg-muted border border-black/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-[#0F172A] transition-colors">{s}</span>
         ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="p-4 bg-muted border border-black/5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Prize Pool</span>
            <span className="text-sm font-black text-amber-600 uppercase tracking-widest">{prizePool} MNT</span>
         </div>
         <div className="p-4 bg-muted border border-black/5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{status === 'LIVE' ? 'Time Remaining' : 'Starts In'}</span>
            <span className="text-sm font-black text-[#0F172A] uppercase tracking-widest font-mono">{startsIn}</span>
         </div>
      </div>

      <div className="flex items-center justify-between mb-8 px-2">
         <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{participants} / {maxParticipants} REGISTERED</span>
         </div>
         <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden border border-black/5">
            <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(5,150,105,0.3)]" style={{ width: `${(participants/maxParticipants)*100}%` }} />
         </div>
      </div>

      <Link 
        href={`/contests/${id}`}
        className="w-full h-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all group-hover:scale-[1.05] shadow-xl shadow-primary/5"
      >
        {status === 'LIVE' ? 'Enter Arena' : status === 'ENDED' ? 'View Final Leaderboard' : 'Register Now'}
        <ArrowUpRight className="size-4 stroke-[3px]" />
      </Link>
      
      <div className={`absolute -right-12 -bottom-12 size-48 blur-3xl opacity-5 rounded-full ${status === 'LIVE' ? 'bg-primary' : 'bg-amber-600'}`} />
    </div>
  );
}
