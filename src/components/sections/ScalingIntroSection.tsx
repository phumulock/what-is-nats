import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function ScalingIntroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Scaling Beyond One Server" id={id} />
      <div className="mt-6 border-l-2 border-pink-400/40 pl-6">
        <p className="text-white text-lg">
          Streams, key-value pairs, object storage&mdash;all from a single
          binary. But real systems don&apos;t run on a single server.
        </p>
        <p className="mt-4 text-gray-500">
          Production means multiple regions, cloud providers, and edge
          devices. It means tolerating failures without downtime. It means
          messages published in Tokyo reaching subscribers in Frankfurt
          without your code knowing the difference.
        </p>
        <p className="mt-4 text-gray-500">
          Nats was built for this from the start&mdash;servers form a mesh
          automatically, routing messages only where they&apos;re needed
          across clusters, superclusters, and leaf nodes.
        </p>
      </div>
    </SectionContainer>
  );
}
