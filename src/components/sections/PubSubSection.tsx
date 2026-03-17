import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { PassiveObserverDemo } from "@/components/PassiveObserverDemo";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function PubSubSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Publish & Subscribe"
        id={id}
        href="https://docs.nats.io/nats-concepts/pubsub"
      />
      <p className="mt-4 text-white text-lg">Fire-and-forget messaging.</p>
      <p className="mt-4 text-gray-500">
        Publish a message and Nats delivers it to all matching subscribers
        immediately. No disk writes. No acknowledgments. No broker
        consensus. Just memory-to-memory transfer.
      </p>
      <p className="mt-4 text-gray-500">
        This is <span className="text-accent-green font-bold">at-most-once delivery</span>&mdash;and
        that&apos;s a deliberate design choice, not a limitation. For real-time
        data&mdash;telemetry, metrics, live updates&mdash;you want the latest
        value, not a queue of stale ones. No redelivery storms, no message
        pile-ups. The system stays stable under failure.
      </p>

      <DiagramReveal>
        <PassiveObserverDemo />
      </DiagramReveal>

      <WhyItMatters>
        Most messages don&apos;t need persistence guarantees. By making
        simple pub/sub the default, Nats keeps the majority of your
        traffic blazing fast. Save the heavyweight machinery for the
        messages that truly need it.
      </WhyItMatters>

    </SectionContainer>
  );
}
