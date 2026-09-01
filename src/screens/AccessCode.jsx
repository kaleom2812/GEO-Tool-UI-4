import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "../flow.jsx";
import { meta } from "../data/auditData.js";
import { Check, ArrowRight, Alert, Lock } from "../icons.jsx";
import { Reveal } from "../ui.jsx";
import { Footer } from "./Chrome.jsx";

export default function AccessCode() {
  const { accessCode, unlock, go } = useFlow();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (value.trim().toUpperCase() === accessCode.toUpperCase()) {
      setError("");
      unlock();
      go("report");
    } else {
      setError("That code doesn't match. Copy the demo code above and try again.");
      inputRef.current?.focus();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="doc-shell flex min-h-[70vh] flex-col justify-center py-16">
      <div className="mx-auto w-full max-w-lg">
        <Reveal>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 text-sage">
            <Check size={20} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Access granted</h1>
          <p className="mt-2 text-sm text-ink-2">
            Payment confirmed for the {meta.brand} deliverable. Your demo access code is below —
            enter it to open the full report. It also unlocks the report on this device next time.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 rounded-xl border border-rule bg-white p-5 shadow-card">
            <p className="eyebrow mb-2">Demo access code</p>
            <div className="flex items-center justify-between gap-3">
              <code className="data-fig text-xl font-medium tracking-[0.12em] text-ink">
                {accessCode}
              </code>
              <button type="button" onClick={copy} className="btn-ghost h-9 px-3 text-sm">
                {copied ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={submit} className="mt-5">
            <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-ink">
              Enter access code
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                ref={inputRef}
                id="code"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={accessCode}
                aria-invalid={!!error}
                aria-describedby={error ? "code-err" : undefined}
                className={`data-fig w-full rounded-lg border bg-paper px-3.5 py-2.5 text-sm uppercase tracking-[0.1em] text-ink outline-none focus:border-teal focus:bg-white ${
                  error ? "border-claret" : "border-rule-2"
                }`}
              />
              <button type="submit" className="btn-primary shrink-0">
                Open report <ArrowRight size={16} />
              </button>
            </div>
            {error && (
              <p id="code-err" role="alert" className="mt-2 flex items-center gap-1.5 text-2xs font-medium text-claret">
                <Alert size={13} /> {error}
              </p>
            )}
            <button
              type="button"
              onClick={() => setValue(accessCode)}
              className="mt-3 text-2xs text-ink-3 underline decoration-rule-2 underline-offset-4 hover:text-ink"
            >
              Fill code for me
            </button>
          </form>
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}
