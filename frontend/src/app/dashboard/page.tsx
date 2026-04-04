import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { SubjectDonut } from "@/components/dashboard/SubjectDonut";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { AccuracyBar } from "@/components/dashboard/AccuracyBar";
import { ContestWidget } from "@/components/dashboard/ContestWidget";
import { PaperWidget } from "@/components/dashboard/PaperWidget";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { BadgeGrid } from "@/components/dashboard/BadgeGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl animate-in fade-in duration-1000 slide-in-from-bottom-4">
        {/* Header */}
        <header className="mb-12 flex flex-col gap-2">
           <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              Cognitive Mining Dashboard
           </div>
           <h1 className="text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl">Student Intellect Analytics</h1>
           <p className="max-w-xl text-muted-foreground font-bold uppercase tracking-widest text-xs">Track your academic mining performance, global standing, and co-authored manuscript progression.</p>
        </header>

        {/* Stats Row */}
        <section className="mb-12">
           <DashboardStats />
        </section>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
           <div className="lg:col-span-2">
              <EarningsChart />
           </div>
           <div className="lg:col-span-1">
              <SubjectDonut />
           </div>
        </div>

        {/* Heatmap Row */}
        <section className="mb-12">
           <ActivityHeatmap />
        </section>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
           <AccuracyBar />
           <ContestWidget />
        </div>

        {/* Final Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-2">
              <PaperWidget />
           </div>
           <div className="lg:col-span-1">
              <ActivityFeed />
           </div>
           <div className="lg:col-span-1">
              <BadgeGrid />
           </div>
        </div>
      </div>
    </div>
  );
}
