"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Wallet, Trophy, LayoutDashboard, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Problems", href: "/problems", icon: Search },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Verify", href: "/verify", icon: Brain },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Brain className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">MINDLEDGER</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                    isActive ? "text-white" : "text-zinc-400"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 md:flex md:items-center md:gap-2">
            <Wallet className="size-4" />
            Connect Wallet
          </button>
          
          <button className="flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
