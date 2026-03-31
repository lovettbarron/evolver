import type { KnobSetting } from '@/lib/content/schemas';

interface KnobSettingsTableProps {
  settings: Record<string, KnobSetting[]>;
}

export function KnobSettingsTable({ settings }: KnobSettingsTableProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-md">Knob Settings</h2>

      <div className="prose">
        {Object.entries(settings).map(([moduleName, knobs]) => (
          <div key={moduleName} className="mb-lg">
            <h3>{moduleName}</h3>
            <table className="param-table">
              <thead>
                <tr>
                  <th>Control</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {knobs.map((knob) => (
                  <tr key={knob.control}>
                    <td className="font-sans text-text">{knob.control}</td>
                    <td className="font-mono text-[13px] text-param">
                      {knob.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[13px] text-muted italic mt-sm">
              All other controls at default
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
