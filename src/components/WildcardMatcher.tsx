"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const SUBSCRIPTIONS = [
  { pattern: "orders.>", description: "all orders" },
  { pattern: "orders.us.*", description: "US orders (one level)" },
  { pattern: "orders.*.east", description: "east region orders" },
  { pattern: "orders.us.east", description: "exact match" },
  { pattern: ">", description: "everything" },
];

const DEMO_SUBJECTS = [
  { subject: "orders.us.east", label: "Exact match — all wildcards fire" },
  { subject: "orders.eu.west", label: "Different region — only broad wildcards match" },
  { subject: "orders.us.west", label: "Same region, different area" },
  { subject: "orders.jp.east", label: "East wildcard still catches this" },
  { subject: "payments.process", label: "Non-order subject — only > matches" },
];

function matchesPattern(subject: string, pattern: string): boolean {
  const subjectParts = subject.split(".");
  const patternParts = pattern.split(".");

  let si = 0;
  let pi = 0;

  while (pi < patternParts.length && si < subjectParts.length) {
    const p = patternParts[pi];

    if (p === ">") {
      return true;
    } else if (p === "*") {
      si++;
      pi++;
    } else if (p === subjectParts[si]) {
      si++;
      pi++;
    } else {
      return false;
    }
  }

  return si === subjectParts.length && pi === patternParts.length;
}

export function WildcardMatcher() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(DEMO_SUBJECTS.length, 2500);

  const [manualSubject, setManualSubject] = useState("");
  const [isManual, setIsManual] = useState(false);

  const activeSubject = isManual ? manualSubject : DEMO_SUBJECTS[step].subject;

  const matches = SUBSCRIPTIONS.filter((sub) =>
    matchesPattern(activeSubject, sub.pattern)
  );

  const handleFocus = useCallback(() => {
    setIsManual(true);
    pause();
  }, [pause]);

  const handleChange = useCallback((value: string) => {
    setManualSubject(value.toLowerCase());
  }, []);

  const handleResetDemo = useCallback(() => {
    setIsManual(false);
    setManualSubject("");
    play();
  }, [play]);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-surface" {...containerProps}>
      {/* Input */}
      <div className="p-4 border-b border-border">
        <label className="text-sm text-gray-500 block mb-2">
          PUBLISH TO SUBJECT:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={activeSubject}
            onFocus={handleFocus}
            onChange={(e) => handleChange(e.target.value)}
            className="flex-1 bg-terminal-bg border border-border rounded px-3 py-2 text-accent-green font-mono focus:outline-none focus:border-accent-green"
            placeholder="orders.us.east"
          />
          {isManual && (
            <button
              onClick={handleResetDemo}
              className="text-xs text-gray-500 hover:text-white border border-border rounded px-3 transition-colors"
            >
              Auto
            </button>
          )}
        </div>
      </div>

      {/* Wildcard legend */}
      <div className="px-4 py-3 border-b border-border flex gap-6 text-sm">
        <div>
          <code className="text-accent-yellow">*</code>
          <span className="text-gray-500"> — matches exactly one token</span>
        </div>
        <div>
          <code className="text-accent-yellow">&gt;</code>
          <span className="text-gray-500"> — matches one or more tokens (must be last)</span>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-3">
          SUBSCRIBERS WHO RECEIVE IT:
        </div>
        <div className="space-y-2">
          {SUBSCRIPTIONS.map((sub) => {
            const isMatch = matchesPattern(activeSubject, sub.pattern);
            return (
              <motion.div
                key={sub.pattern}
                animate={{
                  opacity: isMatch ? 1 : 0.4,
                  borderColor: isMatch ? COLORS.green : "rgba(0,0,0,0)",
                  backgroundColor: isMatch ? "rgba(74, 222, 128, 0.1)" : COLORS.terminalBg,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between px-3 py-2 rounded border"
              >
                <code
                  className={isMatch ? "text-accent-green" : "text-gray-500"}
                >
                  {sub.pattern}
                </code>
                <span className="text-xs text-gray-500">{sub.description}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Status text */}
        <div className="mt-3 text-sm text-gray-500">
          {!isManual && (
            <motion.span
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {matches.length} match{matches.length !== 1 ? "es" : ""} — {DEMO_SUBJECTS[step].label}
            </motion.span>
          )}
          {isManual && activeSubject && (
            <span>
              {matches.length} subscriber{matches.length !== 1 ? "s" : ""} would
              receive this message.
            </span>
          )}
          {isManual && !activeSubject && (
            <span>Type a subject to see which subscribers match.</span>
          )}
        </div>
      </div>

      <DiagramControls
        step={step}
        totalSteps={totalSteps}
        isPlaying={isPlaying && !isManual}
        onPlay={handleResetDemo}
        onPause={pause}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}
