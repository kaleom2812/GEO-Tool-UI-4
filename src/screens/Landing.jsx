import { motion } from "framer-motion";
import { useFlow } from "../flow.jsx";
import { pillars, meta } from "../data/auditData.js";
import { ArrowRight, Compass, FileText, Search } from "../icons.jsx";
import { Reveal, SectionHeader } from "../ui.jsx";
import { Footer } from "./Chrome.jsx";

const STORY = [
  ["Problem", "Name the visibility gap in the buyer's own words."],
  ["Evidence", "Show the AI answers, citations, and files that prove it."],
  ["Impact", "Translate the gap into sessions and pipeline at risk."],
  ["Recommendation", "State the fix, sequenced by leverage."],
  ["Action", "Hand over a dated 90-day plan with owners."],
];

export default function Landing() {
  const { go } = useFlow();

  return (
    <main>
      {/* Cover */}
      <section className="doc-shell pt-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Deliverable №{meta.auditId}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Generative Engine Optimization, audited like an annual report.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede mt-6 max-w-prose">
            Meridian measures how AI assistants perceive, retrieve, and represent your brand — then
            returns a board-ready deliverable that reads Problem, Evidence, Impact, Recommendation,
            Action.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => go("input")} className="btn-primary">
              Begin an audit <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => go("input")} className="btn-ghost">
              <FileText size={16} /> View sample deliverable
            </button>
          </div>
        </Reveal>

        {/* Specimen: the deliverable cover */}
        <Reveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="mt-14 grid gap-0 overflow-hidden rounded-2xl border border-rule bg-white shadow-lift sm:grid-cols-[1.4fr_1fr]"
          >
            <div className="border-b border-rule p-8 sm:border-b-0 sm:border-r sm:p-10">
              <p className="eyebrow">Confidential — prepared for</p>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">{meta.brand}</p>
              <p className="mt-1 text-sm text-ink-3">{meta.domain} · {meta.industry}</p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-rule pt-6 text-sm">
                <div>
                  <p className="data-fig text-2xl text-ink">{meta.pagesCrawled}</p>
                  <p className="text-2xs uppercase tracking-wide text-ink-3">pages crawled</p>
                </div>
                <div>
                  <p className="data-fig text-2xl text-ink">{meta.aiAnswersAnalyzed}</p>
                  <p className="text-2xs uppercase tracking-wide text-ink-3">AI answers</p>
                </div>
                <div>
                  <p className="data-fig text-2xl text-ink">5</p>
                  <p className="text-2xs uppercase tracking-wide text-ink-3">models probed</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between bg-teal p-8 text-white sm:p-10">
              <div>
                <p className="font-mono text-2xs uppercase tracking-[0.16em] text-white/60">
                  GEO Visibility Score
                </p>
                <p className="data-fig mt-2 text-6xl font-medium leading-none">61</p>
                <p className="mt-1 text-sm text-white/70">Grade C+ · Emerging Visibility</p>
              </div>
              <p className="mt-8 text-sm leading-relaxed text-white/80">
                Structurally sound, commercially invisible. Present in 31% of relevant AI answers
                versus 78% for the category leader.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* What we measure */}
      <section className="doc-shell mt-24">
        <SectionHeader
          number={1}
          kicker="Scope"
          title="Six weighted pillars"
          lede="Each pillar is scored 0–100 and calibrated against a 40-brand benchmark set. The weighted mean is the headline GEO score."
        />
        <ol className="mt-10 divide-y divide-rule border-y border-rule">
          {pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.key}
              delay={i * 0.04}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[3rem_1fr_5rem] sm:items-baseline sm:gap-6"
            >
              <span className="data-fig text-sm text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{p.label}</h3>
                <p className="mt-1 max-w-prose text-sm text-ink-2">{p.headline}</p>
              </div>
              <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3 sm:text-right">
                {Math.round(p.weight * 100)}% weight
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* How it reads */}
      <section className="doc-shell mt-24">
        <SectionHeader
          number={2}
          kicker="Method"
          title="Every finding tells a story"
          lede="The deliverable never dumps metrics. Each section moves from the buyer's problem to a dated action."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-5">
          {STORY.map(([stage, line], i) => (
            <Reveal key={stage} delay={i * 0.06}>
              <div className="h-full bg-white p-5">
                <p className="data-fig text-2xs text-ink-3">0{i + 1}</p>
                <p className="mt-2 font-display text-base font-semibold text-ink">{stage}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="doc-shell mt-24">
        <div className="rounded-2xl border border-rule bg-paper-2 p-8 text-center sm:p-14">
          <Compass size={28} className="mx-auto text-teal" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Audit a domain in about a minute
          </h2>
          <p className="lede mx-auto mt-3 max-w-prose">
            Enter a URL and a short brief. We probe five AI models, crawl the site, and assemble the
            deliverable while you watch.
          </p>
          <button type="button" onClick={() => go("input")} className="btn-primary mx-auto mt-7">
            <Search size={16} /> Start the audit
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
