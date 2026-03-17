import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { TcpDiagram } from "@/components/TcpDiagram";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function TcpTradeoffsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Tcp&apos;s Trade-offs" id={id} />
      <p className="mt-4 text-white text-lg">
        Built for reliability. Not for millions of messages per second.
      </p>
      <p className="mt-6 text-gray-500">
        Tcp handles a lot for you&mdash;retransmissions, congestion control,
        ordered delivery. The kernel takes care of it so your application
        doesn&apos;t have to.
      </p>
      <p className="mt-4 text-gray-500">
        But Tcp was designed before anyone imagined moving millions of
        messages per second. At that scale, its &ldquo;helpful&rdquo;
        features start working against you.
      </p>

      <p className="mt-6 text-gray-500">
        Reliable. Ordered. But not built for millions of messages per second.
        These aren&apos;t bugs&mdash;they&apos;re trade-offs from a protocol
        designed before high-throughput messaging existed.
      </p>

      <DiagramReveal>
        <TcpDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Understanding Tcp&apos;s limitations explains why high-throughput
        messaging systems can&apos;t just use raw sockets&mdash;they need an
        application-level protocol that actively manages flow control, detects
        failures fast, and avoids head-of-line blocking.
      </WhyItMatters>
    </SectionContainer>
  );
}
