import { useFlow, STEPS } from "../flow.jsx";
import { ArrowLeft } from "../icons.jsx";

const STEP_LABEL = {
  landing: "Overview",
  input: "Audit brief",
  processing: "Analysis",
  preview: "Findings preview",
  payment: "Access",
  access: "Access code",
  report: "Full deliverable",
};

// Primary navigation — maps each destination to the flow steps it represents.
const NAV_ITEMS = [
  { label: "Overview", target: "landing", steps: ["landing"] },
  { label: "Audit brief", target: "input", steps: ["input"] },
  { label: "Findings", target: "preview", steps: ["processing", "preview"] },
];

function PrimaryNav() {
  const { step, go, unlocked } = useFlow();
  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        const active = item.steps.includes(step);
        const dest = item.target === "report" && !unlocked ? "payment" : item.target;
        return (
          <button
            key={item.target}
            type="button"
            onClick={() => go(dest)}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              active ? "bg-paper-2 font-medium text-ink" : "text-ink-2 hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function Wordmark({ small = false }) {
  return (
    <a
      href="#top"
      className="group inline-flex items-baseline gap-2 no-underline"
      aria-label="Meridian — GEO Intelligence, home"
    >
      <span className={`font-display font-semibold tracking-tight text-ink ${small ? "text-base" : "text-lg"}`}>
        Meridian
      </span>
      <span className="hidden font-mono text-2xs uppercase tracking-[0.18em] text-ink-3 sm:inline">
        GEO Intelligence
      </span>
    </a>
  );
}

export function TopBar({ right }) {
  const { step, back, canGoBack } = useFlow();
  const idx = STEPS.indexOf(step);
  return (
    <header id="top" className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="doc-shell flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {canGoBack && step !== "report" && (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm text-ink-2 hover:text-ink"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <Wordmark small />
          <PrimaryNav />
        </div>
        <div className="flex items-center gap-4">
          {right}
          {step !== "landing" && (
            <p className="hidden items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-ink-3 sm:flex">
              <span className="text-ink">{String(idx).padStart(2, "0")}</span>
              <span aria-hidden="true">/</span>
              <span>{String(STEPS.length - 1).padStart(2, "0")}</span>
              <span className="text-ink-2">{STEP_LABEL[step]}</span>
            </p>
          )}
        </div>
      </div>
      {step !== "landing" && (
        <div className="h-px w-full bg-rule">
          <div
            className="h-px bg-teal transition-[width] duration-500"
            style={{ width: `${(idx / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="rule-t mt-24">
      <div className="doc-shell flex flex-col gap-2 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display text-ink-2">Meridian</span> — GEO Intelligence. Demonstration
          interface with mock data.
        </p>
        <p className="font-mono text-2xs uppercase tracking-[0.14em]">
          Not affiliated with any company named herein
        </p>
      </div>
    </footer>
  );
}
