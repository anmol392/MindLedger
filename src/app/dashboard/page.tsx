"use client";

import { motion } from "framer-motion";
import { Wallet, History, TrendingUp, ShieldCheck, Share2, Layers, ArrowUpRight, DollarSign, Wallet2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import Link from "next/link";


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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Miner Dashboard</h1>
        <p className="max-w-2xl text-zinc-400">
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
              className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-zinc-900 via-primary/20 to-zinc-950 p-8 shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Wallet className="size-32" />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Current Balance</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-5xl font-mono font-bold text-white">1.2504</h3>
                  <span className="text-sm font-bold text-white/80">POI</span>
                </div>
                <div className="mt-8 flex gap-4">
                  <button className="flex-1 rounded-xl bg-white/20 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/30 backdrop-blur-md uppercase">
                     Stake Tokens
                  </button>
                  <button
                    onClick={() => { if(!isKycVerified) alert("Please complete KYC first") }}
                    className="flex-1 rounded-xl bg-white px-4 py-3 text-xs font-bold text-primary transition-all hover:scale-105 uppercase shadow-xl"
                  >
                     Withdraw
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sub Stats Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                       <TrendingUp className="size-5 text-green-500" />
                    </div>
                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest">+12% vs last month</span>
                 </div>
                 <span className="text-xs uppercase font-bold text-zinc-500 tracking-widest">Total Solved</span>
                 <h4 className="mt-1 text-2xl font-mono font-bold text-white">45</h4>
              </div>
              <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                       <ShieldCheck className="size-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Rank 1,245 Top 2%</span>
                 </div>
                 <span className="text-xs uppercase font-bold text-zinc-500 tracking-widest">Verification Accuracy</span>
                 <h4 className="mt-1 text-2xl font-mono font-bold text-white">98.2%</h4>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-md overflow-hidden">
            <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-widest mb-8">Performance History (POI Earned)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7F77DD" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7F77DD" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", fontSize: "12px" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                  <Area type="monotone" dataKey="tokens" stroke="#7F77DD" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transaction History */}
          <div className="rounded-[2rem] border border-white/5 bg-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/5">
               <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-widest">Recent Activity</h3>
               <button className="text-xs font-bold text-primary hover:underline transition-all">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{tx.problem}</span>
                          <span className="text-[10px] text-zinc-500">{tx.date}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                            tx.type === 'Solved' ? 'bg-green-500/10 text-green-500' :
                            tx.type === 'Staked' ? 'bg-primary/20 text-white' :
                            'bg-blue-500/10 text-blue-500'
                         }`}>
                            {tx.type}
                         </span>
                      </td>
                      <td className="px-8 py-5 text-right font-mono font-bold text-white">
                         +{tx.reward} <span className="text-[10px] text-zinc-500">POI</span>
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Security & Withdrawal</h3>
              <div className="flex items-center gap-4">
                 <div className={`size-12 rounded-2xl flex items-center justify-center border ${isKycVerified ? 'bg-green-500/20 border-green-500/30' : 'bg-orange-500/20 border-orange-500/30'}`}>
                    <ShieldCheck className={`size-6 ${isKycVerified ? 'text-green-500' : 'text-orange-500'}`} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase tracking-tighter">
                      {isKycVerified ? 'KYC Verified' : 'KYC Pending'}
                    </span>
                    <span className="text-[10px] text-zinc-500">Unlocks Fiat & CBDC</span>
                 </div>
              </div>
              
              {!isKycVerified && (
                <div className="mt-8 flex flex-col gap-4">
                   <p className="text-xs leading-relaxed text-zinc-500">To convert POI tokens to INR or e-Rupee, please complete your identification process.</p>
                   <Link href="/auth" className="rounded-xl border border-orange-500/30 bg-orange-500/10 py-3 text-center text-xs font-bold text-orange-500 uppercase hover:bg-orange-500/20 transition-all">
                      Complete Verification
                   </Link>
                </div>
              )}
           </div>

           {/* Conversion Tools */}
           <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Convert to e-Rupee</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/5 px-4 py-4">
                   <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono font-extrabold text-white">P</div>
                   <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">You Pay</span>
                      <span className="text-lg font-mono font-bold text-white">100.00 <span className="text-xs text-zinc-500">POI</span></span>
                   </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/10 px-4 py-4">
                   <div className="size-10 rounded-full bg-primary flex items-center justify-center">
                      <DollarSign className="size-5 text-white" />
                   </div>
                   <div className="flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">You Receive</span>
                      <span className="text-lg font-mono font-bold text-white">8,450.00 <span className="text-xs text-white/50">INR (CBDC)</span></span>
                   </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 py-4 text-xs font-bold text-white uppercase hover:bg-white/10 transition-all">
                   <Layers className="size-4" />
                   Process via CBDC Bridge
                </button>
              </div>
           </div>

           {/* Referrals */}
           <div className="rounded-3xl border border-white/5 bg-white/5 p-8 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                 <Share2 className="size-32" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Referral Program</h3>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-[80%]">Earn 1% of your friends' first mining reward. Help decentralize intelligence.</p>
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-black px-4 py-3 border border-white/5">
                 <span className="flex-1 truncate text-xs font-mono text-zinc-400">0xMIN...4a2b</span>
                 <button className="text-[10px] font-bold text-primary uppercase">Copy</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
