"use client";

import { motion } from "framer-motion";
import { Search, Briefcase, Star, UserPlus, Filter, ShieldCheck, Mail, Lock, Brain, Trophy } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const candidates = [
  { id: "c1", name: "0x34...8F", country: "🇮🇳", solved: 145, expertise: "Algorithms", rank: 1, tokens: 1.2504, profileUnlocked: false },
  { id: "c2", name: "quantum_mind", country: "🇨🇳", solved: 122, expertise: "Quantum Physics", rank: 2, tokens: 1.1208, profileUnlocked: false },
  { id: "c3", name: "logic_bomb", country: "🇺🇸", solved: 110, expertise: "Topology", rank: 3, tokens: 0.9850, profileUnlocked: true },
  { id: "c4", name: "delta_solver", country: "🇧🇷", solved: 78, expertise: "Computer Vision", rank: 6, tokens: 0.6120, profileUnlocked: false },
];

export default function TalentPortal() {
  const [activeTier, setActiveTier] = useState("All");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <Briefcase className="size-4" />
          Intellectual Talent Marketplace
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Global Elite Pipeline</h1>
        <p className="max-w-2xl text-zinc-400">
           Discover and hire the world's most verified intellectual talent. Unlock deep profiles using POI tokens to burn supply.
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 mb-12 flex-wrap">
         <div className="flex items-center gap-1 overflow-x-auto bg-white/5 border border-white/5 rounded-2xl p-1 no-scrollbar">
            {["All Tiers", "Tier 5 (Elite)", "Tier 4", "Tier 3", "Tier 2"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t)}
                className={`px-8 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                   activeTier === t ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
         </div>
         
         <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
            <input 
              type="text" 
              placeholder="Filter by subject or skills..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all w-80"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
         {candidates.map((cand, idx) => (
           <motion.div
             key={cand.id}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1 }}
             className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 p-10 hover:bg-white/10 hover:border-primary/20 transition-all cursor-default"
           >
              <div className="flex items-start justify-between">
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                       <h3 className="text-xl font-bold text-white uppercase tracking-tight">{cand.name}</h3>
                       <ShieldCheck className="size-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                       <span>{cand.country}</span>
                       <span className="size-1 rounded-full bg-zinc-800" />
                       <span className="text-primary">{cand.expertise} Specialist</span>
                    </div>
                 </div>
                 
                 <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Platform Rank</span>
                    <span className="text-2xl font-mono font-bold text-white uppercase">#{cand.rank}</span>
                 </div>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/5 pt-10">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Verified solves</span>
                    <span className="text-lg font-mono font-bold text-white">{cand.solved}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Success rate</span>
                    <span className="text-lg font-mono font-bold text-white">99.2%</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">POI Earned</span>
                    <span className="text-lg font-mono font-bold text-white">{cand.tokens.toFixed(2)}</span>
                 </div>
              </div>

              <div className="mt-12 flex items-center justify-between">
                 {cand.profileUnlocked ? (
                   <div className="flex gap-4 w-full">
                      <button className="flex-1 flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm font-bold text-white hover:bg-white/10 transition-all uppercase tracking-widest">
                         <Mail className="size-4" />
                         Send Offer
                      </button>
                      <button className="flex-1 flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-white transition-all hover:scale-105 shadow-xl shadow-primary/20 uppercase tracking-widest">
                         View Full Profile
                      </button>
                   </div>
                 ) : (
                   <div className="relative w-full">
                      <div className="absolute inset-0 z-0 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button className="relative z-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 text-sm font-bold text-primary transition-all hover:scale-105 shadow-xl uppercase tracking-widest">
                         <Lock className="size-4" />
                         Unlock full profile (100 POI)
                      </button>
                   </div>
                 )}
              </div>
           </motion.div>
         ))}
      </div>

      {/* Recruiter Stats */}
      <div className="mt-24 rounded-[3rem] border border-white/5 bg-zinc-950/40 p-16 flex flex-col items-center text-center">
         <Trophy className="size-16 text-primary mb-8" />
         <h3 className="text-3xl font-bold text-white uppercase tracking-tighter max-w-lg leading-tight mb-6">
           The most efficient talent acquisition engine in academia.
         </h3>
         <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed mb-12">
            Candidates are ranked by peer-verified proof of intellectual capability. No more technical interview overhead. Hire by proof.
         </p>
         <div className="flex items-center gap-12 text-zinc-500 uppercase font-bold tracking-widest text-[10px]">
            <div className="flex flex-col items-center">
               <span className="text-2xl text-white font-mono">1.2K+</span>
               <span>Recruiters Active</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-2xl text-white font-mono">15.4M</span>
               <span>POI Tokens Burnt</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-2xl text-white font-mono">850+</span>
               <span>Hired Globally</span>
            </div>
         </div>
      </div>
    </div>
  );
}
