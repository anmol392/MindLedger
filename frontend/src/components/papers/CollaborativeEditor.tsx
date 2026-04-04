"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import { Mathematics } from 'tiptap-extension-mathematics';
import { Users, Save, FileCheck, Share2, MessageSquare, Info } from "lucide-react";

export function CollaborativeEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({ limit: 50000 }),
      Mathematics,
    ],
    content: `
      <h2>Abstract</h2>
      <p>This manuscript evaluates the <strong>Proof-of-Intellect</strong> protocol...</p>
      <p>Consider the Riemann Zeta function:</p>
      <p>$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$</p>
      <p>Our contribution focuses on the <em>non-trivial roots</em>...</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none max-w-none min-h-[70vh]',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex-1 flex flex-col bg-[#111624] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
      {/* Editor Toolbar */}
      <div className="h-16 bg-[#151B2B] border-b border-white/5 flex items-center justify-between px-10 shrink-0">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                {['H1', 'H2', 'B', 'I', 'Eq'].map((t) => (
                   <button key={t} className="size-8 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-white/10 hover:text-white transition-all">{t}</button>
                ))}
            </div>
            <div className="h-4 w-px bg-white/5" />
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
               <Users className="size-3 text-teal-400" />
               4 Co-Authors Online
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
               {editor.storage.characterCount.characters()} / 50,000 Characters
            </div>
            <button className="flex items-center gap-2 h-10 px-6 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">
               <Save className="size-3.5" />
               Protocol Draft Saved
            </button>
         </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-12 lg:p-20">
         <div className="mx-auto max-w-4xl">
            <EditorContent editor={editor} />
         </div>
      </div>

      {/* Dynamic Cursor Overlays (Mock) */}
      <div className="absolute top-32 left-32 size-px z-50">
         <div className="absolute top-0 left-0 flex flex-col gap-1 items-start -translate-x-1/2 -translate-y-full">
            <div className="bg-[#00D4AA] text-[#0A0F1E] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 whitespace-nowrap">
               0x34...8f Editing
            </div>
            <div className="w-[1px] h-20 bg-[#00D4AA]" />
         </div>
      </div>
    </div>
  );
}
