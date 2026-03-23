import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function BeyondMessagesSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Beyond Messages" id={id} />
      <div className="mt-6 border-l-2 border-blue-400/40 pl-6">
        <p className="text-white text-lg">
          Streams solved durability. But your app needs more than a log of
          messages.
        </p>
        <p className="mt-4 text-gray-200 text-lg">
          Configuration that services read on startup. Session data that
          changes mid-flight. ML models too large for a single
          message. Every distributed system eventually needs
          state and files alongside its event stream&mdash;and
          traditionally that means bolting on a separate KV store,
          object store, and another SDK.
        </p>
        <p className="mt-4 text-gray-200 text-lg">
          What if the infrastructure you already have could handle all
          three?
        </p>
      </div>
    </SectionContainer>
  );
}
