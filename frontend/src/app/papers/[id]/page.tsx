"use client";

import { CollaborativeEditor } from "@/components/papers/CollaborativeEditor";
import { Users, FileText, ChevronLeft, Send, CheckCircle, Info, MessageSquare, Plus, Menu, Trophy, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const paper = {
  id: "1",
  title: "Novel Anti-Plagiarism in LLMs",
  status: "DRAFT",
  pool: "1,250.00 MNT",
  contributors: [
     { name: "0x34...8F", role: "Protagonist", weight: 45, color: "bg-teal-400" },
     { name: "cipher_tex", role: "Contributor", weight: 25, color: "bg-blue-400" },
     { name: "quantum_mind", role: "Reviewer", weight: 15, color: "bg-amber-400" },
     { name: "logic_bomb", role: "Contributor", weight: 15, color: "bg-purple-400" },
  ],
  sections: [
     { title: "I. Abstract", solved: true },
     { title: "II. Introduction", solved: true },
     { title: "III. Methodology", solved: false },
     { title: "IV. Results & Synthesis", solved: false },
     { title: "V. Conclusion", solved: false },
  ]
};

export default function PaperEditorPage() {
  const [activeSection, setActiveSection] = useState("I. Abstract");

  return (
    <div className="fixed inset-0 bg-[#0A0F1E] flex flex-col z-[9999] overflow-hidden text-foreground">
      {/* Top Protocol Bar */}
      <header className="h-20 bg-[#151B2B] border-b border-white/5 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-6 overflow-hidden">
           <Link href="/papers" className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-white transition-all shrink-0">
              <ChevronLeft className="size-4" />
              Repository
           </Link>
           <div className="h-8 w-px bg-white/5 shrink-0" />
           <div className="min-w-0">
              <h2 className="text-sm font-black text-white uppercase tracking-tight truncate">{paper.title}</h2>
              <div className="flex items-center gap-4 mt-0.5 shrink-0 opacity-50">
                 <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Protocol v1.1.2 Revision Draft</p>
                 <div className="size-1 rounded-full bg-muted-foreground/30" />
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Manuscript ID: MS-4024-X</p>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="h-10 px-6 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#00D4AA] shrink-0">
              <span className="size-2 rounded-full bg-[#00D4AA] animate-pulse" />
              Real-Time Sync Ready
           </div>
           <button className="h-12 px-10 rounded-2xl bg-[#00D4AA] text-[#0A0F1E] text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-[1.03] transition-all flex items-center gap-2">
              Submit for Verification <Send className="size-4 stroke-[3px]" />
           </button>
        </div>
      </header>

      {/* Workspace Arena */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-[320px] bg-[#151B2B]/50 border-r border-white/5 flex flex-col overflow-y-auto no-scrollbar pt-10 shrink-0">
           <p className="px-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-10">Manuscript Architect</p>
           <div className="flex-1 overflow-y-auto px-6 space-y-2">
              {paper.sections.map((s) => (
                <button
                  key={s.title}
                  onClick={() => setActiveSection(s.title)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all border group ${activeSection === s.title ? 'bg-[#00D4AA]/5 border-[#00D4AA] text-white shadow-xl shadow-teal-500/5' : 'bg-transparent border-transparent text-muted-foreground hover:bg-white/5'}`}
                >
                   <div className={`p-2 rounded-lg border border-white/5 ${activeSection === s.title ? 'bg-[#00D4AA] text-[#0A0F1E]' : 'bg-white/5 text-muted-foreground'}`}>
                      <FileText className="size-3.5" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-left flex-1">{s.title}</span>
                   {s.solved && <CheckCircle className="size-4 text-green-500" />}
                </button>
              ))}
              <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl border border-dashed border-white/10 text-muted-foreground hover:border-teal-400 hover:text-teal-400 transition-all mt-4">
                 <Plus className="size-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Append Section</span>
              </button>
           </div>
           
           <div className="p-8 border-t border-white/5 bg-[#151B2B]">
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-3">
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    <Info className="size-4" />
                    Review Protocol Req.
                 </p>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">2 peer verifications remaining prior to Proof-of-Intellect minting.</p>
              </div>
           </div>
        </aside>

        {/* Global Editor Area */}
        <main className="flex-1 flex overflow-hidden p-6 lg:p-10 relative">
           <CollaborativeEditor />
           
           {/* Floating Discussion Trigger */}
           <button className="absolute bottom-20 right-20 size-16 rounded-[1.5rem] bg-[#00D4AA] text-[#0A0F1E] flex items-center justify-center shadow-2xl shadow-teal-500/40 hover:scale-110 transition-all z-20">
              <MessageSquare className="size-7 stroke-[3px]" />
           </button>
        </main>

        {/* Intelligence Contribution Sidebar */}
        <aside className="w-[360px] bg-[#151B2B]/50 border-l border-white/5 flex flex-col pt-10 shrink-0">
           <p className="px-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-10">Consensus & Authorship</p>
           <div className="flex-1 overflow-y-auto px-10 space-y-12">
              <div className="space-y-6">
                 {paper.contributors.map((c) => (
                    <div key={c.name} className="flex flex-col gap-3">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className={`size-8 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-black text-white ${c.color.replace('bg', 'border')}`}>
                                {c.name[0]}
                             </div>
                             <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-black text-white uppercase tracking-tight">{c.name}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{c.role}</span>
                             </div>
                          </div>
                          <span className="text-[10px] font-black text-teal-400 font-mono tracking-widest">{c.weight}% Weight</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.weight}%` }} />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="p-8 bg-[#00D4AA]/5 border border-[#00D4AA]/20 rounded-3xl flex flex-col items-center text-center gap-3">
                 <div className="size-16 rounded-full bg-[#00D4AA]/10 flex items-center justify-center text-[#00D4AA] mb-4">
                    <Trophy className="size-8 stroke-[2px]" />
                 </div>
                 <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Calculated Token Rewards</p>
                 <h4 className="text-4xl font-black text-white uppercase tracking-tight">{paper.pool}</h4>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">MNT Rewards generated via Cogito Protocol Verification.</p>
              </div>
           </div>
           
           <div className="p-8 border-t border-white/5 bg-[#151B2B]">
              <button className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#00D4AA] hover:text-[#0A0F1E] transition-all flex items-center justify-center gap-3 group">
                 Open Repository Chat Access
                 <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
}
