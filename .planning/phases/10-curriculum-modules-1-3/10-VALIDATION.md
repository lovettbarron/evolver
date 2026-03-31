---
phase: 10
slug: curriculum-modules-1-3
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 10 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Content validation (file existence, frontmatter checks, grep) |
| **Config file** | none — content-only phase |
| **Quick run command** | `ls sessions/cascadia/*.md \| wc -l` |
| **Full suite command** | `node -e "const fs=require('fs');const files=fs.readdirSync('sessions/cascadia').filter(f=>f.endsWith('.md'));console.log(files.length+' sessions found');files.forEach(f=>{const c=fs.readFileSync('sessions/cascadia/'+f,'utf8');const has=k=>c.includes(k);console.log(f+': fm='+(has('module:')?'Y':'N')+' warmup='+(has('Warm-Up')?'Y':'N')+' exercises='+(has('Exercises')?'Y':'N')+' checklist='+(has('Output Checklist')?'Y':'N'))})"` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run `ls sessions/cascadia/*.md | wc -l`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must show 9 sessions with all structure markers
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 10-01-01 | 01 | 1 | CCURR-01, CCURR-05 | file check | `test -f sessions/cascadia/01-foundations-first-sound.md` | ❌ W0 | ⬜ pending |
| 10-01-02 | 01 | 1 | CCURR-01, CCURR-05 | file check | `test -f sessions/cascadia/02-foundations-pwm-sub.md` | ❌ W0 | ⬜ pending |
| 10-01-03 | 01 | 1 | CCURR-01, CCURR-05 | file check | `test -f sessions/cascadia/03-foundations-shaping.md` | ❌ W0 | ⬜ pending |
| 10-02-01 | 02 | 1 | CCURR-01, CCURR-02 | file check | `test -f sessions/cascadia/04-oscillators-vco-a.md` | ❌ W0 | ⬜ pending |
| 10-02-02 | 02 | 1 | CCURR-01, CCURR-02 | file check | `test -f sessions/cascadia/05-oscillators-vco-b.md` | ❌ W0 | ⬜ pending |
| 10-02-03 | 02 | 1 | CCURR-01, CCURR-02 | file check | `test -f sessions/cascadia/06-oscillators-wavefolder.md` | ❌ W0 | ⬜ pending |
| 10-03-01 | 03 | 1 | CCURR-01, CCURR-03 | file check | `test -f sessions/cascadia/07-envelopes-env-a-vca.md` | ❌ W0 | ⬜ pending |
| 10-03-02 | 03 | 1 | CCURR-01, CCURR-03 | file check | `test -f sessions/cascadia/08-envelopes-env-b.md` | ❌ W0 | ⬜ pending |
| 10-03-03 | 03 | 1 | CCURR-01, CCURR-03 | file check | `test -f sessions/cascadia/09-envelopes-dynamics.md` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `sessions/cascadia/` directory created
- [ ] Verify Evolver session format for template reference: `head -15 sessions/evolver/01-foundations-navigation.md`

*Existing infrastructure covers session content validation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Generalized synthesis concepts taught | CCURR-02 | Content quality requires human review | Read each session's concept section — verify it explains the concept independent of Cascadia |
| Cascadia-unique features highlighted | CCURR-03 | Content quality requires human review | Check for `[!info]` callouts about Cascadia-specific implementation in each session |
| Normalled connections documented | CCURR-04 | Content accuracy requires domain knowledge | Verify normalling callouts match module docs in src/content/instruments/cascadia/modules/ |
| ADHD pacing appropriate | CCURR-05 | Subjective assessment | Apply framework/adhd-design.md 6-question checklist to each session |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 1s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
