import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Tokens",
};

const surfaces = [
  { name: "bg", className: "bg-bg", oklch: "oklch(0.12 0.01 85)" },
  { name: "sunken", className: "bg-sunken", oklch: "oklch(0.10 0.01 85)" },
  { name: "surface", className: "bg-surface", oklch: "oklch(0.16 0.01 85)" },
  {
    name: "surface-raised",
    className: "bg-surface-raised",
    oklch: "oklch(0.20 0.015 85)",
  },
  { name: "overlay", className: "bg-overlay", oklch: "oklch(0.24 0.015 85)" },
];

const textColors = [
  { label: "Primary text", className: "text-text" },
  { label: "Muted text", className: "text-muted" },
  { label: "Accent text", className: "text-accent" },
  { label: "Param text", className: "text-param" },
  { label: "Destructive text", className: "text-destructive" },
];

const contrastPairings = [
  { fg: "text", bg: "bg", ratio: 16.52, pass: true },
  { fg: "text", bg: "surface", ratio: 15.79, pass: true },
  { fg: "text", bg: "surface-raised", ratio: 14.73, pass: true },
  { fg: "muted", bg: "bg", ratio: 4.74, pass: true },
  { fg: "muted", bg: "surface", ratio: 4.53, pass: true },
  { fg: "accent", bg: "bg", ratio: 13.03, pass: true },
  { fg: "accent", bg: "surface", ratio: 12.46, pass: true },
  { fg: "param", bg: "surface", ratio: 8.08, pass: true },
];

function FgSwatch({ token }: { token: string }) {
  const classMap: Record<string, string> = {
    text: "bg-text",
    muted: "bg-muted",
    accent: "bg-accent",
    param: "bg-param",
  };
  return (
    <span
      className={`inline-block w-[16px] h-[16px] rounded-sm ${classMap[token] ?? "bg-text"}`}
    />
  );
}

function BgSwatch({ token }: { token: string }) {
  const classMap: Record<string, string> = {
    bg: "bg-bg",
    surface: "bg-surface",
    "surface-raised": "bg-surface-raised",
  };
  return (
    <span
      className={`inline-block w-[16px] h-[16px] rounded-sm border border-border ${classMap[token] ?? "bg-bg"}`}
    />
  );
}

export default function DesignTokensPage() {
  return (
    <div className="min-h-screen bg-bg p-lg">
      <div className="max-w-[960px] mx-auto">
        <h1 className="text-4xl font-bold text-text mb-xl">Design Tokens</h1>

        {/* Section 1: Surface Elevations */}
        <section className="mb-xl">
          <h2 className="text-2xl font-bold text-text mb-lg">
            Surface Elevations
          </h2>
          <div className="flex flex-wrap gap-md">
            {surfaces.map((s) => (
              <div
                key={s.name}
                className={`${s.className} min-w-[120px] min-h-[80px] p-md rounded-md flex flex-col justify-end border border-border-subtle`}
              >
                <span className="text-text text-sm font-bold">{s.name}</span>
                <span className="text-muted text-xs font-mono">{s.oklch}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Text Colors */}
        <section className="mb-xl">
          <h2 className="text-2xl font-bold text-text mb-lg">Text Colors</h2>
          <div className="bg-bg p-lg rounded-md border border-border-subtle space-y-md">
            {textColors.map((t) => (
              <p key={t.label} className={`${t.className} text-lg`}>
                {t.label}
              </p>
            ))}
          </div>
        </section>

        {/* Section 3: Border Colors */}
        <section className="mb-xl">
          <h2 className="text-2xl font-bold text-text mb-lg">Border Colors</h2>
          <div className="flex gap-md">
            <div className="p-lg rounded-md border border-border min-w-[160px]">
              <span className="text-muted text-sm">border</span>
            </div>
            <div className="p-lg rounded-md border border-border-subtle min-w-[160px]">
              <span className="text-muted text-sm">border-subtle</span>
            </div>
          </div>
        </section>

        {/* Section 4: Contrast Validation */}
        <section className="mb-xl">
          <h2 className="text-2xl font-bold text-text mb-lg">
            Contrast Validation
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-sm text-muted font-semibold">
                    Foreground
                  </th>
                  <th className="text-left p-sm text-muted font-semibold">
                    Background
                  </th>
                  <th className="text-left p-sm text-muted font-semibold">
                    Ratio
                  </th>
                  <th className="text-left p-sm text-muted font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {contrastPairings.map((cp) => (
                  <tr
                    key={`${cp.fg}-${cp.bg}`}
                    className="border-b border-border-subtle"
                  >
                    <td className="p-sm text-text">
                      <span className="flex items-center gap-sm">
                        <FgSwatch token={cp.fg} />
                        {cp.fg}
                      </span>
                    </td>
                    <td className="p-sm text-text">
                      <span className="flex items-center gap-sm">
                        <BgSwatch token={cp.bg} />
                        {cp.bg}
                      </span>
                    </td>
                    <td className="p-sm text-text font-mono">
                      {cp.ratio}:1
                    </td>
                    <td className="p-sm">
                      {cp.pass ? (
                        <span className="inline-block px-sm py-xs rounded-full text-xs font-bold bg-[oklch(0.35_0.15_145)] text-[oklch(0.85_0.15_145)]">
                          AA Pass
                        </span>
                      ) : (
                        <span className="inline-block px-sm py-xs rounded-full text-xs font-bold bg-[oklch(0.35_0.15_25)] text-[oklch(0.75_0.15_25)]">
                          AA Fail
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
