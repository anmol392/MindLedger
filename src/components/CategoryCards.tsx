"use client";

import { motion } from "framer-motion";
import { Calculator, Zap, FlaskConical, Terminal, Code, Atom } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Mathematics",
    description: "Focus on JEE Advanced, INMO geometry, number theory, and advanced calculus.",
    icon: Calculator,
    color: "#7F77DD",
    rewardMultiplier: "1.5x",
    count: 1240,
  },
  {
    name: "Physics",
    description: "Quantum mechanics, electromagnetism, and classical dynamics from IPhO level.",
    icon: Atom,
    color: "#4A90E2",
    rewardMultiplier: "1.2x",
    count: 850,
  },
  {
    name: "Chemistry",
    description: "Organic synthesis, thermodynamics, and inorganic analysis for IChO competitors.",
    icon: FlaskConical,
    color: "#F5A623",
    rewardMultiplier: "1.1x",
    count: 620,
  },
  {
    name: "Computer Science",
    description: "Algorithms, data structures, and competitive programming challenges from IOI.",
    icon: Code,
    color: "#50E3C2",
    rewardMultiplier: "1.3x",
    count: 1540,
  },
];

export function CategoryCards() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Research Domains</h2>
          <p className="max-w-xl text-zinc-400">
            Choose your domain of expertise and start mining POI tokens by solving high-fidelity academic problems.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 transition-colors hover:bg-white/10"
            >
              <div
                className="absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-10"
                style={{ background: `radial-gradient(circle at 100% 0%, ${category.color} 0%, transparent 70%)` }}
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-colors group-hover:border-white/20">
                  <category.icon className="size-6 text-white" />
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-white">{category.name}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">{category.description}</p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest">{category.rewardMultiplier} Reward</span>
                  <span className="text-xs font-mono text-zinc-500 uppercase">{category.count} Problems</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
