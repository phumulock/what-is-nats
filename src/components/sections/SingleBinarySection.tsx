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
        A server that listens on Tcp.
      </p>
      <p className="mt-6 text-gray-500">
        At its core, Nats is a process&mdash;just like an Http server. It
        binds to a Tcp port, accepts connections, and routes messages. Nothing
        exotic about that.
      </p>
      <p className="mt-4 text-gray-500">
        Where an Http server listens on port 80 and speaks Http, a Nats
        server listens on port 4222 and speaks the{" "}
        <span className="text-accent-green font-bold">Nats protocol</span>. Clients
        connect via Tcp, send messages, and receive messages. No magic,
        no special infrastructure&mdash;just a process on your machine.
      </p>
      <p className="mt-4 text-gray-500">
        A simple foundation&mdash;a single binary speaking a simple
        protocol over Tcp.
      </p>

      <DiagramReveal>
        <ServerProcessDiagram />
      </DiagramReveal>

      <WhyItMatters>
        That&apos;s it. A process, a port, a protocol. The same mental model
        as the Http server you already know&mdash;just speaking a different
        language on the wire.
      </WhyItMatters>

    </SectionContainer>
  );
}
