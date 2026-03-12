import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { HttpLimitationsDiagram } from "@/components/HttpLimitationsDiagram";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function LimitsOfHttpSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="The Limits of HTTP" id={id} />
      <p className="mt-4 text-white text-lg">
        Client asks. Server answers. That&apos;s the whole protocol.
      </p>
      <p className="mt-6 text-gray-500">
        HTTP does exactly one thing: a client sends a request to a specific
        server, and the server responds. Everything else&mdash;push
        notifications, streaming, fan-out&mdash;is bolted on after the
        fact.
      </p>

      <DiagramReveal>
        <HttpLimitationsDiagram />
      </DiagramReveal>

      <WhyItMatters>
        These aren&apos;t missing features&mdash;they&apos;re the model. HTTP
        was designed for documents, not distributed systems. Location dependence,
        point-to-point coupling, and synchronous blocking are baked into every
        request. You can work around them, but you&apos;re always fighting the
        protocol.
      </WhyItMatters>
    </SectionContainer>
  );
}
