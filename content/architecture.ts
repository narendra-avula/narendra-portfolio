import type { DiagramSpec } from "@/lib/diagram";

/**
 * Architecture Lab content. Every page is an illustrative reference design
 * built from general engineering practice. None of them describes an
 * employer's or client's production system, and none contains metrics.
 */

export type ArchitecturePage = {
  slug: string;
  title: string;
  /** One line for cards and metadata */
  summary: string;
  tags: string[];
  /** Why the pattern matters and where it shows up in my work */
  context: string;
  /** Project slugs this design relates to */
  relatedProjects: string[];
  diagram: DiagramSpec;
  /** The main request or data flow, in order */
  flow: { step: string; detail: string }[];
  /** Trust, ownership and failure boundaries */
  boundaries: { name: string; detail: string }[];
  failureHandling: { failure: string; response: string }[];
  tradeoffs: { decision: string; gain: string; cost: string }[];
};

export const illustrativeNotice =
  "Illustrative reference design built from general engineering practice. It is not the architecture of any employer's or client's production system.";

export const architectures: ArchitecturePage[] = [
  {
    slug: "rag-pipeline",
    title: "Retrieval-Augmented Generation pipeline",
    summary:
      "Grounding LLM answers in a private document library: ingestion, hybrid retrieval, re-ranking and cited answers.",
    tags: ["RAG", "LLMs", "pgvector", "Hybrid search"],
    context:
      "An LLM on its own answers from training data and can't see a user's documents. RAG retrieves the relevant passages first and asks the model to answer only from them, with citations. This is the direction of the AI tutor in PrepForge Academic Hub, whose ingestion pipeline (parse → chunk → embed) feeds the retrieval layer.",
    relatedProjects: ["prepforge-academic-hub", "checkmate"],
    diagram: {
      title: "RAG pipeline: ingestion and query paths",
      description:
        "Documents are parsed, chunked, embedded and indexed. A question is embedded with the user's access scope, hybrid retrieval finds candidate chunks in the index, a re-ranker keeps the best, a prompt is built, the LLM answers, and a citation check runs before the answer is returned.",
      nodes: [
        { id: "docs", label: "Documents", sub: "PDF, DOCX, slides, text", col: 0, row: 0, kind: "actor" },
        { id: "chunk", label: "Parse & chunk", sub: "Structure-aware", col: 1, row: 0 },
        { id: "embed", label: "Embed chunks", sub: "Background worker", col: 2, row: 0, kind: "queue" },
        { id: "index", label: "Vector + text index", sub: "pgvector, full-text", col: 3, row: 0, kind: "store" },
        { id: "question", label: "User question", col: 0, row: 1, kind: "actor" },
        { id: "query", label: "Embed query", sub: "Scoped to the user", col: 1, row: 1 },
        { id: "retrieve", label: "Hybrid retrieval", sub: "Vector + keyword", col: 2, row: 1 },
        { id: "rerank", label: "Re-rank", sub: "Keep the best few", col: 3, row: 1 },
        { id: "answer", label: "Answer + citations", col: 0, row: 2, kind: "actor" },
        { id: "check", label: "Citation check", sub: "Refuse if unsupported", col: 1, row: 2, kind: "control" },
        { id: "llm", label: "LLM provider", sub: "Via a gateway", col: 2, row: 2, kind: "external" },
        { id: "prompt", label: "Build prompt", sub: "Passages as data", col: 3, row: 2 },
      ],
      edges: [
        { from: "docs", to: "chunk" },
        { from: "chunk", to: "embed", style: "async" },
        { from: "embed", to: "index" },
        { from: "question", to: "query" },
        { from: "query", to: "retrieve" },
        { from: "index", to: "retrieve", label: "candidates" },
        { from: "retrieve", to: "rerank" },
        { from: "rerank", to: "prompt" },
        { from: "prompt", to: "llm" },
        { from: "llm", to: "check" },
        { from: "check", to: "answer" },
      ],
      groups: [
        { label: "Ingestion (background)", nodes: ["docs", "chunk", "embed", "index"] },
        { label: "Query (per request)", nodes: ["question", "query", "retrieve", "rerank", "answer", "check", "llm", "prompt"] },
      ],
    },
    flow: [
      { step: "Ingest", detail: "Uploaded files are validated, parsed and split along headings, slides and tables so each chunk is a coherent passage." },
      { step: "Index", detail: "A background worker embeds each chunk and stores the vector beside its text, owner and document version." },
      { step: "Scope the query", detail: "The question is embedded and every lookup is filtered to documents the user is allowed to read." },
      { step: "Retrieve", detail: "Vector similarity and keyword search run together, so exact terms such as error codes still match." },
      { step: "Re-rank", detail: "A re-ranker orders the candidates by relevance and only the top few go into the prompt." },
      { step: "Generate", detail: "The prompt carries the passages as quoted data with their sources; the model must answer from them." },
      { step: "Check", detail: "Each claim must cite a retrieved passage. If nothing relevant was found, the answer says so instead of guessing." },
    ],
    boundaries: [
      { name: "User data boundary", detail: "Retrieval is owner-scoped in the database query itself, not filtered afterwards, so one user's chunks never reach another user's prompt." },
      { name: "Model provider boundary", detail: "Only the selected passages leave the system, through one gateway that handles keys, quotas and provider choice." },
      { name: "Ingestion vs query", detail: "Heavy parsing and embedding run in background jobs; the request path only reads the index." },
    ],
    failureHandling: [
      { failure: "No relevant passages", response: "Return \"not found in your documents\" rather than letting the model answer from general knowledge." },
      { failure: "LLM provider error or timeout", response: "Retry once, then fall back to another provider through the gateway; show a clear error if none responds." },
      { failure: "Document replaced mid-processing", response: "Jobs act only on the current document version and discard results for an outdated one." },
      { failure: "Instructions hidden in a document", response: "Retrieved text is marked as untrusted data in the prompt, and the system prompt tells the model never to follow it." },
    ],
    tradeoffs: [
      { decision: "pgvector inside PostgreSQL", gain: "One system of record for documents, chunks and embeddings, and access rules in plain SQL.", cost: "A dedicated vector database may scale further for very large corpora." },
      { decision: "Hybrid instead of vector-only search", gain: "Exact identifiers and rare terms are found reliably.", cost: "Two result lists must be merged and tuned." },
      { decision: "A re-ranking step", gain: "Fewer, better passages, so prompts are smaller and answers more focused.", cost: "Extra latency on every question." },
    ],
  },

  {
    slug: "ai-code-review-pipeline",
    title: "AI-assisted code review pipeline",
    summary:
      "Combining static analysis, security scanning and an LLM reviewer grounded in project guidelines into one set of review comments.",
    tags: ["LLMs", "Static analysis", "Security scanning", "RAG"],
    context:
      "LLM reviewers catch design and readability issues that linters miss, but they are slower, cost money and can be wrong. Deterministic tools are fast and precise but narrow. This design runs both and merges the results. It is the model behind CheckMate, my AI-assisted code review project.",
    relatedProjects: ["checkmate"],
    diagram: {
      title: "AI-assisted code review: deterministic checks and LLM review in parallel",
      description:
        "A pull request event reaches the review orchestrator, which runs static analysis and a security scan and, in parallel, builds diff context from the project's guidelines for an LLM reviewer. A findings aggregator merges all results and posts review comments on the pull request.",
      nodes: [
        { id: "pr", label: "Pull request event", sub: "Webhook", col: 0, row: 1, kind: "actor" },
        { id: "orch", label: "Review orchestrator", sub: "One run per commit", col: 1, row: 1, kind: "control" },
        { id: "static", label: "Static analysis", sub: "Linters, type checks", col: 2, row: 0 },
        { id: "security", label: "Security scan", sub: "Secrets, risky calls", col: 2, row: 1 },
        { id: "kb", label: "Project guidelines", sub: "Indexed for retrieval", col: 1, row: 2, kind: "store" },
        { id: "context", label: "Context builder", sub: "Diff + retrieved rules", col: 2, row: 2 },
        { id: "llm", label: "LLM reviewer", sub: "Via a gateway", col: 3, row: 2, kind: "external" },
        { id: "agg", label: "Findings aggregator", sub: "Dedupe, rank, filter", col: 4, row: 1, kind: "control" },
        { id: "comments", label: "Review comments", sub: "Inline + summary", col: 4, row: 2, kind: "actor" },
      ],
      edges: [
        { from: "pr", to: "orch" },
        { from: "orch", to: "static" },
        { from: "orch", to: "security" },
        { from: "orch", to: "context", style: "async" },
        { from: "kb", to: "context" },
        { from: "context", to: "llm" },
        { from: "static", to: "agg" },
        { from: "security", to: "agg" },
        { from: "llm", to: "agg" },
        { from: "agg", to: "comments" },
      ],
      groups: [
        { label: "Deterministic checks", nodes: ["static", "security"] },
        { label: "AI review", nodes: ["kb", "context", "llm"] },
      ],
    },
    flow: [
      { step: "Receive the event", detail: "A pull request webhook is verified and keyed by repository and commit, so a redelivered event doesn't start a second review." },
      { step: "Run deterministic checks", detail: "Static analysis and a security scan run on the changed files and produce precise, line-level findings." },
      { step: "Build context", detail: "The diff is split per file and combined with the project's own guidelines, retrieved from an index, so the model reviews against house rules." },
      { step: "LLM review", detail: "The model returns structured findings (file, line, severity, explanation), not free text." },
      { step: "Aggregate", detail: "Findings are de-duplicated against the deterministic tools, ranked by severity, and low-confidence items are dropped." },
      { step: "Report", detail: "Inline comments plus one summary comment are posted back to the pull request." },
    ],
    boundaries: [
      { name: "Source code boundary", detail: "Code leaves the system only through the LLM gateway, after likely secrets are redacted; a self-hosted model can replace the provider for sensitive repositories." },
      { name: "Advisory, not blocking", detail: "AI findings are suggestions. Only deterministic checks are allowed to fail a build." },
      { name: "Tool isolation", detail: "Each analyser runs on its own, so one crashing tool doesn't stop the rest of the review." },
    ],
    failureHandling: [
      { failure: "LLM times out or errors", response: "Post the deterministic findings anyway and note that the AI review was skipped." },
      { failure: "Very large diff", response: "Review per file within a size budget, and say which files were not reviewed." },
      { failure: "Duplicate webhook delivery", response: "The commit-level key makes the second run a no-op." },
      { failure: "Noisy or wrong AI comments", response: "Structured output, a confidence threshold and de-duplication keep only specific, located findings." },
    ],
    tradeoffs: [
      { decision: "Run deterministic tools and the LLM side by side", gain: "Precise findings arrive quickly while the LLM covers what the tools can't see.", cost: "Results from different sources must be reconciled." },
      { decision: "Retrieve project guidelines", gain: "Reviews follow the team's own conventions rather than generic advice.", cost: "The guideline index has to be kept current." },
      { decision: "Structured findings instead of prose", gain: "Comments can be placed on exact lines, de-duplicated and filtered.", cost: "Stricter prompts and output validation." },
    ],
  },

  {
    slug: "event-driven-microservices",
    title: "Event-driven microservices with a message broker",
    summary:
      "Synchronous APIs for requests, a message broker for side effects, and the patterns that keep it reliable: idempotent consumers, retries and dead-letter queues.",
    tags: ["Microservices", "RabbitMQ", "Django", "REST APIs"],
    context:
      "Order flows touch billing, notifications and third-party systems that can be slow or unavailable. Doing all of that inside one request makes every dependency a point of failure for the user. I built Django microservices with RabbitMQ messaging for a telecom BSS platform; this page is a general version of that pattern, not that platform's design.",
    relatedProjects: ["telecom-bss-platform"],
    diagram: {
      title: "Event-driven microservices: request path and asynchronous consumers",
      description:
        "Order channels call an API gateway that routes to customer, order and catalog services, each with its own database. The order service publishes events to a message broker. A billing integration consumer calls an external payment system, a notification consumer sends messages, and messages that keep failing move to a dead-letter queue.",
      nodes: [
        { id: "channels", label: "Order channels", sub: "Web, CRM, partners", col: 0, row: 1, kind: "actor" },
        { id: "gateway", label: "API gateway", sub: "Auth, routing, limits", col: 1, row: 1, kind: "control" },
        { id: "customer", label: "Customer service", sub: "Own database", col: 2, row: 0 },
        { id: "order", label: "Order service", sub: "Own database + outbox", col: 2, row: 1 },
        { id: "catalog", label: "Catalog service", sub: "Own database", col: 2, row: 2 },
        { id: "broker", label: "Message broker", sub: "RabbitMQ exchange", col: 3, row: 1, kind: "queue" },
        { id: "billing", label: "Billing consumer", sub: "Idempotent handler", col: 3, row: 0 },
        { id: "payments", label: "Payment system", sub: "Third party", col: 4, row: 0, kind: "external" },
        { id: "notify", label: "Notification consumer", sub: "Email, SMS", col: 3, row: 2 },
        { id: "dlq", label: "Dead-letter queue", sub: "Inspect and replay", col: 4, row: 2, kind: "store" },
      ],
      edges: [
        { from: "channels", to: "gateway" },
        { from: "gateway", to: "customer" },
        { from: "gateway", to: "order" },
        { from: "gateway", to: "catalog" },
        { from: "order", to: "broker", style: "async" },
        { from: "broker", to: "billing", style: "async" },
        { from: "broker", to: "notify", style: "async" },
        { from: "billing", to: "payments" },
        { from: "broker", to: "dlq", label: "retries used", style: "failure" },
      ],
      groups: [{ label: "Services (each owns its data)", nodes: ["customer", "order", "catalog"] }],
    },
    flow: [
      { step: "Accept the request", detail: "The gateway authenticates the caller and routes the request to the service that owns the data." },
      { step: "Commit locally", detail: "The order service writes the order and an outbox record in the same database transaction." },
      { step: "Publish", detail: "A relay publishes outbox records to the broker, so an event is never lost if the service crashes after committing." },
      { step: "Respond", detail: "The user gets a response as soon as the order is stored; billing and notifications happen asynchronously." },
      { step: "Consume", detail: "Consumers process events and acknowledge them only after the work succeeds." },
      { step: "Retry or park", detail: "Failed messages are retried with backoff; after the retry limit they move to a dead-letter queue for inspection and replay." },
    ],
    boundaries: [
      { name: "Data ownership", detail: "Each service owns its database. Other services use its API or its events, never its tables." },
      { name: "Synchronous vs asynchronous", detail: "Only work the user must wait for is on the request path; everything else is an event." },
      { name: "Third-party boundary", detail: "External systems are reached only through dedicated consumers with timeouts, so their failures stay contained." },
    ],
    failureHandling: [
      { failure: "Consumer crashes mid-message", response: "The message wasn't acknowledged, so the broker redelivers it; handlers are idempotent, keyed by event ID." },
      { failure: "Poison message", response: "After a fixed number of attempts it goes to the dead-letter queue instead of blocking the queue." },
      { failure: "Slow or failing third party", response: "Calls have timeouts and retries with backoff, and a circuit breaker stops calls while the system is down." },
      { failure: "Service crashes after commit, before publish", response: "The outbox relay publishes the event when the service recovers." },
    ],
    tradeoffs: [
      { decision: "Events for side effects", gain: "Users aren't blocked by billing or notification delays, and new consumers can be added without changing the order service.", cost: "Eventual consistency: other services see the order a moment later." },
      { decision: "Transactional outbox", gain: "No lost or phantom events.", cost: "An extra table and a relay process to run." },
      { decision: "At-least-once delivery", gain: "Simple and reliable with standard broker features.", cost: "Every consumer must handle duplicates." },
    ],
  },

  {
    slug: "chaos-engineering-platform",
    title: "Chaos engineering experiment platform",
    summary:
      "Running controlled failure experiments safely: hypothesis, guardrails, time-boxed fault injection, steady-state checks and automatic rollback.",
    tags: ["Chaos engineering", "Resiliency", "Observability", "Cloud"],
    context:
      "Chaos engineering finds out how an application behaves when its dependencies fail, on purpose and under control, before a real incident does. My work at JPMorgan Chase is in this area. This page is a general model of how such a platform can work, not JPMorgan Chase's architecture.",
    relatedProjects: ["enterprise-resiliency-engineering"],
    diagram: {
      title: "Chaos experiment lifecycle with automatic abort",
      description:
        "An experiment definition passes guardrails and approval, then a runner starts a time-boxed fault injector against the target application. The application's telemetry goes to observability, a steady-state check compares it with the hypothesis and either produces a report or, on a breach, triggers halt and rollback on the target.",
      nodes: [
        { id: "define", label: "Experiment definition", sub: "Hypothesis, blast radius", col: 0, row: 0, kind: "actor" },
        { id: "guard", label: "Guardrails & approval", sub: "Scope, timing, owners", col: 1, row: 0, kind: "control" },
        { id: "runner", label: "Experiment runner", sub: "Schedules and tracks", col: 2, row: 0 },
        { id: "inject", label: "Fault injector", sub: "Time-boxed, self-reverting", col: 3, row: 0 },
        { id: "target", label: "Target application", sub: "Private, public or hybrid", col: 3, row: 1, kind: "external" },
        { id: "obs", label: "Observability", sub: "Metrics, logs, traces", col: 2, row: 1, kind: "store" },
        { id: "check", label: "Steady-state check", sub: "Compare to hypothesis", col: 1, row: 1, kind: "control" },
        { id: "report", label: "Experiment report", sub: "Findings, follow-ups", col: 0, row: 1, kind: "actor" },
        { id: "halt", label: "Halt & roll back", sub: "On any breach", col: 3, row: 2, kind: "control" },
      ],
      edges: [
        { from: "define", to: "guard" },
        { from: "guard", to: "runner" },
        { from: "runner", to: "inject" },
        { from: "inject", to: "target", label: "inject fault" },
        { from: "target", to: "obs" },
        { from: "obs", to: "check" },
        { from: "check", to: "report" },
        { from: "check", to: "halt", label: "breach", style: "failure" },
        { from: "halt", to: "target", label: "revert", style: "failure" },
      ],
      groups: [
        { label: "Control plane", nodes: ["define", "guard", "runner"] },
        { label: "Target environment", nodes: ["inject", "target"] },
      ],
    },
    flow: [
      { step: "State a hypothesis", detail: "For example: \"if one dependency becomes slow, the application degrades gracefully and recovers.\" Define steady state with signals the team already monitors." },
      { step: "Limit the blast radius", detail: "Choose the smallest scope that tests the hypothesis: one service, one instance, a short window." },
      { step: "Pass guardrails", detail: "Check the target is in scope, the timing is allowed and owners have approved; refuse to start without a healthy baseline." },
      { step: "Inject", detail: "Start a time-boxed fault, such as latency, an error rate or a stopped process, that reverts by itself when its time is up." },
      { step: "Watch", detail: "Compare live telemetry with the steady-state definition throughout the experiment." },
      { step: "Stop or conclude", detail: "On a breach, halt and roll back immediately; otherwise end on schedule and record what was learned." },
    ],
    boundaries: [
      { name: "Blast radius", detail: "Every experiment declares its scope up front, and the injector refuses targets outside it." },
      { name: "Control plane vs targets", detail: "The control plane decides and records; agents in each environment only carry out time-boxed instructions." },
      { name: "Environment boundaries", detail: "Private, public and hybrid cloud need different injection mechanisms behind one experiment definition." },
    ],
    failureHandling: [
      { failure: "Impact exceeds the hypothesis", response: "The steady-state check triggers halt and rollback without waiting for a person." },
      { failure: "Injector loses contact with the control plane", response: "Faults expire on their own timer, so a lost connection can't leave a fault running." },
      { failure: "Telemetry missing or delayed", response: "No data counts as unsafe: the experiment won't start, or it stops." },
      { failure: "Real incident during an experiment", response: "A global stop halts all running experiments so they don't add noise to the incident." },
    ],
    tradeoffs: [
      { decision: "Self-reverting, time-boxed faults", gain: "Safe even when the platform itself fails.", cost: "Long-running scenarios need several chained experiments." },
      { decision: "Automatic abort on steady-state breach", gain: "Limits harm and makes teams more willing to experiment.", cost: "Steady-state signals must be chosen carefully, or experiments stop on noise." },
      { decision: "Start small, widen gradually", gain: "Builds confidence and keeps risk low.", cost: "Some system-wide weaknesses only show up at larger scopes, later." },
    ],
  },
];

export const getArchitecture = (slug: string) => architectures.find((a) => a.slug === slug);
