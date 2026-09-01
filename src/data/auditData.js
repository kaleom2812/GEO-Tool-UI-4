/**
 * GEO Audit — shared mock dataset.
 * Identical across all three UI options. Demo data only — not a real audit of any company.
 */

export const meta = {
  brand: "Rivet CRM",
  domain: "rivetcrm.com",
  url: "https://rivetcrm.com",
  industry: "B2B SaaS — CRM for mid-market sales teams",
  auditId: "GEO-2026-0901-RVT",
  auditDate: "2026-09-01",
  auditWindow: "Aug 25–29, 2026",
  analyst: "GEO Audit Engine v4.2",
  demoAccessCode: "GEO-DEMO-2026",
  pagesCrawled: 214,
  promptsTested: 60,
  aiAnswersAnalyzed: 300,
  rawRuns: 900,
};

export const score = {
  overall: 61,
  grade: "C+",
  tier: "Emerging Visibility",
  previousOverall: 55,
  delta: 6,
  percentileLabel: "Behind 4 of 5 tracked competitors",
  categoryRank: 4,
  categoryOf: 6,
  projected90: 76,
  summary:
    "Rivet CRM is structurally sound but nearly invisible in AI-generated answers. Machine access is the first blocker: crawlers are partly blocked, there is no llms.txt, pricing is unreadable to models, and the brand has no durable entity footprint.",
};

/** Six weighted pillars — weights sum to 1.0, weighted mean = 61. */
export const pillars = [
  {
    key: "ai-visibility",
    label: "AI Visibility",
    score: 55,
    previous: 47,
    weight: 0.25,
    grade: "C",
    headline: "Present in 31% of relevant AI answers vs 78% for the category leader.",
    problem:
      "When buyers ask assistants to recommend a CRM, Rivet is usually not in the answer. It is absent from the single highest-intent query in the category.",
    evidence:
      "22/60 prompts surfaced Rivet on ChatGPT, 12/60 on Copilot. Average answer position 4.3. Share of voice 9%.",
    impact:
      "Category AI search is growing ~2x YoY. At 9% share of voice Rivet forfeits an estimated 1,900 assisted sessions and ~28 pipeline opportunities per quarter.",
    recommendation:
      "Build comparison and 'best CRM for X' content with FAQ structure, and make the brand quotable with stat-rich, extractable copy.",
  },
  {
    key: "entity-understanding",
    label: "Entity Understanding",
    score: 69,
    previous: 66,
    weight: 0.15,
    grade: "B-",
    headline: "Models recognise the brand but get core facts wrong.",
    problem:
      "There is no Wikipedia or Wikidata entry, the Google knowledge panel is partial, and AI states the wrong founding year and omits the founders and HQ.",
    evidence:
      "Entity confidence 62/100. 'Rivet' collides with a UI toolkit and a data-fetching library, creating medium disambiguation risk.",
    impact:
      "Weak entity grounding caps every other pillar — models hedge, mis-attribute features, and default to better-known competitors.",
    recommendation:
      "Ship complete Organization + SoftwareApplication schema with sameAs, seed a Wikidata entry, and enforce consistent name/address/profile data across the web.",
  },
  {
    key: "answerability",
    label: "Answerability",
    score: 60,
    previous: 58,
    weight: 0.2,
    grade: "C",
    headline: "31% of buyer questions cannot be answered from the site at all.",
    problem:
      "Enterprise pricing, data residency, Salesforce migration, API limits, and HIPAA all have no clear on-page answer that a model can extract.",
    evidence:
      "Of 60 tested buyer questions: 22 fully answerable, 19 partial, 19 unanswerable. FAQ schema exists on only 3 pages. 41% of key pages are 12+ months stale.",
    impact:
      "Unanswered questions are handed to competitors' content or to third-party listicles that omit Rivet.",
    recommendation:
      "Publish structured FAQ content targeting the 19 gaps, refresh stale pages, and add last-updated signals.",
  },
  {
    key: "citation-visibility",
    label: "Citation Visibility",
    score: 42,
    previous: 39,
    weight: 0.15,
    grade: "D+",
    headline: "rivetcrm.com earns 4% of category citations; the pricing and security pages earn zero.",
    problem:
      "Models cite G2, Reddit, and competitors' domains far more than Rivet's own. Key commercial pages are never cited.",
    evidence:
      "51 citations to rivetcrm.com across 1,240 category citations. No Wikipedia. Not present in 6 major 'best CRM 2026' listicles that rank competitors.",
    impact:
      "Without owned or third-party citations, models cannot verify claims and downrank Rivet in favour of well-cited alternatives.",
    recommendation:
      "Run a G2 review-velocity campaign, earn placement in the 6 named listicles, and make commercial pages citation-worthy with data and schema.",
  },
  {
    key: "technical-geo",
    label: "Technical GEO",
    score: 80,
    previous: 78,
    weight: 0.15,
    grade: "B",
    headline: "Fast and mobile-friendly, but robots.txt blocks GPTBot and there is no llms.txt.",
    problem:
      "The strongest pillar is undermined by two one-line files: robots.txt actively disallows GPTBot, and llms.txt returns 404.",
    evidence:
      "LCP 2.1s, mobile score 92. But structured-data coverage is 18%, pricing and integrations require JS to read, and /docs is behind an auth wall.",
    impact:
      "A single Disallow line removes Rivet from a large share of ChatGPT's retrieval surface.",
    recommendation:
      "Remove the GPTBot block, add explicit allows for major AI agents, publish llms.txt, and server-render commercial content.",
  },
  {
    key: "content-structure",
    label: "Content Structure",
    score: 66,
    previous: 61,
    weight: 0.1,
    grade: "C+",
    headline: "Good long-form depth, weak extractability.",
    problem:
      "Pages are readable by humans but not chunked for machines — few headings map to questions, key claims sit inside images, strengths are buried.",
    evidence:
      "Only the blog uses clean H2/H3 question structure. Email-sequencing — a genuine differentiator — has no quotable page.",
    impact:
      "Models can't lift a clean, attributable passage, so they paraphrase competitors instead.",
    recommendation:
      "Restructure commercial pages around buyer questions, move claims into text, and add quotable statistics.",
  },
];

export const executiveSummary = {
  verdict:
    "Rivet CRM is losing the AI answer layer of its own category. The causes are fixable in weeks, not quarters.",
  story: [
    {
      stage: "Problem",
      text:
        "Buyers increasingly ask AI assistants which CRM to buy. Rivet appears in just 31% of those answers and holds 9% share of voice — 4th of 6 tracked competitors — despite competing directly on price and features.",
    },
    {
      stage: "Evidence",
      text:
        "Across 300 AI answers: Rivet was absent from 'best CRM for a small B2B sales team', its price was misreported by 3 of 5 models, robots.txt blocks GPTBot, there is no llms.txt, no Wikipedia or Wikidata entity, and 18% of pages carry structured data. 19 of 60 buyer questions have no answer on the site.",
    },
    {
      stage: "Impact",
      text:
        "Category AI search is growing ~2x year over year. At current share of voice Rivet forfeits an estimated 1,900 assisted sessions per month and ~28 pipeline opportunities per quarter to competitors that are winning the answer layer — a gap that compounds as models cache authority.",
    },
    {
      stage: "Recommendation",
      text:
        "Treat AI answer visibility as a distribution channel. Fix machine access first (crawlers, llms.txt, server-rendered pricing, schema), then close the answerability gap on the 19 unanswered questions, then build third-party authority through reviews, an entity footprint, and comparison content.",
    },
    {
      stage: "Action",
      text:
        "A sequenced 90-day plan raises the projected GEO score from 61 to 76, AI presence from 31% to ~68%, and share of voice from 9% to 15%. The first five actions are 1–2 day changes with outsized impact.",
    },
  ],
  headlineMetrics: [
    { label: "AI answer presence", value: "31%", sub: "vs 78% category leader", tone: "bad" },
    { label: "Share of voice", value: "9%", sub: "4th of 6 competitors", tone: "bad" },
    { label: "Buyer questions unanswered", value: "19 / 60", sub: "31% of tested questions", tone: "warn" },
    { label: "Structured-data coverage", value: "18%", sub: "of 214 crawled pages", tone: "warn" },
    { label: "Projected 90-day score", value: "76", sub: "from 61 today", tone: "good" },
  ],
};

/** AI Visibility — per model. presence = prompts where brand appeared / 60. */
export const aiVisibility = {
  overallPresence: 0.31,
  overallPosition: 4.3,
  overallSentiment: 0.32,
  models: [
    { model: "ChatGPT", engine: "GPT-4o", presence: 0.37, appeared: 22, of: 60, position: 4.1, sentiment: 0.34, blocked: true, note: "GPTBot is disallowed in robots.txt — presence is from training data and user browsing only." },
    { model: "Claude", engine: "Anthropic", presence: 0.42, appeared: 25, of: 60, position: 3.2, sentiment: 0.38, blocked: false, note: "Highest presence; responds well to the blog's question-structured content." },
    { model: "Perplexity", engine: "Sonar", presence: 0.30, appeared: 18, of: 60, position: 3.6, sentiment: 0.41, blocked: false, note: "Cites sources aggressively — thin citation profile hurts here." },
    { model: "Google AI Overviews", engine: "Gemini", presence: 0.23, appeared: 14, of: 60, position: 5.2, sentiment: 0.22, blocked: false, note: "Leans on knowledge graph — weak entity means frequent omission." },
    { model: "Microsoft Copilot", engine: "GPT-4 / Bing", presence: 0.20, appeared: 12, of: 60, position: 5.8, sentiment: 0.19, blocked: false, note: "Lowest presence; favours pages with clear commercial schema." },
  ],
  presenceTrend: [
    { month: "Mar", brand: 19, competitorAvg: 55 },
    { month: "Apr", brand: 21, competitorAvg: 56 },
    { month: "May", brand: 24, competitorAvg: 58 },
    { month: "Jun", brand: 26, competitorAvg: 60 },
    { month: "Jul", brand: 29, competitorAvg: 62 },
    { month: "Aug", brand: 31, competitorAvg: 63 },
  ],
  benchmark: [
    { name: "HubSpot", presence: 0.78 },
    { name: "Salesforce", presence: 0.71 },
    { name: "Pipedrive", presence: 0.52 },
    { name: "Close", presence: 0.34 },
    { name: "Rivet CRM", presence: 0.31, self: true },
    { name: "Attio", presence: 0.26 },
  ],
  intentBreakdown: [
    { intent: "Category discovery ('best CRM for…')", presence: 0.18, volume: "High" },
    { intent: "Alternative-to ('Salesforce alternative')", presence: 0.29, volume: "High" },
    { intent: "Head-to-head ('Rivet vs Pipedrive')", presence: 0.74, volume: "Medium" },
    { intent: "Branded ('Rivet CRM pricing/reviews')", presence: 0.68, volume: "Medium" },
    { intent: "Feature ('CRM with email sequencing')", presence: 0.12, volume: "Medium" },
    { intent: "Trust ('is Rivet CRM SOC 2 compliant')", presence: 0.40, volume: "Low" },
  ],
};

export const entityUnderstanding = {
  confidence: 62,
  knowledgePanel: "Partial — no logo, wrong founding year, no description",
  sources: [
    { source: "Wikipedia", status: "missing", detail: "No article. No draft." },
    { source: "Wikidata", status: "missing", detail: "No item — models have no structured anchor." },
    { source: "Google Knowledge Panel", status: "partial", detail: "Shows name + category only." },
    { source: "Crunchbase", status: "stale", detail: "Exists; funding and headcount 2 years out of date." },
    { source: "LinkedIn", status: "ok", detail: "Company page complete and consistent." },
    { source: "G2 / Capterra", status: "ok", detail: "Profiles exist; review volume low." },
  ],
  attributes: [
    { attr: "Legal / brand name", state: "correct", value: "Rivet CRM" },
    { attr: "Category", state: "correct", value: "CRM software" },
    { attr: "Founding year", state: "wrong", value: "AI says 2019 — actually 2016" },
    { attr: "Founders", state: "missing", value: "Not surfaced by any model" },
    { attr: "Headquarters", state: "missing", value: "Not surfaced (Denver, CO)" },
    { attr: "Pricing model", state: "wrong", value: "Models describe a free tier that does not exist" },
    { attr: "Key integrations", state: "partial", value: "Gmail known; Slack, HubSpot, Segment missing" },
    { attr: "Funding / stage", state: "missing", value: "Series A not attributed" },
    { attr: "Employee count", state: "wrong", value: "AI says '11–50' — actually ~140" },
  ],
  disambiguation: {
    risk: "Medium",
    collisions: [
      "Rivet — a design system / UI toolkit",
      "Rivet — a React data-fetching library",
      "rivet — a generic fastener (dictionary sense)",
    ],
    detail:
      "3 of 5 models occasionally blend Rivet CRM with the UI toolkit when the query omits 'CRM'. A disambiguating description in schema and a Wikidata item resolve most of this.",
  },
};

export const answerability = {
  tested: 60,
  fully: 22,
  partial: 19,
  none: 19,
  faqSchemaPages: 3,
  stalePagePct: 0.41,
  gaps: [
    { q: "How much is the Enterprise plan?", state: "none", note: "Price is 'contact sales' with no range; no Offer schema." },
    { q: "Where is my data stored / is there EU residency?", state: "none", note: "No data-residency page." },
    { q: "How do I migrate from Salesforce?", state: "partial", note: "One blog post, 2023, no step-by-step." },
    { q: "What are the API rate limits?", state: "none", note: "API docs behind auth wall." },
    { q: "Is Rivet HIPAA compliant?", state: "none", note: "Not mentioned anywhere." },
    { q: "What is the implementation timeline?", state: "partial", note: "Vague 'days not months' claim, no detail." },
    { q: "How does Rivet compare to Pipedrive?", state: "none", note: "No comparison page for Pipedrive." },
    { q: "Can I get a month-to-month contract?", state: "partial", note: "Implied, never stated." },
    { q: "Does Rivet do email sequencing?", state: "partial", note: "Feature exists; page is thin and unlinked." },
    { q: "What does onboarding support include?", state: "fully", note: "Clear on the pricing page comparison." },
  ],
  categories: [
    { category: "Pricing & contracts", answerable: 0.35 },
    { category: "Security & compliance", answerable: 0.28 },
    { category: "Migration & onboarding", answerable: 0.44 },
    { category: "Features & limits", answerable: 0.52 },
    { category: "Integrations", answerable: 0.4 },
    { category: "Comparisons", answerable: 0.3 },
  ],
};

/** Prompt Evidence — the "show me" section. */
export const promptEvidence = [
  {
    id: "pe-1",
    prompt: "What's the best CRM for a 20-person B2B sales team?",
    model: "ChatGPT (GPT-4o)",
    outcome: "absent",
    intent: "Category discovery",
    volume: "High",
    response:
      "For a team that size, the usual recommendations are HubSpot Sales Hub for its all-in-one approach, Pipedrive for pipeline simplicity, and Close for high-volume outbound. Salesforce is powerful but often too heavy at 20 seats…",
    citations: ["g2.com", "hubspot.com", "pipedrive.com"],
    analysis:
      "Rivet is absent from the highest-value query in the category. All four named tools have structured comparison content and strong review corpora; Rivet has neither.",
  },
  {
    id: "pe-2",
    prompt: "Rivet CRM vs Pipedrive — which is better for a small team?",
    model: "Perplexity (Sonar)",
    outcome: "mentioned-inaccurate",
    intent: "Head-to-head",
    volume: "Medium",
    response:
      "Rivet CRM offers a free tier and starts around $29/user/month, while Pipedrive starts at $14… Rivet is newer (founded 2019) and focuses on…",
    citations: ["rivetcrm.com", "reddit.com/r/sales"],
    analysis:
      "Even a branded head-to-head is mis-served: the model invents a free tier, understates the real $39 entry price, and repeats the wrong founding year. Only two thin sources are available to cite.",
  },
  {
    id: "pe-3",
    prompt: "affordable Salesforce alternative for mid-market",
    model: "Claude",
    outcome: "mentioned-weak",
    intent: "Alternative-to",
    volume: "High",
    response:
      "…other options include Zoho CRM, HubSpot, Freshsales, and Rivet CRM, which positions itself as a lighter-weight option for sales teams. Salesforce migration tooling varies by vendor.",
    citations: ["capterra.com", "trustradius.com"],
    analysis:
      "Rivet appears 5th of 6 with a generic, undifferentiated line. There is no extractable statement of what makes it a better Salesforce alternative, and the migration question is left open.",
  },
  {
    id: "pe-4",
    prompt: "Which CRM has the best native email sequencing?",
    model: "Microsoft Copilot",
    outcome: "absent",
    intent: "Feature",
    volume: "Medium",
    response:
      "Close and Outreach are frequently cited for built-in sequencing, followed by HubSpot Sales Hub. Most lighter CRMs rely on third-party tools for multi-step cadences.",
    citations: ["close.com", "g2.com"],
    analysis:
      "Sequencing is one of Rivet's genuine strengths, and it is invisible. The feature page is thin, unlinked, and has no quotable proof (no cadence stats, no examples).",
  },
  {
    id: "pe-5",
    prompt: "Is Rivet CRM SOC 2 compliant?",
    model: "Google AI Overviews (Gemini)",
    outcome: "unverifiable",
    intent: "Trust",
    volume: "Low",
    response:
      "Rivet CRM's website references security practices, but a specific, verifiable SOC 2 status could not be confirmed from available sources.",
    citations: [],
    analysis:
      "Rivet is SOC 2 Type II certified, but the claim lives inside an image on /security with no text, no schema, and no security.txt. The model cannot verify it, so it hedges.",
  },
  {
    id: "pe-6",
    prompt: "best CRM for consulting firms",
    model: "Perplexity (Sonar)",
    outcome: "competitor-favored",
    intent: "Category discovery",
    volume: "Medium",
    response:
      "For consulting firms, common picks are HubSpot (client pipeline + marketing), Salesforce with a PSA add-on, and Insightly for project-linked CRM.",
    citations: ["hubspot.com", "salesforce.com", "techrepublic.com"],
    analysis:
      "Rivet has a strong consulting case study — but it is a gated PDF with no HTML version, so it contributes nothing to this answer.",
  },
  {
    id: "pe-7",
    prompt: "how much does Rivet CRM cost?",
    model: "ChatGPT (GPT-4o)",
    outcome: "mentioned-inaccurate",
    intent: "Branded",
    volume: "Medium",
    response:
      "Rivet CRM's paid plans start at approximately $29 per user per month, with higher tiers for larger teams. Exact enterprise pricing isn't publicly listed.",
    citations: ["rivetcrm.com"],
    analysis:
      "The pricing page renders its table with JavaScript and carries no Offer schema, so the model falls back to a stale cached number. The real entry price is $39; the Growth tier ($69) is omitted entirely.",
  },
  {
    id: "pe-8",
    prompt: "Rivet CRM reviews — is it any good?",
    model: "Perplexity (Sonar)",
    outcome: "mentioned-dated",
    intent: "Branded",
    volume: "Medium",
    response:
      "Rivet CRM holds around 4.4 stars on G2 based on a modest number of reviews. A 2022 TrustRadius summary praised ease of use but noted a limited integration catalog.",
    citations: ["g2.com", "trustradius.com"],
    analysis:
      "The model leans on a 2022 summary and misses two years of product progress and new integrations. Low recent review velocity means nothing fresher is available to cite.",
  },
];

export const competitors = {
  shareOfVoice: [
    { name: "HubSpot", sov: 0.34, self: false },
    { name: "Salesforce", sov: 0.24, self: false },
    { name: "Pipedrive", sov: 0.14, self: false },
    { name: "Rivet CRM", sov: 0.09, self: true },
    { name: "Close", sov: 0.08, self: false },
    { name: "Attio", sov: 0.05, self: false },
    { name: "Others", sov: 0.06, self: false },
  ],
  sovTrend: [
    { month: "Mar", sov: 5 },
    { month: "Apr", sov: 6 },
    { month: "May", sov: 6 },
    { month: "Jun", sov: 7 },
    { month: "Jul", sov: 8 },
    { month: "Aug", sov: 9 },
  ],
  table: [
    {
      name: "HubSpot",
      presence: 0.78,
      sov: 0.34,
      sentiment: 0.52,
      knowledgePanel: "Yes",
      wikipedia: "Yes",
      citations: 214,
      edge: "llms.txt + a comparison page for every competitor + huge doc corpus",
    },
    {
      name: "Salesforce",
      presence: 0.71,
      sov: 0.24,
      sentiment: 0.33,
      knowledgePanel: "Yes",
      wikipedia: "Yes",
      citations: 168,
      edge: "Overwhelming entity authority and Trailhead learning content",
    },
    {
      name: "Pipedrive",
      presence: 0.52,
      sov: 0.14,
      sentiment: 0.44,
      knowledgePanel: "Yes",
      wikipedia: "Yes",
      citations: 96,
      edge: "Clean Offer schema on pricing + strong 'alternative to' pages",
    },
    {
      name: "Rivet CRM",
      presence: 0.31,
      sov: 0.09,
      sentiment: 0.32,
      knowledgePanel: "Partial",
      wikipedia: "No",
      citations: 51,
      edge: "Cited blog post on pipeline metrics; one strong comparison page",
      self: true,
    },
    {
      name: "Close",
      presence: 0.34,
      sov: 0.08,
      sentiment: 0.4,
      knowledgePanel: "Partial",
      wikipedia: "No",
      citations: 58,
      edge: "Exceptional blog answerability and founder-led content",
    },
    {
      name: "Attio",
      presence: 0.26,
      sov: 0.05,
      sentiment: 0.29,
      knowledgePanel: "No",
      wikipedia: "No",
      citations: 33,
      edge: "Modern schema and a public changelog — young but well-structured",
    },
  ],
  gapAnalysis: [
    "Rivet beats Attio on entity age but loses on schema completeness and changelog freshness.",
    "Rivet and Close are a similar size; Close wins answerability 0.71 to 0.42 purely on content structure.",
    "Every competitor except Rivet has a server-rendered pricing table with Offer schema.",
    "HubSpot and Pipedrive both publish a 'Rivet alternative' page. Rivet publishes neither in return.",
  ],
};

export const citations = {
  categoryTotal: 1240,
  brandCitations: 51,
  brandShare: 0.041,
  topDomains: [
    { domain: "g2.com", share: 0.18 },
    { domain: "reddit.com", share: 0.11 },
    { domain: "hubspot.com", share: 0.09 },
    { domain: "capterra.com", share: 0.07 },
    { domain: "youtube.com", share: 0.05 },
    { domain: "pipedrive.com", share: 0.04 },
    { domain: "salesforce.com", share: 0.04 },
    { domain: "rivetcrm.com", share: 0.04, self: true },
    { domain: "trustradius.com", share: 0.03 },
    { domain: "g2crowd / others", share: 0.31 },
  ],
  citedPages: [
    { page: "/blog/sales-pipeline-metrics", citations: 24, note: "Best performer — refresh stats and add author schema" },
    { page: "/compare/rivet-vs-close", citations: 14, note: "Add table markup and a visible last-updated date" },
    { page: "/ (homepage)", citations: 9, note: "Cited for the brand definition only" },
    { page: "/blog/crm-adoption-checklist", citations: 4, note: "Long tail, occasional" },
  ],
  zeroCitationPages: ["/pricing", "/security", "/integrations", "/docs", "/customers"],
  opportunities: [
    { type: "Listicle", detail: "6 'Best CRM 2026' round-ups rank 4+ competitors and omit Rivet — 2 accept vendor submissions", impact: "High" },
    { type: "Reviews", detail: "G2 review velocity is ~3/quarter; category leaders add 30–60. Target +40/quarter.", impact: "High" },
    { type: "Community", detail: "r/sales, r/CRM, r/msp mention competitors weekly; Rivet is near-absent", impact: "Medium" },
    { type: "Wikipedia / Wikidata", detail: "No entity anchor — blocks knowledge-graph citations entirely", impact: "High" },
  ],
};

export const pageFindings = [
  { url: "/", type: "Homepage", geo: 72, readable: "partial", issue: "Value prop clear, but no FAQ/HowTo schema and the hero copy ('Sales, evolved') is not extractable.", story: "Problem: models can define the brand but can't quote a benefit. Fix: add a one-line extractable positioning statement + FAQPage." },
  { url: "/pricing", type: "Commercial", geo: 38, readable: "no", issue: "Pricing table is JS-rendered; no Offer/AggregateOffer schema; Enterprise price is 'contact sales' with no range.", story: "Impact: 3 of 5 models misreport price. Fix: server-render the table and add AggregateOffer with a numeric range." },
  { url: "/product/pipelines", type: "Feature", geo: 66, readable: "partial", issue: "Good depth; missing comparison context and SoftwareApplication schema.", story: "Fix: add a 'how this compares' section and feature-level schema." },
  { url: "/product/sequences", type: "Feature", geo: 58, readable: "partial", issue: "A real differentiator, but the page is thin, orphaned (0 internal links from nav), and has no quotable metrics.", story: "Recommendation: expand with cadence benchmarks and examples; link from nav and comparison pages." },
  { url: "/security", type: "Trust", geo: 44, readable: "no", issue: "SOC 2 / GDPR claims are inside an image; no text equivalent; no security.txt.", story: "Evidence: Gemini cannot verify SOC 2. Fix: put certifications in text + add a machine-readable trust section." },
  { url: "/integrations", type: "Directory", geo: 49, readable: "partial", issue: "Directory is behind a JS search widget; individual integration pages are one paragraph each.", story: "Fix: render a static, linkable list; expand each integration page to answer 'how does X work with Rivet'." },
  { url: "/compare/rivet-vs-salesforce", type: "Comparison", geo: 63, readable: "partial", issue: "Exists but uses 2023 data, no table markup, and reads one-sided.", story: "Fix: refresh data, add a comparison table with markup, acknowledge trade-offs to build trust." },
  { url: "/compare/rivet-vs-close", type: "Comparison", geo: 70, readable: "partial", issue: "Best comparison page and it gets cited — just needs table markup and a last-updated date.", story: "This is the template. Replicate it for Pipedrive, HubSpot, and Attio." },
  { url: "/blog/sales-pipeline-metrics", type: "Content", geo: 81, readable: "yes", issue: "Strong, frequently cited. Stats are from 2024; no author schema.", story: "Recommendation: refresh the data annually, add Article + author schema to compound the citation lead." },
  { url: "/docs", type: "Documentation", geo: 35, readable: "no", issue: "Entire docs site is behind an auth wall — not crawlable. No public API reference.", story: "Impact: every API/limits question is unanswerable. Fix: make reference docs public." },
  { url: "/customers/acme-consulting", type: "Case study", geo: 55, readable: "no", issue: "Case study is a gated PDF; no HTML version exists.", story: "Fix: publish as HTML with a quotable result stat and Organization/Review schema." },
];

export const technicalGeo = {
  checks: [
    { check: "AI crawler access", score: 55, status: "fail", detail: "robots.txt contains 'User-agent: GPTBot / Disallow: /'. No explicit rules for PerplexityBot, ClaudeBot, Google-Extended, CCBot." },
    { check: "Rendering / JS dependency", score: 61, status: "warn", detail: "Pricing, integrations, and docs require JS execution to read. Non-rendering retrievers get empty content." },
    { check: "Core Web Vitals", score: 88, status: "pass", detail: "LCP 2.1s, CLS 0.04, INP 180ms — good across templates." },
    { check: "Semantic HTML", score: 70, status: "warn", detail: "Blog is clean; app-style pages use div-heavy layouts and skip heading levels." },
    { check: "Structured-data coverage", score: 34, status: "fail", detail: "18% of 214 pages carry any schema. Organization schema is incomplete." },
    { check: "Internal linking", score: 58, status: "warn", detail: "/product/sequences and /security are orphaned. No breadcrumb trail outside the blog." },
    { check: "XML sitemap", score: 62, status: "warn", detail: "Present, but 40 live pages are missing and lastmod values are stale." },
    { check: "Canonicalization", score: 90, status: "pass", detail: "Canonicals correct; no duplicate-content traps found." },
    { check: "Mobile parity", score: 92, status: "pass", detail: "Responsive; content parity between mobile and desktop." },
    { check: "security.txt / trust signals", score: 40, status: "warn", detail: "No /.well-known/security.txt; certifications not machine-readable." },
  ],
  crawlerTable: [
    { bot: "GPTBot", purpose: "ChatGPT retrieval + training", status: "Blocked", fix: "Remove the Disallow; add 'Allow: /'" },
    { bot: "OAI-SearchBot", purpose: "ChatGPT search results", status: "Not specified", fix: "Add explicit Allow" },
    { bot: "ClaudeBot", purpose: "Claude retrieval", status: "Allowed (default)", fix: "Add explicit Allow for clarity" },
    { bot: "PerplexityBot", purpose: "Perplexity answers", status: "Not specified", fix: "Add explicit Allow" },
    { bot: "Google-Extended", purpose: "Gemini / AI Overviews grounding", status: "Not specified", fix: "Add explicit Allow" },
    { bot: "CCBot", purpose: "Common Crawl (feeds many models)", status: "Not specified", fix: "Add explicit Allow" },
  ],
};

export const structuredData = {
  robotsTxt: {
    current: `User-agent: *
Disallow: /app/
Disallow: /admin/

User-agent: GPTBot
Disallow: /

Sitemap: https://rivetcrm.com/sitemap.xml`,
    recommended: `User-agent: *
Disallow: /app/
Disallow: /admin/
Allow: /

# AI answer engines — explicitly allowed
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://rivetcrm.com/sitemap.xml`,
  },
  llmsTxt: {
    status: "missing",
    recommended: `# Rivet CRM

> Rivet CRM is a CRM for mid-market B2B sales teams, founded 2016, headquartered in Denver, CO.
> Known for native multi-step email sequencing, fast implementation, and transparent pricing.

## Products
- [Pipelines](https://rivetcrm.com/product/pipelines): visual deal pipelines with automation
- [Sequences](https://rivetcrm.com/product/sequences): native multi-step email + task cadences
- [Reporting](https://rivetcrm.com/product/reporting): pipeline and forecast analytics

## Pricing
- Starter: $39 / user / month
- Growth: $69 / user / month
- Enterprise: custom (typically $95–130 / user / month), annual

## Key facts
- SOC 2 Type II certified; GDPR compliant; data residency in US or EU
- 140 employees; Series A ($22M, 2023)
- Native integrations: Gmail, Outlook, Slack, HubSpot, Segment, Zapier

## Comparisons
- [Rivet vs Salesforce](https://rivetcrm.com/compare/rivet-vs-salesforce)
- [Rivet vs Close](https://rivetcrm.com/compare/rivet-vs-close)

## Contact
- Sales: sales@rivetcrm.com
- Security: security@rivetcrm.com`,
  },
  schemaPresent: [
    { type: "Organization", state: "incomplete", detail: "No sameAs, no foundingDate, no logo, no description." },
    { type: "WebSite", state: "ok", detail: "Present with SearchAction." },
    { type: "BreadcrumbList", state: "partial", detail: "Blog only." },
  ],
  schemaMissing: [
    "Product / SoftwareApplication (site-wide)",
    "Offer / AggregateOffer (pricing)",
    "FAQPage (site-wide — currently 3 pages)",
    "AggregateRating / Review (from G2/Capterra)",
    "Article author + datePublished (most blog posts)",
    "HowTo (migration and setup guides)",
    "BreadcrumbList (site-wide)",
  ],
  recommendedSchema: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rivet CRM",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "description": "CRM for mid-market B2B sales teams with native multi-step email sequencing and transparent pricing.",
  "foundingDate": "2016",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "39",
    "highPrice": "130",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "212"
  },
  "sameAs": [
    "https://www.linkedin.com/company/rivet-crm",
    "https://www.crunchbase.com/organization/rivet-crm",
    "https://www.g2.com/products/rivet-crm",
    "https://twitter.com/rivetcrm",
    "https://en.wikipedia.org/wiki/Rivet_CRM"
  ]
}`,
};

export const actionCenter = [
  { id: 1, title: "Unblock AI crawlers in robots.txt", pillar: "Technical GEO", impact: 5, effort: 1, type: "Quick win", horizon: "0–30d", owner: "Web / DevOps", detail: "Remove 'User-agent: GPTBot / Disallow: /'. Add explicit Allow rules for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot." },
  { id: 2, title: "Publish llms.txt at the domain root", pillar: "Technical GEO", impact: 4, effort: 1, type: "Quick win", horizon: "0–30d", owner: "Content / Web", detail: "Ship the recommended llms.txt: positioning, products, pricing, key facts, comparisons, contacts." },
  { id: 3, title: "Ship complete Organization + SoftwareApplication schema", pillar: "Entity Understanding", impact: 5, effort: 2, type: "Quick win", horizon: "0–30d", owner: "Web", detail: "Add foundingDate, logo, description, sameAs (LinkedIn, Crunchbase, G2, X), AggregateRating, and AggregateOffer." },
  { id: 4, title: "Server-render the pricing table + add Offer schema", pillar: "Answerability", impact: 5, effort: 3, type: "Project", horizon: "0–30d", owner: "Frontend", detail: "Render prices in HTML, publish an Enterprise range, add AggregateOffer with lowPrice/highPrice." },
  { id: 5, title: "Add security.txt + machine-readable trust center", pillar: "Entity Understanding", impact: 3, effort: 2, type: "Quick win", horizon: "0–30d", owner: "Security / Web", detail: "Move SOC 2 / GDPR / HIPAA status into text, add /.well-known/security.txt, add a Certification section." },
  { id: 6, title: "Add FAQPage schema to the top 15 buyer-question pages", pillar: "Answerability", impact: 4, effort: 3, type: "Project", horizon: "31–60d", owner: "Content", detail: "Target the 19 unanswered questions: enterprise pricing, EU residency, Salesforce migration, API limits, HIPAA, contract terms." },
  { id: 7, title: "Publish HTML case studies (ungate the PDFs)", pillar: "Content Structure", impact: 3, effort: 3, type: "Project", horizon: "31–60d", owner: "Content", detail: "Convert the top 5 case studies to HTML with a quotable result stat and Review schema." },
  { id: 8, title: "Make /docs and the API reference public and crawlable", pillar: "Technical GEO", impact: 3, effort: 3, type: "Project", horizon: "31–60d", owner: "DevRel", detail: "Move reference docs (endpoints, rate limits, auth) outside the auth wall." },
  { id: 9, title: "Seed a Wikidata item + enforce consistent entity data", pillar: "Entity Understanding", impact: 4, effort: 4, type: "Project", horizon: "31–60d", owner: "Brand / PR", detail: "Create a Wikidata item, align name/HQ/founders across LinkedIn, Crunchbase, G2, press; pursue a Wikipedia draft." },
  { id: 10, title: "Build comparison pages: Pipedrive, HubSpot, Attio", pillar: "AI Visibility", impact: 4, effort: 4, type: "Project", horizon: "61–90d", owner: "Content / SEO", detail: "Use the rivet-vs-close template. Balanced tables, FAQ schema, last-updated dates." },
  { id: 11, title: "Launch a G2 review-velocity campaign", pillar: "Citation Visibility", impact: 4, effort: 3, type: "Project", horizon: "61–90d", owner: "Customer Marketing", detail: "In-app + lifecycle prompts targeting +40 verified reviews per quarter." },
  { id: 12, title: "Publish a quotable email-sequencing page", pillar: "Content Structure", impact: 3, effort: 2, type: "Quick win", horizon: "61–90d", owner: "Product Marketing", detail: "Cadence benchmarks, real examples, a headline stat models can lift; link from nav and every comparison page." },
];

export const roadmap = [
  {
    phase: "Phase 1",
    window: "Days 0–30",
    title: "Foundation & machine access",
    focus: "Remove the blockers that make Rivet unreadable to models.",
    actions: [1, 2, 3, 4, 5],
    kpis: [
      { label: "AI answer presence", from: "31%", to: "40%" },
      { label: "Technical GEO", from: "80", to: "90" },
      { label: "Structured-data coverage", from: "18%", to: "45%" },
    ],
    projectedScore: 66,
  },
  {
    phase: "Phase 2",
    window: "Days 31–60",
    title: "Answerability & entity",
    focus: "Give models a clean, verifiable answer to every buyer question.",
    actions: [6, 7, 8, 9],
    kpis: [
      { label: "Answerability", from: "60", to: "72" },
      { label: "Entity confidence", from: "62", to: "80" },
      { label: "Questions unanswered", from: "19", to: "7" },
    ],
    projectedScore: 71,
  },
  {
    phase: "Phase 3",
    window: "Days 61–90",
    title: "Authority & share of voice",
    focus: "Earn the third-party citations that let models trust and rank Rivet.",
    actions: [10, 11, 12],
    kpis: [
      { label: "AI Visibility", from: "55", to: "68" },
      { label: "Citation Visibility", from: "42", to: "55" },
      { label: "Share of voice", from: "9%", to: "15%" },
    ],
    projectedScore: 76,
  },
];

export const scoreProjection = [
  { day: 0, label: "Today", score: 61 },
  { day: 30, label: "Day 30", score: 66 },
  { day: 60, label: "Day 60", score: 71 },
  { day: 90, label: "Day 90", score: 76 },
];

export const methodology = {
  intro:
    "This audit measures how large language models and AI answer engines perceive, retrieve, and represent the brand. It combines live model probing, citation extraction, and a technical crawl.",
  items: [
    { label: "Audit date", value: "September 1, 2026" },
    { label: "Probing window", value: "August 25–29, 2026" },
    { label: "Prompts tested", value: "60 category, alternative-to, head-to-head, feature, branded, and trust prompts, derived from keyword research and 8 buyer interviews" },
    { label: "Models queried", value: "GPT-4o (ChatGPT), Claude (Anthropic), Perplexity (Sonar), Google AI Overviews / Gemini, Microsoft Copilot" },
    { label: "Runs", value: "Each prompt run 3× per model across 5 days — 900 raw responses aggregated to 300 answers" },
    { label: "Pages crawled", value: "214 URLs on rivetcrm.com, fetched both rendered and raw-HTML" },
    { label: "Competitor set", value: "HubSpot, Salesforce, Pipedrive, Close, Attio — selected by category overlap and AI co-occurrence" },
    { label: "Scoring", value: "Six weighted pillars (AI Visibility 25%, Answerability 20%, Entity 15%, Citation 15%, Technical 15%, Content 10%), 0–100, calibrated against a 40-brand benchmark set" },
    { label: "Citation analysis", value: "Source URLs extracted from responses where exposed (Perplexity, Copilot, AI Overviews); GPT-4o and Claude citations taken from browsing traces where present" },
  ],
  limitations: [
    "AI model outputs are non-deterministic and change frequently; presence rates carry a model-variance band of roughly ±6 points.",
    "Sentiment is assigned by a classifier with ±0.1 precision.",
    "Citation capture is partial for models that do not always expose sources.",
    "This is a demonstration dataset built for a UI showcase. It is not a real audit of Rivet CRM or any other company.",
  ],
  confidence: "Medium-High on structural and technical findings; Medium on model presence rates.",
};

/* ---------- helpers ---------- */

export const pct = (n) => `${Math.round(n * 100)}%`;
export const gradeFor = (n) => {
  if (n >= 90) return "A";
  if (n >= 80) return "B";
  if (n >= 70) return "B-";
  if (n >= 65) return "C+";
  if (n >= 55) return "C";
  if (n >= 45) return "D+";
  if (n >= 35) return "D";
  return "F";
};
export const toneColor = {
  bad: "#e5484d",
  warn: "#f5a524",
  good: "#30a46c",
};

export const auditData = {
  meta,
  score,
  pillars,
  executiveSummary,
  aiVisibility,
  entityUnderstanding,
  answerability,
  promptEvidence,
  competitors,
  citations,
  pageFindings,
  technicalGeo,
  structuredData,
  actionCenter,
  roadmap,
  scoreProjection,
  methodology,
};

export default auditData;
