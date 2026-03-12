"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

// Triangular layout — three regions forming an inverted triangle
// Each region box is 120×88. Label at top, then 3 servers below with clear gap.
// Server offsets from cy: top pair at cy+8, bottom at cy+34
const REGIONS = [
  {
    name: "US-EAST",
    cx: 110,
    cy: 65,
    color: COLORS.green,
    servers: [
      { x: 88, y: 73 },
      { x: 132, y: 73 },
      { x: 110, y: 99 },
    ],
  },
  {
    name: "EU-WEST",
    cx: 330,
    cy: 65,
    color: COLORS.blue,
    servers: [
      { x: 308, y: 73 },
      { x: 352, y: 73 },
      { x: 330, y: 99 },
    ],
  },
  {
    name: "AP-TOKYO",
    cx: 220,
    cy: 195,
    color: COLORS.pink,
    servers: [
      { x: 198, y: 203 },
      { x: 242, y: 203 },
      { x: 220, y: 229 },
    ],
  },
];

// Gateway curved paths between regions (quadratic bezier)
const GATEWAYS = [
  {
    id: "us-eu",
    from: 0,
    to: 1,
    // US-EAST right edge → EU-WEST left edge, curve upward
    path: "M 170 55 Q 220 8 270 55",
    labelX: 220,
    labelY: 16,
  },
  {
    id: "us-ap",
    from: 0,
    to: 2,
    // US-EAST bottom → AP-TOKYO left edge
    path: "M 110 120 Q 115 158 165 172",
    labelX: 118,
    labelY: 155,
  },
  {
    id: "eu-ap",
    from: 1,
    to: 2,
    // EU-WEST bottom → AP-TOKYO right edge
    path: "M 330 120 Q 325 158 275 172",
    labelX: 320,
    labelY: 155,
  },
];

export function SuperclusterDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(7, 2500);

  const regionActive = (ri: number) =>
    (ri === 0 && step >= 1) || (ri === 1 && step >= 3) || (ri === 2 && step >= 5);

  const regionHighlight = (ri: number) =>
    (ri === 0 && step === 1) || (ri === 1 && step === 3) || (ri === 2 && step === 5);

  // Which gateway is active at which step
  const gatewayActive = (gi: number) => {
    if (gi === 0) return step === 2; // US→EU
    if (gi === 2) return step === 4; // EU→AP
    return false;
  };

  // The direct US→AP gateway stays dim at step 6 to show interest-based routing skipped it
  const gatewayDimmed = (gi: number) => gi === 1 && step === 6;

  return (
    <div className="border border-border rounded-lg p-5 bg-surface" {...containerProps}>
      <div className="flex items-center gap-3">
        {/* Publisher */}
        <div className="flex flex-col items-center shrink-0 w-18">
          <motion.div
            animate={{
              borderColor: step === 0 ? COLORS.green : COLORS.border,
              backgroundColor: step === 0 ? `${COLORS.green}10` : "transparent",
            }}
            className="border rounded-lg px-2 py-1.5 text-center"
          >
            <div className="text-[10px] text-gray-400">Publisher</div>
            <div className="text-[9px] font-mono text-accent-green">orders.us</div>
          </motion.div>
          <motion.div
            animate={{ backgroundColor: step === 0 ? COLORS.green : COLORS.borderLight }}
            className="h-px w-8 mt-1"
          />
        </div>

        {/* SVG Diagram */}
        <div className="flex-1">
          <div className="border border-dashed border-gray-700/40 rounded-lg bg-[#0f0f0f] p-3">
            <div className="text-[9px] text-gray-500 text-center mb-1 tracking-widest font-mono">
              SUPERCLUSTER
            </div>
            <svg viewBox="0 0 440 258" className="w-full" style={{ maxHeight: 270 }}>
              <defs>
                {/* Path definitions for animateMotion */}
                {GATEWAYS.map((gw) => (
                  <path key={`def-${gw.id}`} id={`gw-path-${gw.id}`} d={gw.path} />
                ))}
              </defs>

              {/* Gateway curved paths */}
              {GATEWAYS.map((gw, gi) => (
                <g key={gw.id}>
                  <motion.path
                    d={gw.path}
                    fill="none"
                    strokeDasharray="4 4"
                    animate={{
                      stroke: gatewayActive(gi)
                        ? REGIONS[gw.from].color
                        : gatewayDimmed(gi)
                          ? `${COLORS.border}60`
                          : COLORS.borderLight,
                      strokeWidth: gatewayActive(gi) ? 2 : 1,
                    }}
                  />
                  <text
                    x={gw.labelX}
                    y={gw.labelY}
                    textAnchor="middle"
                    fill={gatewayDimmed(gi) ? `${COLORS.textTertiary}60` : COLORS.textTertiary}
                    fontSize={7}
                    fontFamily="monospace"
                  >
                    gateway
                  </text>
                  {/* "no interest" label on the dimmed direct path at step 6 */}
                  {gatewayDimmed(gi) && (
                    <text
                      x={gw.labelX - 18}
                      y={gw.labelY + 12}
                      textAnchor="middle"
                      fill={COLORS.pink}
                      fontSize={7}
                      fontFamily="monospace"
                      opacity={0.8}
                    >
                      (skipped)
                    </text>
                  )}
                  {/* Message dot traveling along curve */}
                  {gatewayActive(gi) && (
                    <motion.circle
                      r={4}
                      fill={REGIONS[gw.from].color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <animateMotion dur="0.8s" fill="freeze">
                        <mpath href={`#gw-path-${gw.id}`} />
                      </animateMotion>
                    </motion.circle>
                  )}
                </g>
              ))}

              {/* Region cluster boxes */}
              {REGIONS.map((region, ri) => (
                <g key={region.name}>
                  {/* Dashed cluster border */}
                  <motion.rect
                    x={region.cx - 60}
                    y={region.cy - 28}
                    width={120}
                    height={82}
                    rx={8}
                    fill={COLORS.terminalBg}
                    strokeDasharray="4 4"
                    animate={{
                      stroke: regionHighlight(ri) ? region.color : COLORS.border,
                      fill: regionHighlight(ri) ? `${region.color}08` : COLORS.terminalBg,
                    }}
                    strokeWidth={1.5}
                  />
                  {/* Region label */}
                  <text
                    x={region.cx}
                    y={region.cy - 18}
                    textAnchor="middle"
                    fill={regionActive(ri) ? region.color : COLORS.textQuaternary}
                    fontSize={9}
                    fontWeight={600}
                    fontFamily="monospace"
                    letterSpacing={1}
                  >
                    {region.name}
                  </text>

                  {/* Internal route lines between all 3 servers */}
                  {[
                    [0, 1],
                    [1, 2],
                    [0, 2],
                  ].map(([a, b]) => (
                    <motion.line
                      key={`route-${ri}-${a}-${b}`}
                      x1={region.servers[a].x}
                      y1={region.servers[a].y}
                      x2={region.servers[b].x}
                      y2={region.servers[b].y}
                      strokeDasharray="2 2"
                      animate={{
                        stroke: regionActive(ri) ? region.color : COLORS.border,
                        strokeOpacity: 0.25,
                      }}
                    />
                  ))}

                  {/* Server nodes */}
                  {region.servers.map((s, si) => (
                    <g key={si}>
                      <motion.circle
                        cx={s.x}
                        cy={s.y}
                        r={11}
                        fill={COLORS.surface}
                        animate={{
                          stroke: regionActive(ri) ? region.color : COLORS.borderLight,
                          fill: regionHighlight(ri) ? `${region.color}12` : COLORS.surface,
                        }}
                        strokeWidth={1.5}
                      />
                      <text
                        x={s.x}
                        y={s.y + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={regionActive(ri) ? region.color : COLORS.textTertiary}
                        fontSize={7}
                        fontFamily="monospace"
                      >
                        n{ri * 3 + si + 1}
                      </text>
                    </g>
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Subscribers */}
        <div className="flex flex-col items-center gap-3 shrink-0 w-18">
          {/* EU-WEST subscriber */}
          <div className="flex items-center">
            <motion.div
              animate={{ backgroundColor: step === 3 ? COLORS.blue : COLORS.borderLight }}
              className="h-px w-8 mr-1"
            />
            <motion.div
              animate={{
                borderColor: step >= 3 ? COLORS.blue : COLORS.border,
                backgroundColor: step === 3 ? `${COLORS.blue}10` : "transparent",
              }}
              className="border rounded-lg px-2 py-1.5 text-center"
            >
              <div className="text-[10px] text-gray-400">Sub A</div>
              <div className="text-[9px] font-mono text-accent-blue">orders.&gt;</div>
            </motion.div>
          </div>
          {/* AP-TOKYO subscriber */}
          <div className="flex items-center">
            <motion.div
              animate={{ backgroundColor: step === 5 ? COLORS.pink : COLORS.borderLight }}
              className="h-px w-8 mr-1"
            />
            <motion.div
              animate={{
                borderColor: step >= 5 ? COLORS.pink : COLORS.border,
                backgroundColor: step === 5 ? `${COLORS.pink}10` : "transparent",
              }}
              className="border rounded-lg px-2 py-1.5 text-center"
            >
              <div className="text-[10px] text-gray-400">Sub B</div>
              <div className="text-[9px] font-mono text-accent-pink">orders.&gt;</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status text with colored accents */}
      <div className="mt-3 text-center text-sm text-gray-500 h-5">
        {step === 0 && (
          <span>
            <span style={{ color: COLORS.green }}>Publisher</span> sends to{" "}
            <span className="font-mono" style={{ color: COLORS.green }}>orders.us</span> in US-EAST...
          </span>
        )}
        {step === 1 && (
          <span>
            <span style={{ color: COLORS.green }}>US-EAST</span> cluster receives message...
          </span>
        )}
        {step === 2 && (
          <span>
            Gateway forwards{" "}
            <span style={{ color: COLORS.green }}>US-EAST</span> →{" "}
            <span style={{ color: COLORS.blue }}>EU-WEST</span> (subscriber interest exists)...
          </span>
        )}
        {step === 3 && (
          <span>
            <span style={{ color: COLORS.blue }}>EU-WEST</span> receives via gateway — Sub A gets message
          </span>
        )}
        {step === 4 && (
          <span>
            Gateway forwards{" "}
            <span style={{ color: COLORS.blue }}>EU-WEST</span> →{" "}
            <span style={{ color: COLORS.pink }}>AP-TOKYO</span> (subscriber interest exists)...
          </span>
        )}
        {step === 5 && (
          <span>
            <span style={{ color: COLORS.pink }}>AP-TOKYO</span> receives — Sub B gets message
          </span>
        )}
        {step === 6 && (
          <span>
            All interested regions served —{" "}
            <span style={{ color: COLORS.pink }}>direct US→AP path skipped</span> (hop routing)
          </span>
        )}
      </div>

      {/* Key insight */}
      <div className="mt-3 pt-3 border-t border-border text-xs text-center">
        <span className="text-gray-500">No subscribers in a region? </span>
        <span className="text-white">Message never leaves the origin cluster</span>
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
