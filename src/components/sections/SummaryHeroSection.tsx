import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function SummaryHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="The Full Picture" id={id} />
      <div className="mt-6">
        <NestedDiagram
          layers={[
            { label: "Security", examples: "TLS, NKeys, JWTs, account isolation", color: COLORS.purpleLight },
            { label: "Clustering & Leaf Nodes", examples: "Multi-region, edge deployments", color: COLORS.pink },
            { label: "KV Store & Object Store", examples: "get / put / watch, large blobs", color: COLORS.yellow },
            { label: "JetStream", examples: "Streams, consumers, persistence", color: COLORS.blue },
            { label: "Core", examples: "Pub/sub, request/reply, queue groups", color: COLORS.green },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
