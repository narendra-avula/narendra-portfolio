/**
 * Case-study content. Every statement comes from the project's own source,
 * docs or the owner's resume. Sections without verified content are omitted
 * rather than filled with guesses.
 */

export type CapabilityStatus = "implemented" | "in-progress" | "experimental" | "planned";

export const statusLabel: Record<CapabilityStatus, string> = {
  implemented: "Implemented",
  "in-progress": "In progress",
  experimental: "Experimental",
  planned: "Planned",
};

export type Capability = { name: string; status: CapabilityStatus; note?: string };

/** A top-to-bottom layered diagram; each layer talks to the one below it */
export type ArchitectureLayer = { label: string; nodes: string[] };

export type CaseStudy = {
  /** Shown above the overview, e.g. confidentiality or "illustrative" notes */
  notice?: string;
  overview: string;
  problem: string;
  solution: string;
  capabilities: Capability[];
  architecture?: {
    caption: string;
    illustrative: boolean;
    layers: ArchitectureLayer[];
  };
  stack: { group: string; items: string[] }[];
  contribution: string[];
  challenges?: { title: string; detail: string }[];
  decisions?: { decision: string; reason: string }[];
  security?: string[];
  scalability?: string[];
  testing?: string[];
  lessons?: string[];
  /** Verified public links only */
  links: { label: string; href: string }[];
  /** Plain-language note about source / demo availability */
  availability: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  prepforge: {
    overview:
      "PrepForge is a job-focused career preparation platform. Each job a candidate targets becomes a preparation workspace: the resume and job description are analysed, skill gaps feed a personal plan, and practice, skill checks and mock interviews update a per-job Skill Intelligence record that decides the next best action.",
    problem:
      "Interview preparation is usually generic: question banks and chatbots that don't know which job you are preparing for or what you already know. Candidates can't tell which gaps matter for a specific role, and practice doesn't feed back into what to study next.",
    solution:
      "A continuous, job-specific loop: analysis → skill intelligence → personalised plan → learn → practice → verification → scenario → virtual interview → evaluation → next best action. Every feature reads from and writes evidence to the same per-job skill record, so preparation adapts as the candidate improves.",
    capabilities: [
      { name: "Resume (PDF/DOCX) and job description analysis", status: "implemented", note: "Deterministic skill taxonomy and alias matching" },
      { name: "Skill gap identification and per-job Skill Intelligence", status: "implemented" },
      { name: "Question bank, practice, skill checks and progress", status: "implemented" },
      { name: "Text virtual interviews with evaluation", status: "implemented" },
      { name: "Job discovery from public job boards", status: "implemented", note: "Greenhouse, Lever, Ashby, Adzuna and career-page providers" },
      { name: "Resume builder with PDF/DOCX export", status: "implemented" },
      { name: "Provider-agnostic LLM gateway", status: "implemented", note: "Gemini, OpenAI, NVIDIA and Groq adapters with fallbacks" },
      { name: "AI-assisted analysis review", status: "experimental", note: "Optional step behind a feature flag" },
      { name: "Voice interviews", status: "experimental", note: "Built behind a flag; not yet tried against a real provider" },
      { name: "RAG over learning content", status: "planned" },
      { name: "Public launch", status: "planned", note: "Email provider, CSP and data export come first" },
    ],
    architecture: {
      caption: "PrepForge application architecture",
      illustrative: false,
      layers: [
        { label: "Client", nodes: ["Next.js App Router", "React + TypeScript", "Tailwind CSS"] },
        { label: "API", nodes: ["FastAPI (routes → services → models)", "JWT auth + rate limits", "Admin APIs"] },
        { label: "Domain services", nodes: ["Analysis engine", "Skill Intelligence", "Interviews & evaluation", "Job discovery"] },
        { label: "Async & AI", nodes: ["Durable analysis queue + worker", "LLM gateway (policy, fallbacks, quotas)"] },
        { label: "Data", nodes: ["PostgreSQL", "Alembic migrations", "Daily backups"] },
      ],
    },
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "Argon2", "JWT"] },
      { group: "Data", items: ["PostgreSQL"] },
      { group: "AI", items: ["Gemini", "OpenAI", "NVIDIA API catalog", "Groq", "Versioned prompt templates"] },
      { group: "Delivery", items: ["Docker", "Docker Compose", "GitHub Actions", "Sentry-compatible error reporting"] },
    ],
    contribution: [
      "Sole designer and developer: product design, frontend, backend, data model, AI integration and deployment setup.",
      "Designed the per-job Skill Intelligence model that connects analysis, practice, checks and interviews.",
      "Built the LLM gateway so features never import a provider SDK and providers can be swapped or chained as fallbacks.",
      "Built a separate evaluation harness (prepforge-evals) that tests the analysis API against versioned synthetic datasets.",
    ],
    challenges: [
      {
        title: "Honest evidence",
        detail:
          "Practice and quiz results are evidence, not proof. Confidence only rises on first attempts, and drafts, mock AI output and self-reviews never count as evidence.",
      },
      {
        title: "Reliable AI on free tiers",
        detail:
          "Provider rate limits and outages are normal. The gateway adds a circuit breaker, per-model quotas tracked in Postgres and ordered fallbacks after timeouts, 429s and 5xx errors.",
      },
      {
        title: "Long-running analysis",
        detail:
          "Analyses run on a durable Postgres-backed queue with leases, retries and heartbeats, so a crashed worker doesn't lose work and any number of workers can run side by side.",
      },
    ],
    decisions: [
      {
        decision: "Deterministic skill matching first, AI as an optional review step",
        reason: "Results are explainable and testable, and the product doesn't claim semantic understanding it doesn't have.",
      },
      {
        decision: "FastAPI + PostgreSQL instead of a backend-as-a-service",
        reason: "A real backend from the start, fewer moving parts, and the job queue lives in the same database.",
      },
      {
        decision: "Store extracted resume text, drop the original file",
        reason: "No private files to secure and no object storage until a feature needs it.",
      },
      {
        decision: "Free-only AI policy by default",
        reason: "Only providers verified as free are used, and providers that train on prompts never receive a person's text.",
      },
    ],
    security: [
      "Passwords hashed with Argon2; server-side token revocation on logout and password change.",
      "Sign-in rate limits stored in Postgres (email hashes only), so they hold across processes and restarts.",
      "Ownership enforced on every user-owned lookup; another user's id returns 404, and a test walks every route for auth and admin gates.",
      "Production start-up refuses weak JWT secrets, default database passwords and non-https CORS origins, and hides the API docs.",
    ],
    scalability: [
      "The API is stateless and runs any number of processes behind an HTTPS proxy.",
      "Analysis workers scale horizontally and finish the current run on SIGTERM.",
      "Migrations are written to work with the previous API version during a deploy.",
      "Liveness and readiness health checks; readiness verifies the database and migration head.",
    ],
    testing: [
      "Pytest suite for the backend and Vitest for the frontend, run in GitHub Actions with lint and a production build.",
      "CI checks there is exactly one Alembic migration head.",
      "prepforge-evals: an external harness that calls PrepForge over HTTP, compares answers with versioned synthetic golden datasets and blocks regressions against a committed baseline per engine version.",
    ],
    lessons: [
      "Writing down what is built, partly built and not started (an HLD review) kept the roadmap honest.",
      "An evaluation baseline exposed real gaps: job-description skills the taxonomy didn't know were never reported missing, which led to a taxonomy pass.",
    ],
    links: [],
    availability: "Private repository, in active development. No public demo yet.",
  },

  "prepforge-academic-hub": {
    overview:
      "PrepForge Academic is a personal AI learning environment for students. It organises programmes, courses and sessions, turns uploaded study material into a personal knowledge base, and is building towards a cited AI tutor and exam preparation.",
    problem:
      "Students in work-integrated programmes juggle slides, PDFs and notes across many courses. Generic chatbots don't know their syllabus or their material, and answers without citations can't be trusted for exam preparation.",
    solution:
      "A configurable curriculum catalog (seeded with the BITS Pilani WILP M.Tech AI & ML programme from public information), a personal study plan, and a document library whose files are parsed and chunked in the background as the first stage of a retrieval pipeline. The AI tutor will answer only from the student's own material, with citations.",
    capabilities: [
      { name: "Accounts: sign-up, email verification, password reset, sessions", status: "implemented" },
      { name: "Configurable curriculum catalog with admin preview, diff and publish", status: "implemented" },
      { name: "Personal study plan: programmes, courses, sessions", status: "implemented" },
      { name: "Document library: upload, versions, downloads, deletion", status: "implemented" },
      { name: "Background parsing and chunking (PDF, DOCX, PPTX, XLSX, TXT)", status: "implemented" },
      { name: "Embeddings and hybrid retrieval", status: "in-progress" },
      { name: "AI tutor (structured teaching, cited Q&A)", status: "experimental", note: "Clearly labelled demo prototype; no AI calls yet" },
      { name: "Exam preparation, flashcards and progress analytics", status: "planned" },
    ],
    architecture: {
      caption: "PrepForge Academic: modular monolith",
      illustrative: false,
      layers: [
        { label: "Client", nodes: ["Next.js 16 (App Router, Cache Components)", "React Hook Form + Zod"] },
        { label: "API", nodes: ["FastAPI modular monolith", "auth · academic · subjects · documents · rag"] },
        { label: "Background jobs", nodes: ["Celery worker: parse → chunk → embed", "Email delivery"] },
        { label: "Data", nodes: ["PostgreSQL 17 + pgvector", "Redis (rate limits, broker)", "File storage"] },
      ],
    },
    stack: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "React Hook Form", "Zod"] },
      { group: "Backend", items: ["Python 3.12", "FastAPI", "Pydantic v2", "SQLAlchemy 2 (async)", "Alembic"] },
      { group: "Data & jobs", items: ["PostgreSQL 17", "pgvector", "Redis", "Celery"] },
      { group: "Testing", items: ["Pytest", "Vitest", "Testing Library", "Playwright", "GitHub Actions"] },
    ],
    contribution: [
      "Sole designer and developer across product, frontend, backend, data model and infrastructure.",
      "Designed the curriculum definition format so a new university programme is a JSON file, not a code change.",
      "Built the ingestion pipeline and its failure handling: idempotent tasks, retries with backoff and user-readable failure reasons.",
    ],
    challenges: [
      {
        title: "Untrusted uploads",
        detail:
          "Files are validated by extension, size and actual content (PDF magic bytes, OOXML structure, UTF-8), stored under opaque keys and hashed for de-duplication and versioning.",
      },
      {
        title: "Concurrent document versions",
        detail:
          "Processing tasks act only on the document's current version, write under a row lock and discard results if a newer version was uploaded or the document was deleted meanwhile.",
      },
      {
        title: "Structure-aware chunking",
        detail:
          "Chunks follow headings and never cross slide boundaries, and tables are kept whole where possible, so later retrieval returns coherent passages.",
      },
    ],
    decisions: [
      {
        decision: "Modular monolith, not microservices",
        reason: "One deployable until a module needs independent scaling; document processing is already isolated behind Celery.",
      },
      {
        decision: "pgvector in PostgreSQL instead of a separate vector database",
        reason: "One system of record for documents, chunks and embeddings, with owner-scoped queries.",
      },
      {
        decision: "Labelled demo content for the tutor",
        reason: "The UI can be designed and tested now without presenting unvalidated AI answers as real.",
      },
    ],
    security: [
      "The server is the only authorization boundary; private study materials never leave the backend.",
      "Argon2id password hashing; short-lived JWT access tokens with the algorithm pinned.",
      "Rotating refresh tokens in HttpOnly cookies with replay detection that revokes the whole token family.",
      "Email verification and reset tokens are single-use, hashed at rest and kept in the URL fragment so they stay out of logs.",
      "Automated isolation tests check that one student can't access another's documents.",
    ],
    testing: [
      "make check runs ruff, mypy, ESLint, tsc, Pytest (unit and integration), Vitest and a production build.",
      "Playwright end-to-end tests on desktop and mobile, plus an acceptance journey against the real API and database in CI.",
    ],
    lessons: [
      "Defining acceptance criteria per phase before building made 'done' unambiguous.",
      "Shipping the ingestion pipeline before any AI keeps the tutor grounded in real, processed material.",
    ],
    links: [],
    availability: "Private repository, in active development. No public demo yet.",
  },

  "enterprise-resiliency-engineering": {
    notice:
      "Sanitized, publicly shareable description. It contains no confidential information, and the diagram is an illustrative model of chaos engineering in general, not JPMorgan Chase's production architecture.",
    overview:
      "At JPMorgan Chase I work in resiliency engineering, building a chaos engineering framework that tests how applications behave when the infrastructure they depend on fails, across private, public and hybrid cloud environments.",
    problem:
      "Applications in a large enterprise depend on many services and run across several kinds of cloud environment. Teams need a safe, repeatable way to find out how those applications respond to failure before a real incident does it for them.",
    solution:
      "A chaos engineering framework with backend services and REST APIs for defining and running resilience experiments against applications, built as microservices, with automation and observability so the impact of each experiment can be seen.",
    capabilities: [
      { name: "Chaos experiments across private, public and hybrid cloud", status: "implemented" },
      { name: "Backend services and REST APIs (Python, Django, DRF)", status: "implemented" },
      { name: "Workflow automation with Linux and shell scripting", status: "implemented" },
    ],
    architecture: {
      caption: "How a chaos engineering platform is typically structured",
      illustrative: true,
      layers: [
        { label: "Users", nodes: ["Application teams", "CI/CD pipelines"] },
        { label: "Platform API", nodes: ["REST APIs for experiments", "Scheduling and approvals"] },
        { label: "Execution", nodes: ["Experiment runners", "Failure injection"] },
        { label: "Targets", nodes: ["Private cloud", "Public cloud", "Hybrid environments"] },
        { label: "Feedback", nodes: ["Metrics and dashboards", "Experiment reports"] },
      ],
    },
    stack: [
      { group: "Backend", items: ["Python", "Django", "Django REST Framework", "REST APIs", "Microservices"] },
      { group: "Infrastructure", items: ["Linux", "Shell scripting", "Private, public and hybrid cloud"] },
      { group: "Operations", items: ["Observability"] },
    ],
    contribution: [
      "Develop the chaos engineering framework used to test application resilience across private, public and hybrid cloud environments.",
      "Build backend services and REST APIs with Python, Django and Django REST Framework in a microservices architecture.",
      "Automate engineering workflows with Linux and shell scripting, with a focus on observability.",
    ],
    challenges: [
      {
        title: "Many kinds of environment",
        detail: "The same experiment has to work against applications in private, public and hybrid cloud.",
      },
      {
        title: "Seeing the impact",
        detail: "An experiment is only useful if its effect on the application can be observed and understood.",
      },
    ],
    links: [],
    availability: "Internal enterprise work. No source code or internal details are shared.",
  },
};
