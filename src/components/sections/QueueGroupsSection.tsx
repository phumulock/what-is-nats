import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { QueueGroupDiagram } from "@/components/QueueGroupDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";

import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function QueueGroupsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Queue Groups" id={id} href="https://docs.nats.io/nats-concepts/queue" />
      <p className="mt-4 text-white text-lg">Scaling without Kubernetes.</p>
      <p className="mt-4 text-gray-500">
        Add a queue group name to your subscription and NATS distributes
        messages across all subscribers in that group. No coordinator, no
        leader election, no split-brain scenarios.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-green font-bold">Exactly one subscriber</span>{" "}
        &mdash; each message goes to one subscriber in the group. Start a new
        worker and it gets messages immediately&mdash;stop one and others pick
        up instantly. No partition rebalancing delay.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-yellow font-bold">Load balance</span>{" "}
        &mdash; NATS distributes work evenly across workers. Scale from 1 to
        1000 processes with zero configuration changes.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-blue font-bold">Fanning out</span>{" "}
        &mdash; queue groups and regular subscribers coexist on the same
        subject. Load balance to workers while simultaneously sending to
        monitoring and analytics.
      </p>

      <DiagramReveal>
        <QueueGroupDiagram />
      </DiagramReveal>


      <WhyItMatters>
        Traditional message brokers tie consumers to partitions or
        channels, making scaling disruptive. NATS queue groups scale
        from 1 to 1000 workers with zero configuration changes. Just
        start more processes.
      </WhyItMatters>

    </SectionContainer>
  );
}
