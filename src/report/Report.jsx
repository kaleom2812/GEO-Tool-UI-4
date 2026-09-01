import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "../flow.jsx";
import { meta, score, executiveSummary } from "../data/auditData.js";
import { ArcScore } from "../charts.jsx";
import { Tag } from "../ui.jsx";
import { Print, ArrowLeft } from "../icons.jsx";
import { Footer } from "../screens/Chrome.jsx";
import { REPORT_SECTIONS } from "./sections.jsx";

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function Report({ onExitToPreview }) {
  const { restart } = useFlow();
  const ids = useMemo(() => REPORT_SECTIONS.map((s) => s.id), []);
  const active = useScrollSpy(ids);

  return (
    <main id="main">
      {/* Cover */}
      <section className="doc-shell pt-10 sm:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">Confidential deliverable · {meta.auditId}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-ghost h-9 px-4 text-sm"
            >
              <Print size={15} /> Save / print
            </button>
            {onExitToPreview && (
              <button type="button" onClick={onExitToPreview} className="btn-ghost h-9 px-4 text-sm">
                <ArrowLeft size={15} /> Preview
              </button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 grid gap-8 rounded-2xl border border-rule bg-white p-6 shadow-card sm:p-10 lg:grid-cols-[1fr_minmax(0,300px)]"
        >
          <div>
            <p className="eyebrow">Prepared for</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              {meta.brand}
            </h1>
            <p className="mt-1 text-sm text-ink-3">
              {meta.domain} · {meta.industry}
            </p>
            <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-ink-2">
              {executiveSummary.verdict}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-5 text-sm">
              {executiveSummary.headlineMetrics.map((m) => (
                <div key={m.label}>
                  <p className="data-fig text-xl text-ink">{m.value}</p>
                  <p className="text-2xs uppercase tracking-wide text-ink-3">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-paper-2 p-6">
            <ArcScore value={score.overall} grade={score.grade} sub={score.tier} />
            <Tag tone="good">+{score.delta} vs last quarter</Tag>
          </div>
        </motion.div>
      </section>

      {/* Body with sticky TOC */}
      <div className="doc-shell mt-8 lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="eyebrow mb-3">Contents</p>
            <ol className="space-y-1 border-l border-rule">
              {REPORT_SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`-ml-px flex gap-2 border-l-2 py-1.5 pl-3 text-sm transition-colors ${
                      active === s.id
                        ? "border-teal font-medium text-ink"
                        : "border-transparent text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    <span className="data-fig text-2xs">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0">
          {REPORT_SECTIONS.map(({ id, Component }) => (
            <Component key={id} />
          ))}

          <div className="mt-16 rounded-2xl border border-rule bg-paper-2 p-6 text-center sm:p-10">
            <p className="font-display text-xl font-semibold text-ink">End of deliverable</p>
            <p className="mt-2 text-sm text-ink-2">
              {meta.auditId} · Meridian GEO Intelligence · demonstration data
            </p>
            <button type="button" onClick={restart} className="btn-ghost mx-auto mt-5">
              Run another audit
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
