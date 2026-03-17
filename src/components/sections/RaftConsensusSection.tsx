import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { RaftConsensusDiagram } from "@/components/RaftConsensusDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function RaftConsensusSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Raft Consensus" id={id} href="https://docs.nats.io/running-a-nats-service/configuration/clustering/jetstream_clustering" />
      <p className="mt-4 text-white text-lg">
        How Jetstream keeps streams consistent across a cluster
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-green font-bold">One Raft group per stream</span>{" "}
        &mdash; Jetstream runs a separate Raft consensus group for each stream
        and each consumer. No single leader bottleneck&mdash;each group elects
        its own leader independently.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-blue font-bold">Meta group for placement</span>{" "}
        &mdash; a cluster-wide meta group (all Jetstream-enabled servers) decides
        where to place new streams and consumers. Each stream group then handles
        its own data replication; each consumer group tracks delivery state.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-yellow font-bold">Quorum writes</span>{" "}
        &mdash; a message is only acknowledged once a majority of replicas have
        written it. With R3, that means 2 of 3 servers must confirm before the
        publisher gets an ACK.
      </p>

      <DiagramReveal>
        <RaftConsensusDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Raft gives Jetstream strong consistency without external dependencies
        like ZooKeeper or etcd. Every stream gets its own consensus group, so a
        busy stream can&apos;t block an unrelated one.
      </WhyItMatters>

    </SectionContainer>
  );
}
