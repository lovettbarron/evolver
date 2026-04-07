# Deferred Items - Phase 18

## Pre-existing Issues (Out of Scope)

1. **TypeScript build error: SignalType "gate" not in CascadiaPanel union type**
   - File: `src/app/[instrument]/patches/[slug]/page.tsx` line 127
   - Error: `Type '"gate"' is not assignable to type '"default" | "audio" | "modulation" | "cv"'`
   - Confirmed pre-existing: same error occurs without any Phase 18 changes
   - Impact: `next build` fails. Does not affect dev server or tests.
