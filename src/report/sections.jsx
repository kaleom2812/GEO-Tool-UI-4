import {
  aiVisibility,
  answerability,
  citations,
  competitors,
  entityUnderstanding,
  executiveSummary,
  meta,
  methodology,
  pageFindings,
  pillars,
  promptEvidence,
  roadmap,
  score,
  scoreProjection,
  structuredData,
  technicalGeo,
  actionCenter,
} from "../data/auditData.js";
import { pct, num, outcomeMeta, statusMeta } from "../lib/format.js";
import {
  ArcScore,
  BarList,
  Bullet,
  Donut,
  DotMatrix,
  LineTrend,
  Quadrant,
  Radar,
  TrackBar,
} from "../charts.jsx";
import {
  Callout,
  CodeBlock,
  DataTable,
  Disclose,
  KeyValue,
  Reveal,
  SectionHeader,
  StoryArc,
  Tag,
} from "../ui.jsx";
import { Alert, Bot, Code, ExternalLink, FileText, Quote, Shield, Target } from "../icons.jsx";

const arc = (p, action) => [
  { stage: "Problem", text: p.problem },
  { stage: "Evidence", text: p.evidence },
  { stage: "Impact", text: p.impact },
  { stage: "Recommendation", text: p.recommendation },
  ...(action ? [{ stage: "Action", text: action }] : []),
];

function Section({ id, number, kicker, title, lede, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-rule pt-14 sm:pt-16">
      <SectionHeader number={number} kicker={kicker} title={title} lede={lede} />
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Split({ story, aside }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <Reveal>{story}</Reveal>
      <Reveal delay={0.08}>{aside}</Reveal>
    </div>
  );
}

const toneTag = (tone, label) => <Tag tone={tone}>{label}</Tag>;

/* ---------------- 01 · Score ---------------- */
export function ScoreSection() {
  const radarAxes = pillars.map((p) => p.label.replace(" ", "\n"));
  return (
    <Section
      id="score"
      number={1}
      kicker="Headline"
      title="GEO Visibility Score"
      lede={score.summary}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <Reveal>
          <div className="card p-6 text-center">
            <ArcScore value={score.overall} grade={score.grade} sub={score.tier} />
            <div className="mt-4 flex items-center justify-center gap-3 border-t border-rule pt-4 text-sm">
              <span className="text-ink-3">Last quarter {score.previousOverall}</span>
              <Tag tone="good">+{score.delta} pts</Tag>
            </div>
            <p className="mt-3 text-2xs uppercase tracking-wide text-ink-3">
              Rank {score.categoryRank} of {score.categoryOf} tracked competitors
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <p className="eyebrow mb-4">Pillar breakdown</p>
            <ul className="space-y-4">
              {pillars.map((p) => (
                <li key={p.key} className="grid grid-cols-[8.5rem_1fr_2.5rem] items-center gap-3 sm:grid-cols-[10rem_1fr_3rem]">
                  <span className="text-sm text-ink-2">{p.label}</span>
                  <TrackBar value={p.score} previous={p.previous} />
                  <span className="data-fig text-right text-sm text-ink">{p.score}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-2xs text-ink-3">
              Tick marks show last quarter&rsquo;s value. Weighted mean = {score.overall}.
            </p>

            <div className="mt-8">
              <Radar
                axes={pillars.map((p) => p.label)}
                series={[{ name: "Rivet CRM", values: pillars.map((p) => p.score / 100), accent: "#0F5257" }]}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <DataTable
          caption="Pillar weights and quarter-over-quarter movement"
          columns={[
            { key: "label", label: "Pillar" },
            { key: "weight", label: "Weight", align: "right", mono: true, render: (r) => `${Math.round(r.weight * 100)}%` },
            { key: "previous", label: "Prev", align: "right", mono: true },
            { key: "score", label: "Now", align: "right", mono: true },
            { key: "grade", label: "Grade", align: "right", mono: true },
            { key: "delta", label: "Δ", align: "right", mono: true, render: (r) => (r.score - r.previous > 0 ? `+${r.score - r.previous}` : r.score - r.previous) },
          ]}
          rows={pillars}
        />
      </div>
    </Section>
  );
}

/* ---------------- 02 · Executive summary ---------------- */
export function ExecutiveSummarySection() {
  return (
    <Section
      id="executive-summary"
      number={2}
      kicker="For the board"
      title="Executive summary"
      lede={executiveSummary.verdict}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {executiveSummary.headlineMetrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.05}>
            <div className="card h-full p-4">
              <p className="data-fig text-2xl text-ink">{m.value}</p>
              <p className="mt-1 text-sm font-medium text-ink-2">{m.label}</p>
              <p className="mt-0.5 text-2xs text-ink-3">{m.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <Reveal>
          <StoryArc stages={executiveSummary.story} />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="space-y-5">
            <div className="card p-5">
              <p className="eyebrow mb-3">90-day trajectory</p>
              <LineTrend
                series={[
                  {
                    name: "Projected GEO score",
                    accent: "#0F5257",
                    area: true,
                    points: scoreProjection.map((d) => ({ x: d.label, y: d.score })),
                  },
                ]}
                yMax={100}
              />
            </div>
            <Callout icon={Target} tone="warn" title="The one-line takeaway">
              Rivet is losing the AI answer layer of its own category to competitors that fixed
              machine access first. The plan closes most of the gap in 90 days.
            </Callout>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- 03 · AI visibility ---------------- */
export function AiVisibilitySection() {
  const p = pillars.find((x) => x.key === "ai-visibility");
  return (
    <Section
      id="ai-visibility"
      number={3}
      kicker={`Pillar · score ${p.score}`}
      title="AI Visibility"
      lede={p.headline}
    >
      <Split
        story={<StoryArc stages={arc(p, "Build the 6 comparison and 'best CRM for X' pages named in the Action Center, each with FAQ schema and quotable statistics.")} />}
        aside={
          <div className="card p-5">
            <p className="eyebrow mb-3">AI answer presence — Rivet vs competitor average</p>
            <LineTrend
              series={[
                { name: "Rivet", accent: "#0F5257", area: true, points: aiVisibility.presenceTrend.map((d) => ({ x: d.month, y: d.brand })) },
                { name: "Competitor avg", accent: "#14181B", dashed: true, points: aiVisibility.presenceTrend.map((d) => ({ x: d.month, y: d.competitorAvg })) },
              ]}
              yMax={100}
              unit="%"
            />
          </div>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-4">Presence by model</p>
          <DataTable
            columns={[
              { key: "model", label: "Model" },
              { key: "presence", label: "Presence", align: "right", mono: true, render: (r) => pct(r.presence) },
              { key: "appeared", label: "Prompts", align: "right", mono: true, render: (r) => `${r.appeared}/${r.of}` },
              { key: "position", label: "Avg pos", align: "right", mono: true },
              { key: "blocked", label: "Access", align: "right", render: (r) => (r.blocked ? <Tag tone="bad">Blocked</Tag> : <Tag tone="good">Open</Tag>) },
            ]}
            rows={aiVisibility.models}
          />
          <p className="mt-3 text-2xs text-ink-3">
            Claude leads presence; ChatGPT is limited to training data because GPTBot is disallowed in
            robots.txt.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow mb-4">Category benchmark — answer presence</p>
          <BarList items={aiVisibility.benchmark.map((b) => ({ name: b.name, value: Math.round(b.presence * 100), self: b.self }))} max={100} />
          <p className="mt-6 eyebrow mb-3">Presence by query intent</p>
          <BarList
            items={aiVisibility.intentBreakdown.map((d) => ({ name: d.intent, value: Math.round(d.presence * 100) }))}
            max={100}
          />
        </Reveal>
      </div>

      <div className="mt-10">
        <Callout icon={Alert} tone="bad" title="Highest-intent query, zero presence">
          Rivet is absent from &ldquo;best CRM for a small B2B sales team&rdquo; on every model. That
          single query pattern is ~18% of category AI search volume.
        </Callout>
      </div>
    </Section>
  );
}

/* ---------------- 04 · Entity understanding ---------------- */
export function EntitySection() {
  const p = pillars.find((x) => x.key === "entity-understanding");
  return (
    <Section
      id="entity"
      number={4}
      kicker={`Pillar · score ${p.score}`}
      title="Entity Understanding"
      lede={p.headline}
    >
      <Split
        story={<StoryArc stages={arc(p, "Ship the SoftwareApplication + Organization schema in section 11, then open a Wikidata item and align every third-party profile within 30 days.")} />}
        aside={
          <div className="card p-5">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow">Entity confidence</p>
              <span className="data-fig text-2xl text-ink">{entityUnderstanding.confidence}/100</span>
            </div>
            <TrackBar value={entityUnderstanding.confidence} accent="#9A6B1E" />
            <p className="mt-2 text-sm text-ink-2">{entityUnderstanding.knowledgePanel}</p>
            <div className="mt-4 border-t border-rule pt-4">
              <KeyValue
                rows={entityUnderstanding.sources.map((s) => ({
                  label: s.source,
                  value: (
                    <span className="flex flex-wrap items-center gap-2">
                      {toneTag(statusMeta[s.status]?.tone || "neutral", statusMeta[s.status]?.label || s.status)}
                      <span>{s.detail}</span>
                    </span>
                  ),
                }))}
              />
            </div>
          </div>
        }
      />

      <div className="mt-12">
        <p className="eyebrow mb-4">Attribute accuracy</p>
        <DataTable
          columns={[
            { key: "attr", label: "Attribute" },
            { key: "state", label: "Status", render: (r) => toneTag(statusMeta[r.state]?.tone, statusMeta[r.state]?.label) },
            { key: "value", label: "What models say" },
          ]}
          rows={entityUnderstanding.attributes}
        />
      </div>

      <div className="mt-10">
        <Callout icon={Alert} tone="warn" title={`Disambiguation risk — ${entityUnderstanding.disambiguation.risk}`}>
          <p>{entityUnderstanding.disambiguation.detail}</p>
          <ul className="mt-2 list-inside list-disc text-ink-3">
            {entityUnderstanding.disambiguation.collisions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Callout>
      </div>
    </Section>
  );
}

/* ---------------- 05 · Answerability ---------------- */
export function AnswerabilitySection() {
  const p = pillars.find((x) => x.key === "answerability");
  return (
    <Section
      id="answerability"
      number={5}
      kicker={`Pillar · score ${p.score}`}
      title="Answerability"
      lede={p.headline}
    >
      <Split
        story={<StoryArc stages={arc(p, "Publish FAQPage-structured answers to all 19 gap questions and add visible last-updated dates to the 41% of pages that are stale.")} />}
        aside={
          <div className="card p-5">
            <p className="eyebrow mb-3">
              {answerability.tested} buyer questions tested
            </p>
            <DotMatrix
              columns={12}
              groups={[
                { label: "Fully answerable", count: answerability.fully, tone: "good" },
                { label: "Partial", count: answerability.partial, tone: "warn" },
                { label: "No answer on site", count: answerability.none, tone: "bad" },
              ]}
            />
            <div className="mt-5 border-t border-rule pt-4">
              <p className="eyebrow mb-3">Answerability by topic</p>
              <BarList
                items={answerability.categories.map((c) => ({ name: c.category, value: Math.round(c.answerable * 100) }))}
                max={100}
              />
            </div>
          </div>
        }
      />

      <div className="mt-12">
        <p className="eyebrow mb-4">The gap list</p>
        <DataTable
          columns={[
            { key: "q", label: "Buyer question" },
            { key: "state", label: "Status", render: (r) => toneTag(statusMeta[r.state]?.tone, statusMeta[r.state]?.label) },
            { key: "note", label: "Why models can't answer it" },
          ]}
          rows={answerability.gaps}
        />
      </div>
    </Section>
  );
}

/* ---------------- 06 · Prompt evidence ---------------- */
export function PromptEvidenceSection() {
  return (
    <Section
      id="prompt-evidence"
      number={6}
      kicker="Evidence"
      title="Prompt evidence"
      lede="Verbatim-style excerpts from the probing run. This is what a buyer sees when they ask an assistant about the category."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {promptEvidence.map((e, i) => {
          const om = outcomeMeta[e.outcome] || { label: e.outcome, tone: "neutral" };
          return (
            <Reveal key={e.id} delay={i * 0.04}>
              <article className="card flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-3">
                    {e.model} · {e.intent}
                  </p>
                  <Tag tone={om.tone}>{om.label}</Tag>
                </div>
                <p className="mt-3 font-display text-base font-semibold leading-snug text-ink">
                  &ldquo;{e.prompt}&rdquo;
                </p>
                <blockquote className="mt-3 border-l-2 border-rule-2 pl-3 text-sm italic leading-relaxed text-ink-2">
                  {e.response}
                </blockquote>
                {e.citations.length > 0 && (
                  <p className="mt-3 flex flex-wrap items-center gap-1.5 text-2xs text-ink-3">
                    <span className="uppercase tracking-wide">Cited</span>
                    {e.citations.map((c) => (
                      <span key={c} className="rounded bg-paper-2 px-1.5 py-0.5 font-mono">
                        {c}
                      </span>
                    ))}
                  </p>
                )}
                <div className="mt-auto pt-4">
                  <p className="flex items-start gap-2 border-t border-rule pt-3 text-sm text-ink-2">
                    <span className="mt-0.5 shrink-0 text-teal">
                      <Quote size={14} />
                    </span>
                    {e.analysis}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- 07 · Competitors ---------------- */
export function CompetitorSection() {
  return (
    <Section
      id="competitors"
      number={7}
      kicker="Benchmark"
      title="Competitor intelligence & share of voice"
      lede="Across every AI answer in the category, how much of the conversation each brand owns."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <Reveal>
          <div className="card p-5">
            <p className="eyebrow mb-4">Share of voice — category AI answers</p>
            <Donut
              items={competitors.shareOfVoice}
              centerLabel={{ value: "9%", label: "Rivet CRM" }}
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="space-y-5">
            <div className="card p-5">
              <p className="eyebrow mb-3">Rivet share of voice — trailing 6 months</p>
              <LineTrend
                series={[{ name: "Share of voice", accent: "#0F5257", area: true, points: competitors.sovTrend.map((d) => ({ x: d.month, y: d.sov })) }]}
                yMax={40}
                yTicks={[0, 10, 20, 30, 40]}
                unit="%"
              />
            </div>
            <StoryArc
              compact
              stages={[
                { stage: "Problem", text: "Rivet holds 9% share of voice in a category it competes in directly — 4th of 6." },
                { stage: "Evidence", text: "Every competitor except Rivet has a server-rendered pricing table with Offer schema; HubSpot and Pipedrive both publish a 'Rivet alternative' page." },
                { stage: "Impact", text: "Share of voice compounds — models cache the brands they already trust and cite." },
                { stage: "Recommendation", text: "Match table stakes (schema, comparison pages, reviews) before chasing net-new content." },
              ]}
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <DataTable
          caption="Competitive GEO scorecard"
          columns={[
            { key: "name", label: "Brand" },
            { key: "presence", label: "AI presence", align: "right", mono: true, render: (r) => pct(r.presence) },
            { key: "sov", label: "Share of voice", align: "right", mono: true, render: (r) => pct(r.sov) },
            { key: "sentiment", label: "Sentiment", align: "right", mono: true, render: (r) => `+${r.sentiment.toFixed(2)}` },
            { key: "knowledgePanel", label: "Panel", align: "right" },
            { key: "wikipedia", label: "Wiki", align: "right" },
            { key: "citations", label: "Citations", align: "right", mono: true },
          ]}
          rows={competitors.table}
        />
      </div>

      <div className="mt-8">
        <p className="eyebrow mb-3">Gap analysis</p>
        <ul className="space-y-2">
          {competitors.gapAnalysis.map((g) => (
            <li key={g} className="flex items-start gap-3 text-sm text-ink-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal" />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- 08 · Citations ---------------- */
export function CitationSection() {
  const p = pillars.find((x) => x.key === "citation-visibility");
  return (
    <Section
      id="citations"
      number={8}
      kicker={`Pillar · score ${p.score}`}
      title="Citation visibility"
      lede={p.headline}
    >
      <Split
        story={<StoryArc stages={arc(p, "Run the G2 review-velocity campaign (+40/quarter), pursue the 6 named listicles, and add data + schema to /pricing and /security so they become citable.")} />}
        aside={
          <div className="card p-5">
            <p className="eyebrow mb-3">Most-cited domains in the category</p>
            <BarList
              items={citations.topDomains.map((d) => ({ name: d.domain, value: Math.round(d.share * 100), self: d.self }))}
              max={35}
            />
            <p className="mt-3 text-2xs text-ink-3">
              rivetcrm.com earns {pct(citations.brandShare)} of {num(citations.categoryTotal)} category
              citations.
            </p>
          </div>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-4">Rivet pages that get cited</p>
          <DataTable
            dense
            columns={[
              { key: "page", label: "Page", mono: true },
              { key: "citations", label: "Cites", align: "right", mono: true },
              { key: "note", label: "Note" },
            ]}
            rows={citations.citedPages}
          />
          <p className="mt-4 text-sm text-ink-2">
            <span className="font-semibold text-claret">Zero citations:</span>{" "}
            {citations.zeroCitationPages.join(", ")}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow mb-4">Citation opportunities</p>
          <div className="space-y-3">
            {citations.opportunities.map((o) => (
              <div key={o.detail} className="card p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{o.type}</p>
                  <Tag tone={o.impact === "High" ? "bad" : "warn"}>{o.impact} impact</Tag>
                </div>
                <p className="mt-1 text-sm text-ink-2">{o.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- 09 · Page findings ---------------- */
export function PageFindingsSection() {
  const readable = { yes: "good", partial: "warn", no: "bad" };
  return (
    <Section
      id="page-findings"
      number={9}
      kicker="Content"
      title="Page & content findings"
      lede="Per-URL GEO health for the pages that matter most to a buying decision."
    >
      <div className="space-y-3">
        {pageFindings.map((f, i) => (
          <Reveal key={f.url} delay={Math.min(i * 0.03, 0.25)}>
            <Disclose
              summary={
                <span className="flex w-full flex-wrap items-center gap-3">
                  <span className="data-fig w-8 shrink-0 text-ink-3">{f.geo}</span>
                  <span className="font-mono text-sm text-ink">{f.url}</span>
                  <span className="text-2xs text-ink-3">{f.type}</span>
                  <span className="ml-auto">
                    {toneTag(readable[f.readable], `${f.readable === "yes" ? "AI-readable" : f.readable === "no" ? "Not readable" : "Partial"}`)}
                  </span>
                </span>
              }
            >
              <p className="mb-2">{f.issue}</p>
              <p className="text-ink-3">{f.story}</p>
            </Disclose>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- 10 · Technical GEO ---------------- */
export function TechnicalSection() {
  const p = pillars.find((x) => x.key === "technical-geo");
  return (
    <Section
      id="technical"
      number={10}
      kicker={`Pillar · score ${p.score}`}
      title="Technical GEO"
      lede={p.headline}
    >
      <Split
        story={<StoryArc stages={arc(p, "Remove the GPTBot Disallow line today; publish llms.txt and server-render commercial pages within the first sprint.")} />}
        aside={
          <div className="card p-5">
            <p className="eyebrow mb-4">Technical checks</p>
            <ul className="space-y-3">
              {technicalGeo.checks.map((c) => (
                <li key={c.check} className="grid grid-cols-[1fr_2.5rem_5rem] items-center gap-3">
                  <span className="text-sm text-ink-2">{c.check}</span>
                  <span className="data-fig text-right text-sm text-ink">{c.score}</span>
                  <span className="text-right">{toneTag(statusMeta[c.status]?.tone, statusMeta[c.status]?.label)}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <div className="mt-12">
        <p className="eyebrow mb-4">AI crawler access</p>
        <DataTable
          columns={[
            { key: "bot", label: "Agent", mono: true },
            { key: "purpose", label: "Feeds" },
            { key: "status", label: "Current", render: (r) => toneTag(r.status === "Blocked" ? "bad" : r.status.startsWith("Allowed") ? "good" : "warn", r.status) },
            { key: "fix", label: "Fix" },
          ]}
          rows={technicalGeo.crawlerTable}
        />
      </div>
    </Section>
  );
}

/* ---------------- 11 · Schema / robots / llms ---------------- */
export function SchemaSection() {
  return (
    <Section
      id="schema"
      number={11}
      kicker="Machine files"
      title="Schema, robots.txt & llms.txt"
      lede="The three files that decide whether a model can read, trust, and quote the site."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <Code size={14} /> robots.txt — current
            </p>
            <CodeBlock label="rivetcrm.com/robots.txt" code={structuredData.robotsTxt.current} />
            <Callout tone="bad" icon={Alert} title="Line 5 removes Rivet from ChatGPT retrieval">
              <span className="font-mono text-2xs">User-agent: GPTBot / Disallow: /</span> blocks the
              single largest AI retrieval surface.
            </Callout>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <Code size={14} /> robots.txt — recommended
            </p>
            <CodeBlock label="rivetcrm.com/robots.txt" code={structuredData.robotsTxt.recommended} />
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <FileText size={14} /> llms.txt — <span className="text-claret">missing (404)</span>
            </p>
            <CodeBlock label="recommended rivetcrm.com/llms.txt" code={structuredData.llmsTxt.recommended} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <Shield size={14} /> Structured data
            </p>
            <div className="card p-5">
              <p className="text-sm font-semibold text-ink">Present</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {structuredData.schemaPresent.map((s) => (
                  <li key={s.type} className="flex items-start gap-2">
                    {toneTag(s.state === "ok" ? "good" : "warn", s.state)}
                    <span className="text-ink-2">
                      <span className="font-mono text-ink">{s.type}</span> — {s.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-claret">Missing</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {structuredData.schemaMissing.map((s) => (
                  <li key={s} className="rounded bg-claret/5 px-2 py-0.5 font-mono text-2xs text-claret">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3">Recommended SoftwareApplication JSON-LD</p>
        <CodeBlock label="add to every page &lt;head&gt;" code={structuredData.recommendedSchema} />
      </div>
    </Section>
  );
}

/* ---------------- 12 · Action center ---------------- */
export function ActionCenterSection() {
  return (
    <Section
      id="action-center"
      number={12}
      kicker="Prioritised"
      title="Action center"
      lede="Every recommendation from the audit, ranked by impact against effort. Teal points are 1–2 day quick wins."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-14">
        <Reveal>
          <div className="card p-5">
            <Quadrant items={actionCenter} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="divide-y divide-rule border-y border-rule">
            {[...actionCenter]
              .sort((a, b) => b.impact - a.impact || a.effort - b.effort)
              .map((a) => (
                <li key={a.id} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                  <span className="data-fig text-sm text-ink-3">{String(a.id).padStart(2, "0")}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-ink">{a.title}</p>
                      <Tag tone={a.type === "Quick win" ? "good" : "neutral"}>{a.type}</Tag>
                    </div>
                    <p className="mt-1 text-sm text-ink-2">{a.detail}</p>
                    <p className="mt-1.5 font-mono text-2xs uppercase tracking-[0.1em] text-ink-3">
                      {a.pillar} · impact {a.impact}/5 · effort {a.effort}/5 · {a.owner} · {a.horizon}
                    </p>
                  </div>
                </li>
              ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- 13 · Roadmap ---------------- */
export function RoadmapSection() {
  return (
    <Section
      id="roadmap"
      number={13}
      kicker="Sequenced"
      title="90-day roadmap"
      lede="Machine access first, then answerability and entity, then third-party authority. Each phase has a projected score."
    >
      <div className="mb-10 card p-5">
        <p className="eyebrow mb-3">Projected GEO score</p>
        <LineTrend
          series={[{ name: "Projected score", accent: "#0F5257", area: true, points: scoreProjection.map((d) => ({ x: d.label, y: d.score })) }]}
          yMax={100}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {roadmap.map((ph, i) => (
          <Reveal key={ph.phase} delay={i * 0.06}>
            <div className="card flex h-full flex-col p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-3">{ph.window}</p>
                <span className="data-fig text-lg text-teal">→ {ph.projectedScore}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{ph.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{ph.focus}</p>

              <div className="mt-4 space-y-3 border-t border-rule pt-4">
                {ph.kpis.map((k) => (
                  <Bullet key={k.label} label={k.label} from={k.from} to={k.to} max={k.label.includes("question") ? 20 : 100} />
                ))}
              </div>

              <p className="mt-4 text-2xs uppercase tracking-wide text-ink-3">
                Actions {ph.actions.join(", ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- 14 · Methodology ---------------- */
export function MethodologySection() {
  return (
    <Section
      id="methodology"
      number={14}
      kicker="Appendix"
      title="Methodology"
      lede={methodology.intro}
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <Reveal>
          <KeyValue rows={methodology.items} />
        </Reveal>
        <Reveal delay={0.08}>
          <Callout tone="warn" icon={Alert} title="Limitations">
            <ul className="list-inside list-disc space-y-1.5">
              {methodology.limitations.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="mt-3 border-t border-amber/20 pt-3 font-medium text-ink">
              Confidence: {methodology.confidence}
            </p>
          </Callout>
        </Reveal>
      </div>
      <p className="mt-10 font-mono text-2xs uppercase tracking-[0.14em] text-ink-3">
        {meta.auditId} · generated {meta.auditDate} · {meta.analyst}
      </p>
    </Section>
  );
}

export const REPORT_SECTIONS = [
  { id: "score", label: "GEO Score", Component: ScoreSection },
  { id: "executive-summary", label: "Executive summary", Component: ExecutiveSummarySection },
  { id: "ai-visibility", label: "AI Visibility", Component: AiVisibilitySection },
  { id: "entity", label: "Entity Understanding", Component: EntitySection },
  { id: "answerability", label: "Answerability", Component: AnswerabilitySection },
  { id: "prompt-evidence", label: "Prompt evidence", Component: PromptEvidenceSection },
  { id: "competitors", label: "Competitors & SoV", Component: CompetitorSection },
  { id: "citations", label: "Citation visibility", Component: CitationSection },
  { id: "page-findings", label: "Page findings", Component: PageFindingsSection },
  { id: "technical", label: "Technical GEO", Component: TechnicalSection },
  { id: "schema", label: "Schema · robots · llms", Component: SchemaSection },
  { id: "action-center", label: "Action center", Component: ActionCenterSection },
  { id: "roadmap", label: "90-day roadmap", Component: RoadmapSection },
  { id: "methodology", label: "Methodology", Component: MethodologySection },
];
