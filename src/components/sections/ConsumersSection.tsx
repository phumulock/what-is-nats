import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { JetStreamDiagram } from "@/components/JetStreamDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function ConsumersSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Consumers" id={id} href="https://docs.nats.io/nats-concepts/jetstream/consumers" />
      <p className="mt-4 text-white text-lg">
        Durable cursors that track delivery progress.
      </p>
      <p className="mt-4 text-gray-500">
        Consumers act as durable cursors, tracking delivery progress
        independently. Messages redeliver until acknowledged, guaranteeing{" "}
        <span className="text-accent-green font-bold">at-least-once</span> delivery.
        For critical paths, idempotent publishing with message deduplication
        provides{" "}
        <span className="text-accent-blue font-bold">exactly-once</span> semantics.
        When a consumer disconnects, Jetstream remembers its position. On
        reconnect, missed messages replay automatically.
      </p>

      <DiagramReveal>
        <JetStreamDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Each consumer is independent&mdash;add an analytics consumer alongside
        your processing consumer without affecting either. Multiple readers, one
        stream, zero interference.
      </WhyItMatters>

    </SectionContainer>
  );
}
