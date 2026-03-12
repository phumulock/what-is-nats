import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { ComparisonByTopicDiagram } from "@/components/ComparisonByTopicDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const STREAMING_ALT_COLORS: Record<string, string> = {
  Kafka: COLORS.blue,
  Pulsar: COLORS.purple,
  "RabbitMQ Streams": COLORS.orange,
  RabbitMQ: COLORS.orange,
  Redis: COLORS.red,
};

const STREAMING_STATUS_TEXTS = [
  { text: "Streaming alternatives — what they each bring along", color: COLORS.yellow },
  { text: "Persistence Model — choose the right guarantee per message", color: COLORS.green },
  { text: "Stream Retention — subjects, not partitions", color: COLORS.green },
  { text: "Exactly-Once Delivery — built in, not bolted on", color: COLORS.green },
  { text: "Data Stores — KV and Object Store, same connection", color: COLORS.green },
];

const JETSTREAM_COMPARISONS = [
  {
    category: "Overview",
    nats: "JetStream adds persistence as a feature inside the NATS server you already run. Single binary, same protocol, same connection. No separate cluster to deploy or operate.",
    others: [
      { name: "Kafka", detail: "Distributed commit log. Partition-bound consumers, mandatory persistence for all topics, JVM + ZooKeeper/KRaft overhead." },
      { name: "Pulsar", detail: "Multi-tenant streaming. BookKeeper dependency, complex multi-component deploy, higher operational surface area." },
      { name: "RabbitMQ Streams", detail: "Log-based extension for RabbitMQ. Bolted onto a queue model, Erlang VM overhead, no built-in global clustering." },
    ],
  },
  {
    category: "Persistence Model",
    nats: "Choose per-subject: ephemeral telemetry over Core, durable orders through JetStream. One system, right guarantee for each message.",
    others: [
      { name: "Kafka", detail: "Every message hits disk, even ephemeral telemetry you'll never read again. No way to opt out per-topic without running separate clusters." },
      { name: "Pulsar", detail: "Tiered storage helps offload old data, but all messages still flow through BookKeeper first. Persistence is all-or-nothing per topic." },
      { name: "RabbitMQ", detail: "Quorum queues add durability, but at the cost of throughput. Classic queues are faster but can lose messages on node failure." },
    ],
  },
  {
    category: "Stream Retention",
    nats: "Retention per-subject with limits on count, size, or age. Subjects are the unit of organization — no partition math, no consumer-to-partition binding.",
    others: [
      { name: "Kafka", detail: "Retention is per-topic. Partition count is set at creation and painful to change. Consumers are bound to partitions, complicating scaling." },
      { name: "Pulsar", detail: "Topics have partitions like Kafka. Retention policies exist but are less granular — no per-subject control within a topic." },
      { name: "RabbitMQ Streams", detail: "Append-only logs with time or size limits, but no subject-based filtering. You get the whole stream or nothing." },
    ],
  },
  {
    category: "Exactly-Once Delivery",
    nats: "Message deduplication built into JetStream using message IDs. Consumers use explicit ack with double-ack protocol. No external transaction coordinator needed.",
    others: [
      { name: "Kafka", detail: "Exactly-once requires idempotent producers + transactional API + read_committed isolation. Three separate features that must all be configured correctly." },
      { name: "Pulsar", detail: "Deduplication is broker-side but must be enabled per-topic. Transaction support exists but adds BookKeeper coordination overhead." },
      { name: "RabbitMQ", detail: "No exactly-once. Best effort is publisher confirms + consumer acks, which gives at-least-once. Deduplication is left to the application." },
    ],
  },
  {
    category: "Data Stores",
    nats: "KV Store (get/put/watch) and Object Store (large blobs) built on top of JetStream. Same connection, same protocol, same auth. No separate cluster to run.",
    others: [
      { name: "Kafka", detail: "KTable and KStreams provide state lookups, but they're a separate API bolted onto the consumer framework. No blob storage." },
      { name: "Redis", detail: "Streams added messaging to Redis, but they aren't true pub/sub. Running Redis alongside Kafka means two clusters, two failure modes." },
      { name: "Pulsar", detail: "Tiered storage offloads segments to S3, but no KV API. State storage requires a separate system like Apache BookKeeper." },
    ],
  },
];

export function StreamingAlternativesSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Why Not Another Streaming System?"
        id={id}
      />
      <p className="mt-4 text-white text-lg">
        JetStream isn&apos;t the first persistent streaming system. But
        it&apos;s the only one that isn&apos;t a separate system.
      </p>
      <p className="mt-6 text-gray-500">
        You&apos;ve seen how JetStream adds persistence to Core
        subjects. Other systems&mdash;Kafka, Pulsar, RabbitMQ
        Streams&mdash;were built for durable streaming too. The difference is
        in what else they bring along: separate protocols, separate clusters,
        separate operational burdens. JetStream is a capability you turn on
        inside the NATS server you already run.
      </p>

      <DiagramReveal>
        <ComparisonByTopicDiagram
          comparisons={JETSTREAM_COMPARISONS}
          natsLabel="JetStream"
          statusTexts={STREAMING_STATUS_TEXTS}
          altColors={STREAMING_ALT_COLORS}
        />
      </DiagramReveal>

      <WhyItMatters>
        Kafka and Pulsar are powerful distributed logs. But they are separate
        systems with separate protocols, separate operational burdens, and
        separate failure modes. JetStream gives you durable streams, key-value
        storage, and object storage&mdash;all inside the same binary that
        handles your real-time messaging.
      </WhyItMatters>
    </SectionContainer>
  );
}
