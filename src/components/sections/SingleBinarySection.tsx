import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { ServerProcessDiagram } from "@/components/ServerProcessDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function SingleBinarySection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="It&apos;s a Single Binary" id={id} href="https://docs.nats.io/reference/reference-protocols" />
      <p className="mt-4 text-white text-lg">
        A server that listens on TCP.
      </p>
      <p className="mt-6 text-gray-200 text-lg">
        At its core, NATS is a process&mdash;just like an HTTP server. It
        binds to a TCP port, accepts connections, and routes messages. Nothing
        exotic about that.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        Where an HTTP server listens on port 80 and speaks HTTP, a NATS
        server listens on port 4222 and speaks the{" "}
        <span className="text-accent-green font-bold">NATS protocol</span>. Clients
        connect via TCP, send messages, and receive messages. No magic,
        no special infrastructure&mdash;just a process on your machine.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        A simple foundation&mdash;a single binary speaking a simple
        protocol over TCP.
      </p>

      <DiagramReveal>
        <ServerProcessDiagram />
      </DiagramReveal>

      <WhyItMatters>
        That&apos;s it. A process, a port, a protocol. The same mental model
        as the HTTP server you already know&mdash;just speaking a different
        language on the wire.
      </WhyItMatters>

    </SectionContainer>
  );
}
