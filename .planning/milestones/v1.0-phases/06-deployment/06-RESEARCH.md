# Phase 6: Deployment - Research

**Researched:** 2026-03-29
**Domain:** Next.js 16 Vercel deployment, local vault mode, demo mode onboarding
**Confidence:** HIGH

## Summary

This phase covers deploying the PM Toolkit Next.js 16 monorepo to Vercel so the app runs in demo mode with curated content for external viewers, while preserving the local development experience where the app reads from the user's real Obsidian vault. The project already has the foundational pieces in place: a `demo-content/` directory with 81 curated markdown files (from Phase 116), a `getConfig()` function that auto-detects demo mode when no vault path is configured, demo mode guards on all server action mutations, and `outputFileTracingIncludes` in `next.config.ts` to bundle demo content into serverless functions.

The primary challenges are: (1) better-sqlite3 is a native C++ addon that requires special handling in serverless environments -- Vercel's ephemeral filesystem means SQLite databases (usage tracking, feedback) must degrade gracefully; (2) the pnpm monorepo with 8 workspace packages needs correct build configuration; (3) Puppeteer/Chromium for PDF export needs `@sparticuz/chromium-min` for serverless compatibility (already a dependency); (4) the `git clone && npm install && npm run dev` onboarding path must start in demo mode with zero configuration.

**Primary recommendation:** Use Vercel's GitHub integration for automatic deployments. The app is already structured for demo-mode fallback -- the main work is verifying the build succeeds on Vercel, handling native module edge cases, and validating the end-to-end demo experience.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DEPL-01 | Running the app locally with a configured vault path shows real sessions, patches, and progress from the user's Obsidian vault | Config loader (`src/lib/content/config.ts`) already resolves `vaultPath` from `pmtoolkit.config.json` and reads vault content. Local dev with `pnpm dev` and a valid config works today. Verify with integration check. |
| DEPL-02 | The Vercel deployment shows the full demo content with all features visible in demo mode | `outputFileTracingIncludes` bundles `demo-content/**/*` into serverless functions. Demo mode auto-activates when no vault path. SQLite DBs (usage, feedback) need graceful null returns on Vercel. |
| DEPL-03 | Reference PDFs are accessible in both local and demo modes | PDF export uses `@sparticuz/chromium-min` for serverless Chromium. Verify Chromium binary downloads work on Vercel. Static PDF assets (if any) go in `public/`. |
| DEPL-04 | A clean `git clone && npm install && npm run dev` with no vault path configured starts in demo mode with all features visible | No `pmtoolkit.config.json` in repo (gitignored). `getConfig()` returns `demoMode: true` and `contentRoot: demo-content/` when config is missing. All features must render with demo content. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (installed) | App framework with App Router | Already the project framework |
| Vercel Platform | latest | Hosting with serverless functions | Native Next.js support, zero-config for standard deployments |
| pnpm | 10.29.1 (declared) | Package manager / monorepo workspace | Already the project package manager |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| better-sqlite3 | 12.8.0 (installed) | SQLite for usage/feedback DBs | Already used; needs serverExternalPackages config (done) |
| @sparticuz/chromium-min | 143.0.4 (installed) | Serverless Chromium for PDF generation | Already a dependency for PDF export |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| better-sqlite3 on Vercel | Turso/libSQL | Would enable persistent writes on serverless, but adds external dependency. Not needed -- usage/feedback DBs are local-only features. |
| Vercel | Self-hosted Docker | Full filesystem control, but loses zero-config deployment and edge network |

## Architecture Patterns

### Existing Project Structure (Deployment-Relevant)
```
pmtoolkit/
  demo-content/           # 81 curated markdown files (13 content type dirs)
  src/lib/content/config.ts  # Config loader with demo-mode fallback
  src/actions/             # Server actions with isDemoMode() guards
  next.config.ts           # outputFileTracingIncludes, serverExternalPackages
  pnpm-workspace.yaml      # packages/* workspace
  .gitignore               # pmtoolkit.config.json excluded
  packages/                # 8 workspace packages (schemas, CLI, plugins, etc.)
```

### Pattern 1: Demo Mode Auto-Detection
**What:** When `pmtoolkit.config.json` is absent or `vaultPath` is invalid, the app automatically enters demo mode using `demo-content/` as the content root. All mutation server actions return early with `{ success: false }` in demo mode.
**When to use:** Always -- this is the existing pattern, already tested with static analysis guards.
**Key file:** `src/lib/content/config.ts`

### Pattern 2: Vercel Deployment Configuration
**What:** Connect GitHub repo to Vercel project. Vercel auto-detects Next.js, runs `pnpm install` and `next build`. Native modules handled via `serverExternalPackages`.
**Configuration needed:**
```
Framework: Next.js (auto-detected)
Root directory: . (monorepo root)
Build command: pnpm build (default)
Install command: pnpm install (default)
Node.js version: 20.x or 22.x
```

### Pattern 3: Native Module Handling
**What:** `better-sqlite3` is a C++ addon. The `serverExternalPackages: ['better-sqlite3']` config tells Next.js to exclude it from webpack bundling and load it as a native Node.js require at runtime.
**Key insight:** On Vercel, the native binary must match the deployment target (Amazon Linux 2 / x86_64). pnpm installs platform-specific binaries. The SQLite databases themselves are ephemeral on Vercel (no persistent filesystem), so usage tracking (`getUsageDb()`) correctly returns `null` when `vaultPath` is absent, and feedback DB (`getFeedbackDb()`) writes to `/tmp` equivalent which is ephemeral per invocation.

### Anti-Patterns to Avoid
- **Writing SQLite databases expecting persistence on Vercel:** Serverless functions have ephemeral filesystems. Usage/feedback DBs only work locally.
- **Forgetting outputFileTracingIncludes:** Without it, demo-content/ files won't be included in the serverless function bundle and the app will fail silently with empty content.
- **Using `npm` instead of `pnpm`:** The project uses pnpm workspaces. `npm install` will not resolve workspace dependencies correctly.
- **Committing pmtoolkit.config.json:** Contains vault paths and potentially API credentials. Must stay gitignored.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CI/CD pipeline | Custom GitHub Actions for build/deploy | Vercel GitHub integration | Auto-deploys on push, preview deploys on PRs, zero config |
| Serverless Chromium | Custom Chromium bundling | @sparticuz/chromium-min (already installed) | Handles Lambda/serverless binary size limits |
| Demo mode detection | Custom env var checking | Existing `getConfig()` fallback logic | Already tested, handles all edge cases |
| Native module bundling | Custom webpack config for better-sqlite3 | `serverExternalPackages` in next.config.ts | Official Next.js solution |

## Common Pitfalls

### Pitfall 1: better-sqlite3 Build Failure on Vercel
**What goes wrong:** Native addon compilation fails because Vercel build environment lacks required build tools, or the pre-built binary doesn't match the runtime architecture.
**Why it happens:** better-sqlite3 uses `node-gyp` to compile C++ code. If prebuild binaries don't exist for the target platform, it falls back to compilation.
**How to avoid:** Ensure `serverExternalPackages: ['better-sqlite3']` is set (already done). Verify the pnpm lockfile includes the correct platform-specific prebuild. If builds fail, add `better-sqlite3` to `optionalDependencies` or use the `--ignore-scripts` workaround with prebuilt binaries.
**Warning signs:** Build logs showing `node-gyp rebuild` failures or `Cannot find module 'better-sqlite3'` at runtime.

### Pitfall 2: Demo Content Not Bundled
**What goes wrong:** Vercel deployment shows empty pages because demo-content files aren't included in the serverless function.
**Why it happens:** Next.js Node File Tracer uses static analysis to detect file dependencies. Dynamic `fs.readdirSync(contentRoot)` paths can't be traced.
**How to avoid:** The `outputFileTracingIncludes: { "/*": ["./demo-content/**/*"] }` in next.config.ts solves this (already configured).
**Warning signs:** Deployed app shows "No content found" or empty lists on all pages.

### Pitfall 3: pnpm Workspace Resolution on Vercel
**What goes wrong:** Build fails with "Cannot find module '@pmtoolkit/shared-schemas'" or similar workspace package errors.
**Why it happens:** Vercel needs to know to use pnpm and resolve workspace dependencies correctly.
**How to avoid:** The `packageManager` field in package.json (`"pnpm@10.29.1"`) tells Vercel which package manager to use. Ensure `transpilePackages` in next.config.ts includes all workspace packages used by the web app (currently: `@pmtoolkit/shared-schemas`, `@pmtoolkit/miro-client`). Workspace packages must be built before the web app -- `pnpm build:packages` should run first if packages have build steps.
**Warning signs:** Module resolution errors during `next build`.

### Pitfall 4: Chromium Binary Size
**What goes wrong:** Serverless function exceeds Vercel's 50MB (compressed) or 250MB (uncompressed) limit because full Chromium is bundled.
**Why it happens:** Puppeteer downloads full Chromium (~280MB). `@sparticuz/chromium-min` provides a minimal Chromium build for serverless.
**How to avoid:** Ensure PDF export code uses `@sparticuz/chromium-min` for the browser binary and `puppeteer-core` (not full `puppeteer`). Check that Chromium is loaded lazily only when PDF export is triggered.
**Warning signs:** Deploy error about function size limits.

### Pitfall 5: Missing Environment Variables
**What goes wrong:** Features that depend on external services (Jira, Miro, Confluence) fail silently or throw errors.
**Why it happens:** `pmtoolkit.config.json` is gitignored and won't exist on Vercel.
**How to avoid:** In demo mode, all external integrations should be disabled. The existing demo mode guards on server actions handle this. Verify no code path attempts to read Jira/Miro/Confluence credentials outside of a demo mode check.
**Warning signs:** Unhandled errors in server-side logs related to missing config fields.

### Pitfall 6: Node.js Version Mismatch
**What goes wrong:** Build succeeds locally but fails on Vercel due to Node.js API differences.
**Why it happens:** Vercel defaults may not match the local Node.js version. Next.js 16 requires Node.js >= 18.18.
**How to avoid:** Set Node.js version in Vercel project settings (recommend 20.x). Add `engines` field to package.json.
**Warning signs:** Syntax errors or API not found errors during Vercel build.

## Code Examples

### Existing Config Loader (Source: src/lib/content/config.ts)
```typescript
// Key logic: no config file → demo mode with demo-content/
if (vaultPath && fs.existsSync(vaultPath)) {
  cachedConfig = { vaultPath, demoMode: false, contentRoot: vaultPath, ... };
} else {
  cachedConfig = { vaultPath: null, demoMode: true, contentRoot: demoContentPath, ... };
}
```

### Existing next.config.ts (Source: next.config.ts)
```typescript
const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  transpilePackages: ["@dagrejs/dagre", "@pmtoolkit/shared-schemas", "@pmtoolkit/miro-client"],
  outputFileTracingIncludes: {
    "/*": ["./demo-content/**/*"],
  },
};
```

### Vercel Project Settings (Recommended)
```
Framework: Next.js (auto-detected)
Root Directory: ./
Build Command: pnpm build
Install Command: pnpm install
Output Directory: .next (default)
Node.js Version: 20.x
```

### Onboarding Verification Script
```bash
# Verify clean clone starts in demo mode
git clone git@github.com:lovettbarron/pmtoolkit.git
cd pmtoolkit
pnpm install
pnpm dev
# Should start at localhost:3000 in demo mode with all content visible
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `experimental.serverComponentsExternalPackages` | `serverExternalPackages` (stable) | Next.js 15+ | Config key renamed, no longer experimental |
| Manual Vercel CLI deploys | GitHub integration auto-deploy | Vercel standard | Push to main = auto production deploy |
| Custom demo mode env vars | Config-file-based auto-detection | Phase 116 (this project) | No env configuration needed for demo mode |

## Open Questions

1. **Vercel Project Setup**
   - What we know: GitHub repo exists at `lovettbarron/pmtoolkit`, Vercel supports pnpm monorepos natively
   - What's unclear: Whether the Vercel project has been created yet (no `.vercel/` directory found)
   - Recommendation: Create Vercel project via dashboard or `vercel link`, connect to GitHub repo

2. **better-sqlite3 Runtime on Vercel**
   - What we know: It's marked as serverExternalPackage, usage DB returns null in demo mode, feedback DB writes to `process.cwd()/.pmtoolkit/`
   - What's unclear: Whether better-sqlite3 native binary loads successfully on Vercel's runtime even when not actively used (import-time crash vs runtime crash)
   - Recommendation: Test deployment. If import fails, add try/catch around `require('better-sqlite3')` in db.ts files, or conditionally import only when not in demo mode

3. **Vercel Build Command for Monorepo**
   - What we know: `pnpm build` runs `next build` which only builds the web app. Workspace packages (`shared-schemas`, `miro-client`) are transpiled via `transpilePackages`
   - What's unclear: Whether workspace packages need a separate build step (`pnpm build:packages`) before `next build`, or if `transpilePackages` handles raw TypeScript
   - Recommendation: If packages export raw TS and are listed in `transpilePackages`, no separate build needed. If they have build scripts producing `dist/`, the build command should be `pnpm build:packages && pnpm build`

4. **PDF Export on Vercel**
   - What we know: Uses `@sparticuz/chromium-min` which is designed for serverless. Already a dependency.
   - What's unclear: Whether the Chromium binary download and function size are within Vercel limits
   - Recommendation: Test PDF export on deployed version. May need to lazy-load Chromium or use Vercel's `maxDuration` for long-running exports

## Sources

### Primary (HIGH confidence)
- Project source code: `next.config.ts`, `src/lib/content/config.ts`, `src/lib/usage/db.ts`, `src/lib/feedback/db.ts`, `src/actions/__tests__/demo-guard.test.ts`
- Project config: `package.json`, `pnpm-workspace.yaml`, `.gitignore`
- Phase 116 implementation: Demo mode, demo content curation, validation infrastructure

### Secondary (MEDIUM confidence)
- [Next.js output file tracing docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) - outputFileTracingIncludes behavior
- [Vercel SQLite KB article](https://vercel.com/kb/guide/is-sqlite-supported-in-vercel) - ephemeral filesystem limitations
- [Vercel monorepo docs](https://vercel.com/docs/monorepos) - pnpm workspace support
- [Vercel Next.js framework docs](https://vercel.com/docs/frameworks/nextjs) - deployment configuration

### Tertiary (LOW confidence)
- [serverExternalPackages monorepo issue #84388](https://github.com/vercel/next.js/issues/84388) - known issues with workspace packages and serverExternalPackages

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and configured in the project
- Architecture: HIGH - demo mode, config fallback, file tracing all already implemented
- Pitfalls: MEDIUM - Vercel-specific runtime behavior (better-sqlite3 import, Chromium size) needs deployment testing to confirm
- Deployment config: MEDIUM - no evidence of prior Vercel deployment (no `.vercel/` dir), specific settings need validation

**Research date:** 2026-03-29
**Valid until:** 2026-04-28 (30 days - stable domain, Next.js 16 and Vercel platform are mature)
