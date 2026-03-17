import { COLORS } from "@/lib/colors";

interface Layer {
  label: string;
  color: string;
}

const LAYERS: Layer[] = [
  { label: "Core", color: COLORS.green },
  { label: "Jetstream", color: COLORS.blue },
  { label: "Data Stores", color: COLORS.yellow },
  { label: "Clustering", color: COLORS.pink },
];

const SECURITY: Layer = { label: "Security", color: COLORS.purpleLight };

export function ComplexitySpectrum() {
  return (
    <div className="mt-6 border border-border rounded-lg bg-surface p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="hidden md:inline text-[10px] text-gray-500 uppercase tracking-wider shrink-0">
          Start here
        </span>
        <div className="flex flex-wrap items-center gap-1 flex-1 justify-center">
          {LAYERS.map((layer, i) => (
            <div key={layer.label} className="flex items-center gap-1">
              {i > 0 && <div className="w-3 h-px bg-border" />}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: layer.color }}
                />
                <span
                  className="text-xs whitespace-nowrap"
                  style={{ color: layer.color }}
                >
                  {layer.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <span className="hidden md:inline text-[10px] text-gray-500 uppercase tracking-wider shrink-0">
          Add as needed
        </span>
        <div className="flex md:hidden items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider">
          <span>Start here</span>
          <span>→</span>
          <span>Add as needed</span>
        </div>
      </div>
      {/* Security as cross-cutting */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-center gap-1.5">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: SECURITY.color }}
        />
        <span className="text-xs" style={{ color: SECURITY.color }}>
          {SECURITY.label}
        </span>
        <span className="text-[10px] text-gray-500 ml-1">
          wraps all layers
        </span>
      </div>
    </div>
  );
}
