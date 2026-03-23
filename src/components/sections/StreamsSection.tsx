import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { TemporalDecouplingDiagram } from "@/components/TemporalDecouplingDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function StreamsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Streams" id={id} href="https://docs.nats.io/nats-concepts/jetstream/streams" />
      <p className="mt-4 text-white text-lg">
        Append-only logs that capture messages by subject.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        A stream is an append-only log bound to one or more subjects. Every
        matching message is stored in sequence. Retention policy controls when
        messages leave the log:
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-green font-bold">Limits-based</span>{" "}
        &mdash; cap by max messages, max bytes, or max age. Oldest messages
        are discarded when limits are hit.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-yellow font-bold">Interest-based</span>{" "}
        &mdash; keep messages until all consumers have seen them. Nothing is
        discarded while there&apos;s still interest.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-blue font-bold">Work-queue</span>{" "}
        &mdash; delete on ack. Each message is processed exactly once, then
        removed from the stream.
      </p>

      <DiagramReveal>
        <TemporalDecouplingDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Streams decouple storage from delivery. Publishers fire messages into
        subjects as usual&mdash;streams silently capture them. No code changes
        on the publish side, no new API to learn.
      </WhyItMatters>

    </SectionContainer>
  );
}
