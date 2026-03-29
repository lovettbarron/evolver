# Obsidian Integration

Templates and notes for the `~/song` Obsidian vault. These connect your instrument learning practice to your songwriting workflow.

## Setup

Copy these files into your `~/song` vault:

1. `instrument-tracker.md` → `~/song/instrument-tracker.md` (or wherever you want it)
2. `_util/template/session-log.md` → `~/song/_util/template/session-log.md`
3. `patches/` → `~/song/patches/` (create this folder)

## Daily Note Integration

Add this to your daily note when you do a practice session. You can use QuickAdd to speed this up:

```markdown
### Instrument Practice
- **Instrument**: Evolver
- **Session**: [[session-XX-name]]
- **Duration**: XX min
- **What I learned**: one sentence
- **Patch saved**: yes/no (name if yes)
- **Mood**: 🟢 clicked / 🟡 okay / 🔴 struggled
#evolver #instrument-practice
```

## Tags

| Tag | Use |
|-----|-----|
| `#evolver` | Any Evolver-related note |
| `#instrument-practice` | Any practice session |
| `#patch` | Patch documentation |
| `#session-XX` | Specific session number |
| `#module-name` | Module tag (foundations, analog-oscillators, etc.) |

## Dataview Queries

If you use the Dataview plugin, these queries track progress:

### Practice frequency
```dataview
TABLE WITHOUT ID
  file.name as "Date",
  choice(contains(file.tags, "#evolver"), "✓", "") as "Evolver"
FROM "_daily"
WHERE contains(file.tags, "#instrument-practice")
SORT file.name DESC
LIMIT 14
```

### Sessions completed
```dataview
LIST
FROM "patches/evolver"
SORT file.name ASC
```
