import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { KVStoreDemo } from "@/components/KVStoreDemo";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function KVStoreSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Key Value Store" id={id} href="https://docs.nats.io/nats-concepts/jetstream/key-value-store" />
      <p className="mt-4 text-white text-lg">
        Key-value storage over your existing Nats connection.
      </p>
      <p className="mt-4 text-gray-500">
        Nats Key Value is a key-value store built on top of Jetstream. Get, put,
        delete, and watch keys&mdash;all over your existing Nats connection.
      </p>
      <p className="mt-2 text-gray-500">
        Every Key Value bucket is backed by a Jetstream stream. Keys map to subjects,
        values to message payloads, and revisions to sequence numbers. A{" "}
        <code className="text-accent-blue">put(&quot;user.123.name&quot;, &quot;Alice&quot;)</code>{" "}
        becomes a publish to{" "}
        <code className="text-accent-blue">$KV.users.user.123.name</code>.
        Watchers are just Jetstream consumers with subject filters.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-green font-bold">Watch</span>{" "}
        &mdash; subscribe to key patterns like{" "}
        <code className="text-accent-green">user.123.&gt;</code> and get
        notified on every change in real-time. No polling. Build reactive UIs,
        configuration hot-reload, or distributed coordination.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-yellow font-bold">TTL</span>{" "}
        &mdash; keys expire automatically after a configured duration. Clean
        up stale state without manual intervention.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-blue font-bold">History</span>{" "}
        &mdash; retain previous values per key with atomic compare-and-swap
        for safe concurrent updates.
      </p>

      <DiagramReveal>
        <KVStoreDemo />
      </DiagramReveal>

      <WhyItMatters>
        A dedicated Key Value store means another cluster to manage. Nats Key Value gives you the same
        get/put/watch semantics over the connection you&apos;re already using
        for messaging. One system, fewer moving parts, and replication comes
        free from Jetstream.
      </WhyItMatters>

    </SectionContainer>
  );
}
