import { useId, useState } from "react";
import { motion } from "framer-motion";
import { useInView, useReducedMotion } from "./lib/hooks.js";

/* Editorial chart kit — thin strokes, tabular figures, one accent (teal).
   Every chart carries a text alternative; interactive marks are focusable. */

const INK = "#14181B";
const RULE = "#E4E0D7";
const TEAL = "#0F5257";
const CLARET = "#8A3A3A";
const SAGE = "#3F6B52";
const AMBER = "#9A6B1E";

export const chartInk = INK;
export const chartTeal = TEAL;

function Figure({ title, desc, children, className = "" }) {
  return (
    <figure className={className} role="group" aria-label={title}>
      {children}
      {desc ? <figcaption className="sr-only">{desc}</figcaption> : null}
    </figure>
  );
}

/* ---------------- Arc score ---------------- */
export function ArcScore({ value, max = 100, label = "GEO Score", grade, sub }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView();
  const size = 260;
  const stroke = 14;
  const r = (size - stroke) / 2 - 10;
  const cx = size / 2;
  const cy = size / 2 + 6;
  const startAngle = 225; // bottom-left
  const sweep = 270; // clockwise, gap at the bottom
  const frac = Math.max(0, Math.min(1, value / max));

  // 0deg = top, angle increases clockwise on screen
  const polar = (angleDeg, radius = r) => {
    const a = (angleDeg * Math.PI) / 180;
    return [cx + radius * Math.sin(a), cy - radius * Math.cos(a)];
  };
  const arcPath = (frac0) => {
    const [x0, y0] = polar(startAngle);
    const end = startAngle + sweep * frac0;
    const [x1, y1] = polar(end);
    const large = sweep * frac0 > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  const ticks = Array.from({ length: 11 }, (_, i) => i);

  return (
    <Figure
      title={`${label}: ${value} out of ${max}, grade ${grade}`}
      desc={`${label} is ${value} of ${max}. ${sub || ""}`}
    >
      <div ref={ref} className="relative mx-auto" style={{ maxWidth: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full" aria-hidden="true">
          <path d={arcPath(1)} fill="none" stroke={RULE} strokeWidth={stroke} strokeLinecap="round" />
          {ticks.map((t) => {
            const ang = startAngle + (sweep * t) / 10;
            const [xa, ya] = polar(ang, r - stroke / 2 - 4);
            const [xb, yb] = polar(ang, r - stroke / 2 - 11);
            return <line key={t} x1={xa} y1={ya} x2={xb} y2={yb} stroke={INK} strokeOpacity={0.25} strokeWidth={1} />;
          })}
          <motion.path
            d={arcPath(frac)}
            fill="none"
            stroke={TEAL}
            strokeWidth={stroke}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            initial={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
            animate={{ strokeDashoffset: inView || reduced ? 0 : 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-6 text-center">
          <span className="data-fig text-5xl font-medium leading-none text-ink sm:text-6xl">
            {inView || reduced ? value : 0}
          </span>
          <span className="mt-1 font-mono text-2xs uppercase tracking-[0.16em] text-ink-3">
            / {max} &middot; grade {grade}
          </span>
        </div>
      </div>
    </Figure>
  );
}

/* ---------------- Track bar ---------------- */
export function TrackBar({ value, previous, max = 100, accent = TEAL, height = 8 }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const w = Math.max(0, Math.min(1, value / max)) * 100;
  const prevW = previous != null ? Math.max(0, Math.min(1, previous / max)) * 100 : null;
  return (
    <div ref={ref} className="relative w-full rounded-full bg-paper-2" style={{ height }}>
      {prevW != null && (
        <div
          className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-ink/40"
          style={{ left: `${prevW}%` }}
          aria-hidden="true"
        />
      )}
      <motion.div
        className="h-full rounded-full"
        style={{ background: accent }}
        initial={reduced ? false : { width: 0 }}
        animate={{ width: inView || reduced ? `${w}%` : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ---------------- Line trend ---------------- */
export function LineTrend({ series, height = 210, yMax = 100, yTicks = [0, 25, 50, 75, 100], unit = "" }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(null);
  const w = 640;
  const padL = 34;
  const padR = 14;
  const padT = 12;
  const padB = 26;
  const xs = series[0].points.map((p) => p.x);
  const X = (i) => padL + (i / (xs.length - 1)) * (w - padL - padR);
  const Y = (v) => padT + (1 - v / yMax) * (height - padT - padB);
  const line = (pts) => pts.map((p, i) => `${i ? "L" : "M"} ${X(i)} ${Y(p.y)}`).join(" ");

  return (
    <Figure
      title="Trend chart"
      desc={series
        .map((s) => `${s.name}: ${s.points.map((p) => `${p.x} ${p.y}${unit}`).join(", ")}`)
        .join(". ")}
    >
      <div ref={ref}>
        <svg
          viewBox={`0 0 ${w} ${height}`}
          className="w-full"
          onMouseLeave={() => setHover(null)}
          role="img"
        >
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={w - padR} y1={Y(t)} y2={Y(t)} stroke={RULE} strokeWidth={1} />
              <text x={padL - 8} y={Y(t) + 3} textAnchor="end" className="fill-ink-3" style={{ font: "500 10px 'IBM Plex Mono', monospace" }}>
                {t}
              </text>
            </g>
          ))}
          {xs.map((x, i) => (
            <text key={x} x={X(i)} y={height - 8} textAnchor="middle" className="fill-ink-3" style={{ font: "500 10px 'IBM Plex Mono', monospace" }}>
              {x}
            </text>
          ))}
          {series.map((s, si) => (
            <g key={s.name}>
              {s.area && (
                <path
                  d={`${line(s.points)} L ${X(s.points.length - 1)} ${Y(0)} L ${X(0)} ${Y(0)} Z`}
                  fill={s.accent || TEAL}
                  fillOpacity={0.08}
                />
              )}
              <motion.path
                d={line(s.points)}
                fill="none"
                stroke={s.accent || (si === 0 ? TEAL : INK)}
                strokeWidth={s.dashed ? 1.5 : 2}
                strokeDasharray={s.dashed ? "4 4" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: inView || reduced ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut", delay: si * 0.15 }}
              />
              {s.points.map((p, i) => (
                <circle key={i} cx={X(i)} cy={Y(p.y)} r={2.5} fill={s.accent || (si === 0 ? TEAL : INK)} />
              ))}
            </g>
          ))}
          {xs.map((x, i) => (
            <rect
              key={`h-${x}`}
              x={X(i) - 14}
              y={0}
              width={28}
              height={height}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${x}: ${series.map((s) => `${s.name} ${s.points[i].y}${unit}`).join(", ")}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
            />
          ))}
          {hover != null && (
            <g pointerEvents="none">
              <line x1={X(hover)} x2={X(hover)} y1={padT} y2={height - padB} stroke={INK} strokeOpacity={0.3} strokeDasharray="3 3" />
              {series.map((s) => (
                <circle key={s.name} cx={X(hover)} cy={Y(s.points[hover].y)} r={4} fill="#fff" stroke={s.accent || INK} strokeWidth={2} />
              ))}
            </g>
          )}
        </svg>
        {hover != null && (
          <p className="mt-1 text-center font-mono text-2xs text-ink-2">
            {xs[hover]} —{" "}
            {series.map((s, i) => (
              <span key={s.name}>
                {i ? " · " : ""}
                {s.name} <strong className="text-ink">{series[i].points[hover].y}{unit}</strong>
              </span>
            ))}
          </p>
        )}
      </div>
    </Figure>
  );
}

/* ---------------- Bar list (horizontal) ---------------- */
export function BarList({ items, max, unit = "%", accent = TEAL, valueFmt }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const top = max ?? Math.max(...items.map((d) => d.value));
  return (
    <Figure title="Comparison" desc={items.map((d) => `${d.name}: ${valueFmt ? valueFmt(d.value) : d.value + unit}`).join(", ")}>
      <ul ref={ref} className="flex flex-col gap-3">
        {items.map((d, i) => (
          <li key={d.name} className="grid grid-cols-[9rem_1fr_3rem] items-center gap-3 sm:grid-cols-[11rem_1fr_3.5rem]">
            <span className={`truncate text-sm ${d.self ? "font-semibold text-ink" : "text-ink-2"}`}>
              {d.self && <span aria-hidden="true" className="mr-1 text-teal">▸</span>}
              {d.name}
            </span>
            <span className="relative block h-3 rounded-full bg-paper-2">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: d.self ? INK : accent, opacity: d.self ? 1 : 0.55 }}
                initial={reduced ? false : { width: 0 }}
                animate={{ width: inView || reduced ? `${(d.value / top) * 100}%` : 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              />
            </span>
            <span className="data-fig text-right text-sm text-ink">
              {valueFmt ? valueFmt(d.value) : `${d.value}${unit}`}
            </span>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

/* ---------------- Donut ---------------- */
export function Donut({ items, unit = "%", centerLabel }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(null);
  const gid = useId();
  const size = 210;
  const stroke = 26;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;
  const total = items.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const palette = [INK, TEAL, "#3F6B52", "#9A6B1E", "#8A3A3A", "#6B7178", "#B9B2A1"];

  return (
    <Figure
      title="Share of voice"
      desc={items.map((d) => `${d.name}: ${((d.value / total) * 100).toFixed(0)}${unit}`).join(", ")}
      className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8"
    >
      <div ref={ref} className="relative shrink-0" style={{ width: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full -rotate-90">
          <defs>
            <pattern id={`${gid}-stripe`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill={TEAL} />
              <line x1="0" y1="0" x2="0" y2="6" stroke="#fff" strokeWidth="2.5" />
            </pattern>
          </defs>
          {items.map((d, i) => {
            const frac = d.value / total;
            const dash = frac * c;
            const el = (
              <motion.circle
                key={d.name}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.self ? `url(#${gid}-stripe)` : palette[i % palette.length]}
                strokeWidth={active === i ? stroke + 4 : stroke}
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offset}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: inView || reduced ? 1 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{ transition: "stroke-width 0.2s" }}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="data-fig text-2xl font-medium text-ink">
            {active != null ? `${((items[active].value / total) * 100).toFixed(0)}%` : centerLabel?.value}
          </span>
          <span className="max-w-[7rem] font-mono text-[0.6rem] uppercase leading-tight tracking-wide text-ink-3">
            {active != null ? items[active].name : centerLabel?.label}
          </span>
        </div>
      </div>
      <ul className="grid w-full grid-cols-1 gap-1.5 text-sm">
        {items.map((d, i) => (
          <li key={d.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="flex w-full items-center gap-2.5 rounded px-1.5 py-1 text-left hover:bg-paper-2 focus-visible:bg-paper-2"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ background: d.self ? TEAL : palette[i % palette.length], outline: d.self ? "1px solid #14181B" : "none" }}
              />
              <span className={`flex-1 ${d.self ? "font-semibold text-ink" : "text-ink-2"}`}>{d.name}</span>
              <span className="data-fig text-ink">{((d.value / total) * 100).toFixed(0)}{unit}</span>
            </button>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

/* ---------------- Radar ---------------- */
export function Radar({ axes, series, size = 300 }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 54;
  const n = axes.length;
  const pt = (i, frac) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * frac * Math.cos(a), cy + r * frac * Math.sin(a)];
  };
  const poly = (vals) => vals.map((v, i) => pt(i, v).join(",")).join(" ");

  return (
    <Figure
      title="Pillar radar"
      desc={series.map((s) => `${s.name}: ${axes.map((a, i) => `${a} ${Math.round(s.values[i] * 100)}`).join(", ")}`).join(". ")}
    >
      <div ref={ref}>
        <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[320px]">
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <polygon key={g} points={poly(axes.map(() => g))} fill="none" stroke={RULE} strokeWidth={1} />
          ))}
          {axes.map((a, i) => {
            const [x, y] = pt(i, 1);
            const [lx, ly] = pt(i, 1.22);
            return (
              <g key={a}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke={RULE} strokeWidth={1} />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={Math.abs(lx - cx) < 6 ? "middle" : lx > cx ? "start" : "end"}
                  dominantBaseline="middle"
                  className="fill-ink-2"
                  style={{ font: "500 10px 'Inter', sans-serif" }}
                >
                  {a}
                </text>
              </g>
            );
          })}
          {series.map((s, si) => (
            <motion.polygon
              key={s.name}
              points={poly(s.values)}
              fill={s.accent || TEAL}
              fillOpacity={si === 0 ? 0.14 : 0.06}
              stroke={s.accent || (si === 0 ? TEAL : INK)}
              strokeWidth={2}
              strokeDasharray={si === 0 ? undefined : "4 3"}
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: inView || reduced ? 1 : 0, scale: inView || reduced ? 1 : 0.85 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: si * 0.15 }}
              style={{ transformOrigin: "center" }}
            />
          ))}
        </svg>
      </div>
    </Figure>
  );
}

/* ---------------- Quadrant (impact / effort) ---------------- */
export function Quadrant({ items }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);
  const size = 420;
  const pad = 44;
  const X = (v) => pad + ((v - 0.5) / 5) * (size - pad * 1.2);
  const Y = (v) => size - pad - ((v - 0.5) / 5) * (size - pad * 1.4);

  return (
    <Figure
      title="Impact versus effort"
      desc={items.map((d) => `${d.title}: impact ${d.impact} of 5, effort ${d.effort} of 5`).join(". ")}
    >
      <div ref={ref} className="relative">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full">
          <line x1={pad} y1={size - pad} x2={size - pad * 0.3} y2={size - pad} stroke={INK} strokeWidth={1} />
          <line x1={pad} y1={pad * 0.4} x2={pad} y2={size - pad} stroke={INK} strokeWidth={1} />
          <line x1={X(3)} y1={pad * 0.4} x2={X(3)} y2={size - pad} stroke={RULE} strokeDasharray="4 4" strokeWidth={1} />
          <line x1={pad} y1={Y(3)} x2={size - pad * 0.3} y2={Y(3)} stroke={RULE} strokeDasharray="4 4" strokeWidth={1} />
          <text x={pad + 6} y={pad * 0.4 + 4} className="fill-ink-3" style={{ font: "500 10px 'IBM Plex Mono', monospace" }}>HIGH IMPACT</text>
          <text x={pad + 6} y={size - pad - 6} className="fill-ink-3" style={{ font: "500 10px 'IBM Plex Mono', monospace" }}>LOW IMPACT</text>
          <text x={size - pad * 0.3} y={size - pad + 16} textAnchor="end" className="fill-ink-3" style={{ font: "500 10px 'IBM Plex Mono', monospace" }}>HIGH EFFORT →</text>
          <text x={X(1.4)} y={Y(4.6)} className="fill-teal" style={{ font: "600 11px 'Inter', sans-serif" }}>Quick wins</text>
          <text x={X(3.4)} y={Y(4.6)} className="fill-ink-3" style={{ font: "600 11px 'Inter', sans-serif" }}>Major projects</text>
          {items.map((d, i) => {
            const jitter = ((i % 3) - 1) * 5;
            return (
              <motion.g
                key={d.id}
                initial={inView ? { opacity: 0, scale: 0 } : false}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
                transition={{ delay: 0.05 * i, type: "spring", stiffness: 200, damping: 18 }}
              >
                <circle
                  cx={X(d.effort) + jitter}
                  cy={Y(d.impact) + jitter}
                  r={active === d.id ? 11 : 8}
                  fill={d.type === "Quick win" ? TEAL : INK}
                  fillOpacity={active === d.id ? 1 : 0.82}
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.title}. Impact ${d.impact} of 5, effort ${d.effort} of 5.`}
                  onMouseEnter={() => setActive(d.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(d.id)}
                  onBlur={() => setActive(null)}
                  style={{ cursor: "pointer", transition: "r 0.15s" }}
                />
                <text x={X(d.effort) + jitter} y={Y(d.impact) + jitter + 3} textAnchor="middle" className="fill-white" style={{ font: "600 9px 'IBM Plex Mono', monospace", pointerEvents: "none" }}>
                  {d.id}
                </text>
              </motion.g>
            );
          })}
        </svg>
        {active != null && (
          <div className="mt-2 rounded-lg border border-rule bg-white p-3 text-sm shadow-card">
            <span className="data-fig mr-2 text-ink-3">#{active}</span>
            {items.find((d) => d.id === active)?.title}
          </div>
        )}
      </div>
    </Figure>
  );
}

/* ---------------- Dot matrix ---------------- */
export function DotMatrix({ groups, columns = 12 }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const dots = [];
  const toneColor = { good: SAGE, warn: AMBER, bad: CLARET };
  groups.forEach((g) => {
    for (let i = 0; i < g.count; i++) dots.push({ tone: g.tone, label: g.label });
  });
  return (
    <Figure title="Answerability" desc={groups.map((g) => `${g.label}: ${g.count}`).join(", ")}>
      <div ref={ref} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, maxWidth: 300 }}>
        {dots.map((d, i) => (
          <motion.span
            key={i}
            className="aspect-square rounded-[3px]"
            style={{ background: toneColor[d.tone] }}
            initial={reduced ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: inView || reduced ? 1 : 0, scale: inView || reduced ? 1 : 0.4 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.012, 0.6) }}
            aria-hidden="true"
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {groups.map((g) => (
          <li key={g.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[2px]" style={{ background: toneColor[g.tone] }} />
            <span className="text-ink-2">
              {g.label} <span className="data-fig text-ink">{g.count}</span>
            </span>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

/* ---------------- Bullet (from -> to) ---------------- */
export function Bullet({ label, from, to, max = 100, unit = "" }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const parse = (v) => (typeof v === "string" ? parseFloat(v) : v);
  const f = parse(from);
  const t = parse(to);
  return (
    <div ref={ref} className="text-sm">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-ink-2">{label}</span>
        <span className="data-fig text-ink">
          {from} <span className="text-ink-3">→</span> {to}
        </span>
      </div>
      <div className="relative h-2.5 rounded-full bg-paper-2">
        <div className="absolute inset-y-0 left-0 rounded-full bg-ink/25" style={{ width: `${(f / max) * 100}%` }} />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-teal"
          initial={reduced ? false : { width: `${(f / max) * 100}%` }}
          animate={{ width: inView || reduced ? `${(t / max) * 100}%` : `${(f / max) * 100}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
