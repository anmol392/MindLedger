"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Search, ShieldCheck, ChevronRight, Calculator, Atom, FlaskConical, Code } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const categories = ["Global", "Math", "Physics", "Chemistry", "CS"];

const fullLeaders = [
  { rank: 1, name: "0x34...8F", tokens: 1.2504, problems: 145, country: "🇮🇳", accuracy: 99.2, role: "Grandmaster" },
  { rank: 2, name: "quantum_mind", tokens: 1.1208, problems: 122, country: "🇨🇳", accuracy: 98.5, role: "Expert" },
  { rank: 3, name: "logic_bomb", tokens: 0.9850, problems: 110, country: "🇺🇸", accuracy: 97.4, role: "Expert" },
  { rank: 4, name: "cipher_tex", tokens: 0.8502, problems: 98, country: "🇷🇺", accuracy: 96.1, role: "Professional" },
  { rank: 5, name: "prime_time", tokens: 0.7201, problems: 85, country: "🇩🇪", accuracy: 98.1, role: "Expert" },
  { rank: 6, name: "delta_solver", tokens: 0.6120, problems: 78, country: "🇧🇷", accuracy: 95.5, role: "Professional" },
  { rank: 7, name: "math_wizard", tokens: 0.5432, problems: 65, country: "🇮🇳", accuracy: 94.2, role: "Specialist" },
  { rank: 8, name: "physics_phreak", tokens: 0.4850, problems: 54, country: "🇬🇧", accuracy: 93.8, role: "Specialist" },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Global");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <Trophy className="size-4" />
          Hall of Intelligence
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Global Leaderboard</h1>
        <p className="max-w-2xl text-zinc-400">
          Rankings are updated daily. Earn exclusive badges and platform rewards based on your intellectual performance.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
         <div className="flex items-center gap-1 overflow-x-auto bg-white/5 border border-white/5 rounded-2xl p-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                   activeTab === cat ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
         
         <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-600" />
            <input 
              type="text" 
              placeholder="Search solver..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all w-64"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
         {/* Podium (Top 3) */}
         <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
            <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/40 p-8 flex flex-col items-center">
               <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-600 mb-8 text-center px-4 leading-relaxed">Most Improved Solver This Week</h3>
               <div className="size-24 rounded-full border-2 border-primary/20 p-1 relative">
                  <div className="absolute -top-2 -right-2 size-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-black">
                     <Trophy className="size-3" />
                  </div>
                  <div className="size-full rounded-full bg-zinc-800 flex items-center justify-center text-4xl">
                     🚀
                  </div>
               </div>
               <h4 className="mt-6 text-lg font-bold text-white uppercase tracking-tight">delta_solver</h4>
               <p className="text-[10px] text-primary uppercase font-bold tracking-widest">+12 Ranks Upgrade</p>
               
               <div className="mt-12 w-full flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest px-2">
                     <span>Rank Upgrade</span>
                     <span className="text-white">+84 POI</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full w-4/5 bg-primary rounded-full shadow-[0_0_8px_rgba(127,119,221,0.5)]" />
                  </div>
               </div>
            </div>
            
            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
               <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-600 mb-8">Role Progression</h3>
               <div className="flex flex-col gap-6">
                  {[
                    { role: "Novice", p: "0 - 10 POI", color: "text-zinc-600" },
                    { role: "Specialist", p: "10 - 50 POI", color: "text-blue-500" },
                    { role: "Professional", p: "50 - 200 POI", color: "text-green-500" },
                    { role: "Expert", p: "200 - 1000 POI", color: "text-orange-500" },
                    { role: "Grandmaster", p: "1000+ POI", color: "text-primary" },
                  ].map((role) => (
                    <div key={role.role} className="flex flex-col">
                       <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${role.color}`}>{role.role}</span>
                          <span className="text-[10px] text-zinc-700 font-mono italic">{role.p}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Full List */}
         <div className="lg:col-span-3 flex flex-col shadow-2xl order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Rank</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Miners</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">POI tokens</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Accuracy</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {fullLeaders.map((leader, index) => (
                        <motion.tr
                          key={leader.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-white/5 transition-all"
                        >
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-4">
                                 <span className={`text-sm font-mono font-bold ${index < 3 ? 'text-primary' : 'text-zinc-600'}`}>
                                    {leader.rank < 10 ? `0${leader.rank}` : leader.rank}
                                 </span>
                                 {index === 0 && <Star className="size-3 text-primary fill-primary" />}
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col gap-1">
                                 <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-white transition-colors group-hover:text-primary">{leader.name}</span>
                                    <span className="text-[10px] text-zinc-500">{leader.country}</span>
                                 </div>
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{leader.role}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col">
                                 <span className="text-sm font-mono font-bold text-white uppercase">{leader.tokens.toFixed(4)} POI</span>
                                 <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">{leader.problems} Problems</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col gap-2">
                                 <span className="text-sm font-mono font-bold text-white">{leader.accuracy}%</span>
                                 <div className="h-0.5 w-16 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500/40 rounded-full" style={{ width: `${leader.accuracy}%` }} />
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 px-6 text-[10px] font-bold text-white uppercase transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 uppercase tracking-widest">
                                 Challenge
                                 <ChevronRight className="size-3" />
                              </button>
                           </td>
                        </motion.tr>
                      ))}
                   </tbody>
                 </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
