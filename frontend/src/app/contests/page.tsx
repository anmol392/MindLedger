"use client";

import { ContestCard } from "@/components/contests/ContestCard";
import { useState } from "react";
import { Trophy, Search, Filter, ShieldCheck, ChevronRight } from "lucide-react";

const contests = [
  { 
    id: "1", 
    title: "Global Math Olympiad #42", 
    organizer: "Stanford University", 
    logo: "🎓", 
    subjects: ["Math", "Tier 5"], 
    prizePool: "500.00", 
    startsIn: "LIVE NOW", 
    participants: 450, 
    maxParticipants: 500, 
    status: 'LIVE' as const 
  },
  { 
    id: "2", 
    title: "AlgoMaster Challenge", 
    organizer: "Google Academy", 
    logo: "🤖", 
    subjects: ["CS", "Algorithms"], 
    prizePool: "1,200.00", 
    startsIn: "02h 45m", 
    participants: 1200, 
    maxParticipants: 5000, 
    status: 'UPCOMING' as const 
  },
  { 
    id: "3", 
    title: "Quantum Physics Sprint", 
    organizer: "MIT Physics Lab", 
    logo: "⚛️", 
    subjects: ["Physics", "Quantum"], 
    prizePool: "350.00", 
    startsIn: "1d 12h", 
    participants: 180, 
    maxParticipants: 300, 
    status: 'UPCOMING' as const 
  },
  { 
    id: "4", 
    title: "Organic Synth Finals", 
    organizer: "ETH Zurich", 
    logo: "🧪", 
    subjects: ["Chemistry"], 
    prizePool: "250.00", 
    startsIn: "ENDED", 
    participants: 400, 
    maxParticipants: 400, 
    status: 'ENDED' as const 
  },
];

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-background text-foreground p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-6">
           <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
              <Trophy className="size-4" />
              Cognitive Competitive Arena
           </div>
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                 <h1 className="text-4xl font-black tracking-tight text-[#0F172A] uppercase sm:text-5xl">Intellectual Contests & Olympiads</h1>
                 <p className="max-w-xl text-muted-foreground font-black uppercase tracking-widest text-xs mt-2">Compete with global elites, prove your intelligence, and claim algorithmic POI rewards from major institutes and sponsors.</p>
              </div>
              <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-black/5 shrink-0 overflow-x-auto no-scrollbar shadow-soft">
                {['All', 'Upcoming', 'Live Now', 'Ended', 'My Contests'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === t ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
           </div>
        </header>

        {/* Live Banner Strip */}
        <section className="mb-12 rounded-3xl bg-emerald-50 border border-emerald-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-soft relative overflow-hidden group">
           <div className="flex items-center gap-6 z-10">
              <div className="size-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                 <ShieldCheck className="size-8 stroke-[3px]" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 mb-1">
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                    Protocol Live Arena Active
                 </p>
                 <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Stanford Olympiad #42 is Currently Live</h3>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 italic">450 Active Participants Mining MNT Rewards in Real-Time</p>
              </div>
           </div>
           <button className="h-12 px-8 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all z-10 flex items-center gap-2">
              Enter Live Arena <ChevronRight className="size-4 stroke-[3px]" />
           </button>
           <div className="absolute -right-24 -bottom-24 size-64 bg-primary blur-3xl opacity-5 rounded-full" />
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
           {/* Sidebar Filters */}
            <aside className="lg:w-72 flex flex-col gap-10 shrink-0">
              <div className="flex flex-col gap-6 p-8 bg-white rounded-3xl border border-black/5 shadow-soft">
                 <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                    <Filter className="size-4" />
                    Filters
                 </div>
                 <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject Domains</p>
                       <div className="flex flex-wrap gap-2">
                          {['Math', 'Physics', 'Chemistry', 'CS', 'Economics'].map(s => (
                             <button key={s} className="px-3 py-1.5 bg-muted border border-black/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary hover:bg-white transition-all">{s}</button>
                          ))}
                       </div>
                    </div>
                    <div className="flex flex-col gap-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prize Pool Min.</p>
                       <div className="grid grid-cols-1 gap-2">
                          {['100+ MNT', '500+ MNT', '1000+ MNT'].map(p => (
                             <button key={p} className="px-4 py-2 bg-muted border border-black/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0F172A] text-left hover:border-primary transition-all">{p}</button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6 p-8 bg-amber-50 rounded-3xl border border-amber-100 shadow-soft">
                 <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Contest Alert #401</p>
                 <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-tight">The 2026 Global AI Safety Contest Starts Soon</h4>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Register before May 15th to participate in the 0.5M MNT pool.</p>
                 <button className="mt-4 h-10 w-full rounded-xl bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all overflow-hidden relative shadow-lg shadow-amber-500/20">
                    Register Now
                    <div className="absolute top-0 right-0 h-full w-4 bg-white/20 skew-x-12 translate-x-12 group-hover:-translate-x-32 transition-transform duration-1000" />
                 </button>
              </div>
           </aside>

           {/* Contest Grid */}
           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {contests.map((contest) => (
                <ContestCard key={contest.id} {...contest} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
