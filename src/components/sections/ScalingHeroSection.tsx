import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function ScalingHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Scaling" id={id} />
      <div className="mt-6">
        <NestedDiagram
          layers={[
            { label: "Clustering & Leaf Nodes", examples: "Multi-region, edge deployments", color: COLORS.pink },
            { label: "Data Stores", examples: "KV Store, Object Store", color: COLORS.yellow },
            { label: "JetStream", examples: "Streams, consumers, persistence", color: COLORS.blue },
            { label: "Core", examples: "Pub/sub, request/reply, queue groups", color: COLORS.green },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
