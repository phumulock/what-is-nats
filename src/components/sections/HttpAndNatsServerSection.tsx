import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { ServerProcessDiagram } from "@/components/ServerProcessDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function HttpAndNatsServerSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="A Process, a Port, a Protocol"
        id={id}
        href="https://docs.nats.io/reference/reference-protocols"
      />
      <p className="mt-6 text-gray-200 text-lg">
        NATS is exactly the same idea. Where an HTTP server listens on port 80
        and speaks HTTP, a NATS server listens on port 4222 and speaks the{" "}
        <span className="text-accent-green font-bold">NATS protocol</span>.
        Clients connect via TCP, send messages, and receive messages. No magic,
        no special infrastructure&mdash;just a process on your machine.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        A simple foundation&mdash;a single binary speaking a simple protocol
        over TCP.
      </p>

      <DiagramReveal>
        <ServerProcessDiagram />
      </DiagramReveal>

      <WhyItMatters>
        A process, a port, a protocol. The same mental model as the HTTP server
        you already know&mdash;just speaking a different language on the wire.
        The difference is what happens once you&apos;re connected.
      </WhyItMatters>
    </SectionContainer>
  );
}
