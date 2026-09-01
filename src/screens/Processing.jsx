import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "../flow.jsx";
import { useReducedMotion } from "../lib/hooks.js";
import { Check } from "../icons.jsx";

const STAGES = [
  { label: "Expanding prompt set to 60 buyer intents", ms: 900 },
  { label: "Probing GPT-4o, Claude, Perplexity, Gemini, Copilot", ms: 1500, meter: "answers" },
  { label: "Crawling rivetcrm.com — 214 pages, rendered + raw", ms: 1200, meter: "pages" },
  { label: "Diffing JavaScript render against source HTML", ms: 800 },
  { label: "Extracting citations from 300 AI answers", ms: 900 },
  { label: "Resolving entity graph and knowledge panel", ms: 800 },
  { label: "Computing share of voice against 5 competitors", ms: 800 },
  { label: "Scoring six pillars and assembling the deliverable", ms: 900 },
];

export default function Processing() {
  const { go, input } = useFlow();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef([]);

  const total = useMemo(() => STAGES.reduce((s, x) => s + x.ms, 0), []);

  useEffect(() => {
    let acc = 0;
    const factor = reduced ? 0.35 : 1;
    STAGES.forEach((st, i) => {
      acc += st.ms * factor;
      timers.current.push(setTimeout(() => setActive(i + 1), acc));
    });
    timers.current.push(
      setTimeout(() => {
        setDone(true);
        setTimeout(() => go("preview"), reduced ? 300 : 900);
      }, acc + 300)
    );
    return () => timers.current.forEach(clearTimeout);
  }, [go, reduced]);

  const progress = Math.min(100, (active / STAGES.length) * 100);

  return (
    <main className="doc-shell flex min-h-[70vh] flex-col justify-center py-16">
      <p className="eyebrow">Analysis in progress</p>
      <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Auditing {input.brand || "the domain"}
      </h1>
      <p className="mt-3 max-w-prose text-sm text-ink-2">
        Probing five AI models across 900 runs, crawling {input.url || "the site"}, and scoring six
        pillars. This usually takes under a minute.
      </p>

      <div className="mt-10 max-w-2xl">
        <div className="mb-6 h-px w-full bg-rule" role="presentation">
          <motion.div
            className="h-px bg-teal"
            animate={{ width: `${done ? 100 : progress}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        <ol className="space-y-1" aria-label="Audit steps">
          {STAGES.map((st, i) => {
            const state = done || i < active ? "done" : i === active ? "running" : "waiting";
            return (
              <li
                key={st.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  state === "running" ? "bg-paper-2" : ""
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {state === "done" ? (
                    <span className="text-sage">
                      <Check size={16} />
                    </span>
                  ) : state === "running" ? (
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full bg-teal"
                      animate={reduced ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-rule-2" />
                  )}
                </span>
                <span className={state === "waiting" ? "text-ink-3" : "text-ink-2"}>{st.label}</span>
              </li>
            );
          })}
        </ol>

        <p role="status" aria-live="polite" className="sr-only">
          {done
            ? "Analysis complete. Opening findings."
            : `Step ${Math.min(active + 1, STAGES.length)} of ${STAGES.length}: ${
                STAGES[Math.min(active, STAGES.length - 1)].label
              }`}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
          <p className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-3">
            {done ? "Complete" : `~${Math.ceil((total / 1000) * (reduced ? 0.35 : 1))}s`}
          </p>
          <button type="button" onClick={() => go("preview")} className="text-sm text-ink-3 underline decoration-rule-2 underline-offset-4 hover:text-ink">
            Skip to findings
          </button>
        </div>
      </div>
    </main>
  );
}
