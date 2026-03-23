import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function WhenThingsGoDownSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="When Things Go Down" id={id} />
      <div className="mt-6 border-l-2 border-yellow-400/40 pl-6">
        <p className="text-white text-lg">
          In distributed systems, something is always down. Deploys, crashes,
          network blips&mdash;failure is the norm, not the exception.
        </p>
        <p className="mt-4 text-gray-200 text-lg">
          Core is fast precisely because it makes no durability
          promises&mdash;at-most-once delivery, no persistence, no replay. If a
          subscriber isn&apos;t connected when a message is published, that
          message is gone.
        </p>
        <p className="mt-4 text-gray-200 text-lg">
          So how do you keep the speed and simplicity of NATS while surviving
          the reality that things go down?
        </p>
      </div>
    </SectionContainer>
  );
}
