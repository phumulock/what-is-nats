import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function AlternativesIntroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="But What About ___?" id={id} />
      <div className="mt-6 border-l-2 border-yellow-400/40 pl-6">
        <p className="text-white text-lg">
          Messaging, persistence, data stores, clustering&mdash;all from one
          system. So why does anyone reach for something else?
        </p>
        <p className="mt-4 text-gray-200 text-lg">
          Kafka has been the default for event streaming. RabbitMQ owns the
          traditional message broker space. Redis is everyone&apos;s first
          cache. Each is battle-tested, well-documented, and already in your
          stack. The question isn&apos;t whether they work&mdash;it&apos;s
          what you pay in complexity when your needs span more than one of
          them.
        </p>
        <p className="mt-4 text-gray-200 text-lg">
          Let&apos;s see how NATS stacks up&mdash;and where the trade-offs
          actually are.
        </p>
      </div>
    </SectionContainer>
  );
}
