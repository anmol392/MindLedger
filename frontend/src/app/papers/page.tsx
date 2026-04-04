"use client";

import { PaperCard } from "@/components/papers/PaperCard";
import { useState } from "react";
import { BookOpen, Search, Filter, ShieldCheck, ChevronRight, PenTool } from "lucide-react";
import Link from "next/link";

const papers = [
  { 
    id: "1", 
    title: "Novel Anti-Plagiarism in LLMs", 
    abstract: "Implementing semantic fingerprinting for intellectual proof-of-work in high-stakes academic domains.", 
    authors: [
      { name: "0x34...8F", avatar: "A" },
      { name: "cipher_tex", avatar: "B" }
    ], 
    status: 'IN_REVIEW' as const, 
    subject: "Computer Science", 
    mntPool: "1,250.00", 
    contributorsCount: 4 
  },
  { 
    id: "2", 
    title: "Quantum Tunneling in Carbon Nanotubes", 
    abstract: "Evaluating the probabilistic distribution of wave-particle duality in high-density carbon mesh topologies.", 
    authors: [
      { name: "quantum_mind", avatar: "Q" },
      { name: "delta_solver", avatar: "D" },
      { name: "logic_bomb", avatar: "L" }
    ], 
    status: 'DRAFT' as const, 
    subject: "Physics", 
    mntPool: "850.00", 
    contributorsCount: 3 
  },
  { 
    id: "3", 
    title: "Fast Poisson Solvers for GPU Clusters", 
    abstract: "Optimizing the Intellect Mining protocol via parallelized partial differential equation verification loops.", 
    authors: [
      { name: "prime_time", avatar: "P" },
      { name: "math_wizard", avatar: "M" }
    ], 
    status: 'PUBLISHED' as const, 
    subject: "Mathematics", 
    mntPool: "3,500.00", 
    contributorsCount: 2 
  },
];

export default function ResearchHubPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-foreground p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-6">
           <div className="flex items-center gap-2 text-[#00D4AA] font-black uppercase tracking-widest text-xs">
              <BookOpen className="size-4" />
              Collaborative Peer-Minting Arena
           </div>
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                 <h1 className="text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">Academic Manuscript Minting</h1>
                 <p className="max-w-xl text-muted-foreground font-bold uppercase tracking-widest text-xs mt-2">Co-author hard scientific manuscripts with global peers. Submissions undergo high-fidelity peer review prior to reward-minting logic.</p>
              </div>
              <div className="flex items-center gap-4">
                 <Link 
                    href="/papers/new"
                    className="h-14 px-10 rounded-2xl bg-[#00D4AA] text-[#0A0F1E] text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
                 >
                    <PenTool className="size-4 stroke-[3px]" />
                    Initialize New Manuscript
                 </Link>
                 <div className="flex items-center gap-2 p-1 bg-[#151B2B] rounded-2xl border border-white/5 shrink-0 overflow-x-auto no-scrollbar">
                   {['All', 'Open-For-Collaborators', 'In Review', 'Published', 'My Papers'].map((t) => (
                     <button
                       key={t}
                       onClick={() => setActiveTab(t)}
                       className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === t ? 'bg-[#00D4AA] text-[#0A0F1E] shadow-xl shadow-teal-500/20' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                     >
                       {t}
                     </button>
                   ))}
                 </div>
              </div>
           </div>
        </header>

        <section className="mb-12 rounded-3xl bg-[#00D4AA]/5 border border-[#00D4AA]/20 p-8 flex flex-col items-center sm:flex-row items-center justify-between gap-12 backdrop-blur-xl relative overflow-hidden group">
           <div className="flex items-center gap-8 z-10">
              <div className="size-20 rounded-2xl bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#00D4AA] shadow-2xl group-hover:scale-110 transition-transform">
                 <ShieldCheck className="size-10 stroke-[3px]" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-[#00D4AA] uppercase tracking-widest flex items-center gap-2 mb-2">
                    <span className="size-2 rounded-full bg-[#00D4AA] animate-pulse" />
                    Verified Peer-Minting Active
                 </p>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight">3,450.42 MNT Rewards Distributed this Month</h3>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-70 italic font-mono uppercase tracking-widest">Protocol Version v4.1 - Consensus Algorithmic Verification Protocol</p>
              </div>
           </div>
           <button className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#00D4AA] hover:bg-white/10 hover:text-white transition-all z-10 shadow-xl flex items-center gap-3">
              Browse Protocol History <ChevronRight className="size-4" />
           </button>
           <div className="absolute -right-32 -bottom-32 size-80 bg-[#00D4AA] blur-[120px] opacity-[0.03] rounded-full" />
        </section>

        <div className="flex flex-col lg:flex-row gap-12 pt-12 border-t border-white/5">
           {/* Sidebar Filters */}
           <aside className="lg:w-72 flex flex-col gap-10 shrink-0">
              <div className="flex flex-col gap-8 p-8 bg-[#151B2B] rounded-3xl border border-white/5">
                 <div className="flex items-center gap-2 text-xs font-black text-[#00D4AA] uppercase tracking-widest mb-4">
                    <Filter className="size-4" />
                    Protocol Search
                 </div>
                 <div className="space-y-12">
                    <div className="flex flex-col gap-6">
                       <input 
                         type="text" 
                         placeholder="Protocol Search..." 
                         className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-bold text-white uppercase focus:border-teal-400 transition-all outline-none"
                       />
                       <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subject Domains</p>
                       <div className="flex flex-wrap gap-2">
                          {['Math', 'Physics', 'Chemistry', 'CS', 'Economics'].map(s => (
                             <button key={s} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:border-teal-400 transition-all">{s}</button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-[#00D4AA]/5 border border-[#00D4AA]/10 rounded-3xl flex flex-col gap-4">
                 <p className="text-[10px] font-black text-[#00D4AA] uppercase tracking-widest">Mining Signal</p>
                 <h4 className="text-sm font-black text-white uppercase tracking-tight">Contributor Demand for Quantum Physics Manuscripts</h4>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">Reward multipliers currently active for Quantum Science x1.5 MNT Boost.</p>
                 <button className="h-10 w-full rounded-xl bg-white/5 border border-[#00D4AA]/20 text-[10px] font-black uppercase tracking-widest text-[#00D4AA] hover:bg-[#00D4AA] hover:text-[#0A0F1E] transition-all">
                    Initialize Peer Bounty
                 </button>
              </div>
           </aside>

           {/* Paper Grid */}
           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              {papers.map((paper) => (
                <PaperCard key={paper.id} {...paper} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
