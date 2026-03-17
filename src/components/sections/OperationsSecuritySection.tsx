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
  Redis: COLORS.red,
  ZeroMQ: COLORS.pink,
};

const COMPARISONS = [
  {
    category: "Clustering",
    nats: "Full-mesh clustering with zero-config gossip protocol. Add a node, point it at any existing node, and the cluster self-organizes. Superclusters span regions with gateway connections.",
    others: [
      { name: "Kafka", detail: "Requires KRaft for metadata consensus. Broker addition needs partition reassignment. Cross-region replication is a separate product (MirrorMaker)." },
      { name: "RabbitMQ", detail: "Clustering works within a LAN but breaks across regions. Federation and shovels exist but add operational complexity." },
      { name: "Redis", detail: "Redis Cluster shards data by hash slots. Adding nodes means resharding. Sharded Pub/Sub (Redis 7.0+) participates in the cluster protocol, but classic Pub/Sub does not." },
      { name: "ZeroMQ", detail: "No clustering — it's a library, not a server. You build your own topology with broker patterns (ROUTER/DEALER), but there's no automatic failover or discovery." },
    ],
  },
  {
    category: "Security & Auth",
    nats: "Multi-tenancy baked into the protocol. Accounts isolate traffic, NKeys provide decentralized identity, and JWTs handle authorization — no external auth system required.",
    others: [
      { name: "Kafka", detail: "Production auth requires configuring SASL, SSL, and ACLs. Multi-tenancy needs topic naming conventions or separate clusters — nothing enforced at the protocol level." },
      { name: "RabbitMQ", detail: "Vhosts provide basic isolation. Built-in username/password auth works for many deployments, though larger enterprises often add LDAP or OAuth plugins." },
      { name: "Redis", detail: "ACLs were added in Redis 6, but there's no multi-tenancy model. Isolation means running separate instances." },
      { name: "ZeroMQ", detail: "CurveZMQ provides encryption and authentication between sockets, but there's no authorization model, no multi-tenancy, and no centralized credential management." },
    ],
  },
];

const STATUS_TEXTS = [
  { text: "Clustering — self-organizing, multi-region", color: COLORS.cyan },
  { text: "Security & Auth — multi-tenancy without bolt-ons", color: COLORS.purpleLight },
];

export function OperationsSecuritySection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader
        number={number}
        title="Operations & Security"
        id={id}
      />

      <p className="mt-4 text-white text-lg">
        Running at scale means clustering, security, and multi-tenancy. Nats
        builds all three into the server.
      </p>
      <p className="mt-4 text-gray-500">
        Clustering shouldn&apos;t require a coordinator service. Auth
        shouldn&apos;t require an external system. Multi-tenancy shouldn&apos;t
        be a naming convention. See how Nats handles operations and security
        compared to the alternatives.
      </p>

      <DiagramReveal>
        <ComparisonByTopicDiagram
          comparisons={COMPARISONS}
          natsLabel="Nats"
          statusTexts={STATUS_TEXTS}
          altColors={ALT_COLORS}
        />
      </DiagramReveal>

      <WhyItMatters>
        Clustering that self-organizes and security that&apos;s built into the
        protocol mean fewer moving parts in production. No separate metadata
        service, no external auth backends, no separate federation plugins.
      </WhyItMatters>
    </SectionContainer>
  );
}
