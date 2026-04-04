import { Hero } from "@/components/Hero";
import { CategoryCards } from "@/components/CategoryCards";
import { HowItWorks } from "@/components/HowItWorks";
import { LeaderboardPreview } from "@/components/LeaderboardPreview";
import { Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-24">
      <Hero />
      <HowItWorks />
      <CategoryCards />
      <LeaderboardPreview />
      
      {/* Call to Action Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-zinc-900 via-primary/20 to-zinc-950 px-8 py-24 text-center shadow-2xl md:px-16 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_20%,rgba(127,119,221,0.15)_0%,transparent_60%)]" />
            <div className="absolute top-0 right-0 z-0 opacity-10 blur-3xl">
              <Brain className="size-96" />
            </div>
            
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
                Ready to monetize your intelligence?
              </h2>
              <p className="mt-6 text-lg text-white/80">
                Join thousands of students globally who are earning while learning. No permissions required. Start your first problem today.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <Link
                  href="/problems"
                  className="flex h-14 items-center justify-center rounded-2xl bg-white px-10 text-lg font-bold text-primary transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  Get Started Now
                </Link>
                <Link
                  href="/marketplace"
                  className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all"
                >
                  Explore Marketplace
                  <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
