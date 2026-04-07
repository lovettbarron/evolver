---
phase: 06-deployment
plan: 03
subsystem: infra
tags: [vercel, nextjs, deployment, demo-mode, outputFileTracingIncludes]

# Dependency graph
requires:
  - phase: 06-01
    provides: webpack canvas alias and baseline next.config.ts
  - phase: 06-02
    provides: demo mode with synthetic progress data
provides:
  - Vercel deployment configuration (vercel.json)
  - outputFileTracingIncludes bundling bundled content into serverless functions
  - prebuild hook wiring npm run bundle-content before next build
  - Local build chain verified: prebuild + build passes
affects: [06-deployment, future-deploys]

# Tech tracking
tech-stack:
  added: [vercel.json, outputFileTracingIncludes]
  patterns:
    - prebuild hook pattern: npm run bundle-content always runs before next build
    - outputFileTracingIncludes for dynamic fs.readdirSync paths in serverless functions

key-files:
  created: [vercel.json]
  modified: [next.config.ts, package.json]

key-decisions:
  - "vercel.json buildCommand chains prebuild + build so content bundling always runs on Vercel"
  - "outputFileTracingIncludes targets ./src/content/**/* to force Node File Tracer to include all sessions/patches/instruments/references"
  - "Deployment deferred to user — Vercel CLI auth not available in executor environment"

patterns-established:
  - "prebuild hook: npm run bundle-content called before every build, local and CI"
  - "outputFileTracingIncludes: required pattern for any Next.js app with dynamic fs reads in serverless"

requirements-completed: [DEPL-02]

# Metrics
duration: ~10min
completed: 2026-03-30
---

# Phase 06 Plan 03: Vercel Deployment Config Summary

**Next.js configured with outputFileTracingIncludes for bundled content, prebuild hook wired, vercel.json created — local build passes; Vercel deployment deferred to user (Vercel CLI auth gate)**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-03-30T18:30:00Z
- **Completed:** 2026-03-30T18:43:58Z
- **Tasks:** 1 of 2 completed (Task 2 deferred)
- **Files modified:** 3

## Accomplishments
- Added `"prebuild": "npm run bundle-content"` to package.json scripts — content bundling runs automatically before every build
- Updated next.config.ts with `outputFileTracingIncludes` targeting `./src/content/**/*` — ensures sessions, patches, instruments, and references are bundled into serverless functions
- Created vercel.json with `buildCommand: "npm run prebuild && npm run build"` and `framework: "nextjs"`
- Verified local build chain: `npm run prebuild && npm run build` exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure Vercel deployment and deploy** - `28b9230` (feat)
2. **Task 2: Verify deployed demo** - deferred — user will deploy manually from repo

**Plan metadata:** (this commit)

## Files Created/Modified
- `vercel.json` - Vercel project config: buildCommand chains prebuild+build, framework hint nextjs
- `next.config.ts` - Added outputFileTracingIncludes for ./src/content/**/* alongside webpack canvas alias
- `package.json` - Added prebuild script calling npm run bundle-content

## Decisions Made
- `outputFileTracingIncludes` is required because `reader.ts` uses `fs.readdirSync` at runtime — without it, Next.js Node File Tracer cannot statically trace these paths and deployed serverless functions serve empty content
- vercel.json `buildCommand` explicitly chains prebuild to ensure content is populated even if Vercel's default build command is used
- Deployment deferred to user because Vercel CLI requires interactive browser auth that cannot be automated in executor environment

## Deviations from Plan

### Auth Gate (not a bug)

**Vercel CLI auth gate — deployment deferred to user**
- **Found during:** Task 1 (step 5: npx vercel --yes)
- **Issue:** Vercel CLI requires authenticated session via browser OAuth — not available in executor environment
- **Action taken:** Completed all configuration steps (next.config.ts, package.json, vercel.json), verified local build, stopped at deployment step
- **User action required:** Run `npx vercel --yes` then `npx vercel --prod --yes` from repo root to deploy
- **All acceptance criteria except live URL are met** — local build chain passes

---

**Total deviations:** 1 auth gate (not an auto-fixable issue — requires user browser session)
**Impact on plan:** Task 1 configuration complete and verified. Task 2 human-verify checkpoint is moot until user deploys. No scope creep.

## Issues Encountered
- Vercel CLI interactive auth is an authentication gate — cannot be automated. Deployment configuration is fully complete and verified locally; user runs two commands to deploy.

## User Setup Required

To complete deployment, run from the project root:

```bash
npx vercel --yes
npx vercel --prod --yes
```

Then verify the deployed demo per the Task 2 checklist in 06-03-PLAN.md:
1. Nav shows "Demo" badge
2. Sessions page: 35 sessions grouped by module
3. Patches page: patch cards with type filter working
4. Progress page: 21 sessions done, 6 modules complete
5. Footer: "Run it yourself" link visible
6. About page: "Run It Yourself" section present

## Next Phase Readiness
- All deployment configuration is complete and committed
- Local build passes — the app is ready to deploy
- User runs `npx vercel --prod --yes` to go live
- Phase 6 (Deployment) is functionally complete pending that single deploy command

---
*Phase: 06-deployment*
*Completed: 2026-03-30*
