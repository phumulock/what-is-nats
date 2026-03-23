import { ReactNode } from "react";

interface Layer {
  label: string;
  examples?: string;
  color: string;
}

interface NestedDiagramProps {
  title?: string;
  layers: Layer[];
  variant?: "nested" | "stacked";
}

export function NestedDiagram({ title, layers, variant = "nested" }: NestedDiagramProps) {
  return (
    <div className="border border-border rounded-lg p-4 bg-surface">
      {title && (
        <div className="text-sm text-white mb-4 font-medium">{title}</div>
      )}

      {variant === "nested" ? (
        <div className="p-2 overflow-x-auto max-w-full">
          {layers.reduceRight<ReactNode>((inner, layer, index) => (
            <div
              key={index}
              className="border-2 rounded-lg p-3"
              style={{
                borderColor: layer.color,
                backgroundColor: `${layer.color}08`,
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-1">
                <span style={{ color: layer.color }} className="font-medium text-sm">
                  {layer.label}
                </span>
                {layer.examples && (
                  <span className="text-gray-200 text-xs">{layer.examples}</span>
                )}
              </div>
              {inner}
            </div>
          ), null)}
        </div>
      ) : (
        <div className="space-y-2">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg bg-terminal-bg overflow-hidden"
            >
              <div
                className="w-1.5 self-stretch flex-shrink-0"
                style={{ backgroundColor: layer.color }}
              />
              <div className="flex items-center justify-between gap-4 flex-1 py-3 pr-4">
                <span style={{ color: layer.color }} className="font-medium">
                  {layer.label}
                </span>
                {layer.examples && (
                  <span className="text-gray-200 text-sm">{layer.examples}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
