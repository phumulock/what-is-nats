import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { HttpLimitsDiagram } from "@/components/HttpLimitsDiagram";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function LimitsOfHttpSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="The Limits of HTTP" id={id} />
      <p className="mt-4 text-white text-lg">
        A server process on TCP. So why not just use HTTP?
      </p>
      <p className="mt-6 text-gray-200 text-lg">
        HTTP works. But as systems grow, you bolt on a message broker for async
        work, a service mesh for discovery, a load balancer for routing, and a
        cache for shared state. Each one adds operational burden, failure modes,
        and complexity.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        Client asks. Server answers. That&apos;s the whole protocol. HTTP does
        exactly one thing: a client sends a request to a specific server, and
        the server responds. Everything else&mdash;push notifications,
        streaming, fan-out&mdash;is bolted on after the fact.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        Better protocols don&apos;t change the model underneath. Each one
        improves something&mdash;encoding, query flexibility,
        full-duplex&mdash;but none of them introduce native many-to-many
        messaging. Every connection is still one client talking to one server.
      </p>

      <DiagramReveal>
        <HttpLimitsDiagram />
      </DiagramReveal>

      <WhyItMatters>
        These tools add streaming and bidirectional communication, but the
        topology stays the same: one client, one server. For pub/sub fan-out,
        queue-based load balancing, and location-transparent routing&mdash;you
        still end up needing a separate system.
      </WhyItMatters>
    </SectionContainer>
  );
}
