import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { RequestReplyDiagram } from "@/components/RequestReplyDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";

import { WhyItMatters } from "@/components/WhyItMatters";
import { SectionProps } from "./types";

export function RequestReplySection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Request & Reply" id={id} href="https://docs.nats.io/nats-concepts/reqreply" />
      <p className="mt-4 text-white text-lg">RPC without the service mesh.</p>
      <p className="mt-4 text-gray-500">
        Need a response? Nats creates a{" "}
        <span className="text-accent-green font-bold">
          unique inbox subject
        </span>{" "}
        for each request. Responders publish to that inbox, and only you receive
        the reply. No sidecars, no Envoy config, no Istio&mdash;just pub/sub
        with a clever addressing trick. Send one request and collect multiple
        replies (
        <span className="text-accent-yellow font-bold">scatter-gather</span>) to
        find the fastest responder or aggregate results from shards. No
        response? The request times out cleanly&mdash;unlike Http hanging
        connections, failed services don&apos;t cascade into client-side thread
        exhaustion.
      </p>


      <DiagramReveal>
        <RequestReplyDiagram />
      </DiagramReveal>

      <WhyItMatters>
        gRPC needs protobuf schemas, generated stubs, and often a service mesh
        for load balancing. Nats request/reply gives you RPC semantics with zero
        ceremony. Services just subscribe to their name and respond.
      </WhyItMatters>

    </SectionContainer>
  );
}
