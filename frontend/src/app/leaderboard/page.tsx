"use client";

import { Trophy, Star, Search, ShieldCheck, ChevronRight, Calculator, Atom, FlaskConical, Code } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, FULL_LEADERS } from "@/lib/constants";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Global");

  const filteredLeaders = activeTab === "Global" 
    ? FULL_LEADERS 
    : FULL_LEADERS.filter(l => l.role !== "Novice");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <Trophy className="size-4" />
          Hall of Intelligence
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">Global Leaderboard</h1>
        <p className="max-w-2xl text-muted-foreground">
          Rankings are updated daily. Earn exclusive badges and platform rewards based on your intellectual performance.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
         <div className="flex items-center gap-1 overflow-x-auto bg-muted border border-border rounded-2xl p-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                   activeTab === cat ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>
         
         <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search solver..." 
              className="bg-muted border border-border rounded-xl pl-12 pr-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary focus:ring-0 transition-all w-64"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
         {/* Podium (Top 3) */}
         <div className="lg:col-span-1 flex flex-col gap-6 order-2 lg:order-1">
            <div className="rounded-[2.5rem] border border-border bg-muted/20 p-8 flex flex-col items-center">
               <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center px-4 leading-relaxed">Most Improved Solver This Week</h3>
               <div className="size-24 rounded-full border-2 border-primary/20 p-1 relative">
                  <div className="absolute -top-2 -right-2 size-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground border-4 border-background">
                     <Trophy className="size-3" />
                  </div>
                  <div className="size-full rounded-full bg-secondary flex items-center justify-center text-4xl">
                     🚀
                  </div>
               </div>
               <h4 className="mt-6 text-lg font-bold text-foreground uppercase tracking-tight">delta_solver</h4>
               <p className="text-[10px] text-primary uppercase font-bold tracking-widest">+12 Ranks Upgrade</p>
               
               <div className="mt-12 w-full flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest px-2">
                     <span>Rank Upgrade</span>
                     <span className="text-foreground">+84 POI</span>
                  </div>
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                     <div className="h-full w-4/5 bg-primary rounded-full shadow-[0_0_8px_rgba(127,119,221,0.5)]" />
                  </div>
               </div>
            </div>
            
            <div className="rounded-[2.5rem] border border-border bg-muted/10 p-8 backdrop-blur-xl">
               <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground mb-8">Role Progression</h3>
               <div className="flex flex-col gap-6">
                  {[
                    { role: "Novice", p: "0 - 10 POI", color: "text-muted-foreground" },
                    { role: "Specialist", p: "10 - 50 POI", color: "text-blue-500" },
                    { role: "Professional", p: "50 - 200 POI", color: "text-green-500" },
                    { role: "Expert", p: "200 - 1000 POI", color: "text-orange-500" },
                    { role: "Grandmaster", p: "1000+ POI", color: "text-primary" },
                  ].map((role) => (
                    <div key={role.role} className="flex flex-col">
                       <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${role.color}`}>{role.role}</span>
                          <span className="text-[10px] text-muted-foreground font-mono italic">{role.p}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Full List */}
         <div className="lg:col-span-3 flex flex-col shadow-2xl order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2.5rem] border border-border bg-muted/10 backdrop-blur-xl">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rank</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Miners</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">POI tokens</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Accuracy</th>
                        <th className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                      {filteredLeaders.map((leader, index) => (
                        <tr
                          key={`${leader.name}-${leader.rank}`}
                          className="group hover:bg-muted/50 transition-all text-foreground"
                        >
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-4">
                                 <span className={`text-sm font-mono font-bold ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {leader.rank < 10 ? `0${leader.rank}` : leader.rank}
                                 </span>
                                 {index === 0 && <Star className="size-3 text-primary fill-primary" />}
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col gap-1">
                                 <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">{leader.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{leader.country}</span>
                                 </div>
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{leader.role}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col">
                                 <span className="text-sm font-mono font-bold text-foreground uppercase">{leader.tokens.toFixed(4)} POI</span>
                                 <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{leader.problems} Problems</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col gap-2">
                                 <span className="text-sm font-mono font-bold text-foreground">{leader.accuracy}%</span>
                                 <div className="h-0.5 w-16 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500/40 rounded-full" style={{ width: `${leader.accuracy}%` }} />
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 text-[10px] font-bold uppercase transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 uppercase tracking-widest shadow-lg">
                                 Challenge
                                 <ChevronRight className="size-3" />
                              </button>
                           </td>
                        </tr>
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
