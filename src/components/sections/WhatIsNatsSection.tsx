import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function WhatIsNatsSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Nats" id={id} />
      <div className="mt-6 border-l-2 border-green-400/40 pl-6">
        <p className="text-white text-lg">
          A communication fabric for distributed applications.
        </p>
        <p className="mt-4 text-gray-500">
          Nats lets any service talk to any other service&mdash;without knowing
          where it lives, how many instances are running, or whether it&apos;s
          even online yet. One protocol covers pub/sub, request/reply,
          queue-based load distribution, persistent streaming, key-value
          storage, and object storage. Layer on multi-region clustering, edge
          deployments via leaf nodes, and built-in security with accounts and
          decentralized auth&mdash;all from a single binary.
        </p>
        <p className="mt-4 text-gray-500">
          But to understand what that means&mdash;and everything Nats can
          do&mdash;let&apos;s start with something everyone knows.
        </p>
      </div>
    </SectionContainer>
  );
}
