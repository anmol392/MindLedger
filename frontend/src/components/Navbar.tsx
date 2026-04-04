"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Wallet, Trophy, LayoutDashboard, Search, Menu, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Problems", href: "/problems", icon: Search },
  { name: "Practice", href: "/practice", icon: Brain },
  { name: "Contests", href: "/contests", icon: Trophy },
  { name: "Research", href: "/papers", icon: FileText },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Language", href: "/settings/language", icon: Globe },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Brain className="size-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-[#0F172A] uppercase">MINDLEDGER</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-primary/5"
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
          <button className="hidden rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary md:flex md:items-center md:gap-2">
            <Wallet className="size-4" />
            Connect Wallet
          </button>
          
          <button className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
