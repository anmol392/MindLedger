"use client";

import { motion } from "framer-motion";
import { Search, Filter, ShoppingCart, UserCheck, Star, Clock, Brain, Wallet } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const experts = [
  { id: "e1", name: "DrSymmetry", domain: "Math", rating: 4.9, sessions: 42, price: 5, tags: ["Calculus", "Proof"], avatar: "🚀" },
  { id: "e2", name: "NucleusPrime", domain: "Physics", rating: 4.8, sessions: 28, price: 8, tags: ["Quantum", "Relativity"], avatar: "⚛" },
  { id: "e3", name: "AlgoMaster", domain: "CS", rating: 5.0, sessions: 156, price: 12, tags: ["Graph", "DP"], avatar: "💻" },
  { id: "e4", name: "C6H12O6", domain: "Chemistry", rating: 4.7, sessions: 18, price: 4, tags: ["Orgo", "Inorganic"], avatar: "🧪" },
];

export default function MarketplacePage() {
  const [activeDomain, setActiveDomain] = useState("All");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <Brain className="size-4" />
          Intellectual Exchange
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Knowledge Marketplace</h1>
        <p className="max-w-2xl text-zinc-400">
           The circular economy of MindLedger. Spend your earned POI tokens on expert tutoring sessions and peer-to-peer learning.
        </p>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
         {/* Sidebar */}
         <div className="lg:w-64 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-2">Expert Domains</span>
               <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                  {["All", "Math", "Physics", "Chemistry", "CS"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveDomain(d)}
                      className={`flex h-10 items-center justify-between rounded-xl px-4 text-xs font-bold uppercase tracking-widest transition-all ${
                         activeDomain === d ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                       {d}
                    </button>
                  ))}
               </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
               <h3 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest mb-6">Wallet Balance</h3>
               <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold text-white uppercase">1.25</span>
                  <span className="text-[10px] font-bold text-primary uppercase">POI</span>
               </div>
               <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/5 py-3 text-[10px] font-bold text-white uppercase hover:bg-white/10 transition-all">
                  <Wallet className="size-3" />
                  Deposit Funds
               </button>
            </div>
         </div>

         {/* Grid */}
         <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               {experts.map((exp, idx) => (
                 <motion.div
                   key={exp.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-3xl hover:bg-white/10 hover:border-white/10 transition-all"
                 >
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                         <div className="size-16 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {exp.avatar}
                         </div>
                         <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">{exp.name}</h3>
                            <div className="flex items-center gap-2">
                               <div className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[8px] font-bold text-primary uppercase">
                                  {exp.domain} Expert
                               </div>
                               <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                                  <Star className="size-2.5 fill-amber-500" />
                                  {exp.rating}
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-xl font-mono font-bold text-white uppercase">{exp.price}</span>
                         <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">POI / Hour</span>
                      </div>
                   </div>

                   <div className="mt-8 flex flex-wrap gap-2">
                      {exp.tags.map(t => (
                        <span key={t} className="rounded-lg bg-black/40 border border-white/5 px-2.5 py-1 text-[9px] font-bold text-zinc-400">
                           #{t}
                        </span>
                      ))}
                   </div>

                   <p className="mt-6 text-xs text-zinc-500 leading-relaxed max-w-[90%]">
                      Specialized coaching for advanced academic competitions. Focus on problem-solving strategies and intuition development.
                   </p>

                   <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Sessions Done</span>
                         <span className="text-sm font-mono font-bold text-white">{exp.sessions}</span>
                      </div>
                      <button className="flex h-12 items-center gap-2 rounded-2xl bg-primary px-8 text-[10px] font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 uppercase tracking-widest">
                         <Clock className="size-4" />
                         Book Session
                      </button>
                   </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
