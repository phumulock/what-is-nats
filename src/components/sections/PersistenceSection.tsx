import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DurabilitySpectrumDiagram } from "@/components/DurabilitySpectrumDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function PersistenceSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Persistence" id={id} />
      <p className="mt-4 text-white text-lg">
        Publish now, consume later.
      </p>
      <p className="mt-4 text-gray-500">
        Jetstream offers a durability spectrum. More durability means more work
        per message&mdash;pick the right trade-off per stream.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-green font-bold">Memory</span>{" "}
        &mdash; fastest. Messages live in RAM and are lost on restart. Ideal
        for caches and ephemeral state.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-yellow font-bold">Disk</span>{" "}
        &mdash; durable. Messages survive server restarts. The default for
        most workloads.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-blue font-bold">Replicated</span>{" "}
        &mdash; safest. Messages are written to multiple servers. Survives
        machine failures with no data loss.
      </p>
      <p className="mt-4 text-gray-500">
        Persistence enables temporal decoupling. Subscribers can go offline,
        come back, and catch up on missed messages automatically.
      </p>

      <DiagramReveal>
        <DurabilitySpectrumDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Most brokers force you to choose persistence upfront. Nats lets you
        mix: telemetry over Core (fast, ephemeral), orders through
        Jetstream (durable, guaranteed). One system, right tool for each
        job.
      </WhyItMatters>
    </SectionContainer>
  );
}
