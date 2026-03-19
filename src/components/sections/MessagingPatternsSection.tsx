import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";
import { ComparisonByTopicDiagram } from "@/components/ComparisonByTopicDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const ALT_COLORS: Record<string, string> = {
  Kafka: COLORS.orange,
  RabbitMQ: COLORS.purple,
  "Redis Pub/Sub": COLORS.red,
  Redis: COLORS.red,
  ZeroMQ: COLORS.pink,
};

const COMPARISONS = [
  {
    category: "Pub/Sub",
    nats: "Built into the core protocol — fire-and-forget by default. No offsets, no replay, no pile-up. Messages that nobody is listening for simply disappear.",
    others: [
      { name: "Kafka", detail: "Every message hits disk and gets an offset. Consumers replay from last committed offset — sometimes thousands of stale messages after a crash." },
      { name: "RabbitMQ", detail: "Requires declaring exchanges, queues, and bindings before a single message flows. Slow consumers cause memory pressure on the broker." },
      { name: "Redis", detail: "Simple fire-and-forget pub/sub with glob wildcards via PSUBSCRIBE, but no dot-delimited subject hierarchy and no fan-out control." },
      { name: "ZeroMQ", detail: "PUB/SUB socket types exist, but you manage connections and topic filtering yourself. No broker means no fan-out guarantees — if a subscriber isn't connected, the message is gone." },
    ],
  },
  {
    category: "Req/Reply",
    nats: "First-class request/reply built into the protocol. A single PUB with an inbox subject gives you synchronous RPC over an async transport — no extra infrastructure.",
    others: [
      { name: "Kafka", detail: "No native request/reply. You build it yourself with two topics, correlation IDs, and a consumer polling for responses." },
      { name: "RabbitMQ", detail: "Supported via reply-to headers and temporary queues, but you manage correlation IDs and queue lifecycle yourself." },
      { name: "Redis", detail: "No built-in request/reply. You simulate it with paired lists or Pub/Sub channels and manual correlation." },
      { name: "ZeroMQ", detail: "REQ/REP socket pairs provide request/reply, but you hardwire the topology. No inbox subjects, no automatic load balancing across responders." },
    ],
  },
  {
    category: "Queue Groups",
    nats: "Any subscriber joins a queue group by name. No coordinator, no leader election, no partition assignment. New workers get messages immediately.",
    others: [
      { name: "Kafka", detail: "Consumer groups need a group coordinator. Partition rebalancing can pause consumption for minutes. Workers are locked to partitions." },
      { name: "RabbitMQ", detail: "Competing consumers work, but require explicit queue declaration, binding, and prefetch tuning per consumer." },
      { name: "Redis", detail: "Redis Pub/Sub has no work distribution. Redis Streams added consumer groups with automatic distribution, but they require explicit stream/group setup and manual ACKs." },
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
];

const STATUS_TEXTS = [
  { text: "Pub/Sub — built in, not bolted on", color: COLORS.yellow },
  { text: "Req/Reply — RPC over an async transport", color: COLORS.pink },
  { text: "Queue Groups — instant work distribution", color: COLORS.purple },
  { text: "Back-Pressure — protect the fast path", color: COLORS.red },
];

export function MessagingPatternsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Messaging Patterns"
        id={id}
      />

      <p className="mt-4 text-white text-lg">
        Every messaging system claims pub/sub. Few give you the rest without
        extra infrastructure.
      </p>
      <p className="mt-4 text-gray-500">
        Pub/Sub, request/reply, queue groups, and back-pressure are the
        building blocks of real-time messaging. See how NATS handles each one
        natively, while alternatives require workarounds, extra components, or
        manual plumbing.
      </p>

      <DiagramReveal>
        <ComparisonByTopicDiagram
          comparisons={COMPARISONS}
          natsLabel="NATS"
          statusTexts={STATUS_TEXTS}
          altColors={ALT_COLORS}
        />
      </DiagramReveal>

      <WhyItMatters>
        Every alternative solves one or two patterns&mdash;pub/sub here, queuing
        there, request/reply somewhere else. NATS Core handles all of them
        natively, in a single binary, with zero external dependencies.
      </WhyItMatters>
    </SectionContainer>
  );
}
