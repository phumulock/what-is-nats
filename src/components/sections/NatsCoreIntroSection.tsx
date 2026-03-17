import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function NatsCoreIntroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="A Different Kind of Messaging" id={id} />
      <div className="mt-6 border-l-2 border-green-400/40 pl-6">
        <p className="text-white text-lg">
          One sender, one receiver, tight coupling everywhere&mdash;you&apos;ve
          seen what Http can&apos;t do. Nats flips every one of those
          constraints.
        </p>
        <p className="mt-4 text-gray-500">
          Instead of addressing servers by location, you address messages by
          subject. Instead of one-to-one, you get many-to-many. Instead of
          request/response only, you get fire-and-forget, fan-out, and
          load-balanced queues&mdash;all from the same primitive.
        </p>
        <p className="mt-4 text-gray-500">
          This is the foundation everything else in Nats builds on.
        </p>
      </div>

    </SectionContainer>
  );
}
