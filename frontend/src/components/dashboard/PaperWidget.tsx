import { Clock, Users, ChevronRight } from "lucide-react";

const papers = [
  { 
    title: "Novel Anti-Plagiarism in LLMs", 
    role: "Co-Author", 
    weight: 15, 
    status: "IN_REVIEW", 
    lastEdited: "2h ago",
    contributors: 4
  },
  { 
    title: "Quantum Tunneling in Carbon Nanotubes", 
    role: "Reviewer", 
    weight: 35, 
    status: "DRAFT", 
    lastEdited: "12h ago",
    contributors: 3
  },
  { 
    title: "Fast Poisson Solvers for GPU Clusters", 
    role: "Contributor", 
    weight: 12, 
    status: "PUBLISHED", 
    lastEdited: "2d ago",
    contributors: 5
  },
];

export function PaperWidget() {
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-soft">
      <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest pl-1 mb-12">Active Peer-Minting Work</h3>
      <div className="space-y-6">
        {papers.map((paper) => (
          <div key={paper.title} className="group p-5 bg-muted border border-black/5 rounded-2xl transition-all hover:border-primary/10 hover:bg-white cursor-pointer hover:shadow-xl">
            <div className="flex items-start justify-between mb-8">
               <div className="flex flex-col gap-2">
                  <h4 className="font-black text-[#0F172A] group-hover:text-primary transition-colors">{paper.title}</h4>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{paper.role}</span>
                     <div className="size-1 rounded-full bg-muted-foreground/30" />
                     <span className={`text-[10px] font-black uppercase tracking-widest ${paper.status === 'PUBLISHED' ? 'text-green-600' : paper.status === 'IN_REVIEW' ? 'text-amber-600' : 'text-blue-600'}`}>{paper.status}</span>
                  </div>
               </div>
               <div className="flex -space-x-2">
                  {Array.from({ length: paper.contributors }).map((_, i) => (
                     <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black text-[#0F172A]">
                        {String.fromCharCode(65 + i)}
                     </div>
                  ))}
               </div>
            </div>
                        <div className="flex flex-col gap-3">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Intellectual Contribution</span>
                  <span className="text-[#0F172A]">{paper.weight}%</span>
               </div>
               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-black/5">
                  <div 
                     className={`h-full rounded-full transition-all duration-1000 ${paper.status === 'PUBLISHED' ? 'bg-green-600' : 'bg-primary'}`} 
                     style={{ width: `${paper.weight}%` }} 
                  />
               </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
               <div className="flex items-center gap-1.5 opacity-50">
                  <Clock className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">{paper.lastEdited}</span>
               </div>
               <button className="flex h-8 items-center justify-center gap-1 rounded-xl bg-white border border-black/5 px-4 text-[10px] font-black text-[#0F172A] transition-all hover:bg-primary/5 hover:border-primary/20 group-hover:scale-105">
                  Open Manuscript <ChevronRight className="size-3" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
