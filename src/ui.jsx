import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "./lib/hooks.js";
import { ChevronDown } from "./icons.jsx";

const TONE = {
  good: { text: "text-sage", dot: "bg-sage", ring: "border-sage/30 bg-sage/5" },
  warn: { text: "text-amber", dot: "bg-amber", ring: "border-amber/30 bg-amber/5" },
  bad: { text: "text-claret", dot: "bg-claret", ring: "border-claret/30 bg-claret/5" },
  neutral: { text: "text-ink-2", dot: "bg-ink-3", ring: "border-rule bg-paper-2" },
};

export function Tag({ tone = "neutral", children }) {
  const t = TONE[tone] || TONE.neutral;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-2xs font-medium uppercase tracking-[0.1em] ${t.ring} ${t.text}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
      {children}
    </span>
  );
}

export function Reveal({ children, delay = 0, as = "div", className = "" }) {
  const [ref, inView] = useInView();
  const M = motion[as] || motion.div;
  return (
    <M
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={`min-w-0 ${className}`}
    >
      {children}
    </M>
  );
}

export function SectionHeader({ number, kicker, title, lede, id }) {
  return (
    <header id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-4">
        {number != null && (
          <span className="data-fig shrink-0 text-sm text-ink-3" aria-hidden="true">
            {String(number).padStart(2, "0")}
          </span>
        )}
        <div>
          {kicker && <p className="eyebrow mb-2">{kicker}</p>}
          <h2 className="text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">{title}</h2>
        </div>
      </div>
      {lede && <p className="lede mt-4 max-w-prose pl-0 sm:pl-8">{lede}</p>}
    </header>
  );
}

const STAGE_META = {
  Problem: "text-claret",
  Evidence: "text-ink",
  Impact: "text-amber",
  Recommendation: "text-teal",
  Action: "text-sage",
};

export function StoryArc({ stages, compact = false }) {
  return (
    <ol className={`relative ml-1 border-l border-rule-2 ${compact ? "space-y-4" : "space-y-6"}`}>
      {stages.map((s, i) => (
        <Reveal as="li" key={s.stage} delay={i * 0.06}>
          <li className="relative pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-ink"
            />
            <p className={`eyebrow mb-1 ${STAGE_META[s.stage] || "text-ink-3"}`}>{s.stage}</p>
            <p className={`text-ink-2 ${compact ? "text-sm leading-relaxed" : "text-[0.95rem] leading-relaxed"}`}>
              {s.text}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function Callout({ icon: Icon, title, children, tone = "neutral" }) {
  const t = TONE[tone] || TONE.neutral;
  return (
    <aside className={`rounded-xl border p-4 sm:p-5 ${t.ring}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <span className={`mt-0.5 shrink-0 ${t.text}`}>
            <Icon size={18} />
          </span>
        )}
        <div>
          {title && <p className={`mb-1 text-sm font-semibold ${t.text}`}>{title}</p>}
          <div className="text-sm leading-relaxed text-ink-2">{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function KeyValue({ rows }) {
  return (
    <dl className="divide-y divide-rule">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-[13rem_1fr] sm:gap-4">
          <dt className="text-sm text-ink-3">{r.label}</dt>
          <dd className="text-sm text-ink-2">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DataTable({ columns, rows, caption, dense = false }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        {caption && <caption className="mb-3 text-left text-sm text-ink-3">{caption}</caption>}
        <thead>
          <tr className="border-b border-rule-2">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`whitespace-nowrap px-3 py-2.5 font-mono text-2xs font-medium uppercase tracking-[0.1em] text-ink-3 ${
                  c.align === "right" ? "text-right" : ""
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-rule align-top last:border-0 hover:bg-paper-2/60">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`px-3 ${dense ? "py-2" : "py-3"} ${c.align === "right" ? "text-right" : ""} ${
                    c.mono ? "data-fig text-ink" : "text-ink-2"
                  } ${row.self && c.key === columns[0].key ? "font-semibold text-ink" : ""}`}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Disclose({ summary, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-rule bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink hover:bg-paper-2"
      >
        {summary}
        <span className={`shrink-0 text-ink-3 transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={18} />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="border-t border-rule px-4 py-4 text-sm leading-relaxed text-ink-2">{children}</div>
      </motion.div>
    </div>
  );
}

export function CodeBlock({ code, label }) {
  return (
    <div className="overflow-hidden rounded-lg border border-rule-2 bg-[#1B2124]">
      {label && (
        <div className="border-b border-white/10 px-4 py-2 font-mono text-2xs uppercase tracking-[0.12em] text-white/50">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed text-[#E7E3D8]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
