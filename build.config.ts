/**
 * build.config.ts — BUILD 008 · Patient Journey Automations
 * ─────────────────────────────────────────────────────────────
 * Repo: ias-build-008-patient-journey
 * URL:  patient-journey.elwoodberry.com
 * Sector: Healthcare Operations & Medical Billing
 *
 * THE ONLY FILE EDITED FOR THIS BUILD.
 *
 * Governance (Article IX): no fabricated data. Every unknown
 * value stays as an explicit "TODO:" string — the page renders
 * TODO values in a visible warning style so they cannot ship
 * silently.
 * ─────────────────────────────────────────────────────────────
 */

import type { BuildConfig } from "./lib/types";

export const buildConfig: BuildConfig = {
  // ── Identity ─────────────────────────────────────────────
  buildNumber: "008",
  name: "Patient Journey Automations",
  sector: "Healthcare Operations & Medical Billing",

  // Verbatim from projects.csv (primary_description) —
  // site + CSV + repo never drift.
  tagline:
    "Automates intake forms, AI-driven scheduling coordination, and conditional post-visit care reminders without front-desk involvement.",

  // ── Status (honest, always) ──────────────────────────────
  // Upgrade path: "planned" → "preview" → "prototype" → "live"
  // as the deep-build ships. One word, push to main, auto-deploys.
  status: "planned",

  // ── What it does ─────────────────────────────────────────
  // One string per paragraph — the page renders each as its
  // own <p>. Problem / pipeline / traceability.
  whatItDoes: [
    "Front desks spend the day on intake forms, scheduling phone tag, and follow-up reminders that never get sent.",
    "This workflow handles digital intake, AI-assisted scheduling coordination, and conditional post-visit care reminder sequences — zero front-desk touchpoints from first contact through discharge follow-up.",
    "Every message and scheduling decision is logged per patient, so the journey is auditable end to end.",
  ],

  // ── Stack ────────────────────────────────────────────────
  stack: ["n8n", "OpenAI API", "Next.js", "Vercel"],

  // ── Architecture ─────────────────────────────────────────
  architecture: {
    // Real diagrams only. Stays null until one is drawn —
    // the page renders the system-map table alone.
    diagramSrc: null,
    diagramAlt: "TODO: describe the diagram for screen readers",

    layers: [
      {
        layer: "Presentation",
        technology: "Next.js on Vercel",
        responsibility:
          "Build page, intake form UI, journey timeline and payload rendering",
      },
      {
        layer: "Orchestration",
        // Demos run on n8n Cloud. The identical workflows deploy
        // self-hosted or in a client's VPC for regulated
        // production — the /workflows export is the portable
        // artifact. Never state "self-hosted" as current fact.
        technology: "n8n (cloud-hosted)",
        responsibility:
          "Intake processing, AI-assisted scheduling coordination, conditional reminder sequencing",
      },
      {
        layer: "Data",
        // Storage + queue selection pending deep-build.
        // Stated uncertainty beats invented detail.
        technology: "TODO: scheduling system + patient record store pending deep-build",
        responsibility:
          "TODO: intake records, appointment state, reminder sequences, per-patient audit log",
      },
      {
        layer: "AI",
        technology: "OpenAI API (schema-validated calls)",
        responsibility:
          "Scheduling coordination assistance and reminder-sequence condition evaluation",
      },
    ],

    // One string per step — numbered on render because order
    // carries meaning: this is the sequence a record travels.
    flow: [
      "Patient submits digital intake",
      "record created",
      "AI-assisted scheduling proposes slots against provider availability",
      "appointment confirmed",
      "visit completes",
      "conditional post-visit reminder sequence fires per care plan",
      "every message and decision logged per patient",
    ],
  },

  // ── Sample payload ───────────────────────────────────────
  // Real production schema, mock values, labeled as mock.
  payload: {
    caption: "// mock data — representative of production schema",
    input: {
      event: "patient.intake.submitted",
      submitted_at: "2026-07-05T15:02:00Z",
      source: "patient-journey.elwoodberry.com",
      fields: {
        intake_ref: "MOCK-INT-2026-0342", visit_type: "follow-up", care_plan: "post-op-knee", preferred_window: "mornings"
      },
    },
    output: {
      status: "scheduled",
      confidence: 0.88,
      routed_to: "calendar:provider-mock-07",
      audit_id: "ias-demo-008-0001",
    },
  },

  // ── Live demo slot ───────────────────────────────────────
  // Renders only when a real demo exists. Demo Mode (cached
  // representative responses) is the default for public
  // traffic — protects demo reliability and n8n Cloud
  // execution quota.
  demo: {
    embedUrl: null,
    videoUrl: null,
    note: "Demo Mode serves cached representative responses to public traffic; live mode is enabled per session.",
  },

  // ── Links ────────────────────────────────────────────────
  links: {
    github: "https://github.com/elwoodberry3/ias-build-008-patient-journey",
    // Decision pending: master CSV stores the build's own deploy
    // URL here; the page needs a route BACK to the portfolio
    // index. Root used until the portfolio index URL is final.
    portfolio: "https://elwoodberry.com", // TODO: confirm portfolio index URL
    // TODO: confirm /contact is the persona-routed booking page,
    // not a generic contact form, before deep-build ships.
    booking: "https://elwoodberry.com/contact",
  },
};
