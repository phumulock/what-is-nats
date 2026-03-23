import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { ObjectStoreDemo } from "@/components/ObjectStoreDemo";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function ObjectStoreSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Object Store" id={id} href="https://docs.nats.io/nats-concepts/jetstream/obj_store" />
      <p className="mt-4 text-white text-lg">
        Large blob storage over NATS.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        Store files, images, ML models&mdash;anything up to gigabytes. NATS
        automatically chunks large objects into JetStream messages, handles
        replication across the cluster, and reassembles them on read. Like S3,
        but without the separate service.
      </p>

      <p className="mt-2 text-gray-200 text-lg">
        Each object is split into fixed-size chunks (default 128 KB) and
        published to a dedicated JetStream stream. Metadata&mdash;name, size,
        content type, checksum&mdash;is stored in a companion stream. On read,
        the client fetches chunks in order and verifies the checksum.
      </p>

      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-green font-bold">Watch for changes</span>{" "}
        &mdash; subscribe to object updates just like KV watchers. Get notified
        when a model is updated, a config file changes, or a new artifact is
        published.
      </p>

      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-blue font-bold">Replicated</span>{" "}
        &mdash; inherits JetStream replication. Configure R=3 and your objects
        survive server failures. No need for a separate distributed file system.
      </p>

      <DiagramReveal>
        <ObjectStoreDemo />
      </DiagramReveal>

      <WhyItMatters>
        S3 is durable but adds latency and another SDK. NATS Object Store
        gives you blob storage over the same connection you&apos;re already
        using for messaging and KV. One system for messages, state, and files.
      </WhyItMatters>

    </SectionContainer>
  );
}
