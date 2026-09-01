import { useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "../flow.jsx";
import { meta } from "../data/auditData.js";
import { Check, Lock, ArrowRight, Alert } from "../icons.jsx";
import { Reveal } from "../ui.jsx";
import { Footer } from "./Chrome.jsx";

const PLANS = [
  { id: "single", name: "Single audit", price: 149, cadence: "one-time", blurb: "This deliverable for one domain, exportable to PDF." },
  { id: "quarterly", name: "Quarterly tracking", price: 399, cadence: "per quarter", blurb: "Re-audit every 30 days, trend lines, alerting.", popular: true },
  { id: "agency", name: "Agency", price: 1200, cadence: "per month", blurb: "Up to 25 domains, white-label export, API." },
];

export default function Payment() {
  const { go } = useFlow();
  const [plan, setPlan] = useState("single");
  const [status, setStatus] = useState("idle");
  const [card, setCard] = useState({
    name: "Sample Buyer",
    number: "4242 4242 4242 4242",
    exp: "12 / 29",
    cvc: "123",
  });
  const selected = PLANS.find((p) => p.id === plan);

  const submit = (e) => {
    e.preventDefault();
    setStatus("processing");
    setTimeout(() => {
      setStatus("done");
      setTimeout(() => go("access"), 700);
    }, 1400);
  };

  return (
    <main className="doc-shell pt-10 sm:pt-14">
      <p className="eyebrow">Step · Access</p>
      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Unlock the {meta.brand} deliverable
      </h1>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber/30 bg-amber/5 p-3 text-sm text-amber">
        <Alert size={16} />
        Demonstration checkout. No payment is processed and nothing is transmitted — the form is
        pre-filled; submit to continue.
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Plans */}
        <Reveal>
          <fieldset>
            <legend className="eyebrow mb-4">Choose a plan</legend>
            <div className="space-y-3">
              {PLANS.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    plan === p.id ? "border-teal bg-teal/5" : "border-rule-2 hover:border-ink-3"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={plan === p.id}
                    onChange={() => setPlan(p.id)}
                    className="mt-1 h-4 w-4 accent-teal"
                  />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-ink">
                        {p.name}
                        {p.popular && (
                          <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-2xs font-medium uppercase tracking-wide text-paper">
                            Popular
                          </span>
                        )}
                      </span>
                      <span className="data-fig text-sm text-ink">
                        ${p.price}
                        <span className="text-ink-3"> / {p.cadence}</span>
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-ink-2">{p.blurb}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-paper-2 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-2">{selected.name}</span>
                <span className="data-fig text-ink">${selected.price}.00</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-ink-3">
                <span>Tax (demo)</span>
                <span className="data-fig">$0.00</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 font-semibold text-ink">
                <span>Total</span>
                <span className="data-fig">${selected.price}.00</span>
              </div>
            </div>
          </fieldset>
        </Reveal>

        {/* Card form */}
        <Reveal delay={0.08}>
          <form onSubmit={submit} className="card p-6 sm:p-7">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Lock size={15} className="text-teal" /> Payment details
            </p>
            <div className="mt-5 space-y-4">
              {[
                { k: "name", label: "Name on card", type: "text", auto: "cc-name" },
                { k: "number", label: "Card number", type: "text", auto: "cc-number", mono: true },
              ].map((f) => (
                <div key={f.k}>
                  <label htmlFor={f.k} className="mb-1.5 block text-sm font-medium text-ink">
                    {f.label}
                  </label>
                  <input
                    id={f.k}
                    autoComplete={f.auto}
                    value={card[f.k]}
                    onChange={(e) => setCard((c) => ({ ...c, [f.k]: e.target.value }))}
                    className={`w-full rounded-lg border border-rule-2 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:bg-white ${
                      f.mono ? "data-fig" : ""
                    }`}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="exp" className="mb-1.5 block text-sm font-medium text-ink">
                    Expiry
                  </label>
                  <input
                    id="exp"
                    autoComplete="cc-exp"
                    value={card.exp}
                    onChange={(e) => setCard((c) => ({ ...c, exp: e.target.value }))}
                    className="data-fig w-full rounded-lg border border-rule-2 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="mb-1.5 block text-sm font-medium text-ink">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    autoComplete="cc-csc"
                    value={card.cvc}
                    onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value }))}
                    className="data-fig w-full rounded-lg border border-rule-2 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 text-2xs text-ink-3">
              These fields are inert. Nothing is sent, stored, or charged.
            </p>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="btn-primary mt-6 w-full disabled:opacity-60"
            >
              {status === "idle" && (
                <>
                  Pay ${selected.price} &amp; unlock <ArrowRight size={16} />
                </>
              )}
              {status === "processing" && (
                <>
                  <motion.span
                    className="h-3.5 w-3.5 rounded-full border-2 border-paper/40 border-t-paper"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  Processing…
                </>
              )}
              {status === "done" && (
                <>
                  <Check size={16} /> Payment confirmed
                </>
              )}
            </button>
            <p role="status" aria-live="polite" className="sr-only">
              {status === "processing" ? "Processing payment" : status === "done" ? "Payment confirmed" : ""}
            </p>
          </form>
        </Reveal>
      </div>

      <Footer />
    </main>
  );
}
