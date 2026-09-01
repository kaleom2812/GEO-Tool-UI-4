import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePersistentUnlock } from "./lib/hooks.js";
import { meta } from "./data/auditData.js";

/**
 * Workflow:
 * landing -> input -> processing -> preview -> payment -> access -> report
 */
export const STEPS = ["landing", "input", "processing", "preview", "payment", "access", "report"];

const DEFAULT_INPUT = {
  url: "https://rivetcrm.com",
  brand: "Rivet CRM",
  industry: "B2B SaaS — CRM",
  competitors: "HubSpot, Salesforce, Pipedrive, Close, Attio",
  market: "United States",
  prompts:
    "best CRM for a small B2B sales team\nRivet CRM vs Pipedrive\naffordable Salesforce alternative\nCRM with native email sequencing",
};

const FlowContext = createContext(null);

function initialStep() {
  if (typeof window === "undefined") return "landing";
  const q = new URLSearchParams(window.location.search).get("step");
  return STEPS.includes(q) ? q : "landing";
}

export function FlowProvider({ children }) {
  const [step, setStep] = useState(initialStep);
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [history, setHistory] = useState(() => {
    const s = initialStep();
    return s === "landing" ? ["landing"] : ["landing", s];
  });
  const { unlocked, unlock, relock } = usePersistentUnlock();

  const go = useCallback((next) => {
    setStep(next);
    setHistory((h) => (h[h.length - 1] === next ? h : [...h, next]));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const back = useCallback(() => {
    setHistory((h) => {
      if (h.length < 2) return h;
      const copy = h.slice(0, -1);
      setStep(copy[copy.length - 1]);
      return copy;
    });
  }, []);

  const restart = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setStep("landing");
    setHistory(["landing"]);
  }, []);

  const value = useMemo(
    () => ({
      step,
      go,
      back,
      restart,
      canGoBack: history.length > 1,
      input,
      setInput,
      unlocked,
      unlock,
      relock,
      accessCode: meta.demoAccessCode,
    }),
    [step, go, back, restart, history.length, input, unlocked, unlock, relock]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used within FlowProvider");
  return ctx;
}
