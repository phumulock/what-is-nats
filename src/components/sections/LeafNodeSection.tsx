import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { LeafNodeDiagram } from "@/components/LeafNodeDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function LeafNodeSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Leaf Node" id={id} href="https://docs.nats.io/running-a-nats-service/configuration/leafnodes" />
      <p className="mt-4 text-white text-lg">
        Extend NATS to the edge&mdash;factories, stores, vehicles, anywhere.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-yellow font-bold">Single upstream connection</span>{" "}
        &mdash; a standalone NATS server (20MB binary) connects to a cluster.
        Runs on a Raspberry Pi, an industrial gateway, or a vehicle&apos;s
        onboard computer&mdash;anywhere a full cluster member would be overkill.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-blue font-bold">Subject filtering</span>{" "}
        &mdash; control exactly which subjects bridge between the leaf and the
        upstream cluster. A factory floor node might only sync{" "}
        <code className="text-accent-green">sensors.&gt;</code> upstream while
        keeping local traffic private. Only the data you choose leaves the edge.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-pink font-bold">Resilient at the edge</span>{" "}
        &mdash; when the upstream connection drops, the leaf node keeps running.
        Local publishers and subscribers continue communicating. With JetStream
        enabled, messages destined for the cluster queue until connectivity is
        restored&mdash;no data loss, no application changes.
      </p>

      <DiagramReveal>
        <LeafNodeDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Edge deployments usually mean a completely separate messaging stack
        with custom sync logic. Leaf nodes give you the same NATS
        subjects, the same client libraries, and the same publish/subscribe
        semantics&mdash;just closer to the data source.
      </WhyItMatters>

    </SectionContainer>
  );
}
