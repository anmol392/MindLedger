"use client";

import { motion } from "framer-motion";
import { Search, Edit3, ShieldCheck, Coins } from "lucide-react";

const steps = [
  {
    title: "Claim Problem",
    description: "Browse the marketplace and claim an unsolved problem that matches your expertise.",
    icon: Search,
  },
  {
    title: "Solve & Submit",
    description: "Use our proctored, integrated LaTeX and Code editors to submit your original solution.",
    icon: Edit3,
  },
  {
    title: "Verification",
    description: "Your solution is verified by a randomly selected pool of peer experts for accuracy.",
    icon: ShieldCheck,
  },
  {
    title: "Earn Tokens",
    description: "Receive POI tokens directly into your wallet. No KYC required for earning.",
    icon: Coins,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-foreground uppercase tracking-tighter sm:text-4xl">Platform Mechanics</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Minting tokens requires intellectual effort. Follow these simple steps to start contributing to the network.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[28px] left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
              )}
              
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-xl shadow-primary/10 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                <step.icon className="size-6 text-primary" />
              </div>
              
              <h3 className="mb-3 text-lg font-bold text-foreground uppercase tracking-tight">{step.title}</h3>
              <p className="text-center text-sm leading-relaxed text-muted-foreground px-4">{step.description}</p>
              
              <div className="mt-6 flex size-8 items-center justify-center rounded-full bg-muted border border-border text-xs font-mono font-bold text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
