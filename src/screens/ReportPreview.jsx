import { motion } from "framer-motion";
import { useFlow } from "../flow.jsx";
import { meta, score, executiveSummary } from "../data/auditData.js";
import { ArcScore } from "../charts.jsx";
import { REPORT_SECTIONS } from "../report/sections.jsx";
import { Lock, ArrowRight, Check } from "../icons.jsx";
import { Reveal, Tag, StoryArc } from "../ui.jsx";
import { Footer } from "./Chrome.jsx";

const INCLUDED = [
  "All 6 pillar scores with quarter-over-quarter movement",
  "8 verbatim-style AI answers with citation analysis",
  "Competitor share-of-voice scorecard for 6 brands",
  "Per-URL findings for 11 buyer-critical pages",
  "Copy-paste robots.txt, llms.txt and JSON-LD",
  "Impact/effort action center and dated 90-day roadmap",
];

export default function ReportPreview() {
  const { go } = useFlow();
  const teaser = executiveSummary.story.slice(0, 2);

  return (
    <main className="doc-shell pt-10 sm:pt-14">
      <p className="eyebrow">Findings preview · {meta.auditId}</p>
      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {meta.brand} — GEO Visibility Score
      </h1>

      {/* Visible 10% */}
      <div className="mt-8 grid gap-8 rounded-2xl border border-rule bg-white p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,300px)_1fr]">
        <div className="flex flex-col items-center justify-center rounded-xl bg-paper-2 p-6">
          <ArcScore value={score.overall} grade={score.grade} sub={score.tier} />
          <Tag tone="good">+{score.delta} vs last quarter</Tag>
        </div>
        <div>
          <p className="eyebrow mb-3">Executive summary — opening</p>
          <StoryArc stages={teaser} compact />
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-rule pt-5 sm:grid-cols-3">
            {executiveSummary.headlineMetrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <p className="data-fig text-xl text-ink">{m.value}</p>
                <p className="text-2xs uppercase tracking-wide text-ink-3">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locked 90% */}
      <div className="relative mt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none space-y-3 pt-6 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
        >
          {REPORT_SECTIONS.slice(1).map((s, i) => (
            <div key={s.id} className="flex items-center gap-4 rounded-xl border border-rule bg-white p-5 blur-[2px]">
              <span className="data-fig text-sm text-ink-3">{String(i + 2).padStart(2, "0")}</span>
              <span className="font-display text-lg font-semibold text-ink">{s.label}</span>
              <span className="ml-auto h-2 w-24 rounded-full bg-paper-2" />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-24 flex justify-center px-4">
          <Reveal>
            <div className="w-full max-w-lg rounded-2xl border border-rule bg-white p-6 text-center shadow-lift sm:p-8">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
                <Lock size={20} />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">
                90% of this deliverable is locked
              </h2>
              <p className="mt-2 text-sm text-ink-2">
                You&rsquo;re seeing the score and the first two story beats. Unlock the full 14-section
                deliverable for {meta.brand}.
              </p>
              <ul className="mx-auto mt-5 space-y-2 text-left text-sm">
                {INCLUDED.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-ink-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-sage" />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <button type="button" onClick={() => go("payment")} className="btn-primary w-full">
                  Unlock full deliverable — $149 <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go("access")}
                  className="text-sm text-ink-3 underline decoration-rule-2 underline-offset-4 hover:text-ink"
                >
                  
                </button>
              </div>
              <p className="mt-4 text-2xs text-ink-3">
                Demo — no real payment is processed. One-time price, single audit.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </main>
  );
}
