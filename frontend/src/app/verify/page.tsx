"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, ShieldCheck, XCircle, ArrowRight, ShieldAlert, History, User, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { LaTeXRenderer } from "@/components/LaTeXRenderer";
import Link from "next/link";

const verifyList = [
  {
    id: "v1",
    problem: {
      title: "Convergence of Basel Series",
      statement: "Sum the series $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$. Provide the result using the Basel problem solution methodology.",
    },
    solution: {
      content: "Result is $\\frac{\\pi^2}{6}$. Proof using expansion of $\\sin(x) = x(1 - x^2/\\pi^2)(1 - x^2/4\\pi^2)...$ and comparing coefficients of $x^3$.",
      author: "0x89...12",
    },
    reward: 0.005,
    expiresIn: "45m",
  }
];

export default function VerifyPage() {
  const [activeVerify, setActiveVerify] = useState<any>(verifyList[0]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAction = (type: "approve" | "reject") => {
    if (!reason && type === "reject") {
        alert("Please provide a reason for rejection.");
        return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCompleted(true);
    }, 1500);
  };

  if (isCompleted) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center text-center">
        <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 mb-8">
           <ShieldCheck className="size-10 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Verification Complete</h1>
        <p className="mt-4 max-w-sm text-zinc-400">
           Your expert judgment has been recorded on-chain. You have earned 0.005 POI for this verification.
        </p>
        <Link href="/dashboard" className="mt-10 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white uppercase">
            Check Balance
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
       <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
             <ShieldCheck className="size-4" />
             Expert Network
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Verification Queue</h1>
          <p className="max-w-2xl text-zinc-400">
             Audit solutions submitted by peers. Your accuracy is tracked and impacts your expert reputation score.
          </p>
       </div>

       <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left: Queue Status */}
          <div className="lg:col-span-1 flex flex-col gap-6">
             <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-widest mb-4">Assigned Tasks</h3>
                <div className="flex flex-col gap-2">
                   {verifyList.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveVerify(item)}
                        className={`flex flex-col rounded-xl p-4 text-left border transition-all ${
                           activeVerify?.id === item.id 
                           ? 'bg-primary/20 border-primary shadow-lg shadow-primary/10' 
                           : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                      >
                         <span className="text-xs font-bold text-white truncate">{item.problem.title}</span>
                         <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                            <span>{item.expiresIn} Left</span>
                            <span className="text-primary">{item.reward} POI</span>
                         </div>
                      </button>
                   ))}
                </div>
                
                <div className="mt-8 border-t border-white/5 pt-6">
                   <div className="flex items-center justify-between text-[10px] uppercase font-bold text-zinc-500 mb-2 px-2">
                      <span>Daily Limit</span>
                      <span>1/3 Tasks</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full p-0.5 overflow-hidden border border-white/10">
                      <div className="h-full w-1/3 bg-primary rounded-full shadow-[0_0_8px_rgba(127,119,221,0.5)]" />
                   </div>
                </div>
             </div>

             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
                   <Brain className="size-32" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">My Reputation</h3>
                <h4 className="text-2xl font-mono font-bold text-white">4.85 / 5.0</h4>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-1.5 w-fit">
                   <CheckCircle2 className="size-3 text-green-500" />
                   <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Trusted Auditor</span>
                </div>
             </div>
          </div>

          {/* Right: Verification Area */}
          <div className="lg:col-span-3 flex flex-col gap-6">
             <AnimatePresence mode="wait">
               {activeVerify && (
                 <motion.div
                   key={activeVerify.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex flex-col gap-6"
                 >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                       {/* Problem Info */}
                       <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl overflow-y-auto">
                          <div className="flex items-center gap-2 mb-6">
                             <div className="size-1.5 rounded-full bg-zinc-600" />
                             <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Original Problem</span>
                          </div>
                          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">{activeVerify.problem.title}</h2>
                          <div className="prose prose-invert prose-sm">
                             <LaTeXRenderer content={activeVerify.problem.statement} />
                          </div>
                       </div>

                       {/* Submission Info */}
                       <div className="rounded-3xl border border-white/5 bg-zinc-950/40 p-8 backdrop-blur-xl overflow-y-auto relative">
                          <div className="flex items-center gap-2 mb-6 text-primary">
                             <div className="size-1.5 rounded-full bg-primary" />
                             <span className="text-[10px] uppercase font-bold tracking-widest">Submitted Solution</span>
                          </div>
                          <div className="flex items-center gap-2 mb-8 rounded-xl bg-white/5 border border-white/5 px-4 py-2 w-fit">
                             <User className="size-3 text-zinc-500" />
                             <span className="text-[10px] font-mono text-zinc-400">{activeVerify.solution.author}</span>
                          </div>
                          <div className="prose prose-invert prose-sm">
                             <LaTeXRenderer content={activeVerify.solution.content} />
                          </div>
                       </div>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                       <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Auditor Verdict</h3>
                       <div className="flex flex-col gap-6">
                          <textarea
                            placeholder="Provide reason for approval or rejection (required for reject)..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full min-h-[120px] rounded-2xl bg-black/40 border border-white/10 px-6 py-4 text-sm text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all resize-none"
                          />
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-6">
                                <button
                                  onClick={() => handleAction("approve")}
                                  disabled={loading}
                                  className="flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                >
                                   <ShieldCheck className="size-4" />
                                   {loading ? 'Processing...' : 'Approve Submission'}
                                </button>
                                <button
                                  onClick={() => handleAction("reject")}
                                  disabled={loading}
                                  className="flex h-12 items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-8 text-xs font-bold text-red-500 transition-all hover:bg-red-500/20 disabled:opacity-50"
                                >
                                   <XCircle className="size-4" />
                                   Reject Solution
                                </button>
                             </div>
                             <div className="flex flex-col items-end">
                                <span className="text-lg font-mono font-bold text-white">+{activeVerify.reward} POI</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Audit Reward</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
       </div>
    </div>
  );
}
