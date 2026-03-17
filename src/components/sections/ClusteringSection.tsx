import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const FOUNDATIONS = [
  {
    title: "Location-Transparent Mesh",
    color: COLORS.cyan,
    problem:
      "Cross-region messaging usually requires separate replication tooling, connection routing, and careful configuration for each new region.",
    solution:
      "Servers discover each other and form a full mesh automatically. Publish to any node, subscribers on any other node receive it. Interest-based routing means messages only flow where listeners exist.",
  },
];

export function ClusteringSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Clustering" id={id} />

      <p className="mt-4 text-white text-lg">Connect anywhere, reach everywhere.</p>
      <p className="mt-4 text-gray-500">
        Nats servers form clusters so your code doesn&apos;t change whether
        subscribers are local, in another region, or on the edge—the
        network figures it out.{" "}
        <span className="text-accent-green font-bold">Interest-based routing</span>{" "}
        means messages only flow where subscribers exist&mdash;Nats doesn&apos;t
        copy data to regions with no listeners, so bandwidth is automatically
        optimized.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-yellow font-bold">Leaf nodes</span>{" "}
        &mdash; extend Nats to the edge via a 20MB binary that runs on a
        Raspberry Pi&mdash;factories, stores, vehicles, anywhere with
        intermittent connectivity. Messages queue locally during outages.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-blue font-bold">Clusters</span>{" "}
        &mdash; a group of Nats servers that share clients and messages.
        They form a full mesh automatically&mdash;publish to any node,
        subscribers on any other node receive it.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-purple font-bold">Superclusters</span>{" "}
        &mdash; connect multiple clusters via gateway connections for
        global reach. Each cluster operates independently, but messages
        route seamlessly across all of them.
      </p>

      {/* Foundations */}
      <div className="mt-8">
        <span className="text-xs font-bold tracking-widest text-gray-500 block mb-3">
          FOUNDATIONS
        </span>
        <div className="grid gap-3">
          {FOUNDATIONS.map((p) => (
            <div
              key={p.title}
              className="border rounded-lg p-4 text-left"
              style={{
                borderColor: p.color,
                backgroundColor: `${p.color}0d`,
              }}
            >
              <div className="font-medium mb-1" style={{ color: p.color }}>
                {p.title}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-gray-500">Problem:</span>{" "}
                {p.problem}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span style={{ color: `${p.color}b3` }}>Nats:</span>{" "}
                {p.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      <WhyItMatters>
        Nats clustering is declarative—list your servers and they form
        a mesh. Location independence isn&apos;t a feature, it&apos;s the
        architecture.
      </WhyItMatters>
    </SectionContainer>
  );
}
