"use client";

import { motion } from "framer-motion";
import { Wallet, History, TrendingUp, ShieldCheck, Share2, Layers, ArrowUpRight, DollarSign, Wallet2, BookOpen } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProblemCard } from "@/components/ProblemCard";

// Mock Problem Data (Matching the marketplace)
const problems = [
  { id: "1", title: "Riemann Hypothesis Verification (Partial)", subject: "Math", tier: 5, reward: 0.125, timeLimit: "120m", solveRate: 0.4, status: "open" },
  { id: "2", title: "Quantum Tunneling in Carbon Nanotubes", subject: "Physics", tier: 4, reward: 0.085, timeLimit: "90m", solveRate: 2.1, status: "open" },
  { id: "4", title: "Optimal Network Routing in Mesh Topology", subject: "CS", tier: 2, reward: 0.024, timeLimit: "45m", solveRate: 45.2, status: "open" },
];


const earningsData = [
  { name: "Day 1", tokens: 0.05 },
  { name: "Day 5", tokens: 0.12 },
  { name: "Day 10", tokens: 0.08 },
  { name: "Day 15", tokens: 0.25 },
  { name: "Day 20", tokens: 0.18 },
  { name: "Day 25", tokens: 0.32 },
  { name: "Day 30", tokens: 0.45 },
];

const transactions = [
  { id: "1", date: "2026-04-03", problem: "Riemann Hypothesis", reward: 0.125, type: "Solved", status: "Verified" },
  { id: "2", date: "2026-04-02", problem: "Network Routing", reward: 0.024, type: "Solved", status: "Verified" },
  { id: "3", date: "2026-04-01", problem: "Peer Verification", reward: 0.005, type: "Verify", status: "Completed" },
  { id: "4", date: "2026-03-31", problem: "Quantum Physics Set", reward: 0.082, type: "Solved", status: "Verified" },
  { id: "5", date: "2026-03-28", problem: "Staking Pool #41", reward: 0.015, type: "Staked", status: "Completed" },
];

export default function DashboardPage() {
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
        <div className="animate-pulse flex flex-col gap-8">
          <div className="h-12 w-64 bg-muted rounded-xl" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
             <div className="lg:col-span-2 h-96 bg-muted rounded-[2rem]" />
             <div className="h-96 bg-muted rounded-[2rem]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">Miner Dashboard</h1>
        <p className="max-w-2xl text-muted-foreground">
          Manage your assets, track your intellectual growth, and withdraw your rewards to fiat or CBDC.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Stats & Balance */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 shadow-sm"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Wallet className="size-32" />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Balance</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-5xl font-mono font-bold text-foreground">1.2504</h3>
                  <span className="text-sm font-bold text-muted-foreground">POI</span>
                </div>
                <div className="mt-8 flex gap-4">
                  <button className="flex-1 rounded-xl bg-muted px-4 py-3 text-xs font-bold text-foreground transition-all hover:bg-secondary uppercase">
                     Stake Tokens
                  </button>
                  <button
                    onClick={() => { if(!isKycVerified) alert("Please complete KYC first") }}
                    className="flex-1 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground transition-all hover:scale-105 uppercase shadow-xl"
                  >
                     Withdraw
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sub Stats Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                       <TrendingUp className="size-5 text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">+12% vs last month</span>
                 </div>
                 <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Total Solved</span>
                 <h4 className="mt-1 text-2xl font-mono font-bold text-foreground">45</h4>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                       <ShieldCheck className="size-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">Rank 1,245 Top 2%</span>
                 </div>
                 <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Verification Accuracy</span>
                 <h4 className="mt-1 text-2xl font-mono font-bold text-foreground">98.2%</h4>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm overflow-hidden">
            <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest mb-8">Performance History (POI Earned)</h3>
            <div className="h-64 w-full min-h-[256px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7F77DD" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7F77DD" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "12px", fontSize: "12px" }}
                    itemStyle={{ color: "var(--color-foreground)" }}
                  />
                  <Area type="monotone" dataKey="tokens" stroke="#7F77DD" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Problems Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <BookOpen className="size-4" />
                Recommended For You
              </div>
              <Link href="/problems" className="text-xs font-bold text-primary hover:underline transition-all">
                View Marketplace
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} {...(problem as any)} />
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="rounded-[2rem] border border-border bg-card shadow-sm overflow-hidden text-foreground">
            <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-muted/30">
               <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Recent Activity</h3>
               <button className="text-xs font-bold text-primary hover:underline transition-all">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground">{tx.problem}</span>
                          <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                            tx.type === 'Solved' ? 'bg-green-500/10 text-green-600' :
                            tx.type === 'Staked' ? 'bg-primary/20 text-primary' :
                            'bg-blue-500/10 text-blue-600'
                         }`}>
                            {tx.type}
                         </span>
                      </td>
                      <td className="px-8 py-5 text-right font-mono font-bold text-foreground">
                         +{tx.reward} <span className="text-[10px] text-muted-foreground">POI</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="flex flex-col gap-8">
           {/* KYC Status Section */}
           <div className={`rounded-3xl border border-dashed p-8 transition-all ${isKycVerified ? 'border-green-500/30 bg-green-500/5' : 'border-orange-500/30 bg-orange-500/5'}`}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Security & Withdrawal</h3>
              <div className="flex items-center gap-4">
                 <div className={`size-12 rounded-2xl flex items-center justify-center border ${isKycVerified ? 'bg-green-500/20 border-green-500/30' : 'bg-orange-500/20 border-orange-500/30'}`}>
                    <ShieldCheck className={`size-6 ${isKycVerified ? 'text-green-600' : 'text-orange-500'}`} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground uppercase tracking-tighter">
                      {isKycVerified ? 'KYC Verified' : 'KYC Pending'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Unlocks Fiat & CBDC</span>
                 </div>
              </div>
              
              {!isKycVerified && (
                <div className="mt-8 flex flex-col gap-4">
                   <p className="text-xs leading-relaxed text-muted-foreground">To convert POI tokens to INR or e-Rupee, please complete your identification process.</p>
                   <Link href="/auth" className="rounded-xl border border-orange-500/30 bg-orange-500/10 py-3 text-center text-xs font-bold text-orange-500 uppercase hover:bg-orange-500/20 transition-all">
                      Complete Verification
                   </Link>
                </div>
              )}
           </div>

           {/* Conversion Tools */}
           <div className="rounded-3xl border border-border bg-card p-8 shadow-md">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Convert to e-Rupee</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 rounded-2xl bg-muted border border-border px-4 py-4">
                   <div className="size-10 rounded-full bg-background border border-border flex items-center justify-center font-mono font-extrabold text-foreground">P</div>
                   <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">You Pay</span>
                      <span className="text-lg font-mono font-bold text-foreground">100.00 <span className="text-xs text-muted-foreground">POI</span></span>
                   </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-muted border border-border px-4 py-4">
                   <div className="size-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <DollarSign className="size-5 text-primary-foreground" />
                   </div>
                   <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">You Receive</span>
                      <span className="text-lg font-mono font-bold text-foreground">8,450.00 <span className="text-xs text-muted-foreground">INR (CBDC)</span></span>
                   </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-muted border border-border py-4 text-xs font-bold text-foreground uppercase hover:bg-secondary transition-all">
                   <Layers className="size-4" />
                   Process via CBDC Bridge
                </button>
              </div>
           </div>

           {/* Referrals */}
           <div className="rounded-3xl border border-border bg-card p-8 shadow-sm overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                 <Share2 className="size-32" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Referral Program</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[80%]">Earn 1% of your friends' first mining reward. Help decentralize intelligence.</p>
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted px-4 py-3 border border-border shadow-inner">
                 <span className="flex-1 truncate text-xs font-mono text-muted-foreground">0xMIN...4a2b</span>
                 <button className="text-[10px] font-bold text-primary uppercase">Copy</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
