"use client";

import { useState, useRef, useEffect, use } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Send, ShieldAlert, Video, Mic, Menu, Home, CheckCircle2, AlertTriangle, Languages } from "lucide-react";
import { LaTeXRenderer } from "@/components/LaTeXRenderer";
import { useProctoringSession } from "@/hooks/useProctoringSession";
import Link from "next/link";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
import axios from "axios";

// Mock Problem Data
const problemData: Record<string, any> = {
  "1": {
    title: "Riemann Hypothesis Verification (Partial)",
    subject: "Math",
    tier: 5,
    reward: 0.125,
    timeLimit: 120, // minutes
    statement: "Prove the non-trivial zeros of the Riemann zeta function $\\zeta(s)$ have real part $1/2$ for the given region $\\mathbb{D}$. \n\n$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$ \n\nWhere $s$ is a complex variable $s = \\sigma + it$. Show that for $\\sigma > 1$, the Dirichlet series converges absolutely.",
    type: "proof",
  },
  "4": {
    title: "Optimal Network Routing in Mesh Topology",
    subject: "CS",
    tier: 2,
    reward: 0.024,
    timeLimit: 45,
    statement: "Define a function `findShortestPath` that takes a graph represented as an adjacency matrix and returns the shortest path between node `0` and node `N-1`. Constraints: $N \\le 10^3$, $W_i \\le 10^6$. Expected complexity: $O(E \\log V)$.",
    type: "code",
  }
};

export default function SolvePage({ params: paramsPromise }: { params: Promise<{ problem_id: string }> }) {
  const params = use(paramsPromise);
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { stream, warningCount, isTabFocused, disqualified, error: proctorError } = useProctoringSession(params.problem_id);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedLang, setSelectedLang] = useState("cpp");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [solution, setSolution] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const langCode = localStorage.getItem('i18nextLng') || 'en';
        const res = await axios.get(`http://localhost:8000/api/problems/${params.problem_id}?lang=${langCode}`, {
          timeout: 2500
        });
        setProblem(res.data);
        if (res.data.timeLimit) setTimeLeft(res.data.timeLimit * 60);
        if (!solution) setSolution(res.data.type === "code" ? "// Your implementation here" : "% Rendered LaTeX proof here");
        
        if (res.data.isTranslating) {
           setTimeout(fetchProblem, 1500);
        } else {
           setLoading(false);
        }
      } catch (err) {
        console.warn("Backend unreachable or timed out - attempting cognitive fallback to local mock data.");
        // Fallback to local mock data using string comparison for robustness
        const currentId = String(params.problem_id);
        const mock = problemData[currentId];
        
        if (mock) {
           setProblem({ ...mock, isOffline: true });
           setTimeLeft((mock.timeLimit || 60) * 60);
           if (!solution) setSolution(mock.type === "code" ? "// Your implementation here" : "% Rendered LaTeX proof here");
           setLoading(false);
        } else {
           setLoading(false);
        }
      }
    };
    fetchProblem();
  }, [params.problem_id]);

  useEffect(() => {
    if (!problem || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (disqualified) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-red-950/20 text-center px-6">
        <ShieldAlert className="size-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Session Terminated</h1>
        <p className="mt-4 max-w-sm text-zinc-400">
          Your session was terminated due to critical proctoring violations (noise detection, window blur, or unauthorized screen capture attempts). 
          Your current state has been submitted for audit.
        </p>
        <Link href="/problems" className="mt-10 rounded-xl bg-white/5 border border-white/10 px-8 py-3 text-sm font-bold text-white uppercase hover:bg-white/10 transition-colors">
          Return to Problems
        </Link>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="size-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 mb-8"
        >
          <CheckCircle2 className="size-10 text-green-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-white uppercase tracking-tighter">Solution Submitted</h1>
        <p className="mt-4 max-w-sm text-zinc-400">
          Your solution is now in the verification queue. You will receive POI tokens once verified by the network.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/dashboard" className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white uppercase hover:bg-white/10 transition-colors">
            Dashboard
          </Link>
          <Link href="/problems" className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white uppercase shadow-lg shadow-primary/20">
            Next Problem
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-black">
      {/* Top Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-6">
        <div className="flex items-center gap-6">
          <Link href="/problems" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
            <Home className="size-4" />
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          {loading ? (
            <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
          ) : (
            <h2 className="text-sm font-black text-white uppercase tracking-tighter truncate max-w-xs">{problem?.title}</h2>
          )}
          {!loading && (
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-500 uppercase">
                Tier {problem?.tier}
              </div>
              {problem?.isOffline && (
                 <div className="rounded-md bg-zinc-500/10 border border-zinc-500/20 px-2 py-0.5 text-[10px] font-black text-zinc-500 uppercase">
                   Simulated Node
                 </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-xl font-mono font-black text-primary">
              <Clock className="size-5" />
              {loading ? "00:00" : formatTime(timeLeft)}
            </div>
            <span className="text-[10px] uppercase font-black text-zinc-600 tracking-widest">Time Remaining</span>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-6 text-xs font-black text-white transition-all hover:scale-105 active:shadow-inner disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {submitting ? "Submitting..." : "Submit Solution"}
            <Send className="size-3.5" />
          </button>
        </div>
      </header>

      {/* Warning Banner */}
      <AnimatePresence>
        {(warningCount > 0) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500/20 border-b border-red-500/30 px-6 py-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
              <AlertTriangle className="size-4" />
              Warning {warningCount}/3: Proctoring violation detected (Voice, Blur, or Screenshot)
            </div>
            {!isTabFocused && <span className="text-[10px] text-red-500/80 font-bold uppercase tracking-widest">Window focus lost</span>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Problem Statement */}
        <div className="w-[40%] flex flex-col border-r border-white/5 bg-zinc-950/30 overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="size-2 rounded-full bg-primary" />
              <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Problem Statement</span>
            </div>
            
            {loading ? (
              <div className="flex flex-col gap-6">
                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
                {problem?.isTranslating && (
                   <div className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
                      <div className="size-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Translating via DeepL AI...</span>
                   </div>
                )}
              </div>
            ) : (
              <>
                <div className="text-white text-base leading-relaxed font-sans scroll-smooth">
                  <LaTeXRenderer content={problem.statement} />
                </div>

                <div className="mt-12 rounded-2xl border border-black/5 bg-white/5 p-6">
                  <h4 className="text-xs font-black uppercase text-zinc-500 tracking-wider mb-4">Verification Reward</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-mono font-black text-white">{problem.reward}</span>
                    <span className="text-sm font-black text-primary mb-1">POI TOKENS</span>
                  </div>
                  <p className="mt-4 text-xs text-zinc-600 leading-relaxed uppercase font-black tracking-tighter opacity-60">
                    Tokens will be released after 3 successful peer verifications. Ensure your proof is clear and rigorous.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Panel: Solution Input */}
        <div className="flex-1 flex flex-col relative">
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-zinc-950/20">
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                 <Languages className="size-3" />
                 Solution Editor
               </div>
               <div className="h-3 w-[1px] bg-white/10" />
               <span className="text-[9px] font-bold text-red-500/80 uppercase tracking-widest animate-pulse">
                 Copy-Paste & selection disabled
               </span>
             </div>
             {problem?.type === "code" && (
               <select
                 value={selectedLang}
                 onChange={(e) => setSelectedLang(e.target.value)}
                 className="bg-transparent border-none text-[10px] font-black text-zinc-400 focus:ring-0 uppercase cursor-pointer hover:text-white"
               >
                 <option value="cpp">C++ (G++ 11)</option>
                 <option value="python">Python 3.10</option>
                 <option value="java">Java 17</option>
               </select>
             )}
          </div>

          <div className="flex-1 overflow-hidden transition-opacity" style={{ opacity: isTabFocused ? 1 : 0.3 }}>
            <Editor
              theme="vs-dark"
              language={problem?.type === "code" ? selectedLang : "latex"}
              value={solution}
              onChange={(v) => setSolution(v || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-mono)",
                lineNumbers: "on",
                padding: { top: 20 },
              }}
            />
          </div>

          {!isTabFocused && (
            <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
                <div className="rounded-xl border border-white/10 bg-black/80 px-6 py-3 text-sm font-bold text-white uppercase transition-all animate-pulse">
                   Paused: Resume focus to continue
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Proctoring UI Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-black/80 px-3 py-1 backdrop-blur-md">
              <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Network Secure</span>
           </div>
           <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 backdrop-blur-md">
             <Mic className="size-3 text-green-500" />
             <span className="text-[9px] font-bold text-white uppercase tracking-widest">Audio Processing</span>
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
          
          {/* Scanning Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan" style={{ backgroundSize: '100% 200%' }} />
          </div>

          {/* Indicators */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="size-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
            <span className="text-[7px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">Recording</span>
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
