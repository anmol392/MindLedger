"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { week: 'WK1', correct: 18, incorrect: 4 },
  { week: 'WK2', correct: 22, incorrect: 6 },
  { week: 'WK3', correct: 15, incorrect: 2 },
  { week: 'WK4', correct: 28, incorrect: 8 },
  { week: 'WK5', correct: 20, incorrect: 5 },
  { week: 'WK6', correct: 25, incorrect: 3 },
  { week: 'WK7', correct: 30, incorrect: 7 },
  { week: 'WK8', correct: 24, incorrect: 4 },
];

export function AccuracyBar() {
  return (
    <div className="bg-[#151B2B] border border-white/5 rounded-2xl p-8 backdrop-blur-xl">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-12">Accuracy Trend (8W)</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
               dataKey="week" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
               cursor={{ fill: 'rgba(255,255,255,0.05)' }}
               contentStyle={{ backgroundColor: '#151B2B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            />
            <Legend 
               verticalAlign="bottom" 
               align="center"
               layout="horizontal"
               iconType="circle"
               formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">{value}</span>}
            />
            <Bar dataKey="correct" fill="#00D4AA" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="incorrect" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
