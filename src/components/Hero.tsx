"use client";

import { motion } from "framer-motion";
import { Brain, ArrowRight, Activity, Users, Star } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,119,221,0.1)_0%,transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Activity className="size-3" />
            Live Proof-of-Intellect Network
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:max-w-4xl"
          >
            Mine crypto with your <span className="gradient-text">brain.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400"
          >
            No GPU. No electricity. Just solve. The decentralized academic competition platform where students earn POI tokens by tackling Olympiad-level problems.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/problems"
              className="flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
            >
              Start Mining
              <ArrowRight className="ml-2 size-5" />
            </Link>
            <Link
              href="/verify"
              className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Join Verification Queue
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-8 divide-x divide-white/5 sm:grid-cols-4 sm:gap-0"
          >
            <div className="flex flex-col px-8">
              <span className="text-3xl font-mono font-bold text-white uppercase">14.2M</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Tokens Mined</span>
            </div>
            <div className="flex flex-col px-8">
              <span className="text-3xl font-mono font-bold text-white uppercase">85K+</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Active Miners</span>
            </div>
            <div className="flex flex-col px-8">
              <span className="text-3xl font-mono font-bold text-white uppercase">2.1M</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Problems Solved</span>
            </div>
            <div className="flex flex-col px-8">
              <span className="text-3xl font-mono font-bold text-white uppercase">$POI</span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">Protocol Currency</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
