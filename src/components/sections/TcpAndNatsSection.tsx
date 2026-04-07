import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { TcpAndNatsDiagram } from "@/components/TcpAndNatsDiagram";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function TcpAndNatsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="TCP and NATS" id={id} />
      <p className="mt-4 text-white text-lg">
        Built for reliability. Not for millions of messages per second.
      </p>
      <p className="mt-6 text-gray-200 text-lg">
        TCP handles a lot for you&mdash;retransmissions, congestion control,
        ordered delivery. The kernel takes care of it so your application
        doesn&apos;t have to. But at scale, its &ldquo;helpful&rdquo; features
        start working against you.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        The NATS protocol is human-readable text over TCP&mdash;you can debug it
        with telnet. But NATS doesn&apos;t just speak text over TCP. It takes
        control of the problems TCP can&apos;t solve at high throughput:
      </p>

      <DiagramReveal>
        <TcpAndNatsDiagram />
      </DiagramReveal>

      <WhyItMatters>
        NATS doesn&apos;t just ride on TCP&mdash;it compensates for TCP&apos;s
        weaknesses. This is why NATS can deliver millions of messages per second
        with predictable latency, even when clients misbehave or networks hiccup.
      </WhyItMatters>
    </SectionContainer>
  );
}
