"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 30 }, (_, i) => ({
  date: `Apr ${i + 1}`,
  mnt: Math.floor(Math.random() * 50) + 10,
}));

export function EarningsChart() {
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-soft">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest pl-1">MNT Reward Velocity</h3>
        <div className="flex items-center gap-2 p-1 bg-muted rounded-xl border border-black/5">
          {['7D', '30D', '90D', 'All'].map((t) => (
            <button
               key={t}
               className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${t === '30D' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
            >
               {t}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#059669" stopOpacity={0.1} />
                 <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.05)" strokeDasharray="3 3" />
            <XAxis 
               dataKey="date" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
               interval={7}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
               contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', boxShadow: '0 8px 30px rgb(0,0,0,0.04)' }}
               itemStyle={{ color: '#059669', fontSize: 12, fontWeight: 700 }}
               labelStyle={{ color: '#64748B', fontSize: 10, fontWeight: 700, marginBottom: 4 }}
            />
            <Line 
               type="monotone" 
               dataKey="mnt" 
               stroke="#059669" 
               strokeWidth={3} 
               dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#FFFFFF' }} 
               activeDot={{ r: 6, fill: '#059669' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
