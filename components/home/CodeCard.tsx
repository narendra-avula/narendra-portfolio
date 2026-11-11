"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Token = [text: string, cls: string];

const kw = "text-[#c792ea]";
const cls = "text-[#ffcb6b]";
const str = "text-[#c3e88d]";
const fn = "text-[#82aaff]";
const self = "text-[#f78c6c]";
const plain = "text-[#d6deeb]";

const code: Token[][] = [
  [["class ", kw], ["Engineer", cls], [":", plain]],
  [["    name ", plain], ["= ", kw], ['"Narendra Avula"', str]],
  [["    role ", plain], ["= ", kw], ['"Software Engineer III"', str]],
  [["    company ", plain], ["= ", kw], ['"JPMorgan Chase"', str]],
  [["    focus ", plain], ["= ", kw], ["[", plain], ['"Resiliency"', str], [", ", plain], ['"Cloud"', str], [", ", plain], ['"GenAI"', str], ["]", plain]],
  [],
  [["    def ", kw], ["build", fn], ["(", plain], ["self", self], [", idea):", plain]],
  [["        return ", kw], ["ship", fn], ["(", plain], ["reliable", fn], ["(idea))", plain]],
];

// Characters per line (+1 for the newline) and where each line starts
const lineLengths = code.map((line) => line.reduce((m, [t]) => m + t.length, 0) + 1);
const lineStarts = lineLengths.map((_, i) => lineLengths.slice(0, i).reduce((a, b) => a + b, 0));
const totalChars = lineLengths.reduce((a, b) => a + b, 0);

/** Code-editor visual for the hero. Decorative: the same facts appear as text in the hero. */
export default function CodeCard() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const count = reduce ? totalChars : typed;

  useEffect(() => {
    if (reduce) return;
    let id: number | undefined;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setTyped((c) => {
          if (c >= totalChars) {
            window.clearInterval(id);
            return c;
          }
          return c + 1;
        });
      }, 22);
    }, 700);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [reduce]);

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-[#1f2633] bg-[#0b0f17] shadow-2xl shadow-black/20"
    >
      <div className="flex items-center gap-2 border-b border-[#1f2633] bg-[#0f141e] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-[#8a93a3]">engineer.py</span>
      </div>

      <pre className="overflow-hidden px-5 py-5 font-mono text-[13px] leading-6 xl:text-sm xl:leading-7">
        {code.map((line, li) => {
          const offset = count - lineStarts[li];
          const caretHere = offset >= 0 && offset < lineLengths[li] && count < totalChars;
          let left = Math.max(0, offset);
          return (
            <div key={li} className="flex">
              <span className="mr-5 w-4 select-none text-right text-[#3b4252]">{li + 1}</span>
              <span className="whitespace-pre">
                {line.map(([text, color], ti) => {
                  const visible = text.slice(0, Math.max(0, left));
                  const hidden = text.slice(visible.length);
                  left -= text.length;
                  return (
                    <span key={ti} className={color}>
                      {visible}
                      <span className="opacity-0">{hidden}</span>
                    </span>
                  );
                })}
                {caretHere && (
                  <span className="animate-caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-[#82aaff]" />
                )}
              </span>
            </div>
          );
        })}
      </pre>
    </motion.div>
  );
}
