import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WildcardMatcher } from "@/components/WildcardMatcher";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function LocationIndependenceSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Subject-Based Routing"
        id={id}
        href="https://docs.nats.io/nats-concepts/subjects"
      />
      <p className="mt-4 text-white text-lg">Publishers and subscribers never need to know where each other are.</p>
      <p className="mt-4 text-gray-500">
        In Nats, you don&apos;t send messages to servers, IPs, or endpoints — you
        publish to <span className="text-accent-green font-bold">subjects</span>. A subject is just a
        string like{" "}
        <code className="text-accent-green">orders.us.east</code>. No admin CLI,
        no partition count, no pre-creation. Publish to it and it exists.
        Subscribers express interest in subjects, and Nats routes messages
        to them — regardless of where they are in the network.
      </p>

      <p className="mt-4 text-gray-500">
        The dot separator creates a natural hierarchy, and wildcards let
        subscribers listen to entire categories of messages without knowing
        every specific subject:
      </p>

      <DiagramReveal>
        <WildcardMatcher />
      </DiagramReveal>

      <WhyItMatters>
        Location independence means services can move, scale, or be
        replaced without updating any routing configuration. A new
        instance just subscribes to the same subjects and starts
        receiving messages. No service discovery, no load balancer
        updates, no config changes.
      </WhyItMatters>

    </SectionContainer>
  );
}
