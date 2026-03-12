import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function DataStoresHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Data Stores" id={id} />
      <div className="mt-6">
        <NestedDiagram
          layers={[
            { label: "Data Stores", examples: "KV Store, Object Store", color: COLORS.yellow },
            { label: "JetStream", examples: "Streams, consumers, persistence", color: COLORS.blue },
            { label: "Core", examples: "Pub/sub, request/reply, queue groups", color: COLORS.green },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
