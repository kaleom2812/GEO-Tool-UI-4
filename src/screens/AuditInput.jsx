import { useRef, useState } from "react";
import { useFlow } from "../flow.jsx";
import { ArrowRight, Alert, Check } from "../icons.jsx";
import { Reveal } from "../ui.jsx";
import { Footer } from "./Chrome.jsx";

const FIELDS = [
  { name: "url", label: "Website URL", type: "url", required: true, hint: "The domain to audit. We crawl up to 250 pages.", placeholder: "https://example.com", autoComplete: "url" },
  { name: "brand", label: "Brand name", type: "text", required: true, hint: "Used to match brand mentions in AI answers.", placeholder: "Acme" },
  { name: "industry", label: "Category", type: "text", required: false, hint: "Helps us pick the right benchmark set." },
  { name: "competitors", label: "Competitors", type: "text", required: false, hint: "Comma-separated. We measure share of voice against these." },
  { name: "market", label: "Primary market", type: "text", required: false, hint: "Region used for localized model probing." },
];

function validate(values) {
  const errs = {};
  if (!values.url.trim()) errs.url = "Enter the website URL you want audited.";
  else if (!/^https?:\/\/[^\s.]+\.[^\s]{2,}/i.test(values.url.trim()))
    errs.url = "Enter a full URL including https://";
  if (!values.brand.trim()) errs.brand = "Enter the brand name so we can match mentions.";
  return errs;
}

export default function AuditInput() {
  const { input, setInput, go } = useFlow();
  const [values, setValues] = useState(input);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const summaryRef = useRef(null);
  const fieldRefs = useRef({});

  const set = (name, v) => setValues((s) => ({ ...s, [name]: v }));

  const onBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ url: true, brand: true });
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setInput(values);
    go("processing");
  };

  const errorList = Object.entries(errors);

  return (
    <main className="doc-shell pt-14 sm:pt-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Step 01</p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              The audit brief
            </h1>
            <p className="lede mt-4">
              Everything is pre-filled with a live sample. Adjust or submit as-is.
            </p>
            <ol className="mt-8 space-y-3 text-sm text-ink-2">
              {[
                "Probe 5 AI models with your prompt set",
                "Crawl the site, rendered and raw",
                "Extract citations and entity signals",
                "Assemble the deliverable",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="data-fig mt-0.5 text-ink-3">0{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-8">
            {errorList.length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="mb-6 rounded-lg border border-claret/30 bg-claret/5 p-4"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-claret">
                  <Alert size={16} /> Fix {errorList.length} field{errorList.length > 1 ? "s" : ""} to continue
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-claret/90">
                  {errorList.map(([k, v]) => (
                    <li key={k}>
                      <button
                        type="button"
                        className="link-underline"
                        onClick={() => fieldRefs.current[k]?.focus()}
                      >
                        {v}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-5">
              {FIELDS.map((f) => {
                const err = touched[f.name] && errors[f.name];
                return (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
                      {f.label}
                      {f.required && <span className="text-claret" aria-hidden="true">*</span>}
                      {f.required && <span className="sr-only">(required)</span>}
                    </label>
                    <input
                      ref={(el) => (fieldRefs.current[f.name] = el)}
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      inputMode={f.type === "url" ? "url" : undefined}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      value={values[f.name]}
                      onChange={(e) => set(f.name, e.target.value)}
                      onBlur={() => onBlur(f.name)}
                      aria-invalid={!!err}
                      aria-describedby={`${f.name}-hint ${err ? `${f.name}-err` : ""}`}
                      className={`w-full rounded-lg border bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-3/60 focus:border-teal focus:bg-white ${
                        err ? "border-claret" : "border-rule-2"
                      }`}
                    />
                    <p id={`${f.name}-hint`} className="mt-1.5 text-2xs text-ink-3">
                      {f.hint}
                    </p>
                    {err && (
                      <p id={`${f.name}-err`} className="mt-1 flex items-center gap-1.5 text-2xs font-medium text-claret">
                        <Alert size={13} /> {err}
                      </p>
                    )}
                  </div>
                );
              })}

              <div>
                <label htmlFor="prompts" className="mb-1.5 block text-sm font-medium text-ink">
                  Target prompts
                </label>
                <textarea
                  id="prompts"
                  name="prompts"
                  rows={5}
                  value={values.prompts}
                  onChange={(e) => set("prompts", e.target.value)}
                  aria-describedby="prompts-hint"
                  className="w-full rounded-lg border border-rule-2 bg-paper px-3.5 py-2.5 text-sm leading-relaxed text-ink outline-none focus:border-teal focus:bg-white"
                />
                <p id="prompts-hint" className="mt-1.5 text-2xs text-ink-3">
                  One prompt per line. We expand this to a 60-prompt set covering discovery,
                  alternative-to, head-to-head, feature, and trust intents.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-2xs text-ink-3">
                <Check size={14} className="text-sage" /> No account required · demo runs locally
              </p>
              <button type="submit" className="btn-primary">
                Run the audit <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
      <Footer />
    </main>
  );
}
