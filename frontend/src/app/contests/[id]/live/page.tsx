"use client";

import { useState, useEffect } from "react";
import { Trophy, Clock, Send, ChevronLeft, ChevronRight, Calculator, Code, FlaskConical, Atom } from "lucide-react";
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const problems = [
  { id: "1", title: "Riemann Non-Zero Roots", points: 500, subject: 'Math', solved: false, icon: Calculator },
  { id: "2", title: "Quantum Tunneling Prob.", points: 350, subject: 'Physics', solved: true, icon: Atom },
  { id: "3", title: "NP-Complete Complexity", points: 400, subject: 'CS', solved: false, icon: Code },
  { id: "4", title: "Organic Synth Finals", points: 250, subject: 'Chemistry', solved: false, icon: FlaskConical },
];

const leaderboard = [
  { rank: 1, name: "0x34...8F", points: 1250, solved: 4 },
  { rank: 2, name: "quantum_mind", points: 1120, solved: 3 },
  { rank: 3, name: "logic_bomb", points: 985, solved: 3 },
  { rank: 4, name: "cipher_tex", points: 850, solved: 2 },
  { rank: 5, name: "prime_time", points: 720, solved: 2 },
];

export default function LiveArenaPage() {
  const [activeProblem, setActiveProblem] = useState(problems[0]);
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 mins

  useEffect(() => {
    const timer = setInterval(() => setTimeRemaining(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-[#0A0F1E] flex flex-col z-[9999] overflow-hidden text-foreground">
      {/* Header Bar */}
      <header className="h-20 bg-[#151B2B] border-b border-white/5 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-6">
           <button className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-white transition-all">
              <ChevronLeft className="size-4" />
              Exit Arena
           </button>
           <div className="h-8 w-px bg-white/5" />
           <div>
              <h2 className="text-sm font-black text-white uppercase tracking-tight">Global Math Olympiad #42</h2>
              <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Protocol Version v4.1 (Mining Active)</p>
           </div>
        </div>

        <div className={`flex items-center gap-4 bg-black/40 px-8 py-3 rounded-2xl border ${timeRemaining < 600 ? 'border-red-500/50 animate-pulse' : 'border-white/5'}`}>
           <Clock className={`size-5 ${timeRemaining < 600 ? 'text-red-500' : 'text-teal-400'}`} />
           <span className="text-2xl font-black font-mono tracking-widest tabular-nums leading-none">
              {formatTime(timeRemaining)}
           </span>
        </div>

        <button className="h-12 px-10 rounded-xl bg-[#00D4AA] text-[#0A0F1E] text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-[1.03] transition-all">
           Finalize & Submit All
        </button>
      </header>

      {/* Main Content Arena */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Problem List */}
        <aside className="w-[340px] bg-[#151B2B]/50 border-r border-white/5 flex flex-col overflow-y-auto no-scrollbar pt-6 shrink-0">
           <p className="px-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-10">Intellectual Tasks Queue</p>
           <div className="flex flex-col">
              {problems.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProblem(p)}
                  className={`flex items-center gap-6 px-10 py-6 transition-all border-l-4 group ${activeProblem.id === p.id ? 'bg-[#00D4AA]/5 border-[#00D4AA]' : 'border-transparent hover:bg-white/5'}`}
                >
                   <div className={`p-3 rounded-xl border border-white/5 ${activeProblem.id === p.id ? 'bg-[#00D4AA] text-[#0A0F1E]' : 'bg-white/5 text-muted-foreground group-hover:text-white'}`}>
                      <p.icon className="size-5" />
                   </div>
                   <div className="flex-1 text-left">
                      <h4 className={`text-xs font-black uppercase tracking-tight mb-1 ${activeProblem.id === p.id ? 'text-white' : 'text-muted-foreground'}`}>{p.title}</h4>
                      <p className="text-[10px] font-bold text-teal-400/70 uppercase tracking-widest">{p.points} POI Credit</p>
                   </div>
                   {p.solved && (
                      <div className="size-5 rounded-full bg-green-500 flex items-center justify-center text-[#151B2B]">
                         <Trophy className="size-3" />
                      </div>
                   )}
                </button>
              ))}
           </div>
        </aside>

        {/* Main Solver Interface */}
        <main className="flex-1 flex flex-col overflow-hidden">
           <div className="p-10 border-b border-white/5 bg-[#151B2B]/20 shrink-0">
              <div className="flex items-center gap-2 text-[10px] font-black text-teal-400 uppercase tracking-widest mb-4">
                 <Calculator className="size-4" />
                 Active Intellectual Variant #8412
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-6">{activeProblem.title}</h1>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-widest opacity-80 max-w-4xl">
                 Evaluate the non-zero roots for the specified Riemann domain within the complex plane. Proof-of-Intellect requires formal proof in LaTeX and verifiable synthesis steps.
              </p>
           </div>

           <div className="flex-1 bg-[#0A0F1E] relative">
              <MonacoEditor
                height="100%"
                defaultLanguage="cpp"
                theme="vs-dark"
                value="// Protocol: Proof-of-Intellect (PoI)\n// Complexity: Extreme\n\n#include <iostream>\n\nint main() {\n    // Implement your cognitive synthesis here\n    return 0;\n}"
                options={{
                   fontSize: 14,
                   minimap: { enabled: false },
                   padding: { top: 20 },
                   fontFamily: 'Fira Code, monospace',
                   scrollBeyondLastLine: false,
                }}
              />
              <div className="absolute bottom-10 right-10 flex gap-4">
                 <button className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all backdrop-blur-md">
                    Execute Local Sandbox
                 </button>
                 <button className="h-14 px-12 rounded-2xl bg-[#00D4AA] text-[#0A0F1E] text-xs font-black uppercase tracking-widest shadow-2xl shadow-teal-500/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                    Submit Formal Solution <Send className="size-4 stroke-[3px]" />
                 </button>
              </div>
           </div>
        </main>

        {/* Right Sidebar: Leaderboard */}
        <aside className="w-[320px] bg-[#151B2B]/50 border-l border-white/5 flex flex-col pt-6 shrink-0">
           <p className="px-10 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-10">Real-Time Leaderboard</p>
           <div className="flex-1 overflow-y-auto px-6 space-y-4">
              {leaderboard.map((u) => (
                <div 
                  key={u.rank} 
                  className={`p-5 rounded-[1.5rem] border transition-all flex flex-col gap-4 ${u.rank === 1 ? 'bg-[#00D4AA]/10 border-[#00D4AA] shadow-xl shadow-teal-500/10' : 'bg-white/5 border-white/5'}`}
                >
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-black text-white bg-white/10 size-6 flex items-center justify-center rounded-lg">{u.rank}</span>
                         <span className="text-xs font-black text-white tracking-tight">{u.name}</span>
                      </div>
                      <span className="text-xs font-black text-teal-400">{u.points} POI</span>
                   </div>
                   <div className="flex items-center gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i < u.solved ? 'bg-[#00D4AA]' : 'bg-white/10'}`} />
                      ))}
                   </div>
                </div>
              ))}
           </div>
           
           <div className="p-10 border-t border-white/5 bg-[#151B2B]">
              <div className="p-5 rounded-2xl bg-[#00D4AA]/10 border border-[#00D4AA]/20 flex flex-col gap-2">
                 <p className="text-[10px] font-black text-[#00D4AA] uppercase tracking-widest">Protocol Signal</p>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">System sync active. 44 verifiers watching this session.</p>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
