import { Users, FileText, ChevronRight, Lock, Unlock } from "lucide-react";
import Link from "next/link";

interface PaperCardProps {
  id: string;
  title: string;
  abstract: string;
  authors: { name: string; avatar: string }[];
  subject: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED';
  mntPool: string;
  contributorsCount: number;
}

export function PaperCard({ id, title, abstract, authors, subject, status, mntPool, contributorsCount }: PaperCardProps) {
  return (
    <div className="bg-[#151B2B] border border-white/5 rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 overflow-hidden relative group hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 hover:border-white/10">
      <div className="flex items-start justify-between mb-8">
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status === 'PUBLISHED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : status === 'IN_REVIEW' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                  {status}
               </span>
               <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">{subject}</span>
            </div>
            <h3 className="text-xl font-black text-white hover:text-teal-400 transition-colors uppercase tracking-tight mt-4">{title}</h3>
         </div>
         <div className="flex -space-x-3 group-hover:translate-x-2 transition-transform">
            {authors.map((a, i) => (
               <div key={i} className="size-10 rounded-full border-2 border-[#151B2B] bg-muted-foreground/20 flex items-center justify-center text-xs font-black text-white shadow-xl shadow-black/40">
                  {a.avatar}
               </div>
            ))}
         </div>
      </div>

      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed line-clamp-2 mb-10 opacity-70 italic">
        "{abstract}"
      </p>

      <div className="grid grid-cols-2 gap-4 mb-10">
         <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Rewards Generated</span>
            <span className="text-sm font-black text-amber-500 uppercase tracking-widest tabular-nums">{mntPool} MNT</span>
         </div>
         <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Co-Author Pool</span>
            <span className="text-sm font-black text-white uppercase tracking-widest uppercase">{contributorsCount} Authors Active</span>
         </div>
      </div>

      <div className="flex items-center gap-4">
         <Link 
            href={`/papers/${id}`}
            className="flex-1 h-14 rounded-2xl bg-[#00D4AA] text-[#0A0F1E] text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
         >
            {status === 'PUBLISHED' ? 'Open Manuscript' : 'Join Co-Authoring'}
            <ChevronRight className="size-4 stroke-[3px]" />
         </Link>
         <button className="size-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white transition-all">
            {status === 'PUBLISHED' ? <Unlock className="size-5" /> : <Lock className="size-5" />}
         </button>
      </div>
      
      <div className={`absolute -right-12 -bottom-12 size-48 blur-3xl opacity-5 rounded-full ${status === 'PUBLISHED' ? 'bg-green-500' : 'bg-[#00D4AA]'}`} />
    </div>
  );
}
