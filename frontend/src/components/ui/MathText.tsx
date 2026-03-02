"use client";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
  text: string;
  className?: string;
}

export default function MathText({ text, className }: MathTextProps) {
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1);
          return (
            <InlineMath
              key={i}
              math={math}
              renderError={(error) => (
                <span className="text-danger text-xs">{part}</span>
              )}
            />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
