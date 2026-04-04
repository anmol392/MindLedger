"use client";

import { motion } from "framer-motion";
import { Plus, Brain, Info, Send, Trophy, LayoutTemplate, Calculator, Atom, FlaskConical, Code } from "lucide-react";
import { useState } from "react";
import { LaTeXRenderer } from "@/components/LaTeXRenderer";
import Link from "next/link";

const domainIcons = {
  Math: Calculator,
  Physics: Atom,
  Chemistry: FlaskConical,
  CS: Code,
};

export default function SubmitProblem() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    subject: "Math",
    tier: 1,
    statement: "",
    solution: "",
    rewardPool: 50,
  });

  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <Plus className="size-4" />
          Intellectual Marketplace
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Submit New Problem</h1>
        <p className="max-w-2xl text-zinc-400">
           Contribute high-fidelity academic problems to the network. Creators earn 2% of every solver's reward as protocol royalties.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
           <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-12 backdrop-blur-3xl">
              <div className="flex items-center gap-2 mb-10 text-zinc-500 uppercase font-extrabold tracking-[0.2em] text-xs">
                 <LayoutTemplate className="size-4" />
                 Design Specification
              </div>

              <div className="flex flex-col gap-8">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Problem Domain</label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                       {["Math", "Physics", "Chemistry", "CS"].map((s) => {
                          const Icon = domainIcons[s as keyof typeof domainIcons];
                          return (
                            <button
                              key={s}
                              onClick={() => setFormData({...formData, subject: s})}
                              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 py-6 transition-all ${
                                 formData.subject === s 
                                 ? 'border-primary bg-primary/10 text-white shadow-xl shadow-primary/10' 
                                 : 'border-white/5 bg-white/5 text-zinc-500 hover:border-white/20 hover:text-white'
                              }`}
                            >
                               <Icon className="size-5" />
                               <span className="text-[10px] font-bold uppercase tracking-widest">{s}</span>
                            </button>
                          );
                       })}
                    </div>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Problem Title</label>
                    <input
                       type="text"
                       placeholder="e.g. Riemann Hypothesis Partial Proof"
                       value={formData.title}
                       onChange={(e) => setFormData({...formData, title: e.target.value})}
                       className="h-14 rounded-2xl bg-black/40 border border-white/10 px-6 text-sm text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all"
                    />
                 </div>

                 <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2">
                       <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Problem Statement (LaTeX)</label>
                       <button 
                          onClick={() => setIsPreview(!isPreview)}
                          className="text-[10px] font-bold text-primary uppercase hover:underline"
                       >
                          {isPreview ? 'Back to Editor' : 'Toggle Preview'}
                       </button>
                    </div>
                    {isPreview ? (
                       <div className="min-h-[240px] rounded-2xl bg-black/40 border border-white/10 px-6 py-6 overflow-y-auto">
                          <LaTeXRenderer content={formData.statement || "No content to preview..."} />
                       </div>
                    ) : (
                       <textarea
                          placeholder="Use $...$ for inline and $$...$$ for block math. Support KaTeX syntax."
                          value={formData.statement}
                          onChange={(e) => setFormData({...formData, statement: e.target.value})}
                          className="min-h-[240px] rounded-2xl bg-black/40 border border-white/10 px-6 py-6 text-sm text-white font-mono placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all resize-none"
                       />
                    )}
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Correct Answer / Reference Solution</label>
                    <textarea
                       placeholder="Private result. Used for automated initial validation."
                       value={formData.solution}
                       onChange={(e) => setFormData({...formData, solution: e.target.value})}
                       className="min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-6 py-6 text-sm text-white font-mono placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all resize-none"
                    />
                 </div>

                 <div className="flex justify-end pt-8 border-t border-white/5">
                    <button className="flex h-14 items-center gap-3 rounded-2xl bg-primary px-10 text-sm font-bold text-white transition-all hover:scale-105 shadow-2xl shadow-primary/20 uppercase tracking-widest">
                       <Send className="size-4" />
                       Submit to Peer Review
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Info Panels */}
        <div className="flex flex-col gap-8">
           <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 to-black p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <Trophy className="size-48" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary mb-4">Staking Requirement</h3>
              <p className="text-sm font-bold leading-relaxed text-white">To maintain problem quality, submission requires a stake of <span className="text-primary">10 POI</span> tokens.</p>
              <p className="mt-4 text-xs text-zinc-500 leading-relaxed">
                 You earn 2% royalties indefinitely on every solver's reward. Tokens are returned if the problem passes peer review.
              </p>
           </div>

           <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-600 mb-8">Guide to High-Tier Problems</h3>
              <div className="flex flex-col gap-6">
                 {[
                    "Originality is mandatory. Avoid existing online problems.",
                    "Provide clear, rigorous LaTeX notation for proofs.",
                    "CS problems must follow the strict complexity requirements.",
                    "Include multiple test cases for competitive programming.",
                 ].map((guide, idx) => (
                    <div key={idx} className="flex gap-4">
                       <div className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                       <span className="text-xs leading-relaxed text-zinc-400">{guide}</span>
                    </div>
                 ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-zinc-950/20 p-8 flex flex-col items-center text-center">
               <Info className="size-8 text-zinc-700 mb-4" />
               <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Review Process</h4>
               <p className="text-[10px] text-zinc-600 leading-relaxed">
                 Problems are reviewed by at least 5 Tier-5 experts. Approval typically takes 24-48 hours.
               </p>
            </div>
        </div>
      </div>
    </div>
  );
}
