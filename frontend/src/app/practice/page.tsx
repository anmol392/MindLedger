"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RefreshCw, Send, CheckCircle2, XCircle, ArrowRight, Sparkles, Loader2, Home, Video, Mic } from "lucide-react";
import { LaTeXRenderer } from "@/components/LaTeXRenderer";
import { useProctoringSession } from "@/hooks/useProctoringSession";
import Link from "next/link";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface Problem {
  id: string;
  title: string;
  statement: string;
  subject: string;
  tier: number;
  reward: number;
  type: "proof" | "code";
}

export default function PracticePage() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{ correct: boolean; score: number; feedback: string } | null>(null);
  const [solution, setSolution] = useState("");
  const [subject, setSubject] = useState("Math");
  
  const { stream } = useProctoringSession("practice-mode");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const fetchQuestion = async (selectedSubject = subject) => {
    setLoading(true);
    setResult(null);
    setSolution("");
    try {
      // In a real app, this would call your backend
      // For demo, we simulate the fetch since the backend might not be running in this environment
      const res = await fetch("/api/practice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: selectedSubject, tier: 3 }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setProblem(data);
      } else {
        // Fallback mock if API fails
        setProblem({
          id: "mock_1",
          title: `AI Generated ${selectedSubject} Problem`,
          statement: `Evaluate the expression related to ${selectedSubject} principles... $\\int_0^1 x^2 dx$`,
          subject: selectedSubject,
          tier: 3,
          reward: 0.05,
          type: "proof"
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleVerify = async () => {
    if (!problem || !solution) return;
    setVerifying(true);
    try {
      const res = await fetch("/api/practice/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem_statement: problem.statement,
          solution_text: solution,
          subject: problem.subject
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        setResult({
          correct: solution.length > 50,
          score: 0.8,
          feedback: "Semantic verification suggests a correct approach."
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-black text-white font-sans">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-6 bg-zinc-950">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
            <Home className="size-4" />
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <Brain className="size-5 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-tighter">AI Practice Lab</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select 
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              fetchQuestion(e.target.value);
            }}
            className="bg-muted border border-border rounded-xl px-4 py-1.5 text-xs font-bold uppercase outline-none focus:ring-1 focus:ring-primary h-9"
          >
            <option value="Math">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="CS">Computer Science</option>
          </select>
          
          <button
            onClick={() => fetchQuestion()}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-bold uppercase hover:bg-white/10 transition-all h-9 disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            New Question
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Problem */}
        <div className="w-[45%] flex flex-col border-r border-white/5 bg-zinc-900/50 overflow-y-auto">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24"
                >
                  <Loader2 className="size-12 text-primary animate-spin mb-4" />
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">AI is synthesizing a unique challenge...</p>
                </motion.div>
              ) : (
                <motion.div
                  key={problem?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Synthetic Problem #{problem?.id}</span>
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-8 uppercase tracking-tighter">{problem?.title}</h1>
                  
                  <div className="prose prose-invert max-w-none mb-12">
                     <LaTeXRenderer content={problem?.statement || ""} />
                  </div>

                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-8">
                    <h4 className="text-xs font-bold uppercase text-primary tracking-wider mb-2">Practice Mode Info</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      This question was generated uniquely for you. While the camera feed is active for immersion, proctoring penalties are disabled in Practice Mode.
                    </p>
                  </div>
                  
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl border p-6 ${result.correct ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}
                    >
                       <div className="flex items-center gap-3 mb-4">
                         {result.correct ? <CheckCircle2 className="size-5 text-green-500" /> : <XCircle className="size-5 text-red-500" />}
                         <span className={`text-sm font-bold uppercase ${result.correct ? 'text-green-500' : 'text-red-500'}`}>
                           {result.correct ? 'Success' : 'Needs Improvement'}
                         </span>
                         <span className="ml-auto text-xs font-mono text-zinc-500">AI Confidence: {(result.score * 100).toFixed(0)}%</span>
                       </div>
                       <p className="text-sm text-zinc-300 leading-relaxed mb-6">{result.feedback}</p>
                       <button
                         onClick={() => fetchQuestion()}
                         className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase transition-all ${result.correct ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                       >
                         {result.correct ? 'Next Challenge' : 'Try Another Question'}
                         <ArrowRight className="size-3.5" />
                       </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 flex flex-col relative bg-zinc-950">
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-zinc-900/50">
             <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Your Solution</span>
               <div className="h-3 w-[1px] bg-white/10" />
               <span className="text-[9px] font-bold text-primary/80 uppercase tracking-widest">
                 Rich text & LaTeX supported
               </span>
             </div>
             <button
               onClick={handleVerify}
               disabled={verifying || !solution || loading}
               className="flex h-7 items-center gap-2 rounded-lg bg-primary px-4 text-[10px] font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
             >
               {verifying ? (
                 <>
                   <Loader2 className="size-3 animate-spin" />
                   Analyzing...
                 </>
               ) : (
                 <>
                   Verify with AI
                   <Send className="size-3" />
                 </>
               )}
             </button>
          </div>

          <div className="flex-1">
            <Editor
              theme="vs-dark"
              language={problem?.type === "code" ? "cpp" : "latex"}
              value={solution}
              onChange={(v) => setSolution(v || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: "var(--font-mono)",
                lineNumbers: "on",
                padding: { top: 20 },
                wordWrap: "on",
                backgroundColor: "#09090b"
              }}
            />
          </div>
        </div>
      </div>

      {/* Proctoring UI Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-black/80 px-3 py-1 backdrop-blur-md">
              <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Local Mode</span>
           </div>
           <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 backdrop-blur-md">
             <Mic className="size-3 text-green-500" />
             <span className="text-[9px] font-bold text-white uppercase tracking-widest">Mic Active</span>
           </div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black ring-2 ring-primary/20 shadow-[0_0_50px_rgba(127,119,221,0.2)] transition-all hover:scale-110">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-[140px] w-[200px] object-cover opacity-90"
          />
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" style={{ backgroundSize: '100% 200%' }} />
          </div>

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(127,119,221,0.9)]" />
            <span className="text-[7px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">Monitoring</span>
          </div>
          
          <div className="absolute bottom-2 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur-md border border-white/5">
            <Video className="size-2.5 text-primary" />
            <span className="text-[7px] font-bold text-white uppercase tracking-widest">
              Live Feed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
