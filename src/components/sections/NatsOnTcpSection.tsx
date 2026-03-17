import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { NatsSolutionsDiagram } from "@/components/NatsSolutionsDiagram";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function NatsOnTcpSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="How Nats Builds on Tcp"
        id={id}
      />
      <p className="mt-4 text-gray-500">
        The Nats protocol is human-readable text over Tcp&mdash;you can
        debug it with telnet.
      </p>

      <p className="mt-6 text-white text-lg">
        But Nats doesn&apos;t just speak text over Tcp. It takes control.
      </p>
      <p className="mt-4 text-gray-500">
        Tcp&apos;s trade-offs at scale&mdash;head-of-line blocking,
        unpredictable buffering, slow failure detection&mdash;don&apos;t
        go away just because you have a nice protocol on top. Nats handles
        them explicitly:
      </p>

      <DiagramReveal>
        <NatsSolutionsDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Nats doesn&apos;t just ride on Tcp&mdash;it compensates for Tcp&apos;s
        weaknesses. This is why Nats can deliver millions of messages per second
        with predictable latency, even when clients misbehave or networks hiccup.
      </WhyItMatters>
    </SectionContainer>
  );
}
