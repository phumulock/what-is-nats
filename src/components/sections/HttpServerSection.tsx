import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { NestedDiagram } from "@/components/NestedDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

export function HttpServerSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="The HTTP Server" id={id} />
      <p className="mt-4 text-white text-lg">A process listening on a port.</p>
      <p className="mt-6 text-gray-200 text-lg">
        Everyone is familiar with the HTTP server. It&apos;s just a process
        running on a machine. It binds to a port (usually 80 or 443), accepts
        connections, and speaks a protocol: HTTP.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        A client connects, sends a request, gets a response. That&apos;s the
        whole model. Under the hood, it&apos;s all built on{" "}
        <span className="text-accent-green font-bold">TCP</span>&mdash;Transmission Control
        Protocol handles the reliable delivery so the application doesn&apos;t
        have to.
      </p>

      <p className="mt-6 text-gray-200 text-lg">
        This is the mental model to hold onto: a server is just a process,
        listening on a port, speaking a protocol over TCP.
      </p>

      <DiagramReveal>
        <NestedDiagram
          title="HTTP Server — Layer Stack"
          layers={[
            {
              label: "Application",
              examples: "Your code",
              color: COLORS.blue,
            },
            {
              label: "HTTP Protocol",
              examples: "GET, POST, 200 OK",
              color: COLORS.yellow,
            },
            {
              label: "TCP",
              examples: "Reliable, ordered byte stream",
              color: COLORS.green,
            },
          ]}
        />
      </DiagramReveal>

      <WhyItMatters>
        NATS is exactly the same idea. A process, a port, a protocol over TCP.
        The difference is what happens once you&apos;re connected.
      </WhyItMatters>
    </SectionContainer>
  );
}
