"use client";

import { motion } from "framer-motion";
import { Brain, Star, Trophy, Activity, Calendar, Globe, Search, Share2, Briefcase, Mail, CheckCircle2, Languages } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { useState, use } from "react";
import Link from "next/link";

const data = [
  { subject: "Arithmetic", value: 120, fullMark: 150 },
  { subject: "Geometry", value: 98, fullMark: 150 },
  { subject: "Physics", value: 86, fullMark: 150 },
  { subject: "Chemistry", value: 65, fullMark: 150 },
  { subject: "Algorithms", value: 110, fullMark: 150 },
  { subject: "Reasoning", value: 130, fullMark: 150 },
];

export default function ProfilePage({ params: paramsPromise }: { params: Promise<{ wallet: string }> }) {
  const params = use(paramsPromise);
  const [isHiringEnabled, setIsHiringEnabled] = useState(true);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        {/* Profile Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <div className="rounded-[3rem] border border-white/5 bg-white/5 p-8 flex flex-col items-center backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                 <Brain className="size-48" />
              </div>
              <div className="size-32 rounded-[2rem] bg-gradient-to-br from-primary/40 to-zinc-900 border-4 border-black flex items-center justify-center text-5xl relative z-10 transition-transform hover:scale-105">
                 🧠
              </div>
              <h1 className="mt-8 text-2xl font-bold text-white uppercase tracking-tighter">0x34...8F</h1>
              <div className="mt-2 flex items-center gap-2">
                 <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Rank #01</span>
              </div>
              
              <div className="mt-12 w-full grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-center rounded-2xl bg-white/5 p-4 border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Solves</span>
                    <span className="text-xl font-mono font-bold text-white">145</span>
                 </div>
                 <div className="flex flex-col items-center rounded-2xl bg-white/5 p-4 border border-white/5">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">POI</span>
                    <span className="text-xl font-mono font-bold text-white">125.4</span>
                 </div>
              </div>

              <div className="mt-12 flex flex-col gap-3 w-full">
                 <div className="flex items-center justify-between text-xs p-1">
                    <span className="text-zinc-500 uppercase font-bold tracking-widest">Hire Me Mode</span>
                    <button 
                       onClick={() => setIsHiringEnabled(!isHiringEnabled)}
                       className={`h-6 w-12 rounded-full p-1 transition-all ${isHiringEnabled ? 'bg-primary' : 'bg-zinc-800'}`}
                    >
                       <div className={`size-4 bg-white rounded-full transition-all ${isHiringEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                 </div>
                 <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/5 px-6 text-xs font-bold text-white uppercase hover:bg-white/10 transition-all">
                    <Share2 className="size-4" />
                    Share Profile
                 </button>
              </div>
           </div>

           <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/40 p-8 backdrop-blur-3xl">
              <h3 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest mb-6">Badges Earned</h3>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                 <div className="size-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center grayscale hover:grayscale-0 transition-all pointer-events-auto cursor-help" title="Top 1% Global">🏆</div>
                 <div className="size-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center grayscale hover:grayscale-0 transition-all pointer-events-auto cursor-help" title="Bug Bounty 2026">🕵️‍♂️</div>
                 <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center grayscale hover:grayscale-0 transition-all pointer-events-auto cursor-help" title="Early Adopter">🚀</div>
                 <div className="size-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center grayscale hover:grayscale-0 transition-all pointer-events-auto cursor-help" title="Master Polymath">🎓</div>
              </div>
           </div>
        </div>

        {/* Intelligence Data */}
        <div className="lg:col-span-3 flex flex-col gap-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Radar Chart */}
              <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-10 overflow-hidden min-h-[400px]">
                 <h3 className="text-xs font-bold uppercase text-zinc-600 tracking-widest mb-10">Expertise Distribution</h3>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                          <PolarGrid stroke="rgba(255,255,255,0.05)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: "#666", fontSize: 10, fontWeight: "bold" }} />
                          <Radar name="Expertise" dataKey="value" stroke="#7F77DD" fill="#7F77DD" fillOpacity={0.4} />
                       </RadarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Achievement Stats */}
              <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-10 flex flex-col gap-8">
                 <h3 className="text-xs font-bold uppercase text-zinc-600 tracking-widest">Streak & Activity</h3>
                 <div className="flex items-center gap-10">
                    <div className="flex flex-col gap-2">
                       <span className="text-4xl font-mono font-bold text-white uppercase tracking-tighter">48</span>
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Day Streak</span>
                    </div>
                    <div className="h-12 w-[1px] bg-white/5" />
                    <div className="flex flex-col gap-2">
                       <span className="text-4xl font-mono font-bold text-white uppercase tracking-tighter">Avg 2.5</span>
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Solves / Day</span>
                    </div>
                 </div>

                 <div className="mt-4 flex flex-wrap gap-2">
                    {Array.from({length: 28}).map((_, i) => (
                       <div key={i} className={`size-3 rounded-[3px] border border-white/5 ${i % 3 === 0 ? 'bg-primary/60 border-primary' : 'bg-white/5'}`} />
                    ))}
                 </div>
                 <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Contribution graph in the last 28 days</p>
              </div>
           </div>

           {/* Public Solve History */}
           <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-widest px-4">Verified Proof History</h3>
              <div className="grid grid-cols-1 gap-4">
                 {[
                    { title: "Riemann Hypothesis Verification (Partial)", date: "2026-04-01", reward: 0.125, verifiedBy: 5 },
                    { title: "Quantum Tunneling Proof-of-Work", date: "2026-03-28", reward: 0.082, verifiedBy: 8 },
                    { title: "Network Routing optimization algorithm", date: "2026-03-25", reward: 0.045, verifiedBy: 6 },
                 ].map((solve, i) => (
                    <motion.div
                       key={i}
                       whileHover={{ x: 10 }}
                       className="rounded-3xl border border-white/5 bg-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/10 transition-all sm:px-10"
                    >
                       <div className="flex flex-col gap-2">
                          <h4 className="text-sm font-bold text-white uppercase tracking-tight">{solve.title}</h4>
                          <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                             <Calendar className="size-3" />
                             {solve.date}
                             <div className="size-1 rounded-full bg-zinc-800" />
                             <CheckCircle2 className="size-3 text-primary" />
                             {solve.verifiedBy} Expert Audits
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                             <span className="text-lg font-mono font-bold text-white uppercase">{solve.reward} POI</span>
                             <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Minted</span>
                          </div>
                          <button className="size-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:text-white transition-colors group">
                             <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
   return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
   )
}
