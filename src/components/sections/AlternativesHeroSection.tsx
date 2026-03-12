import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { COLORS } from "@/lib/colors";
import { SectionProps } from "./types";

const ALTERNATIVES = [
  { label: "Kafka", examples: "Event streaming, durable logs", color: COLORS.green },
  { label: "RabbitMQ", examples: "Traditional message broker", color: COLORS.blue },
  { label: "Redis", examples: "In-memory cache + pub/sub", color: COLORS.red },
  { label: "Pulsar", examples: "Tiered storage streaming", color: COLORS.purpleLight },
  { label: "MQTT", examples: "IoT device protocol", color: COLORS.pink },
];

export function AlternativesHeroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer variant="hero">
      <SectionHeader number={number} title="Why Not Just Use ___?" id={id} />
      <div className="mt-6 border border-border rounded-lg p-4 bg-surface flex flex-col items-stretch gap-2 w-full max-w-sm">
        {ALTERNATIVES.map((item) => (
          <div
            key={item.label}
            className="border rounded-lg px-4 py-2 text-sm flex items-center justify-between"
            style={{ borderColor: item.color }}
          >
            <span className="font-medium" style={{ color: item.color }}>
              {item.label}
            </span>
            <span className="text-gray-500 text-xs">{item.examples}</span>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
