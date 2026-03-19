import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function NatsCoreHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Core" id={id} />
      <div className="mt-6">
        <NestedDiagram
          layers={[
            {
              label: "Core",
              examples: "Pub/Sub, request/reply, queue groups",
              color: COLORS.green,
            },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
