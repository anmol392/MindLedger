import Link from "next/link";
import { Brain, Globe, Send, Terminal, Briefcase, Mail } from "lucide-react";



export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
               <Brain className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground uppercase">MindLedger</span>
            </Link>
            <p className="max-w-xs text-center text-sm leading-6 text-muted-foreground md:text-left">
              The world's first Proof-of-Intellect (PoI) platform. Solve, earn, and scale your potential globally.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Send className="size-5" />
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Terminal className="size-5" />
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Briefcase className="size-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-24">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground">Platform</h3>
              <ul className="flex flex-col gap-2">
                <li><Link href="/problems" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Problems</Link></li>
                <li><Link href="/verify" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Verification</Link></li>
                <li><Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-foreground">Resources</h3>
              <ul className="flex flex-col gap-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Whitepaper</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-foreground">Contact</h3>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  support@mindledger.xyz
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MindLedger Protocol. All rights reserved. Built with precision for the global elite.
        </div>
      </div>
    </footer>
  );
}
