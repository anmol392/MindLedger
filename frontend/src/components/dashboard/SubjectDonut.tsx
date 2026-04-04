"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Mathematics', value: 45, color: '#059669' },
  { name: 'Physics', value: 32, color: '#F59E0B' },
  { name: 'Chemistry', value: 18, color: '#10B981' },
  { name: 'Comp. Science', value: 50, color: '#4F46E5' },
];

export function SubjectDonut() {
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-soft">
      <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest pl-1 mb-8">Subject Distribution</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
               contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', boxShadow: '0 8px 30px rgb(0,0,0,0.04)' }}
            />
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
               verticalAlign="bottom" 
               align="center"
               layout="horizontal"
               iconType="circle"
               formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 flex flex-col gap-3">
         {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between px-3 py-2 bg-muted rounded-xl">
               <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-[#0F172A]">{item.name}</span>
               </div>
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.value} Solved</span>
            </div>
         ))}
      </div>
    </div>
  );
}
