"use client";

import { motion } from "framer-motion";
import { Trophy, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

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
            <h2 className="text-3xl font-bold text-white tracking-tighter uppercase sm:text-4xl">Global Elites</h2>
            <p className="max-w-xl text-zinc-400">
              Track the top-performing solvers across all domains this week. Earn rewards based on your rank.
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="flex items-center gap-1 text-sm font-bold text-zinc-500 hover:text-white transition-colors"
          >
            Full Leaderboard
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Rank</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Solver</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-zinc-500">POI Tokens</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Solved</th>
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leaders.map((leader, index) => (
                  <motion.tr
                    key={leader.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-white/5 transition-all cursor-default"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3 font-mono font-bold text-white">
                        {index < 3 ? (
                          <div className={cn(
                            "flex size-6 items-center justify-center rounded-full text-[10px]",
                            index === 0 ? "bg-yellow-500/20 text-yellow-500" :
                            index === 1 ? "bg-zinc-400/20 text-zinc-400" :
                            "bg-orange-500/20 text-orange-500"
                          )}>
                            <Trophy className="size-3" />
                          </div>
                        ) : (
                          <span className="text-zinc-600">0{leader.rank}</span>
                        )}
                        {leader.rank}
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-white group-hover:text-primary transition-colors">
                      {leader.name}
                    </td>
                    <td className="px-8 py-6 font-mono font-bold text-white">
                      {leader.tokens.toFixed(4)} <span className="text-[10px] text-zinc-500">POI</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Star className="size-3 text-primary" />
                        <span className="text-sm text-zinc-400">{leader.problems}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right text-xl">
                      {leader.country}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
