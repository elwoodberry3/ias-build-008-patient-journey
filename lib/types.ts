/**
 * lib/types.ts — BuildConfig contract for the IAS build template
 * ─────────────────────────────────────────────────────────────
 * Every build page is driven by exactly one build.config.ts,
 * and every build.config.ts must satisfy this interface. The
 * type gate runs at build time (`tsc` during `next build`), so
 * a malformed config fails on Vercel before it can deploy —
 * the correct failure point for a static export.
 *
 * Governance:
 *   Article VIII — types enforced at build time; modular,
 *                  reusable, one contract for all 19 repos.
 *   Article IX   — unknowns are explicit: nullable fields and
 *                  "TODO:" strings are legal values by design,
 *                  because stated uncertainty must be shippable
 *                  and visible, never silently omitted.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * BuildStatus is defined ONCE — in components/StatusChip.tsx,
 * alongside the STATUS_META map it must never drift from.
 * Re-exported here so config typing stays a single import.
 *
 * History: a stale local copy of this union (three statuses,
 * no "planned") caused the Patient-Journey build failure on
 * 2026-07-06. Do not redefine BuildStatus in this file or
 * anywhere else.
 */
import type { BuildStatus } from "../components/StatusChip";
export type { BuildStatus };

/**
 * The four canonical system-map layers, in render order.
 * A closed union so donor-file drift (a fifth layer, a typo,
 * a renamed layer) fails compile instead of rendering wrong.
 * Builds with no LLM still declare an AI layer — its technology
 * reads "None — deterministic pipeline", which is a deliberate,
 * auditable statement, not an omission.
 */
export type LayerName = "Presentation" | "Orchestration" | "Data" | "AI";

export interface ArchitectureLayer {
  layer: LayerName;
  /** May be a "TODO: …" string — renders in the visible warning style. */
  technology: string;
  responsibility: string;
}

export interface Architecture {
  /** Real diagrams only. Stays null until one is drawn. */
  diagramSrc: string | null;
  diagramAlt: string;
  layers: ArchitectureLayer[];
  /** One string per step — numbered on render; order carries meaning. */
  flow: string[];
}

/**
 * Payload field values: JSON scalars or arrays of scalars.
 * Deliberately narrower than `unknown` so a config can't smuggle
 * functions, Dates, or nested structures the payload renderer
 * doesn't handle. Widen here first if a build genuinely needs it.
 */
export type PayloadScalar = string | number | boolean | null;
export type PayloadValue = PayloadScalar | PayloadScalar[];

export interface PayloadInput {
  /** Domain event name, e.g. "claim.intake.received". */
  event: string;
  /** ISO 8601 UTC timestamp. */
  submitted_at: string;
  /** Originating subdomain, e.g. "claims.elwoodberry.com". */
  source: string;
  /** Mock values only, MOCK-prefixed refs — labeled via `caption`. */
  fields: Record<string, PayloadValue>;
}

export interface PayloadOutput {
  status: string;
  /**
   * Null for deterministic pipelines — an honest absence.
   * A rule-based system has no confidence score to report,
   * and inventing one would violate the fabrication prohibition.
   */
  confidence: number | null;
  /** Destination, e.g. "queue:human-review" or "slack:#risk-alerts". */
  routed_to: string;
  /** Convention: ias-demo-{NNN}-{seq}. */
  audit_id: string;
}

export interface Payload {
  /** Must identify the data as mock — never ship unlabeled samples. */
  caption: string;
  input: PayloadInput;
  output: PayloadOutput;
}

export interface Demo {
  /** Null until a real demo exists — the section renders only when set. */
  embedUrl: string | null;
  videoUrl: string | null;
  note: string;
}

export interface Links {
  /** This build's own repository. */
  github: string;
  /** Route back to the portfolio index. TODO flag lives in configs until final. */
  portfolio: string;
  /** Persona-routed booking page — confirm before deep-build ships. */
  booking: string;
}

export interface BuildConfig {
  /** Zero-padded, e.g. "008" — display string, not arithmetic. */
  buildNumber: string;
  name: string;
  sector: string;
  /** Verbatim from projects.csv primary_description — site/CSV/repo never drift. */
  tagline: string;
  /**
   * Compile-time gate: only the four canonical statuses pass.
   * Upgrade path: "planned" → "preview" → "prototype" → "live".
   */
  status: BuildStatus;
  /** One string per paragraph: problem / pipeline / traceability. */
  whatItDoes: string[];
  stack: string[];
  architecture: Architecture;
  payload: Payload;
  demo: Demo;
  links: Links;
}