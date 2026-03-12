import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { NatsSolutionsDiagram } from "@/components/NatsSolutionsDiagram";
import { SectionProps } from "./types";

export function NatsOnTcpSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="How NATS Builds on TCP"
        id={id}
      />
      <p className="mt-4 text-gray-500">
        The NATS protocol is human-readable text over TCP&mdash;you can
        debug it with telnet.
      </p>

      <p className="mt-6 text-white text-lg">
        But NATS doesn&apos;t just speak text over TCP. It takes control.
      </p>
      <p className="mt-4 text-gray-500">
        TCP&apos;s trade-offs at scale&mdash;head-of-line blocking,
        unpredictable buffering, slow failure detection&mdash;don&apos;t
        go away just because you have a nice protocol on top. NATS handles
        them explicitly:
      </p>

      <DiagramReveal>
        <NatsSolutionsDiagram />
      </DiagramReveal>
    </SectionContainer>
  );
}
