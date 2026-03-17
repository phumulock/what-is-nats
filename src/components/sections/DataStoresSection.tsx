import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const FOUNDATIONS = [
  {
    title: "Unified Storage",
    color: COLORS.purple,
    problem:
      "Running a message broker, a Key Value store, and an object store means three separate systems to deploy, monitor, and keep consistent.",
    solution:
      "A Key Value pair is a subject with the latest message retained. A file is chunked messages in a stream. One protocol, one connection, one cluster\u2014no extra infrastructure.",
  },
];

export function DataStoresSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Data Stores" id={id} />

      <p className="mt-4 text-gray-500">
        Most platforms cover one or two of these well, but not all three.
        Message brokers add key-value APIs as an afterthought. Key-value stores bolt
        on pub/sub. Nobody covers all three over a single protocol.
      </p>

      <p className="mt-6 text-gray-500">
        Nats does. A key-value pair is just a subject with the latest message
        retained. A large file is a sequence of chunked messages in a stream.
        Same protocol, same connection, same replication&mdash;no new
        infrastructure.
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
        Instead of running a separate Key Value store and object store alongside your
        message broker, Nats gives you messages, state, and file storage from
        the same binary you&apos;re already running. One system to deploy,
        monitor, and reason about.
      </WhyItMatters>
    </SectionContainer>
  );
}
