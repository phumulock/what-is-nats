import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { WhyItMatters } from "@/components/WhyItMatters";

import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const FOUNDATIONS = [
  {
    title: "Subject-Based Routing",
    color: COLORS.green,
    httpProblem:
      "You must know the exact URL\u2014host, port, path. Every move requires updating DNS, configs, or a service mesh.",
    natsSolution:
      "Services subscribe to subjects, not endpoints. No service discovery, no load balancer config, no DNS games. Connect anywhere, reach everywhere.",
  },
  {
    title: "Many-to-Many",
    color: COLORS.blue,
    httpProblem:
      "Every request goes to exactly one server. Fan-out, event broadcasting, and audit trails all require separate infrastructure.",
    natsSolution:
      "Many-to-many by default. Any publisher can reach any number of subscribers. Add an audit service? Just subscribe\u2014zero changes to producers.",
  },
];

export function NatsCoreSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Core" id={id} href="https://docs.nats.io/nats-concepts/core-nats" />

      <p className="mt-4 text-white text-lg">
        The foundational data communication layer for distributed systems
      </p>
      <p className="mt-4 text-gray-500">
        Core is the foundational layer that everything else in the NATS
        ecosystem builds on. At its heart is
        publish/subscribe&mdash;fire-and-forget messaging where any publisher
        can reach any subscriber through named subjects.
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
                {p.httpProblem}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span style={{ color: `${p.color}b3` }}>NATS solution:</span>{" "}
                {p.natsSolution}
              </p>
            </div>
          ))}
        </div>
      </div>

      <WhyItMatters>
        Everything that follows—subjects, pub/sub, request/reply, queue
        groups, JetStream, KV stores—is built on top of Core. Understand
        this layer and the rest clicks into place.
      </WhyItMatters>

    </SectionContainer>
  );
}
