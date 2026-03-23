import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NoRespondersDiagram } from "@/components/NoRespondersDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function NoRespondersSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="No Responders" id={id} href="https://docs.nats.io/nats-concepts/core-nats/reqreply" />
      <p className="mt-4 text-white text-lg">
        Instant failure feedback, not silent timeouts.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        With HTTP, if a service is down your request hangs until a timeout
        fires&mdash;30 seconds of wasted time and a blocked thread. NATS knows
        the subscription table. If nobody is listening on a subject, the server
        tells you immediately with a <code className="text-accent-red">no
        responders</code> status. No guessing, no waiting, no cascading
        failures from accumulated hanging connections.
      </p>

      <DiagramReveal>
        <NoRespondersDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Circuit breakers exist because HTTP can&apos;t tell you &quot;nobody is
        home&quot; fast enough. NATS gives you that answer in microseconds,
        built into the protocol. One less library to configure, one less
        failure mode to handle.
      </WhyItMatters>

    </SectionContainer>
  );
}
