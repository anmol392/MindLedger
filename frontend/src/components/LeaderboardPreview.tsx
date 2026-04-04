"use client";

import { motion } from "framer-motion";
import { Trophy, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const leaders = [
  { rank: 1, name: "0x34...8F", tokens: 1.2504, problems: 145, country: "🇮🇳" },
  { rank: 2, name: "quantum_mind", tokens: 1.1208, problems: 122, country: "🇨🇳" },
  { rank: 3, name: "logic_bomb", tokens: 0.9850, problems: 110, country: "🇺🇸" },
  { rank: 4, name: "cipher_tex", tokens: 0.8502, problems: 98, country: "🇷🇺" },
  { rank: 5, name: "prime_time", tokens: 0.7201, problems: 85, country: "🇩🇪" },
];

export function LeaderboardPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-foreground tracking-tighter uppercase sm:text-4xl">Global Elites</h2>
            <p className="max-w-xl text-muted-foreground">
              Track the top-performing solvers across all domains this week. Earn rewards based on your rank.
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            Full Leaderboard
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Rank</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Solver</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">POI Tokens</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Solved</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaders.map((leader, index) => (
                  <tr
                    key={`${leader.name}-${leader.rank}`}
                    className="group hover:bg-muted/50 transition-all cursor-default"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3 font-mono font-bold text-foreground">
                        {index < 3 ? (
                          <div className={cn(
                            "flex size-6 items-center justify-center rounded-full text-[10px]",
                            index === 0 ? "bg-yellow-500/20 text-yellow-600" :
                            index === 1 ? "bg-zinc-400/20 text-zinc-600" :
                            "bg-orange-500/20 text-orange-600"
                          )}>
                            <Trophy className="size-3" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">0{leader.rank}</span>
                        )}
                        {leader.rank}
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-foreground group-hover:text-primary transition-colors">
                      {leader.name}
                    </td>
                    <td className="px-8 py-6 font-mono font-bold text-foreground">
                      {leader.tokens.toFixed(4)} <span className="text-[10px] text-muted-foreground">POI</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Star className="size-3 text-primary" />
                        <span className="text-sm text-muted-foreground">{leader.problems}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right text-xl">
                      {leader.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}


