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
    useDiagramPlayback(5, 2500);

  const regionActive = (ri: number) =>
    (ri === 0 && step >= 1) || (ri === 1 && step >= 3) || (ri === 2 && step >= 3);

  const regionHighlight = (ri: number) =>
    (ri === 0 && step === 1) || (ri === 1 && step === 3) || (ri === 2 && step === 3);

  // Which gateway is active at which step — origin fans out directly
  const gatewayActive = (gi: number) =>
    (gi === 0 && step === 2) || (gi === 1 && step === 2);
  // gi=0 is us-eu, gi=1 is us-ap — both active at step 2
  // gi=2 (eu-ap) is never active: origin sends directly, no relay

  // Show eu-ap as dimmed at step 4 to illustrate no relay between non-origin clusters
  const gatewayDimmed = (gi: number) => gi === 2 && step === 4;

  return (
    <div className="border border-border rounded-lg p-4 md:p-5 bg-surface" {...containerProps}>
      {/* Mobile: pub & subs row above diagram. Desktop: horizontal layout */}
      <div className="flex md:hidden items-center justify-center gap-4 mb-3">
        {/* Publisher */}
        <motion.div
          animate={{
            borderColor: step === 0 ? COLORS.green : COLORS.border,
            backgroundColor: step === 0 ? `${COLORS.green}10` : `${COLORS.green}00`,
          }}
          className="border rounded-lg px-2 py-1.5 text-center"
        >
          <div className="text-[10px] text-gray-400">Publisher</div>
          <div className="text-[9px] font-mono text-accent-green">orders.us</div>
        </motion.div>
        {/* Sub A */}
        <motion.div
          animate={{
            borderColor: step >= 3 ? COLORS.blue : COLORS.border,
            backgroundColor: step === 3 ? `${COLORS.blue}10` : `${COLORS.blue}00`,
          }}
          className="border rounded-lg px-2 py-1.5 text-center"
        >
          <div className="text-[10px] text-gray-400">Sub A</div>
          <div className="text-[9px] font-mono text-accent-blue">orders.&gt;</div>
        </motion.div>
        {/* Sub B */}
        <motion.div
          animate={{
            borderColor: step >= 3 ? COLORS.pink : COLORS.border,
            backgroundColor: step === 3 ? `${COLORS.pink}10` : `${COLORS.pink}00`,
          }}
          className="border rounded-lg px-2 py-1.5 text-center"
        >
          <div className="text-[10px] text-gray-400">Sub B</div>
          <div className="text-[9px] font-mono text-accent-pink">orders.&gt;</div>
        </motion.div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {/* Publisher — desktop only */}
        <div className="flex flex-col items-center shrink-0 w-18">
          <motion.div
            animate={{
              borderColor: step === 0 ? COLORS.green : COLORS.border,
              backgroundColor: step === 0 ? `${COLORS.green}10` : `${COLORS.green}00`,
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

        {/* SVG Diagram — desktop */}
        <div className="flex-1">
          <div className="border border-dashed border-gray-700/40 rounded-lg bg-[#0f0f0f] p-3">
            <div className="text-[9px] text-gray-500 text-center mb-1 tracking-widest font-mono">
              SUPERCLUSTER
            </div>
            <svg viewBox="0 0 440 258" className="w-full" style={{ maxHeight: 270 }}>
              <defs>
                {GATEWAYS.map((gw) => (
                  <path key={`def-${gw.id}`} id={`gw-path-${gw.id}`} d={gw.path} />
                ))}
              </defs>
              {GATEWAYS.map((gw, gi) => (
                <g key={gw.id}>
                  <motion.path
                    d={gw.path}
                    fill="none"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                    stroke={COLORS.borderLight}
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
              {REGIONS.map((region, ri) => (
                <g key={region.name}>
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
                      strokeOpacity={0.25}
                      stroke={COLORS.border}
                      animate={{
                        stroke: regionActive(ri) ? region.color : COLORS.border,
                        strokeOpacity: 0.25,
                      }}
                    />
                  ))}
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

        {/* Subscribers — desktop only */}
        <div className="flex flex-col items-center gap-3 shrink-0 w-18">
          <div className="flex items-center">
            <motion.div
              animate={{ backgroundColor: step === 3 ? COLORS.blue : COLORS.borderLight }}
              className="h-px w-8 mr-1"
            />
            <motion.div
              animate={{
                borderColor: step >= 3 ? COLORS.blue : COLORS.border,
                backgroundColor: step === 3 ? `${COLORS.blue}10` : `${COLORS.blue}00`,
              }}
              className="border rounded-lg px-2 py-1.5 text-center"
            >
              <div className="text-[10px] text-gray-400">Sub A</div>
              <div className="text-[9px] font-mono text-accent-blue">orders.&gt;</div>
            </motion.div>
          </div>
          <div className="flex items-center">
            <motion.div
              animate={{ backgroundColor: step === 3 ? COLORS.pink : COLORS.borderLight }}
              className="h-px w-8 mr-1"
            />
            <motion.div
              animate={{
                borderColor: step >= 3 ? COLORS.pink : COLORS.border,
                backgroundColor: step === 3 ? `${COLORS.pink}10` : `${COLORS.pink}00`,
              }}
              className="border rounded-lg px-2 py-1.5 text-center"
            >
              <div className="text-[10px] text-gray-400">Sub B</div>
              <div className="text-[9px] font-mono text-accent-pink">orders.&gt;</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SVG Diagram — mobile (full width, no side columns stealing space) */}
      <div className="md:hidden">
        <div className="border border-dashed border-gray-700/40 rounded-lg bg-[#0f0f0f] p-2">
          <div className="text-[9px] text-gray-500 text-center mb-1 tracking-widest font-mono">
            SUPERCLUSTER
          </div>
          <svg viewBox="0 0 440 258" className="w-full">
            <defs>
              {GATEWAYS.map((gw) => (
                <path key={`def-m-${gw.id}`} id={`gw-path-m-${gw.id}`} d={gw.path} />
              ))}
            </defs>
            {GATEWAYS.map((gw, gi) => (
              <g key={gw.id}>
                <motion.path
                  d={gw.path}
                  fill="none"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  stroke={COLORS.borderLight}
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
                  fontSize={9}
                  fontFamily="monospace"
                >
                  gateway
                </text>
                {gatewayDimmed(gi) && (
                  <text
                    x={gw.labelX - 18}
                    y={gw.labelY + 12}
                    textAnchor="middle"
                    fill={COLORS.pink}
                    fontSize={9}
                    fontFamily="monospace"
                    opacity={0.8}
                  >
                    (skipped)
                  </text>
                )}
                {gatewayActive(gi) && (
                  <motion.circle
                    r={5}
                    fill={REGIONS[gw.from].color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <animateMotion dur="0.8s" fill="freeze">
                      <mpath href={`#gw-path-m-${gw.id}`} />
                    </animateMotion>
                  </motion.circle>
                )}
              </g>
            ))}
            {REGIONS.map((region, ri) => (
              <g key={region.name}>
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
                <text
                  x={region.cx}
                  y={region.cy - 18}
                  textAnchor="middle"
                  fill={regionActive(ri) ? region.color : COLORS.textQuaternary}
                  fontSize={11}
                  fontWeight={600}
                  fontFamily="monospace"
                  letterSpacing={1}
                >
                  {region.name}
                </text>
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
                    strokeOpacity={0.25}
                    stroke={COLORS.border}
                    animate={{
                      stroke: regionActive(ri) ? region.color : COLORS.border,
                      strokeOpacity: 0.25,
                    }}
                  />
                ))}
                {region.servers.map((s, si) => (
                  <g key={si}>
                    <motion.circle
                      cx={s.x}
                      cy={s.y}
                      r={13}
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
                      fontSize={9}
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

      {/* Status text with colored accents */}
      <div className="mt-6 text-center text-sm min-h-10 text-gray-500 flex items-center justify-center">
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
            Gateways forward{" "}
            <span style={{ color: COLORS.green }}>US-EAST</span> →{" "}
            <span style={{ color: COLORS.blue }}>EU-WEST</span> and{" "}
            <span style={{ color: COLORS.green }}>US-EAST</span> →{" "}
            <span style={{ color: COLORS.pink }}>AP-TOKYO</span> (subscriber interest)...
          </span>
        )}
        {step === 3 && (
          <span>
            Both regions receive — <span style={{ color: COLORS.blue }}>Sub A</span> and{" "}
            <span style={{ color: COLORS.pink }}>Sub B</span> get message
          </span>
        )}
        {step === 4 && (
          <span>
            Origin sends directly to all interested clusters —{" "}
            <span style={{ color: COLORS.pink }}>no relay hops</span>
          </span>
        )}
      </div>

      {/* Key insight */}
      <div className="mt-3 pt-3 border-t border-border text-xs text-center">
        <span className="block sm:inline text-gray-500">No subscribers in a region?</span>{" "}
        <span className="block sm:inline text-white">Message never leaves the origin cluster</span>
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
