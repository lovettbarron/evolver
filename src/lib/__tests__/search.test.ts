import { describe, it, expect } from 'vitest';
import {
  searchItems,
  filterPatches,
  sortPatches,
  toSearchableSession,
  toSearchablePatch,
  type SearchableSession,
  type SearchablePatch,
} from '../search';

const sessions: SearchableSession[] = [
  { slug: "01-osc-basics", title: "Oscillator Basics", module: "oscillators", tags: ["analog", "waveform"], difficulty: "beginner", sessionNumber: 1, instrument: "evolver" },
  { slug: "02-filter-sweep", title: "Filter Sweep Techniques", module: "filters", tags: ["filter", "resonance"], difficulty: "intermediate", sessionNumber: 2, instrument: "evolver" },
  { slug: "01-vco-intro", title: "VCO Introduction", module: "vco", tags: ["analog"], difficulty: "beginner", sessionNumber: 1, instrument: "cascadia" },
];

const patches: SearchablePatch[] = [
  { slug: "deep-bass", name: "Deep Bass", description: "A deep sub bass patch", tags: ["dark", "sub"], type: "bass", instrument: "evolver", created: "2026-01-15" },
  { slug: "bright-lead", name: "Bright Lead", description: "Cutting lead sound", tags: ["bright", "aggressive"], type: "lead", instrument: "evolver", created: "2026-02-20" },
  { slug: "ambient-pad", name: "Ambient Pad", description: "Lush ambient texture", tags: ["dark", "ambient"], type: "pad", instrument: "evolver", created: "2026-03-10" },
  { slug: "cas-bass", name: "Cascadia Bass", description: "Modular bass", tags: ["modular"], type: "bass", instrument: "cascadia", created: "2026-03-15" },
];

describe("searchItems", () => {
  it("matches session by title", () => {
    const result = searchItems("oscillator", sessions, patches, "evolver");
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].slug).toBe("01-osc-basics");
  });

  it("matches session by module", () => {
    const result = searchItems("filters", sessions, patches, "evolver");
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].slug).toBe("02-filter-sweep");
  });

  it("matches session by tags", () => {
    const result = searchItems("resonance", sessions, patches, "evolver");
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].slug).toBe("02-filter-sweep");
  });

  it("matches session by difficulty", () => {
    const result = searchItems("beginner", sessions, patches, "evolver");
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].slug).toBe("01-osc-basics");
  });

  it("matches patch by name", () => {
    const result = searchItems("bright", sessions, patches, "evolver");
    expect(result.patches).toHaveLength(1);
    expect(result.patches[0].slug).toBe("bright-lead");
  });

  it("matches patch by description", () => {
    const result = searchItems("cutting", sessions, patches, "evolver");
    expect(result.patches).toHaveLength(1);
    expect(result.patches[0].slug).toBe("bright-lead");
  });

  it("matches patch by tags", () => {
    const result = searchItems("sub", sessions, patches, "evolver");
    expect(result.patches).toHaveLength(1);
    expect(result.patches[0].slug).toBe("deep-bass");
  });

  it("matches patch by type", () => {
    const result = searchItems("bass", sessions, patches, "evolver");
    expect(result.patches).toHaveLength(1);
    expect(result.patches[0].slug).toBe("deep-bass");
  });

  it("is case-insensitive", () => {
    const lower = searchItems("filter", sessions, patches, "evolver");
    const upper = searchItems("Filter", sessions, patches, "evolver");
    expect(lower.sessions).toEqual(upper.sessions);
    expect(lower.patches).toEqual(upper.patches);
  });

  it("scopes results to the specified instrument", () => {
    const result = searchItems("bass", sessions, patches, "cascadia");
    expect(result.sessions).toHaveLength(0);
    expect(result.patches).toHaveLength(1);
    expect(result.patches[0].slug).toBe("cas-bass");
  });

  it("returns empty results for empty query", () => {
    const result = searchItems("", sessions, patches, "evolver");
    expect(result.sessions).toEqual([]);
    expect(result.patches).toEqual([]);
  });
});

describe("filterPatches", () => {
  it("filters by single type", () => {
    const result = filterPatches(patches, { types: ["bass"], tags: [], sort: "name" });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.type === "bass")).toBe(true);
  });

  it("filters by multiple types with OR logic", () => {
    const result = filterPatches(patches, { types: ["bass", "lead"], tags: [], sort: "name" });
    expect(result).toHaveLength(3);
    expect(result.every(p => p.type === "bass" || p.type === "lead")).toBe(true);
  });

  it("filters by single tag", () => {
    const result = filterPatches(patches, { types: [], tags: ["dark"], sort: "name" });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.tags.includes("dark"))).toBe(true);
  });

  it("filters by multiple tags with OR logic", () => {
    const result = filterPatches(patches, { types: [], tags: ["dark", "ambient"], sort: "name" });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.tags.includes("dark") || p.tags.includes("ambient"))).toBe(true);
  });

  it("applies type AND tag filters together", () => {
    const result = filterPatches(patches, { types: ["bass"], tags: ["dark"], sort: "name" });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("deep-bass");
  });

  it("returns all patches when no filters specified", () => {
    const result = filterPatches(patches, { types: [], tags: [], sort: "name" });
    expect(result).toHaveLength(4);
  });
});

describe("sortPatches", () => {
  it("sorts by name ascending", () => {
    const result = sortPatches(patches, "name");
    expect(result.map(p => p.name)).toEqual(["Ambient Pad", "Bright Lead", "Cascadia Bass", "Deep Bass"]);
  });

  it("sorts by date descending (newest first)", () => {
    const result = sortPatches(patches, "date");
    expect(result.map(p => p.slug)).toEqual(["cas-bass", "ambient-pad", "bright-lead", "deep-bass"]);
  });

  it("sorts by type ascending", () => {
    const result = sortPatches(patches, "type");
    const types = result.map(p => p.type);
    expect(types).toEqual(["bass", "bass", "lead", "pad"]);
  });
});

describe("toSearchableSession", () => {
  it("maps session with meta to SearchableSession", () => {
    const result = toSearchableSession({
      slug: "01-osc-basics",
      data: {
        title: "Oscillator Basics",
        module: "oscillators",
        session_number: 1,
        duration: 20,
        prerequisite: null,
        output_type: "technique" as const,
        difficulty: "beginner" as const,
        tags: ["analog", "waveform"],
        instrument: "evolver",
      },
    });
    expect(result).toEqual({
      slug: "01-osc-basics",
      title: "Oscillator Basics",
      module: "oscillators",
      tags: ["analog", "waveform"],
      difficulty: "beginner",
      sessionNumber: 1,
      instrument: "evolver",
    });
  });
});

describe("toSearchablePatch", () => {
  it("maps patch with meta to SearchablePatch", () => {
    const result = toSearchablePatch({
      slug: "deep-bass",
      data: {
        name: "Deep Bass",
        type: "bass" as const,
        session_origin: 3,
        description: "A deep sub bass patch",
        tags: ["dark", "sub"],
        instrument: "evolver",
        created: "2026-01-15",
      },
    });
    expect(result).toEqual({
      slug: "deep-bass",
      name: "Deep Bass",
      description: "A deep sub bass patch",
      tags: ["dark", "sub"],
      type: "bass",
      instrument: "evolver",
      created: "2026-01-15",
    });
  });
});
