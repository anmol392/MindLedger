"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

interface LaTeXRendererProps {
  content: string;
  block?: boolean;
}

/**
 * MindLedger LaTeX Problem Renderer
 * Automatically detects $...$ for inline and $$...$$ for block math
 * if passed as single string, or just renders the whole block if 'block' is true.
 */
export function LaTeXRenderer({ content, block = false }: LaTeXRendererProps) {
  if (block) {
    return <BlockMath math={content} />;
  }

  // Handle mixed text and math: "Solve $x^2 + y^2 = r^2$"
  const parts = content.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g);

  return (
    <div className="math-display">
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}
