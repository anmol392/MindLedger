"use client";

import { Trophy, Clock, Users, ArrowRight, ShieldAlert, Award } from "lucide-react";
import { useState } from "react";

const contest = {
  id: "1",
  title: "Global Math Olympiad #42",
  organizer: "Stanford University",
  logo: "🎓",
  description: "Advanced intellectual competition for global math elites. Problems span analysis, topology, and number theory. Standard Proof-of-Intellect (PoI) protocol enabled.",
  prizePool: "500.00 MNT",
  distribution: [
    { rank: "Rank 1", pct: 50, mnt: "250.00 MNT" },
    { rank: "Rank 2", pct: 30, mnt: "150.00 MNT" },
    { rank: "Rank 3", pct: 20, mnt: "100.00 MNT" },
  ],
  deadline: "2026-05-12T12:00:00Z",
  startsAt: "2026-05-13T12:00:00Z",
  participants: 450,
  maxParticipants: 500,
  subjects: ["Advanced Analysis", "Topology"],
  difficulty: "Tier 5 (Extreme)",
  rules: [
    "No external computational tools allowed.",
    "Webcam and screen proctoring must remain active.",
    "Plagiarism cosine similarity > 0.9 results in immediate ban.",
    "Proof-of-Intellect synthesis verified by 3 global peer experts."
  ]
};

export default function ContestDetailPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-foreground p-8 lg:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
           {/* Main Detail Area */}
           <div className="flex-1">
              <header className="mb-12 rounded-[2.5rem] bg-[#151B2B] border border-white/5 p-12 overflow-hidden relative group">
                 <div className="flex items-center gap-6 mb-12">
                    <div className="size-24 rounded-[1.5rem] bg-[#00D4AA] flex items-center justify-center text-5xl shadow-2xl shadow-teal-500/20 group-hover:scale-110 transition-transform">
                       {contest.logo}
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-[#00D4AA] uppercase tracking-widest mb-1">{contest.organizer} OFFICIAL ARENA</p>
                       <h1 className="text-4xl font-black text-white uppercase tracking-tight">{contest.title}</h1>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                       {contest.subjects.map(s => (
                          <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s}</span>
                       ))}
                       <span className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500">{contest.difficulty}</span>
                    </div>
                    <p className="max-w-2xl text-base text-muted-foreground leading-relaxed font-bold uppercase tracking-widest text-[10px] opacity-70">
                       {contest.description}
                    </p>
                 </div>
                 
                 <div className="absolute -right-32 -bottom-32 size-96 bg-[#00D4AA] blur-[120px] opacity-[0.03] rounded-full" />
              </header>

              <section className="mb-12">
                 <h2 className="text-xs font-black text-[#00D4AA] uppercase tracking-widest mb-8 flex items-center gap-2">
                    <Award className="size-4" />
                    Cognitive Reward Distribution
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contest.distribution.map((d) => (
                       <div key={d.rank} className="p-8 bg-[#151B2B] border border-white/5 rounded-3xl group hover:border-teal-400 group transition-all">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 group-hover:text-teal-400">{d.rank}</p>
                          <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{d.mnt}</h4>
                          <div className="flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                             <span>Reward Ratio</span>
                             <span className="text-foreground">{d.pct}% Pool</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </section>

              <section>
                 <h2 className="text-xs font-black text-[#00D4AA] uppercase tracking-widest mb-8 flex items-center gap-2">
                    <ShieldAlert className="size-4" />
                    Competition Protocol Rules
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contest.rules.map((rule, i) => (
                       <div key={i} className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl">
                          <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center text-[10px] font-black text-white">{i+1}</div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex-1">{rule}</p>
                       </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* Sidebar Participation Area */}
           <aside className="lg:w-96 shrink-0 space-y-8">
              <div className="p-10 bg-[#151B2B] rounded-[2.5rem] border border-white/5 sticky top-12 gap-8 flex flex-col items-center">
                 <div className="flex flex-col items-center text-center gap-2">
                    <Trophy className="size-12 text-amber-500 mb-2" />
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Total Reward Pool</p>
                    <h3 className="text-5xl font-black text-white uppercase tracking-tight">{contest.prizePool}</h3>
                 </div>

                 <div className="w-full h-px bg-white/5" />

                 <div className="w-full space-y-6">
                    <div className="flex items-center justify-between gap-4">
                       <div className="flex items-center gap-3">
                          <Clock className="size-4 text-[#00D4AA]" />
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Starts At</span>
                       </div>
                       <span className="font-mono text-sm font-black text-white">12:00:00 UTC</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                       <div className="flex items-center gap-3">
                          <Users className="size-4 text-[#00D4AA]" />
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Registered</span>
                       </div>
                       <span className="font-mono text-sm font-black text-white">450 / 500</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => setRegistered(!registered)}
                  className={`w-full h-16 rounded-[1.2rem] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest transition-all shadow-2xl ${registered ? 'bg-white/5 text-teal-400 border border-teal-400/20' : 'bg-[#00D4AA] text-[#0A0F1E] shadow-teal-500/20 hover:scale-[1.03]'}`}
                 >
                    {registered ? 'Session Waitlisted' : 'Register for Arena'}
                    {!registered && <ArrowRight className="size-5 stroke-[3px]" />}
                 </button>

                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center italic">Session registration deadline May 12th midnight UTC</p>
              </div>

              <div className="p-8 bg-[#00D4AA]/5 border border-[#00D4AA]/20 rounded-3xl">
                 <p className="text-xs font-black text-[#00D4AA] uppercase tracking-widest mb-4">Participant Avatars</p>
                 <div className="flex -space-x-3 mb-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                       <div key={i} className="size-8 rounded-full border-2 border-[#0A0F1E] bg-white/10 flex items-center justify-center text-[10px] font-black text-white">
                          {String.fromCharCode(65 + i)}
                       </div>
                    ))}
                    <div className="size-8 rounded-full border-2 border-[#0A0F1E] bg-[#00D4AA] flex items-center justify-center text-[10px] font-black text-[#0A0F1E]">
                       +442
                    </div>
                 </div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Top intellectual miners from 14 global universities registered.</p>
              </div>
           </aside>
        </div>
      </div>
    </div>
  );
}
