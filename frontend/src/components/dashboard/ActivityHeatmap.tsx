"use client";

import { useMemo } from "react";

const weeks = 52;
const days = 7;

export function ActivityHeatmap() {
  const dataset = useMemo(() => {
    return Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5));
  }, []);

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-slate-100';
      case 1: return 'bg-emerald-100';
      case 2: return 'bg-emerald-300';
      case 3: return 'bg-emerald-500';
      case 4: return 'bg-emerald-600';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-soft">
      <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest pl-1 mb-12">Cognitive Effort Heatmap</h3>
      <div className="flex gap-1 overflow-x-auto pb-4 no-scrollbar">
        {Array.from({ length: weeks }).map((_, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, dIndex) => {
              const intensity = dataset[wIndex * days + dIndex];
              return (
                <div 
                  key={dIndex} 
                  className={`size-3 rounded shadow-sm transition-all hover:scale-125 hover:z-10 cursor-pointer ${getIntensityColor(intensity)}`}
                  title={`${intensity} problems solved`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1"><div className="size-2 rounded bg-slate-100" /> Less</div>
            <div className="flex items-center gap-1"><div className="size-2 rounded bg-emerald-600" /> More</div>
         </div>
         <span className="text-[#0F172A]">2,450 Problems Total Solved</span>
      </div>
    </div>
  );
}
