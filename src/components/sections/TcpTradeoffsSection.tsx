import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { TcpDiagram } from "@/components/TcpDiagram";
import { SectionProps } from "./types";

export function TcpTradeoffsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="TCP&apos;s Trade-offs" id={id} />
      <p className="mt-4 text-white text-lg">
        Built for reliability. Not for millions of messages per second.
      </p>
      <p className="mt-6 text-gray-500">
        TCP handles a lot for you&mdash;retransmissions, congestion control,
        ordered delivery. The kernel takes care of it so your application
        doesn&apos;t have to.
      </p>
      <p className="mt-4 text-gray-500">
        But TCP was designed before anyone imagined moving millions of
        messages per second. At that scale, its &ldquo;helpful&rdquo;
        features start working against you.
      </p>

      <DiagramReveal>
        <TcpDiagram />
      </DiagramReveal>
    </SectionContainer>
  );
}
