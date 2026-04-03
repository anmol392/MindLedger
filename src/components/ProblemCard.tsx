"use client";

import { motion } from "framer-motion";
import { Clock, Star, ArrowUpRight, Lock, Brain, Trophy } from "lucide-react";
import Link from "next/link";

interface ProblemCardProps {
  id: string;
  title: string;
  subject: "Math" | "Physics" | "Chemistry" | "CS";
  tier: 1 | 2 | 3 | 4 | 5;
  reward: number;
  timeLimit: string;
  solveRate: number;
  status: "open" | "attempted" | "solved" | "claimed";
}

const tierColors = {
  1: "bg-green-500/20 text-green-500",
  2: "bg-blue-500/20 text-blue-500",
  3: "bg-yellow-500/20 text-yellow-500",
  4: "bg-orange-500/20 text-orange-500",
  5: "bg-red-500/20 text-red-500",
};

export function ProblemCard({ id, title, subject, tier, reward, timeLimit, solveRate, status }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/10"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tierColors[tier]}`}>
            Tier {tier}
          </div>
          <div className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {subject}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-mono font-bold text-primary">{reward} POI</span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Est. Reward</span>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold text-white transition-colors group-hover:text-primary">
        {title}
      </h3>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
          <Clock className="size-3.5 text-zinc-600" />
          {timeLimit} Limit
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
          <Star className="size-3.5 text-zinc-600" />
          {solveRate}% Solve Rate
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
        <div className="flex items-center gap-2">
          {status === "claimed" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-orange-500">
              <Lock className="size-3" />
              Locked to you
            </div>
          ) : status === "solved" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-green-500">
              <Trophy className="size-3" />
              Solved
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-zinc-500">
              <div className="size-1.5 rounded-full bg-zinc-600 animate-pulse" />
              Available
            </div>
          )}
        </div>

        <Link
          href={`/solve/${id}`}
          className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-primary hover:border-primary group-hover:scale-105"
        >
          {status === "claimed" ? "Resume Solving" : "Claim Problem"}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
