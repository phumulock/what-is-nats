import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";
import { ComparisonByTopicDiagram } from "@/components/ComparisonByTopicDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { SectionProps } from "./types";

const CORE_COMPARISONS = [
  {
    category: "Wire Protocol",
    nats: "Plain text over TCP. You can debug it with telnet. Write a client in any language in an afternoon.",
    others: [
      { name: "Kafka", detail: "Custom binary protocol. Needs generated client code and version-matched libraries." },
      { name: "RabbitMQ", detail: "AMQP 0-9-1 — complex binary framing with channels, exchanges, and bindings baked into the wire format." },
      { name: "Redis", detail: "RESP protocol. Simple, but no built-in routing, wildcards behave differently, and no queue groups." },
      { name: "MQTT", detail: "Lightweight binary protocol designed for constrained devices. Simple, but no subject hierarchy, no queue groups, and no request/reply in the spec." },
    ],
  },
  {
    category: "Subjects & Topics",
    nats: "Subjects are just dot-delimited strings. No pre-creation, no partition count, no replication factor. Publish to any subject instantly.",
    others: [
      { name: "Kafka", detail: "Topics must be created with partition count and replication factor before use. Adding a new event type means admin CLI calls." },
      { name: "RabbitMQ", detail: "Exchanges and queues must be declared and bound before messages flow. Routing topology is configured, not implicit." },
      { name: "MQTT", detail: "Topic strings exist, but the broker needs separate configuration for persistence, QoS levels, and retained messages." },
    ],
  },
  {
    category: "Pub/Sub",
    nats: "Built into the core protocol — fire-and-forget by default. No offsets, no replay, no pile-up. Messages that nobody is listening for simply disappear.",
    others: [
      { name: "Kafka", detail: "Every message hits disk and gets an offset. Consumers replay from last committed offset — sometimes thousands of stale messages after a crash." },
      { name: "RabbitMQ", detail: "Requires declaring exchanges, queues, and bindings before a single message flows. Slow consumers cause memory pressure on the broker." },
      { name: "Redis", detail: "Simple fire-and-forget pub/sub, but no subject hierarchy, no wildcard routing, and no fan-out control." },
      { name: "MQTT", detail: "Pub/sub is MQTT's core model, but QoS levels add broker complexity. No wildcard hierarchy like NATS, and fan-out control depends entirely on the broker implementation." },
    ],
  },
  {
    category: "Req/Reply",
    nats: "First-class request/reply built into the protocol. A single PUB with an inbox subject gives you synchronous RPC over an async transport — no extra infrastructure.",
    others: [
      { name: "Kafka", detail: "No native request/reply. You build it yourself with two topics, correlation IDs, and a consumer polling for responses." },
      { name: "RabbitMQ", detail: "Supported via reply-to headers and temporary queues, but you manage correlation IDs and queue lifecycle yourself." },
      { name: "Redis", detail: "No built-in request/reply. You simulate it with paired lists or Pub/Sub channels and manual correlation." },
      { name: "MQTT", detail: "No native request/reply. You build it with paired topics and correlation data in the payload — the protocol gives you no help." },
    ],
  },
  {
    category: "Queue Groups",
    nats: "Any subscriber joins a queue group by name. No coordinator, no leader election, no partition assignment. New workers get messages immediately.",
    others: [
      { name: "Kafka", detail: "Consumer groups need a group coordinator. Partition rebalancing can pause consumption for minutes. Workers are locked to partitions." },
      { name: "RabbitMQ", detail: "Competing consumers work, but require explicit queue declaration, binding, and prefetch tuning per consumer." },
      { name: "Redis", detail: "No native work distribution. You build it yourself with lists and BRPOP, or use Redis Streams consumer groups with manual ACKs." },
    ],
  },
  {
    category: "Back-Pressure",
    nats: "Misbehaving clients get disconnected before they can hurt the system. The fast path stays fast for everyone else.",
    others: [
      { name: "Kafka", detail: "Slow consumers don\u2019t affect producers directly, but they accumulate lag and can trigger expensive rebalances." },
      { name: "RabbitMQ", detail: "Slow consumers cause queue depth to grow, eventually triggering flow control that blocks producers." },
      { name: "Redis", detail: "Slow subscribers cause the output buffer to grow. Redis disconnects them eventually, but messages are lost." },
    ],
  },
  {
    category: "Clustering",
    nats: "Full-mesh clustering with zero-config gossip protocol. Add a node, point it at any existing node, and the cluster self-organizes. Superclusters span regions with gateway connections.",
    others: [
      { name: "Kafka", detail: "Requires ZooKeeper (or KRaft) for metadata. Broker addition needs partition reassignment. Cross-region replication is a separate product (MirrorMaker)." },
      { name: "RabbitMQ", detail: "Clustering works within a LAN but breaks across regions. Federation and shovels exist but add operational complexity." },
      { name: "Redis", detail: "Redis Cluster shards data by hash slots. Adding nodes means resharding. Pub/Sub doesn't participate in the cluster protocol at all." },
      { name: "MQTT", detail: "No clustering in the protocol. High availability depends entirely on your broker vendor — Mosquitto, HiveMQ, and EMQX all do it differently." },
    ],
  },
  {
    category: "Security & Auth",
    nats: "Multi-tenancy baked into the protocol. Accounts isolate traffic, NKeys provide decentralized identity, and JWTs handle authorization — no external auth system required.",
    others: [
      { name: "Kafka", detail: "Production auth requires configuring SASL, SSL, and ACLs. Multi-tenancy needs topic naming conventions or separate clusters — nothing enforced at the protocol level." },
      { name: "RabbitMQ", detail: "Vhosts provide basic isolation. Production deployments typically need an external auth backend (LDAP, OAuth) and per-queue permission management." },
      { name: "Redis", detail: "ACLs were added in Redis 6, but there's no multi-tenancy model. Isolation means running separate instances." },
      { name: "MQTT", detail: "Authentication and authorization are entirely broker-dependent. The protocol defines username/password fields but no standard for access control or tenant isolation." },
    ],
  },
];

export function MessagingAlternativesSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Why Not Another Messaging System?"
        id={id}
      />

      <p className="mt-4 text-white text-lg">
        Other messaging systems exist. None of them cover what Core does.
      </p>
      <p className="mt-4 text-gray-500">
        Now that you&apos;ve seen what Core provides&mdash;from its wire
        protocol to pub/sub, request/reply, queue groups, and
        clustering&mdash;you might wonder: don&apos;t other messaging systems
        solve these same problems? They each get part of the way there. But
        every one leaves gaps that force you to bolt on additional systems. Pick
        a topic and see for yourself.
      </p>

      <DiagramReveal>
        <ComparisonByTopicDiagram comparisons={CORE_COMPARISONS} />
      </DiagramReveal>

      <WhyItMatters>
        Every alternative solves one or two patterns&mdash;pub/sub here, queuing
        there, request/reply somewhere else. Core handles all of them
        natively, in a single binary, with zero external dependencies.
      </WhyItMatters>
    </SectionContainer>
  );
}
