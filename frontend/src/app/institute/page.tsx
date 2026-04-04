"use client";

import { motion } from "framer-motion";
import { Building2, PlusCircle, Users, Activity, ExternalLink, ShieldCheck, Star, Brain, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const students = [
  { name: "Rohit K.", rank: 12, solved: 85, accuracy: 98.2, level: "Professional" },
  { name: "Sneha V.", rank: 45, solved: 62, accuracy: 96.5, level: "Specialist" },
  { name: "Aman S.", rank: 112, solved: 45, accuracy: 94.1, level: "Specialist" },
  { name: "Priya M.", rank: 250, solved: 22, accuracy: 92.5, level: "Novice" },
];

export default function InstituteDashboard() {
  const [instituteName, setInstituteName] = useState("Vibrant Academy");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center justify-between">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                 <Building2 className="size-4" />
                 Institutional Portal
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">{instituteName}</h1>
              <p className="max-w-2xl text-zinc-400">
                 Manage your student cohorts, monitor performance, and purchase token bundles to reward excellence.
              </p>
           </div>
           
           <div className="hidden sm:flex items-center gap-4">
              <div className="size-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center p-4">
                 <img src="https://img.icons8.com/color/96/academy.png" alt="logo" className="opacity-80 contrast-125" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
         {/* Left: Metrics & Controls */}
         <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 flex flex-col justify-between overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                     <Users className="size-48" />
                  </div>
                  <div>
                     <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest px-2">Active Students</span>
                     <h4 className="mt-2 text-5xl font-mono font-bold text-white uppercase tracking-tighter">1,245</h4>
                  </div>
                  <button className="mt-12 flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 text-sm font-bold text-white uppercase transition-all hover:bg-white/20">
                     <PlusCircle className="size-4" />
                     Add Batch
                  </button>
               </div>

               <div className="rounded-[2.5rem] border border-white/5 bg-primary/20 p-8 flex flex-col justify-between overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                     <Activity className="size-48" />
                  </div>
                  <div>
                     <span className="text-[10px] font-bold uppercase text-white/50 tracking-widest px-2">Problems Authored</span>
                     <h4 className="mt-2 text-5xl font-mono font-bold text-white uppercase tracking-tighter">85</h4>
                  </div>
                  <Link href="/submit-problem" className="mt-12 flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-bold text-primary uppercase transition-all hover:scale-105 shadow-xl shadow-primary/20">
                     <LayoutDashboard className="size-4" />
                     Post Problem Set
                  </Link>
               </div>
            </div>

            {/* Student Engagement List */}
            <div className="rounded-[2.5rem] border border-white/5 bg-white/5 overflow-hidden">
               <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/5">
                  <h3 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Cohort Performance (Top performers)</h3>
                  <button className="text-[10px] font-bold text-primary uppercase hover:underline underline-offset-4">Full Analytics</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-white/5">
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Student Name</th>
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Rank</th>
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Accuracy</th>
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600 text-right">Activity</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {students.map((st) => (
                         <tr key={st.name} className="hover:bg-white/5 transition-all">
                            <td className="px-8 py-6">
                               <div className="flex flex-col">
                                  <span className="text-sm font-bold text-white uppercase tracking-tight">{st.name}</span>
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{st.level}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className="text-xs font-mono font-bold text-white">#{st.rank}</span>
                            </td>
                            <td className="px-8 py-6">
                               <span className="text-xs font-mono font-bold text-primary">{st.accuracy}%</span>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{st.solved} Solved</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
         </div>

         {/* Right: Management Controls */}
         <div className="flex flex-col gap-8">
            <div className="rounded-3xl border border-white/5 bg-zinc-950/40 p-8 backdrop-blur-xl">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-8">Purchase Token Bundles</h3>
               <div className="flex flex-col gap-6">
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-6 border-l-4 border-l-primary">
                     <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Scholarship Pool</span>
                     <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-mono font-bold text-white uppercase">50.00</span>
                        <span className="text-[10px] font-bold text-primary uppercase">POI</span>
                     </div>
                  </div>
                  <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-[10px] font-bold text-white uppercase transition-all hover:scale-105 shadow-2xl shadow-primary/20 tracking-widest">
                     <Star className="size-4" />
                     Buy 100 POI Bundle
                  </button>
                  <p className="text-[10px] text-zinc-600 text-center px-4 italic">Bundles are used for student rewards and scholarships.</p>
               </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col items-center">
               <div className="mb-4 size-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <ShieldCheck className="size-6 text-primary" />
               </div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-2">White-label Branding</h3>
               <p className="text-[10px] text-zinc-600 text-center leading-relaxed">
                  Your problems and student interfaces will be co-branded with your institute's identity.
               </p>
               <button className="mt-6 flex h-10 items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 text-[10px] font-bold text-white uppercase hover:bg-white/10 transition-all opacity-50 cursor-not-allowed">
                  Premium Config
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
