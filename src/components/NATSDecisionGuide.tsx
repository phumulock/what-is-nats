"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

interface UseCase {
  scenario: string;
  feature: string;
  why: string;
}

interface LayerGuide {
  layer: string;
  color: string;
  useCases: UseCase[];
}

const GUIDE: LayerGuide[] = [
  {
    layer: "Core",
    color: COLORS.green,
    useCases: [
      {
        scenario: "Real-time telemetry & metrics",
        feature: "Pub/Sub",
        why: "Speed matters, occasional loss is fine",
      },
      {
        scenario: "Service-to-service RPC",
        feature: "Request/Reply",
        why: "Built-in timeouts, no extra infrastructure",
      },
      {
        scenario: "Work distribution across instances",
        feature: "Queue Groups",
        why: "Instant scaling, no coordination needed",
      },
      {
        scenario: "Fast failure when services are down",
        feature: "No Responders",
        why: "Microsecond feedback, no hanging connections",
      },
    ],
  },
  {
    layer: "Jetstream",
    color: COLORS.blue,
    useCases: [
      {
        scenario: "Event sourcing & audit trails",
        feature: "Streams (limits retention)",
        why: "Replay history, cap by age or count",
      },
      {
        scenario: "Order processing & transactions",
        feature: "Consumers (at-least-once)",
        why: "Can't lose messages, need acknowledgments",
      },
      {
        scenario: "Task queues with guaranteed processing",
        feature: "Streams (work-queue retention)",
        why: "Delete on ack, exactly-once processing",
      },
      {
        scenario: "Ephemeral caches with durability fallback",
        feature: "Memory persistence tier",
        why: "RAM speed when durability is optional",
      },
    ],
  },
  {
    layer: "Data Stores",
    color: COLORS.yellow,
    useCases: [
      {
        scenario: "Configuration & feature flags",
        feature: "Key Value Store (watch)",
        why: "Watch for changes, instant updates across services",
      },
      {
        scenario: "Session state & distributed caching",
        feature: "Key Value Store (TTL)",
        why: "TTL support, replicated, same connection",
      },
      {
        scenario: "File & artifact distribution",
        feature: "Object Store",
        why: "Large blobs, replicated, no separate S3",
      },
    ],
  },
  {
    layer: "Scaling",
    color: COLORS.pink,
    useCases: [
      {
        scenario: "High availability within a region",
        feature: "Cluster (full-mesh)",
        why: "Auto-discovery, transparent failover, no leader",
      },
      {
        scenario: "Global multi-region deployment",
        feature: "Supercluster (gateways)",
        why: "Interest-based routing, bandwidth-optimized",
      },
      {
        scenario: "IoT & edge computing",
        feature: "Leaf Nodes",
        why: "20MB binary, local queuing during outages",
      },
    ],
  },
  {
    layer: "Security",
    color: COLORS.purpleLight,
    useCases: [
      {
        scenario: "Zero-trust client authentication",
        feature: "NKeys (Ed25519)",
        why: "Private keys never leave the client",
      },
      {
        scenario: "Decentralized user management",
        feature: "JWTs",
        why: "No server restarts, no config file edits",
      },
      {
        scenario: "Multi-tenant SaaS platforms",
        feature: "Account Isolation",
        why: "Invisible boundaries, explicit export/import",
      },
      {
        scenario: "Integrate existing auth (LDAP, OAuth)",
        feature: "Auth Callout",
        why: "Your auth logic, Nats enforcement",
      },
    ],
  },
];

export function NATSDecisionGuide() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    goTo,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(GUIDE.length, 4000);

  const active = GUIDE[step];

  return (
    <div
      className="border border-border rounded-lg bg-surface overflow-hidden"
      {...containerProps}
    >
      {/* Tab row */}
      <div className="flex border-b border-border">
        {GUIDE.map((layer, i) => (
          <button
            key={layer.layer}
            onClick={() => goTo(i)}
            className={`flex-1 px-2 py-2.5 text-[11px] font-mono transition-colors cursor-pointer ${
              step === i
                ? "border-b-2"
                : "bg-transparent text-gray-500 hover:text-gray-300"
            }`}
            style={
              step === i
                ? {
                    color: layer.color,
                    borderBottomColor: layer.color,
                    backgroundColor: `${layer.color}15`,
                  }
                : undefined
            }
          >
            {layer.layer}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="divide-y divide-border"
          >
            {active.useCases.map((uc) => (
              <div key={uc.scenario} className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm">{uc.scenario}</span>
                  <span
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: active.color }}
                  >
                    {uc.feature}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{uc.why}</div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <DiagramControls
        step={step}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}
