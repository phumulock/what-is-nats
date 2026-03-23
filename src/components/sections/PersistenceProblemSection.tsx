import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";
import { PersistenceGeneralDiagram } from "@/components/PersistenceGeneralDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { SectionProps } from "./types";

export function PersistenceProblemSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="The Persistence Problem"
        id={id}
      />
      <p className="mt-4 text-white text-lg">
        Every messaging system has the same Achilles&apos; heel.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        A message broker sits between producers and consumers, holding messages
        in memory until they&apos;re delivered. This works beautifully&mdash;until
        something goes wrong.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        What if a consumer crashes? Messages queue up. What if the broker
        itself crashes? Everything in memory vanishes. This isn&apos;t a bug in
        any particular system&mdash;it&apos;s a fundamental tension in
        distributed messaging.
      </p>

      <DiagramReveal>
        <PersistenceGeneralDiagram />
      </DiagramReveal>

      <WhyItMatters>
        The persistence problem isn&apos;t unique to any one tool. It&apos;s the
        central design tension in all messaging infrastructure. Understanding it
        helps you evaluate any system&mdash;and understand why NATS built
        JetStream.
      </WhyItMatters>
    </SectionContainer>
  );
}
