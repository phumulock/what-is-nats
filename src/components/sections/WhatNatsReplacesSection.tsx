import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { InfrastructureComparison } from "@/components/InfrastructureComparison";
import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function WhatNatsReplacesSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="One System, Not Eight"
        id={id}
      />
      <p className="mt-4 text-white text-lg">
        The others make you stitch together separate services. NATS is one
        unified system&mdash;not a bundle of features, but layers built on a
        single foundation.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        Most microservice architectures require a service mesh for discovery, a
        load balancer for routing, a message broker for async communication, a
        cache for shared state, object storage for large payloads, multi-region
        replication, and a separate auth layer. That&apos;s eight systems with
        eight protocols, eight auth configurations, and eight failure modes. NATS replaces them not
        by bundling eight tools together, but because everything&mdash;pub/sub,
        streaming, KV, object storage&mdash;is built on the same subjects,
        connections, and security model.
      </p>

      <DiagramReveal>
        <InfrastructureComparison />
      </DiagramReveal>

      <WhyItMatters>
        Every additional system is another protocol, another cluster, another
        3am failure mode. NATS isn&apos;t a Swiss Army knife of bolted-on
        features&mdash;it&apos;s a layered architecture where KV is built on
        JetStream, JetStream is built on Core, and everything shares one
        subject namespace, one connection, and one auth model. One binary to
        deploy, one system to monitor, one set of skills to learn.
      </WhyItMatters>
    </SectionContainer>
  );
}
