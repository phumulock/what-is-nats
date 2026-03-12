import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { ManyToManyDiagram } from "@/components/ManyToManyDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function MNCommunicationSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Many-to-Many"
        id={id}
        href="https://docs.nats.io/nats-concepts/overview#what-makes-the-nats-connective-technology-unique-for-these-modern-systems"
      />
      <p className="mt-4 text-white text-lg">Many-to-many, not point-to-point.</p>
      <p className="mt-4 text-gray-500">
        Publishers send to subjects. Any number of subscribers can listen.
        Adding a new consumer is a one-line change in the
        consumer&mdash;publishers don&apos;t even know. No producer
        modifications, no coordination, no redeployment.
      </p>

      <DiagramReveal>
        <ManyToManyDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Need audit logging across every service? Deploy a subscriber that
        listens to <code className="text-accent-green">&gt;</code> (everything).
        Zero coordination, zero producer changes, instant visibility.
      </WhyItMatters>

    </SectionContainer>
  );
}
