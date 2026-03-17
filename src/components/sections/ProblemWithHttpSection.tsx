import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function ProblemWithHttpSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="The Problem with Http" id={id} />
      <div className="mt-6 border-l-2 border-blue-400/40 pl-6">
        <p className="text-white text-lg">
          A server process on Tcp. So why not just use Http?
        </p>
        <p className="mt-4 text-gray-500">
          Http works. But as systems grow, you bolt on a message broker for
          async work, a service mesh for discovery, a load balancer for
          routing, and a cache for shared state. Each one adds operational
          burden, failure modes, and complexity.
        </p>
        <p className="mt-4 text-gray-500">
          The reason starts with what&apos;s underneath&mdash;Tcp
          itself&mdash;and extends to what Http was designed to do.
        </p>
      </div>
    </SectionContainer>
  );
}
