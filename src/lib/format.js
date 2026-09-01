export const pct = (n, digits = 0) =>
  `${(n * 100).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;

export const num = (n) => n.toLocaleString("en-US");

export const signed = (n) => (n > 0 ? `+${n}` : `${n}`);

export const outcomeMeta = {
  absent: { label: "Not mentioned", tone: "bad" },
  "mentioned-weak": { label: "Weak mention", tone: "warn" },
  "mentioned-inaccurate": { label: "Mentioned — inaccurate", tone: "warn" },
  "mentioned-dated": { label: "Mentioned — dated", tone: "warn" },
  "competitor-favored": { label: "Competitor favoured", tone: "bad" },
  unverifiable: { label: "Unverifiable", tone: "warn" },
};

export const statusMeta = {
  pass: { label: "Pass", tone: "good" },
  warn: { label: "Needs work", tone: "warn" },
  fail: { label: "Fail", tone: "bad" },
  missing: { label: "Missing", tone: "bad" },
  partial: { label: "Partial", tone: "warn" },
  stale: { label: "Stale", tone: "warn" },
  ok: { label: "OK", tone: "good" },
  correct: { label: "Correct", tone: "good" },
  wrong: { label: "Wrong", tone: "bad" },
  none: { label: "No answer", tone: "bad" },
  fully: { label: "Answered", tone: "good" },
  yes: { label: "Yes", tone: "good" },
  no: { label: "No", tone: "bad" },
};

export const toneClass = {
  good: "text-sage",
  warn: "text-amber",
  bad: "text-claret",
};
export const toneBg = {
  good: "bg-sage",
  warn: "bg-amber",
  bad: "bg-claret",
};
