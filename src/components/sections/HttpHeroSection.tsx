import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function HttpHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Why Not Use HTTP?" id={id} />
      <div className="mt-6 border border-border rounded-lg p-4 bg-surface">
        <div
          className="border rounded-lg px-4 py-2 text-sm flex items-center gap-3"
          style={{ borderColor: "var(--accent-blue)" }}
        >
          <span className="font-medium" style={{ color: "var(--accent-blue)" }}>
            HTTP
          </span>
          <span className="text-gray-300 text-xs">
            Location dependent, always 1:1, sync by default
          </span>
        </div>
      </div>
    </SectionContainer>
  );
}
