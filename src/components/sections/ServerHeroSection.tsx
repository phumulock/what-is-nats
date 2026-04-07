import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function ServerHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="The HTTP Server" id={id} />
      <div className="mt-6">
        <NestedDiagram
          title="HTTP Server — Layer Stack"
          layers={[
            {
              label: "Application",
              examples: "Your code",
              color: COLORS.blue,
            },
            {
              label: "HTTP Protocol",
              examples: "GET, POST, 200 OK",
              color: COLORS.yellow,
            },
            {
              label: "TCP",
              examples: "Reliable, ordered byte stream",
              color: COLORS.green,
            },
          ]}
        />
      </div>
    </SectionContainer>
  );
}
