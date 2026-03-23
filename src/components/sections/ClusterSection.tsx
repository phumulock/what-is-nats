import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { ClusterMeshDiagram } from "@/components/ClusterMeshDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function ClusterSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Cluster" id={id} href="https://docs.nats.io/running-a-nats-service/configuration/clustering" />
      <p className="mt-4 text-white text-lg">
        Full-mesh routes within a region&mdash;every server can reach every
        subscriber.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-green font-bold">Full-mesh route connections</span>{" "}
        &mdash; every server maintains a direct TCP link to every other server
        in the cluster. Publish to any server, and it reaches all subscribers
        regardless of which server they&apos;re connected to.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-blue font-bold">Auto-discovery</span>{" "}
        &mdash; point a new server at any existing member and it learns the
        full topology. No static config files listing every node. If one goes
        down, clients automatically reconnect to a surviving member.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-yellow font-bold">Transparent failover</span>{" "}
        &mdash; clients connect to multiple servers and failover automatically.
        No connection pooling libraries, no retry logic to write, no circuit
        breakers to configure&mdash;the client library handles it.
      </p>

      <DiagramReveal>
        <ClusterMeshDiagram />
      </DiagramReveal>

      <WhyItMatters>
        NATS core routing is symmetric&mdash;every server can route messages
        to every other. For JetStream, NATS uses the Raft consensus algorithm
        to elect a leader per stream, ensuring consistency without a single
        external coordinator.
      </WhyItMatters>

    </SectionContainer>
  );
}
