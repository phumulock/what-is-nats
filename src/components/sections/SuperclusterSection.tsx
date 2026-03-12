import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SuperclusterDiagram } from "@/components/SuperclusterDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function SuperclusterSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Supercluster" id={id} href="https://docs.nats.io/running-a-nats-service/configuration/gateways" />
      <p className="mt-4 text-white text-lg">
        Gateways between regions&mdash;global reach without full-mesh overhead.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-pink font-bold">Gateway connections</span>{" "}
        &mdash; each cluster elects a gateway pair that maintains a single
        logical link to every other cluster. No full-mesh between
        regions&mdash;just targeted hops.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-green font-bold">Interest-based routing</span>{" "}
        &mdash; messages only traverse gateways when subscribers exist in the
        remote region. Publish{" "}
        <code className="text-accent-green">orders.us.east</code> in New York
        and nobody in Frankfurt is listening? The message never leaves the US
        cluster.
      </p>
      <p className="mt-4 text-gray-500">
        Accounts and security boundaries are shared across the supercluster, so
        a service in any region can reach any other service on the same
        account&mdash;same subjects, same permissions, no extra configuration
        per region.
      </p>

      <DiagramReveal>
        <SuperclusterDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Traditional multi-region messaging requires dedicated replication
        pipelines per topic, manual failover runbooks, and careful bandwidth
        budgeting. Superclusters make it declarative&mdash;list your clusters
        and gateways handle the rest.
      </WhyItMatters>

    </SectionContainer>
  );
}
