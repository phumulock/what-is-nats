"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const LEAF_NODES = [
  { name: "Factory", subject: "sensors.>", color: COLORS.yellow },
  { name: "Vehicle", subject: "telemetry.>", color: COLORS.pink },
  { name: "Store", subject: "pos.>", color: COLORS.purple },
];

// Layout constants for a 360×200 viewBox
const CLUSTER_Y = 35;
const CLUSTER_SERVERS = [150, 180, 210];
const LEAF_Y = 130;
const LEAF_XS = [60, 180, 300];
const DEVICE_Y = 180;

export function LeafNodeDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(7, 2500);

  const isDisconnected = step === 4 || step === 5;

  const leafSvg = (fontSize: number) => (
    <svg viewBox="0 0 360 200" className="w-full" style={{ maxHeight: 220 }}>
      {/* ── Central cluster ── */}
      <motion.rect
        x={120} y={8} width={120} height={55} rx={8}
        fill={COLORS.terminalBg}
        strokeDasharray="4 4"
        animate={{
          stroke: isDisconnected ? COLORS.red : COLORS.green,
          strokeOpacity: isDisconnected ? 0.3 : 0.5,
        }}
        strokeWidth={1.5}
      />
      <text
        x={180} y={22} textAnchor="middle"
        fill={isDisconnected ? COLORS.textTertiary : COLORS.green}
        fontSize={fontSize - 1} fontFamily="monospace" letterSpacing={2} opacity={0.6}
      >
        CLUSTER
      </text>
      {CLUSTER_SERVERS.map((cx, i) => (
        <g key={i}>
          <motion.circle
            cx={cx} cy={CLUSTER_Y + 10} r={10}
            fill={COLORS.surface}
            animate={{
              stroke: step === 2 ? COLORS.green : isDisconnected ? COLORS.red : COLORS.green,
              strokeOpacity: isDisconnected ? 0.3 : 0.8,
            }}
            strokeWidth={1.5}
          />
          <text
            x={cx} y={CLUSTER_Y + 13} textAnchor="middle" dominantBaseline="middle"
            fill={isDisconnected ? COLORS.textTertiary : COLORS.green} fontSize={fontSize - 2} fontFamily="monospace"
          >
            n-{i + 1}
          </text>
        </g>
      ))}

      {/* ── Connection lines + leaf nodes ── */}
      {LEAF_NODES.map((leaf, i) => {
        const lx = LEAF_XS[i];
        const lineTop = 63;
        const lineBottom = LEAF_Y - 8;
        const clusterX = CLUSTER_SERVERS[i];
        const midX = (lx + clusterX) / 2;
        const midY = (lineTop + lineBottom) / 2;

        return (
          <g key={leaf.name}>
            {/* Upstream connection line */}
            <motion.line
              x1={lx} y1={lineBottom} x2={clusterX} y2={lineTop}
              strokeDasharray="4 3"
              animate={{
                stroke: isDisconnected ? COLORS.red : leaf.color,
                strokeOpacity: isDisconnected ? 0.2 : 0.5,
              }}
              strokeWidth={1}
            />

            {/* "leaf" label on connection */}
            {!isDisconnected && (
              <text
                x={midX + 10} y={midY + 1}
                fill="var(--text-tertiary)" fontSize={fontSize - 3} fontFamily="monospace"
              >
                leaf
              </text>
            )}

            {/* Message dot flowing up */}
            {step === 1 && i === 0 && (
              <motion.circle
                r={3.5} fill={leaf.color}
                initial={{ cx: lx, cy: lineBottom, opacity: 0 }}
                animate={{ cx: clusterX, cy: lineTop, opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
            )}

            {/* Reconnect: messages sync up */}
            {step === 6 && i === 0 && (
              <motion.circle
                r={3.5} fill={leaf.color}
                initial={{ cx: lx, cy: lineBottom, opacity: 0 }}
                animate={{ cx: clusterX, cy: lineTop, opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
            )}

            {/* Disconnection ✕ */}
            {isDisconnected && (
              <motion.text
                x={midX} y={midY}
                textAnchor="middle" dominantBaseline="middle"
                fill={COLORS.red} fontSize={fontSize + 2} fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✕
              </motion.text>
            )}

            {/* ── Leaf node box ── */}
            <motion.rect
              x={lx - 40} y={LEAF_Y - 8} width={80} height={38} rx={6}
              fill={COLORS.terminalBg}
              animate={{
                stroke:
                  (step === 3 && i === 0) || step === 6
                    ? leaf.color
                    : step === 5 && i === 0
                      ? COLORS.yellow
                      : COLORS.borderLight,
                fill: step === 3 && i === 0 ? `${leaf.color}10` : COLORS.terminalBg,
              }}
              strokeWidth={1.5}
            />
            <text
              x={lx} y={LEAF_Y + 7} textAnchor="middle" dominantBaseline="middle"
              fill={leaf.color} fontSize={fontSize} fontWeight={500}
            >
              {leaf.name}
            </text>
            <text
              x={lx} y={LEAF_Y + 20} textAnchor="middle" dominantBaseline="middle"
              fill="var(--text-quaternary)" fontSize={fontSize - 2} fontFamily="monospace"
            >
              {leaf.subject}
            </text>

            {/* Queued messages indicator */}
            {step === 5 && i === 0 && [0, 1, 2].map((j) => (
              <motion.g key={j}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: j * 0.15 }}
              >
                <rect
                  x={lx - 14 + j * 11} y={LEAF_Y + 28}
                  width={9} height={9} rx={2}
                  fill={`${COLORS.yellow}12`} stroke={`${COLORS.yellow}40`} strokeWidth={1}
                />
                <text
                  x={lx - 9.5 + j * 11} y={LEAF_Y + 35}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={COLORS.yellow} fontSize={fontSize - 3}
                >
                  m
                </text>
              </motion.g>
            ))}

            {/* ── Devices below ── */}
            {[-16, 16].map((dx, d) => (
              <g key={d}>
                <line
                  x1={lx + dx} y1={LEAF_Y + 30}
                  x2={lx + dx} y2={DEVICE_Y - 6}
                  stroke="var(--border)" strokeWidth={1} strokeDasharray="2 2"
                />
                <motion.rect
                  x={lx + dx - 12} y={DEVICE_Y - 6} width={24} height={14} rx={3}
                  fill="transparent"
                  animate={{
                    stroke: step === 0 && i === 0 && d === 0 ? leaf.color : COLORS.border,
                  }}
                  strokeWidth={1}
                />
                <text
                  x={lx + dx} y={DEVICE_Y + 3}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="var(--text-tertiary)" fontSize={fontSize - 2}
                >
                  dev
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="border border-border rounded-lg p-4 md:p-5 bg-surface" {...containerProps}>
      {/* Desktop SVG */}
      <div className="hidden md:block">
        {leafSvg(9)}
      </div>

      {/* Mobile SVG — larger font */}
      <div className="md:hidden">
        {leafSvg(11)}
      </div>

      {/* Status */}
      <div className="mt-6 text-center text-sm min-h-10 text-gray-500">
        {step === 0 && "Device publishes sensor data at the factory..."}
        {step === 1 && "Leaf node forwards upstream to cluster..."}
        {step === 2 && "Cluster receives and routes to subscribers..."}
        {step === 3 && "Filtered subjects — only sensors.> leaves the factory"}
        {step === 4 && "Upstream connection drops..."}
        {step === 5 && "Messages queue locally on the leaf node..."}
        {step === 6 && "Connection restored — queued messages sync upstream"}
      </div>

      {/* Insight */}
      <div className="mt-3 pt-3 border-t border-border text-xs text-center">
        <span className="text-gray-500">Same NATS subjects, same client code — </span>
        <span className="text-white">just closer to the data source</span>
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
