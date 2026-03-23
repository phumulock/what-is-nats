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
  ZeroMQ: COLORS.pink,
  "Redis Pub/Sub": COLORS.red,
  Redis: COLORS.red,
  Pulsar: COLORS.purple,
  "RabbitMQ Streams": COLORS.orange,
};

const COMPARISONS = [
  {
    category: "Wire Protocol",
    nats: "Plain text over TCP. You can debug it with telnet. Write a client in any language in an afternoon.",
    others: [
      { name: "Kafka", detail: "Custom binary protocol. Requires a client library — no telnet debugging." },
      { name: "RabbitMQ", detail: "AMQP 0-9-1 — complex binary framing with channels, exchanges, and bindings baked into the wire format." },
      { name: "Redis", detail: "RESP protocol. Simple, but no built-in routing, wildcards behave differently, and no queue groups." },
      { name: "ZeroMQ", detail: "ZMTP binary protocol. Powerful socket types, but no broker — you wire topology by hand. No subject routing, no discovery, no clustering." },
    ],
  },
  {
    category: "Subjects & Topics",
    nats: "Subjects are just dot-delimited strings. No pre-creation, no partition count, no replication factor. Publish to any subject instantly.",
    others: [
      { name: "Kafka", detail: "Topics auto-create by default, but production deployments pre-create them with explicit partition counts and replication factors. Adding a new event type means admin CLI calls." },
      { name: "RabbitMQ", detail: "Exchanges and queues must be declared and bound before messages flow. Routing topology is configured, not implicit." },
      { name: "ZeroMQ", detail: "No subject model. You connect sockets to endpoints directly. Routing logic lives in your application code, not the transport." },
    ],
  },
  {
    category: "Overview",
    natsLabel: "JetStream",
    nats: "JetStream adds persistence as a feature inside the NATS server you already run. Single binary, same protocol, same connection. No separate cluster to deploy or operate.",
    others: [
      { name: "Kafka", detail: "Distributed commit log. Partition-bound consumers, mandatory persistence for all topics, JVM + KRaft overhead." },
      { name: "Pulsar", detail: "Multi-tenant streaming. BookKeeper dependency, complex multi-component deploy, higher operational surface area." },
      { name: "RabbitMQ Streams", detail: "Log-based extension for RabbitMQ. Bolted onto a queue model, Erlang VM overhead, no built-in global clustering." },
    ],
  },
];

const STATUS_TEXTS = [
  { text: "Wire Protocol — simplicity you can telnet to", color: COLORS.green },
  { text: "Subjects — no admin overhead", color: COLORS.blue },
  { text: "JetStream — persistence without a separate system", color: COLORS.yellow },
];

export function ProtocolFundamentalsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Protocol & Fundamentals"
        id={id}
      />

      <p className="mt-4 text-white text-lg">
        How each system talks on the wire, names its destinations, and layers on
        persistence.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        The protocol shapes everything else&mdash;how easy it is to debug, how
        fast you can onboard, and how much ceremony stands between you and your
        first message. Compare the foundations.
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
        A simple protocol means fewer dependencies, faster debugging, and
        clients in every language. NATS gives you that simplicity at the wire
        level, and JetStream layers persistence on top without changing the
        protocol.
      </WhyItMatters>
    </SectionContainer>
  );
}
