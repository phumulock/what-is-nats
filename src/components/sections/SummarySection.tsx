import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { ComplexitySpectrum } from "@/components/ComplexitySpectrum";
import { NATSDecisionGuide } from "@/components/NATSDecisionGuide";
import { SectionProps } from "./types";

export function SummarySection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Putting It Together" id={id} />
      <p className="mt-4 text-white text-lg">
        Start simple. Layer on capabilities as your needs grow.
      </p>
      <p className="mt-4 text-gray-500">
        Nats gives you a toolkit of capabilities that share one subject
        namespace, one connection, and one security model. Most applications
        start with Core and add capabilities only when needed. Security
        wraps everything&mdash;enable it at any point, and it applies across
        all layers.
      </p>

      <ComplexitySpectrum />

      <DiagramReveal>
        <NATSDecisionGuide />
      </DiagramReveal>

      <div className="mt-8 p-6 border border-border rounded-lg bg-surface text-center">
        <p className="text-lg mb-2">
          Start simple. Add complexity only when needed.
        </p>
        <p className="text-gray-500 text-sm">
          That&apos;s the Nats philosophy&mdash;and why it scales from IoT
          sensors to global financial systems.
        </p>
      </div>
    </SectionContainer>
  );
}
