"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

function EntityBox({
  label,
  sublabel,
  color,
  active,
  children,
}: {
  label: string;
  sublabel?: string;
  color: string;
  active: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ borderColor: active ? color : COLORS.border }}
      className="flex-1 min-w-0 rounded-lg border bg-terminal-bg p-3 flex flex-col items-center gap-1"
    >
      <div className="text-[10px] font-bold" style={{ color }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-[9px] text-gray-600 truncate max-w-full">{sublabel}</div>
      )}
      {children}
    </motion.div>
  );
}

function MobileArrow({ active, color }: { active: boolean; color: string }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.2 }}
      className="flex items-center justify-center text-xs shrink-0 py-1"
      style={{ color }}
    >
      &#8595;
    </motion.div>
  );
}

function DesktopArrow({ active, color }: { active: boolean; color: string }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.2 }}
      className="flex items-center text-xs shrink-0"
      style={{ color }}
    >
      &#8594;
    </motion.div>
  );
}

export function AuthCalloutDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(5);

  return (
    <div
      className="border border-border rounded-lg overflow-hidden bg-surface"
      {...containerProps}
    >
      <div className="p-4 md:p-6">
        {/* Desktop: horizontal entity row */}
        <div className="hidden md:flex items-start gap-2">
          <EntityBox
            label="CLIENT"
            sublabel="user: alice"
            color={COLORS.yellow}
            active={step === 0 || step === 4}
          >
            <motion.div
              animate={{
                opacity: step === 0 ? 1 : 0.3,
              }}
              className="mt-1 px-2 py-0.5 rounded text-[9px] bg-accent-yellow/20 border border-accent-yellow/40 text-accent-yellow font-mono"
            >
              creds
            </motion.div>
            <motion.div
              animate={{ opacity: step === 4 ? 1 : 0, scale: step === 4 ? 1 : 0.8 }}
              className="mt-1 flex flex-col gap-0.5"
            >
              <div className="px-1.5 py-0.5 rounded text-[8px] bg-accent-green/20 text-accent-green font-mono">
                pub: orders.&gt;
              </div>
              <div className="px-1.5 py-0.5 rounded text-[8px] bg-accent-blue/20 text-accent-blue font-mono">
                sub: replies.&gt;
              </div>
            </motion.div>
          </EntityBox>

          <DesktopArrow active={step === 1} color={COLORS.yellow} />

          <EntityBox
            label="Nats Server"
            color={COLORS.green}
            active={step === 1 || step === 4}
          >
            <div className="w-8 h-8 rounded-full border border-accent-green/40 flex items-center justify-center mt-1">
              <span className="text-accent-green text-[8px] font-bold">
                Nats
              </span>
            </div>
            <motion.div
              animate={{ opacity: step === 1 ? 1 : 0 }}
              className="mt-1 text-[9px] text-gray-500"
            >
              delegating...
            </motion.div>
          </EntityBox>

          <DesktopArrow active={step === 2} color={COLORS.purpleLight} />

          <EntityBox
            label="AUTH SERVICE"
            sublabel="$SYS.REQ.USER.AUTH"
            color={COLORS.purpleLight}
            active={step === 2 || step === 3}
          >
            <motion.div
              animate={{
                opacity: step === 3 ? 1 : 0,
                scale: step === 3 ? 1 : 0.8,
              }}
              className="mt-1 px-2 py-0.5 rounded text-[9px] bg-accent-green/20 text-accent-green"
            >
              &#10003; validated
            </motion.div>
          </EntityBox>

          <DesktopArrow active={step === 2} color={COLORS.blue} />

          <EntityBox
            label="BACKEND"
            sublabel="LDAP / OAuth / DB"
            color={COLORS.blue}
            active={step === 2 || step === 3}
          >
            <div className="mt-1 flex flex-col gap-0.5">
              {["LDAP", "OAuth", "DB"].map((backend) => (
                <div
                  key={backend}
                  className="text-[8px] text-gray-600 text-center"
                >
                  {backend}
                </div>
              ))}
            </div>
          </EntityBox>
        </div>

        {/* Mobile: vertical entity stack */}
        <div className="flex md:hidden flex-col items-center gap-1">
          <div className="w-full">
            <EntityBox
              label="CLIENT"
              sublabel="user: alice"
              color={COLORS.yellow}
              active={step === 0 || step === 4}
            >
              <motion.div
                animate={{
                  opacity: step === 0 ? 1 : 0.3,
                }}
                className="mt-1 px-2 py-0.5 rounded text-[9px] bg-accent-yellow/20 border border-accent-yellow/40 text-accent-yellow font-mono"
              >
                creds
              </motion.div>
              <motion.div
                animate={{ opacity: step === 4 ? 1 : 0, scale: step === 4 ? 1 : 0.8 }}
                className="mt-1 flex flex-col gap-0.5"
              >
                <div className="px-1.5 py-0.5 rounded text-[8px] bg-accent-green/20 text-accent-green font-mono">
                  pub: orders.&gt;
                </div>
                <div className="px-1.5 py-0.5 rounded text-[8px] bg-accent-blue/20 text-accent-blue font-mono">
                  sub: replies.&gt;
                </div>
              </motion.div>
            </EntityBox>
          </div>

          <MobileArrow active={step === 1} color={COLORS.yellow} />

          <div className="w-full">
            <EntityBox
              label="Nats Server"
              color={COLORS.green}
              active={step === 1 || step === 4}
            >
              <div className="w-8 h-8 rounded-full border border-accent-green/40 flex items-center justify-center mt-1">
                <span className="text-accent-green text-[8px] font-bold">
                  Nats
                </span>
              </div>
              <motion.div
                animate={{ opacity: step === 1 ? 1 : 0 }}
                className="mt-1 text-[9px] text-gray-500"
              >
                delegating...
              </motion.div>
            </EntityBox>
          </div>

          <MobileArrow active={step === 2} color={COLORS.purpleLight} />

          <div className="flex w-full gap-2">
            <EntityBox
              label="AUTH SERVICE"
              sublabel="$SYS.REQ.USER.AUTH"
              color={COLORS.purpleLight}
              active={step === 2 || step === 3}
            >
              <motion.div
                animate={{
                  opacity: step === 3 ? 1 : 0,
                  scale: step === 3 ? 1 : 0.8,
                }}
                className="mt-1 px-2 py-0.5 rounded text-[9px] bg-accent-green/20 text-accent-green"
              >
                &#10003; validated
              </motion.div>
            </EntityBox>

            <EntityBox
              label="BACKEND"
              sublabel="LDAP / OAuth / DB"
              color={COLORS.blue}
              active={step === 2 || step === 3}
            >
              <div className="mt-1 flex flex-col gap-0.5">
                {["LDAP", "OAuth", "DB"].map((backend) => (
                  <div
                    key={backend}
                    className="text-[8px] text-gray-600 text-center"
                  >
                    {backend}
                  </div>
                ))}
              </div>
            </EntityBox>
          </div>
        </div>

        {/* Message flow visualization — desktop only */}
        <div className="relative h-10 mt-4 hidden md:block">
          {/* Step 1: Credentials flow Client -> Server */}
          <motion.div
            animate={{
              opacity: step === 1 ? 1 : 0,
              x: step === 1 ? "12%" : "0%",
            }}
            transition={{ duration: 0.6 }}
            className="absolute left-[5%] top-1/2 -translate-y-1/2 px-2 py-0.5 bg-accent-yellow text-black text-[10px] rounded font-mono"
          >
            CONNECT + creds
          </motion.div>

          {/* Step 2: Auth request flows Server -> Auth Service -> Backend */}
          <motion.div
            animate={{
              opacity: step === 2 ? 1 : 0,
              x: step === 2 ? "55%" : "25%",
            }}
            transition={{ duration: 0.8 }}
            className="absolute left-[25%] top-1/2 -translate-y-1/2 px-2 py-0.5 bg-purple-500 text-white text-[10px] rounded font-mono"
          >
            auth request
          </motion.div>

          {/* Step 3: JWT flows back Auth Service -> Server */}
          <motion.div
            animate={{
              opacity: step === 3 ? 1 : 0,
              x: step === 3 ? "-20%" : "0%",
            }}
            transition={{ duration: 0.6 }}
            className="absolute left-[50%] top-1/2 -translate-y-1/2 px-2 py-0.5 bg-accent-green text-black text-[10px] rounded font-mono"
          >
            signed JWT
          </motion.div>

          {/* Step 4: Connection established */}
          <motion.div
            animate={{ opacity: step === 4 ? 1 : 0 }}
            className="absolute inset-x-[5%] top-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent-green text-[10px]">&#10003;</span>
              <span className="text-accent-green text-[10px] font-mono">
                authorized connection
              </span>
            </div>
          </motion.div>
        </div>

        {/* Message flow visualization — mobile */}
        <div className="relative h-8 mt-3 md:hidden flex items-center justify-center">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-0.5 bg-accent-yellow text-black text-[10px] rounded font-mono"
            >
              CONNECT + creds
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-0.5 bg-purple-500 text-white text-[10px] rounded font-mono"
            >
              auth request
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-0.5 bg-accent-green text-black text-[10px] rounded font-mono"
            >
              signed JWT
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <span className="text-accent-green text-[10px]">&#10003;</span>
              <span className="text-accent-green text-[10px] font-mono">
                authorized connection
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status text */}
      <div className="px-4 md:px-6 pb-2 text-center text-sm min-h-[2.5rem] flex items-center justify-center">
        {step === 0 && (
          <span className="text-gray-500">
            Client connects with credentials...
          </span>
        )}
        {step === 1 && (
          <span className="text-accent-yellow">
            Nats server intercepts the connection...
          </span>
        )}
        {step === 2 && (
          <span className="text-purple-400">
            Auth service validates against external backend...
          </span>
        )}
        {step === 3 && (
          <span className="text-accent-green">
            Auth service returns signed JWT with permissions...
          </span>
        )}
        {step === 4 && (
          <span className="text-accent-green">
            Connection authorized with scoped permissions
          </span>
        )}
      </div>

      {/* Key insight */}
      <div className="px-4 md:px-6 pb-3 text-xs text-center">
        <span className="text-gray-500">Auth logic lives in </span>
        <span className="text-white">your code</span>
        <span className="text-gray-500">
          {" "}
          &mdash; Nats just enforces the result
        </span>
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
