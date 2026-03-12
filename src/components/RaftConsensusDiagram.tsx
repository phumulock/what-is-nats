"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const NODES = [
  { id: "nats-1", cx: 180, cy: 30 },
  { id: "nats-2", cx: 100, cy: 140 },
  { id: "nats-3", cx: 260, cy: 140 },
];

const ROUTES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

type Role = "Follower" | "Candidate" | "Leader";

function getRole(step: number, nodeIndex: number): Role {
  if (step >= 3 && nodeIndex === 1) return "Leader";
  if (step >= 1 && step < 3 && nodeIndex === 1) return "Candidate";
  return "Follower";
}

function getRoleColor(role: Role): string {
  if (role === "Leader") return COLORS.green;
  if (role === "Candidate") return COLORS.yellow;
  return COLORS.blue;
}

function getNodeStroke(step: number, nodeIndex: number): string {
  const role = getRole(step, nodeIndex);
  if (step === 0) return COLORS.border;
  return getRoleColor(role);
}

export function RaftConsensusDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(8, 2500);

  return (
    <div className="border border-border rounded-lg p-5 bg-surface" {...containerProps}>
      <div className="flex items-center gap-3">
        {/* Publisher */}
        <div className="flex flex-col items-center shrink-0 w-16">
          <motion.div
            animate={{
              borderColor: step === 4 || step === 7 ? COLORS.green : COLORS.border,
              backgroundColor: step === 4 ? `${COLORS.green}10` : step === 7 ? `${COLORS.green}10` : "rgba(0,0,0,0)",
            }}
            className="border rounded-lg px-2 py-1.5 text-center"
          >
            <div className="text-[10px] text-gray-400">Publisher</div>
          </motion.div>
        </div>

        {/* Raft Group */}
        <div className="flex-1">
          <div className="border border-dashed border-accent-green/25 rounded-lg bg-[#0f0f0f] p-3">
            <div className="text-[9px] text-accent-green/50 text-center mb-1 tracking-widest font-mono">
              RAFT GROUP — STREAM &quot;ORDERS&quot; (R3)
            </div>
            <svg viewBox="0 0 340 170" className="w-full" style={{ maxHeight: 170 }}>
              {/* Route lines between servers */}
              {ROUTES.map(([from, to], i) => (
                <motion.line
                  key={i}
                  x1={NODES[from].cx}
                  y1={NODES[from].cy}
                  x2={NODES[to].cx}
                  y2={NODES[to].cy}
                  strokeDasharray="4 4"
                  animate={{
                    stroke: step >= 3 ? COLORS.green : COLORS.border,
                    strokeOpacity: step >= 3 ? 0.4 : 0.6,
                    strokeWidth: 1,
                  }}
                />
              ))}

              {/* Step 2: Vote request arrows from nats-2 to peers */}
              {step === 2 &&
                [0, 2].map((to, i) => (
                  <motion.circle
                    key={`vote-${to}`}
                    r={4}
                    fill={COLORS.yellow}
                    initial={{
                      cx: NODES[1].cx,
                      cy: NODES[1].cy,
                      opacity: 0,
                    }}
                    animate={{
                      cx: NODES[to].cx,
                      cy: NODES[to].cy,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                  />
                ))}

              {/* Step 4: Publisher sends message to leader (nats-2) */}
              {step === 4 && (
                <motion.circle
                  r={5}
                  fill={COLORS.green}
                  initial={{ cx: 20, cy: 140, opacity: 0 }}
                  animate={{ cx: NODES[1].cx, cy: NODES[1].cy, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}

              {/* Step 5: Leader replicates to followers */}
              {step === 5 &&
                [0, 2].map((to, i) => (
                  <motion.circle
                    key={`rep-${to}`}
                    r={5}
                    fill={COLORS.green}
                    initial={{
                      cx: NODES[1].cx,
                      cy: NODES[1].cy,
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

              {/* Step 6: ACK dot from nats-1 back to leader */}
              {step === 6 && (
                <motion.circle
                  r={4}
                  fill={COLORS.blue}
                  initial={{ cx: NODES[0].cx, cy: NODES[0].cy, opacity: 0 }}
                  animate={{ cx: NODES[1].cx, cy: NODES[1].cy, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}

              {/* Step 7: ACK back to publisher */}
              {step === 7 && (
                <motion.circle
                  r={5}
                  fill={COLORS.green}
                  initial={{ cx: NODES[1].cx, cy: NODES[1].cy, opacity: 0 }}
                  animate={{ cx: 20, cy: 140, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}

              {/* Server nodes */}
              {NODES.map((node, i) => {
                const role = getRole(step, i);
                const stroke = getNodeStroke(step, i);
                const isHighlighted =
                  (step === 1 && i === 1) ||
                  (step === 3 && i === 1);

                return (
                  <g key={node.id}>
                    <motion.circle
                      cx={node.cx}
                      cy={node.cy}
                      r={22}
                      fill={COLORS.terminalBg}
                      animate={{
                        stroke,
                        strokeWidth: isHighlighted ? 2.5 : 1.5,
                        fill: isHighlighted ? `${stroke}12` : COLORS.terminalBg,
                      }}
                    />
                    <text
                      x={node.cx}
                      y={node.cy - 4}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={step === 0 ? COLORS.textQuaternary : stroke}
                      fontSize={9}
                      fontFamily="monospace"
                    >
                      {node.id}
                    </text>
                    {step >= 1 && (
                      <text
                        x={node.cx}
                        y={node.cy + 10}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={getRoleColor(role)}
                        fontSize={7}
                        fontFamily="monospace"
                        opacity={0.8}
                      >
                        {role}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 text-center text-sm min-h-10 text-gray-500">
        {step === 0 && "Stream ORDERS replicated across 3 servers (R3)..."}
        {step === 1 && "nats-2\u2019s election timer fires \u2014 becomes candidate..."}
        {step === 2 && "Requests votes from peers..."}
        {step === 3 && "Quorum reached (2/3) \u2014 nats-2 is leader"}
        {step === 4 && "Publisher sends message to stream leader..."}
        {step === 5 && "Leader replicates to followers..."}
        {step === 6 && "Quorum confirmed (2/3 wrote) \u2014 message is committed"}
        {step === 7 && "Publisher receives ACK \u2014 message is durable"}
      </div>

      {/* Insight */}
      <div className="mt-3 pt-3 border-t border-border text-xs text-center">
        <span className="text-gray-500">R1 = no consensus. R3 = tolerates 1 failure. R5 = tolerates 2. </span>
        <span className="text-white">Choose replication factor per stream.</span>
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
