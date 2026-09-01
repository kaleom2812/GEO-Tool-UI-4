import { useCallback, useEffect, useRef, useState } from "react";

/** Respects the OS "reduce motion" setting and reacts to changes. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/**
 * Fires once when an element is (or scrolls) into view.
 * Robust: reveals immediately if already on screen, and always reveals via a
 * short fallback timer so content can never get stuck hidden (zero-viewport,
 * background tabs, no IntersectionObserver, etc.).
 */
export function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    if (rect.top < vh * 1.15 && rect.bottom > -vh * 0.15) {
      setInView(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };

    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) reveal();
      }, options);
      io.observe(el);
    }
    // Safety net — never leave content invisible.
    const t = setTimeout(reveal, 700);

    return () => {
      io?.disconnect();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView];
}

/** Animated number counter. Honors reduced motion by snapping to the final value. */
export function useCountUp(target, { duration = 1100, start = 0, decimals = 0, play = true } = {}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : start);
  const raf = useRef(0);
  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    const from = start;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (target - from) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start, play, reduced]);
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Persisted unlock flag for the demo paywall. */
const KEY = "geo-demo-unlocked-v1";
export function usePersistentUnlock() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return window.localStorage.getItem(KEY) === "true";
    } catch {
      return false;
    }
  });
  const unlock = useCallback(() => {
    try {
      window.localStorage.setItem(KEY, "true");
    } catch {
      /* ignore */
    }
    setUnlocked(true);
  }, []);
  const relock = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setUnlocked(false);
  }, []);
  return { unlocked, unlock, relock };
}

/** Media query hook. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, [query]);
  return matches;
}
