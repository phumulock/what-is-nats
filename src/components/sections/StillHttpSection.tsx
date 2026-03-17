import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { StillHttpDiagram } from "@/components/StillHttpDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function StillHttpSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Still Http" id={id} />
      <p className="mt-4 text-white text-lg">
        Better protocols don&apos;t change the model underneath.
      </p>
      <p className="mt-6 text-gray-500">
        Each one improves something&mdash;encoding, query flexibility,
        full-duplex&mdash;but none of them introduce native many-to-many
        messaging. Every connection is still one client talking to one server.
      </p>

      <DiagramReveal>
        <StillHttpDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Some of these tools add streaming and bidirectional communication, but
        the topology stays the same: one client, one server. For pub/sub
        fan-out, queue-based load balancing, and location-transparent
        routing&mdash;you still end up needing a separate system.
      </WhyItMatters>
    </SectionContainer>
  );
}
