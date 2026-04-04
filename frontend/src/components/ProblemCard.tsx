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
  1: "bg-green-500/10 text-green-600",
  2: "bg-blue-500/10 text-blue-600",
  3: "bg-yellow-500/10 text-yellow-600",
  4: "bg-orange-500/10 text-orange-600",
  5: "bg-red-500/10 text-red-600",
};

export function ProblemCard({ id, title, subject, tier, reward, timeLimit, solveRate, status }: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tierColors[tier]}`}>
            Tier {tier}
          </div>
          <div className="rounded-full bg-muted border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {subject}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-mono font-bold text-primary">{reward} POI</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Est. Reward</span>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
          <Clock className="size-3.5" />
          {timeLimit} Limit
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
          <Star className="size-3.5" />
          {solveRate}% Solve Rate
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <div className="flex items-center gap-2">
          {status === "claimed" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-orange-500">
              <Lock className="size-3" />
              Locked to you
            </div>
          ) : status === "solved" ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-green-600">
              <Trophy className="size-3" />
              Solved
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground">
              <div className="size-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
              Available
            </div>
          )}
        </div>

        <Link
          href={`/solve/${id}`}
          className="flex items-center gap-2 rounded-xl bg-muted border border-border px-4 py-2 text-xs font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary group-hover:scale-105"
        >
          {status === "claimed" ? "Resume Solving" : "Claim Problem"}
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
