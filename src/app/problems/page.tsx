"use client";

import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";

import { useState } from "react";
import { ProblemCard } from "@/components/ProblemCard";

const subjects = ["All", "Math", "Physics", "Chemistry", "CS"];
const tiers = ["All", 1, 2, 3, 4, 5];

const problems = [
  { id: "1", title: "Riemann Hypothesis Verification (Partial)", subject: "Math", tier: 5, reward: 0.125, timeLimit: "120m", solveRate: 0.4, status: "open" },
  { id: "2", title: "Quantum Tunneling in Carbon Nanotubes", subject: "Physics", tier: 4, reward: 0.085, timeLimit: "90m", solveRate: 2.1, status: "open" },
  { id: "3", title: "Inorganic Analysis of Lunar Samples", subject: "Chemistry", tier: 3, reward: 0.042, timeLimit: "60m", solveRate: 12.5, status: "open" },
  { id: "4", title: "Optimal Network Routing in Mesh Topology", subject: "CS", tier: 2, reward: 0.024, timeLimit: "45m", solveRate: 45.2, status: "open" },
  { id: "5", title: "Elliptic Curve Factorisation Optimization", subject: "Math", tier: 3, reward: 0.052, timeLimit: "75m", solveRate: 8.4, status: "open" },
  { id: "6", title: "Fast Fourier Transform on Graphs", subject: "CS", tier: 4, reward: 0.096, timeLimit: "120m", solveRate: 1.8, status: "open" },
  { id: "7", title: "Black Hole Information Paradox Formalism", subject: "Physics", tier: 5, reward: 0.150, timeLimit: "180m", solveRate: 0.1, status: "open" },
  { id: "8", title: "Synthesis of Novel Graphene Variants", subject: "Chemistry", tier: 2, reward: 0.032, timeLimit: "60m", solveRate: 24.5, status: "open" },
];

export default function ProblemsPage() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeTier, setActiveTier] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProblems = problems.filter((p) => {
    const subjectMatch = activeSubject === "All" || p.subject === activeSubject;
    const tierMatch = activeTier === "All" || p.tier === Number(activeTier);
    const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return subjectMatch && tierMatch && searchMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">Problem Marketplace</h1>
          <p className="max-w-2xl text-zinc-400">
            Browse the available problem sets. Each successfully solved and verified problem generates POI tokens directly to your wallet.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button className="flex h-[46px] items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm font-bold text-white hover:bg-white/10 transition-all">
            <ArrowDownWideNarrow className="size-4" />
            Reward
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex flex-col gap-8 lg:sticky lg:top-24">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <Filter className="size-3" />
              Domain Filter
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`flex items-center justify-between px-4 py-2 text-sm transition-all rounded-lg ${
                    activeSubject === subject
                      ? "bg-primary text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <SlidersHorizontal className="size-3" />
              Difficulty Tier
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {tiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(String(tier))}
                  className={`flex items-center justify-between px-4 py-2 text-sm transition-all rounded-lg ${
                    activeTier === String(tier)
                      ? "bg-primary text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tier === "All" ? "All Levels" : `Tier ${tier}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} {...(problem as any)} />
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="mt-20 flex flex-col items-center text-center">
              <div className="size-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 mb-6">
                <Search className="size-8 text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold text-white">No results found</h3>
              <p className="mt-2 text-zinc-500">Try adjusting your filters or search query.</p>
              <button
                onClick={() => { setActiveSubject("All"); setActiveTier("All"); setSearchQuery(""); }}
                className="mt-8 text-sm font-bold text-primary hover:underline transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
