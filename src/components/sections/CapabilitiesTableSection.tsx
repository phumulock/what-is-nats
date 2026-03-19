import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { DiagramReveal } from "@/components/DiagramReveal";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const SYSTEMS = [
  { name: "NATS", color: COLORS.green },
  { name: "Kafka", color: COLORS.orange },
  { name: "RabbitMQ", color: COLORS.purple },
  { name: "Redis", color: COLORS.red },
  { name: "Pulsar", color: COLORS.purpleLight },
  { name: "ZeroMQ", color: COLORS.pink },
];

const CAPABILITIES: { label: string; checks: Record<string, boolean> }[] = [
  {
    label: "Pub/Sub",
    checks: { NATS: true, Kafka: true, RabbitMQ: true, Redis: true, Pulsar: true, ZeroMQ: true },
  },
  {
    label: "Request/Reply",
    checks: { NATS: true, Kafka: false, RabbitMQ: true, Redis: false, Pulsar: false, ZeroMQ: true },
  },
  {
    label: "Queue Groups",
    checks: { NATS: true, Kafka: true, RabbitMQ: true, Redis: true, Pulsar: true, ZeroMQ: false },
  },
  {
    label: "Persistence",
    checks: { NATS: true, Kafka: true, RabbitMQ: true, Redis: true, Pulsar: true, ZeroMQ: false },
  },
  {
    label: "Streaming / Replay",
    checks: { NATS: true, Kafka: true, RabbitMQ: true, Redis: true, Pulsar: true, ZeroMQ: false },
  },
  {
    label: "KV Store",
    checks: { NATS: true, Kafka: false, RabbitMQ: false, Redis: true, Pulsar: false, ZeroMQ: false },
  },
  {
    label: "Object Store",
    checks: { NATS: true, Kafka: false, RabbitMQ: false, Redis: false, Pulsar: false, ZeroMQ: false },
  },
  {
    label: "Wildcard Subjects",
    checks: { NATS: true, Kafka: false, RabbitMQ: true, Redis: true, Pulsar: false, ZeroMQ: false },
  },
  {
    label: "Clustering",
    checks: { NATS: true, Kafka: true, RabbitMQ: true, Redis: true, Pulsar: true, ZeroMQ: false },
  },
  {
    label: "Multi-Tenancy",
    checks: { NATS: true, Kafka: false, RabbitMQ: true, Redis: false, Pulsar: true, ZeroMQ: false },
  },
  {
    label: "Auth Built-In",
    checks: { NATS: true, Kafka: true, RabbitMQ: true, Redis: true, Pulsar: true, ZeroMQ: true },
  },
  {
    label: "Single Binary",
    checks: { NATS: true, Kafka: false, RabbitMQ: false, Redis: true, Pulsar: false, ZeroMQ: false },
  },
];

export function CapabilitiesTableSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="At a Glance" id={id} />

      <p className="mt-4 text-white text-lg">
        Before diving into the details, here&apos;s what each system gives you
        out of the box.
      </p>

      <DiagramReveal>
        <div className="border border-border rounded-lg bg-surface overflow-x-auto scrollbar-gutter-stable overscroll-x-contain">
          <table className="w-full text-xs md:text-sm font-mono">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-2 md:px-4 py-3 sticky left-0 bg-surface z-10">
                  Capability
                </th>
                {SYSTEMS.map((sys) => (
                  <th
                    key={sys.name}
                    className="text-center px-1 md:px-3 py-3 h-20 md:h-auto text-xs font-bold rotate-180 md:rotate-0 md:[writing-mode:horizontal-tb]"
                    style={{ color: sys.color, writingMode: "vertical-lr" }}
                  >
                    {sys.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map((cap, i) => (
                <tr
                  key={cap.label}
                  className={
                    i < CAPABILITIES.length - 1
                      ? "border-b border-border/50"
                      : ""
                  }
                >
                  <td className="text-gray-400 text-xs px-2 md:px-4 py-2.5 sticky left-0 bg-surface z-10">
                    {cap.label}
                  </td>
                  {SYSTEMS.map((sys) => (
                    <td key={sys.name} className="text-center px-1 md:px-3 py-2.5">
                      {cap.checks[sys.name] ? (
                        <span style={{ color: COLORS.green }}>&#10003;</span>
                      ) : (
                        <span style={{ color: COLORS.red }}>&#10005;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DiagramReveal>
    </SectionContainer>
  );
}
