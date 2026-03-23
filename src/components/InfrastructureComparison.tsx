"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";

type Tab = "traditional" | "nats";

const NATS_FEATURES = [
  { label: "Pub/Sub messaging", color: COLORS.green },
  { label: "Request/Reply RPC", color: COLORS.green },
  { label: "Queue group load balancing", color: COLORS.green },
  { label: "Persistent streams", color: COLORS.blue },
  { label: "Replay & retention", color: COLORS.blue },
  { label: "Key-Value store", color: COLORS.yellow },
  { label: "Object Store", color: COLORS.yellow },
  { label: "Multi-region clusters", color: COLORS.pink },
  { label: "Edge via Leaf Nodes", color: COLORS.pink },
  { label: "Multi-tenancy & auth", color: COLORS.purpleLight },
];

export function InfrastructureComparison() {
  const [tab, setTab] = useState<Tab>("traditional");

  const tabStyle = (t: Tab, active: string) =>
    `flex-1 px-4 py-3 text-sm transition-colors ${
      tab === t ? active : "bg-transparent text-gray-500 hover:text-gray-300"
    }`;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toggle */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setTab("traditional")}
          className={tabStyle("traditional", "bg-terminal-bg text-white")}
        >
          Traditional Stack
        </button>
        <button
          onClick={() => setTab("nats")}
          className={tabStyle("nats", "bg-accent-green/20 text-accent-green")}
        >
          With NATS
        </button>
      </div>

      {/* Content */}
      <div className="p-6 min-h-80">
        <AnimatePresence mode="wait">
          {tab === "traditional" ? (
            <motion.div
              key="traditional"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-3"
            >
              <div className="text-xs text-gray-300 mb-4">
                TYPICAL MICROSERVICES INFRASTRUCTURE
              </div>

              {/* Service Mesh */}
              <div className="border border-accent-pink rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-pink">Service Mesh</span>
                  <span className="text-xs text-gray-300">
                    Istio, Linkerd, Consul
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Sidecars, mTLS, traffic routing, retries
                </p>
              </div>

              {/* Service Discovery */}
              <div className="border border-accent-yellow rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-yellow">
                    Service Discovery
                  </span>
                  <span className="text-xs text-gray-300">
                    Consul, etcd, Eureka
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Registry, health checks, DNS
                </p>
              </div>

              {/* Load Balancer */}
              <div className="border border-accent-blue rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-blue">Load Balancer</span>
                  <span className="text-xs text-gray-300">
                    NGINX, HAProxy, ALB
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Routing rules, sticky sessions, health probes
                </p>
              </div>

              {/* Message Broker */}
              <div className="border border-accent-purple rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-purple">Message Broker</span>
                  <span className="text-xs text-gray-300">
                    Kafka, RabbitMQ, SQS
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Topics, partitions, consumer groups, schemas
                </p>
              </div>

              {/* Cache */}
              <div className="border border-accent-pink-bright rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-pink-bright">Cache / KV Store</span>
                  <span className="text-xs text-gray-300">Redis, Memcached</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Session state, distributed locks, pub/sub
                </p>
              </div>

              {/* Object Storage */}
              <div className="border border-accent-teal rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-teal">Object Storage</span>
                  <span className="text-xs text-gray-300">S3, MinIO, GCS</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Blobs, file artifacts, large payloads
                </p>
              </div>

              {/* Multi-region */}
              <div className="border border-accent-orange rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-orange">Multi-region / Edge</span>
                  <span className="text-xs text-gray-300">
                    MirrorMaker, CDN, IoT Gateways
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Cross-region replication, edge compute, data locality
                </p>
              </div>

              {/* Auth / Identity */}
              <div className="border border-accent-indigo rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-indigo">Auth / Multi-tenancy</span>
                  <span className="text-xs text-gray-300">
                    Vault, Keycloak, OPA
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Identity, token management, tenant isolation
                </p>
              </div>

              <div className="pt-4 text-center">
                <span className="text-sm text-gray-300">
                  8+ systems to install, configure, and operate
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="nats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="text-xs text-gray-300 mb-6">
                NATS PROVIDES ALL OF THIS
              </div>

              <div className="w-32 h-32 rounded-full border-4 border-accent-green flex items-center justify-center bg-accent-green/10">
                <span className="text-accent-green text-2xl font-bold">
                  NATS
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {NATS_FEATURES.map((f) => (
                  <div key={f.label} className="flex items-center gap-2">
                    <span style={{ color: f.color }}>&#10003;</span>
                    <span className="text-gray-200">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-6 text-xs text-gray-300">
                <span>
                  One <span className="text-accent-green">namespace</span>
                </span>
                <span className="text-border">|</span>
                <span>
                  One <span className="text-accent-blue">connection</span>
                </span>
                <span className="text-border">|</span>
                <span>
                  One <span className="text-accent-yellow">auth model</span>
                </span>
              </div>

              <div className="mt-4 text-center">
                <span className="text-sm text-accent-green">
                  Single binary. 20MB. Zero dependencies.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
