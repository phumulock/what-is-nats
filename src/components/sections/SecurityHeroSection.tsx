import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function SecurityHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Security" id={id} />
      <div className="mt-6">
        <NestedDiagram
          layers={[
            { label: "Security", examples: "TLS, NKeys, JWTs, account isolation, auth callout", color: COLORS.purpleLight },
            { label: "Clustering & Leaf Nodes", color: COLORS.pink },
            { label: "Data Stores", color: COLORS.yellow },
            { label: "JetStream", color: COLORS.blue },
            { label: "Core", color: COLORS.green },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
