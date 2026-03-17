import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function JetStreamHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Jetstream" id={id} />
      <div className="mt-6">
        <NestedDiagram
          layers={[
            { label: "Jetstream", examples: "Streams, consumers, persistence", color: COLORS.blue },
            { label: "Core", color: COLORS.green },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
