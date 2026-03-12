"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

// Triangle layout — pixel positions within a 350×200 viewBox
const NODES = [
  { id: "nats-1", cx: 175, cy: 30 },
  { id: "nats-2", cx: 55, cy: 170 },
  { id: "nats-3", cx: 295, cy: 170 },
];

const ROUTES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

export function ClusterMeshDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(6, 2500);

  const serverActive = (i: number) => {
    if (i === 0) return step >= 1;
    if (i === 1 || i === 2) return step >= 3;
    return false;
  };

  const serverHighlight = (i: number) => {
    if (i === 0) return step === 1;
    if (i === 1 || i === 2) return step === 3;
    return false;
  };

  const clusterSvg = (fontSize: number, nodeRadius: number) => (
    <svg viewBox="0 0 350 200" className="w-full" style={{ maxHeight: 200 }}>
      {/* Route lines */}
      {ROUTES.map(([from, to], i) => {
        const active = step === 2 && from === 0;
        return (
          <motion.line
            key={i}
            x1={NODES[from].cx}
            y1={NODES[from].cy}
            x2={NODES[to].cx}
            y2={NODES[to].cy}
            strokeDasharray="4 4"
            animate={{
              stroke: active ? COLORS.green : step >= 3 ? COLORS.green : COLORS.border,
              strokeWidth: active ? 2 : 1,
              strokeOpacity: step >= 3 ? 0.4 : active ? 1 : 0.6,
            }}
          />
        );
      })}
      {/* Message dots traveling routes */}
      {step === 2 &&
        ROUTES.filter(([from]) => from === 0).map(([from, to], i) => (
          <motion.circle
            key={`dot-${to}`}
            r={5}
            fill={COLORS.green}
            initial={{
              cx: NODES[from].cx,
              cy: NODES[from].cy,
              opacity: 0,
            }}
            animate={{
              cx: NODES[to].cx,
              cy: NODES[to].cy,
              opacity: 1,
            }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          />
        ))}
      {/* Server nodes */}
      {NODES.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={nodeRadius}
            fill={COLORS.terminalBg}
            animate={{
              stroke: serverHighlight(i) ? COLORS.green : COLORS.yellow,
              strokeWidth: serverHighlight(i) ? 2.5 : 1.5,
              fill: serverHighlight(i) ? `${COLORS.green}12` : COLORS.terminalBg,
            }}
          />
          <text
            x={node.cx}
            y={node.cy + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={serverActive(i) ? COLORS.yellow : COLORS.textQuaternary}
            fontSize={fontSize}
            fontFamily="monospace"
          >
            {node.id}
          </text>
        </g>
      ))}
      {/* "route" labels on lines */}
      <text x={100} y={90} fill="var(--text-tertiary)" fontSize={fontSize - 2} fontFamily="monospace" transform="rotate(-40, 100, 90)">
        route
      </text>
      <text x={250} y={90} fill="var(--text-tertiary)" fontSize={fontSize - 2} fontFamily="monospace" transform="rotate(40, 250, 90)">
        route
      </text>
      <text x={175} y={192} fill="var(--text-tertiary)" fontSize={fontSize - 2} fontFamily="monospace" textAnchor="middle">
        route
      </text>
    </svg>
  );

  const publisherBox = (
    <motion.div
      animate={{
        borderColor: step === 0 ? COLORS.green : COLORS.border,
        backgroundColor: step === 0 ? `${COLORS.green}10` : "rgba(0,0,0,0)",
      }}
      className="border rounded-lg px-2 py-1.5 text-center"
    >
      <div className="text-xs text-gray-400">Publisher</div>
    </motion.div>
  );

  const subscriberBoxes = ["Sub A", "Sub B"].map((sub) => (
    <motion.div
      key={sub}
      animate={{
        borderColor: step >= 4 ? COLORS.blue : COLORS.border,
        backgroundColor: step === 5 ? `${COLORS.blue}10` : "rgba(0,0,0,0)",
      }}
      className="border rounded-lg px-2 py-1.5 text-center"
    >
      <div className="text-xs text-gray-400">{sub}</div>
    </motion.div>
  ));

  return (
    <div className="border border-border rounded-lg p-5 md:p-6 bg-surface" {...containerProps}>
      {/* Mobile: pub & subs row above diagram */}
      <div className="flex md:hidden items-center justify-center gap-4 mb-3">
        {publisherBox}
        {subscriberBoxes}
      </div>

      {/* Desktop: horizontal with side columns */}
      <div className="hidden md:flex items-center gap-3">
        {/* Publisher */}
        <div className="flex flex-col items-center shrink-0 w-22">
          {publisherBox}
          <motion.div
            animate={{ backgroundColor: step === 0 ? COLORS.green : COLORS.borderLight }}
            className="h-px w-8 mt-1"
          />
        </div>

        {/* Cluster SVG — desktop */}
        <div className="flex-1">
          <div className="border border-dashed border-accent-green/25 rounded-lg bg-[#0f0f0f] p-3">
            <div className="text-[11px] text-accent-green/50 text-center mb-1 tracking-widest font-mono">
              CLUSTER
            </div>
            {clusterSvg(12, 25)}
          </div>
        </div>

        {/* Subscribers */}
        <div className="flex flex-col items-center gap-3 shrink-0 w-22">
          {["Sub A", "Sub B"].map((sub) => (
            <div key={sub} className="flex items-center">
              <motion.div
                animate={{ backgroundColor: step === 4 ? COLORS.green : COLORS.borderLight }}
                className="h-px w-8 mr-1"
              />
              <motion.div
                animate={{
                  borderColor: step >= 4 ? COLORS.blue : COLORS.border,
                  backgroundColor: step === 5 ? `${COLORS.blue}10` : "rgba(0,0,0,0)",
                }}
                className="border rounded-lg px-2 py-1.5 text-center"
              >
                <div className="text-xs text-gray-400">{sub}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: full-width SVG */}
      <div className="md:hidden">
        <div className="border border-dashed border-accent-green/25 rounded-lg bg-[#0f0f0f] p-2">
          <div className="text-[11px] text-accent-green/50 text-center mb-1 tracking-widest font-mono">
            CLUSTER
          </div>
          {clusterSvg(13, 27)}
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 text-center text-sm min-h-10 text-gray-500">
        {step === 0 && "Publisher sends message to nats-1..."}
        {step === 1 && "nats-1 receives the message..."}
        {step === 2 && "Routes propagate to nats-2 and nats-3..."}
        {step === 3 && "All servers have the message..."}
        {step === 4 && "Subscribers receive from their connected server..."}
        {step === 5 && "Delivered — regardless of which server subscribers chose"}
      </div>

      {/* Insight */}
      <div className="mt-3 pt-3 border-t border-border text-xs text-center">
        <span className="text-gray-500">Core routing is symmetric — </span>
        <span className="text-white">JetStream uses Raft to elect a leader per stream for consistency</span>
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
