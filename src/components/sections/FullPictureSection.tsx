import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function FullPictureSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="The Full Picture" id={id} />
      <div className="mt-6 border-l-2 border-green-400/40 pl-6">
        <p className="text-white text-lg">
          We&apos;ve seen how Nats compares to the alternatives. Now
          let&apos;s step back and see the full picture.
        </p>
        <p className="mt-4 text-gray-500">
          Four layers in a single binary&mdash;core messaging, persistent
          streams, data stores, and clustering. Most apps only need one or
          two. The question is which layers fit your problem, and when to
          reach for each.
        </p>
      </div>
    </SectionContainer>
  );
}
