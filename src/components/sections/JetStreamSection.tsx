import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";

import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const FOUNDATIONS = [
  {
    title: "Async First",
    color: COLORS.yellow,
    problem:
      "Fire-and-forget means producers and consumers must be online at the same time. If a consumer is down, the message is gone.",
    solution:
      "Messages persist in streams until acknowledged. Publish now, consume later. Producers and consumers are fully decoupled in time.",
  },
];

export function JetStreamSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Jetstream" id={id} href="https://docs.nats.io/nats-concepts/jetstream" />

      <p className="mt-4 text-white text-lg">
        Still fast. Now durable.
      </p>
      <p className="mt-4 text-gray-500">
        Core is fire-and-forget. If no one is listening when a message is
        published, it vanishes. Jetstream adds persistence on top&mdash;same
        protocol, same subjects, but messages are stored and can be replayed.
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
                <span style={{ color: `${p.color}b3` }}>Jetstream:</span>{" "}
                {p.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      <WhyItMatters>
        Most messaging systems force a choice: fast-and-ephemeral or
        durable-and-heavy. Nats gives you both. Core for real-time
        fire-and-forget, Jetstream for when every message must be accounted
        for. One binary, one protocol, two modes.
      </WhyItMatters>

    </SectionContainer>
  );
}
