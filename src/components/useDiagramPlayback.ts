"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface DiagramPlayback {
  step: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  totalSteps: number;
  containerProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export const DIAGRAM_INTERVAL = 2500;

export function useDiagramPlayback(
  totalSteps: number,
  intervalMs: number = DIAGRAM_INTERVAL
): DiagramPlayback {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasPlayingBeforeHover = useRef(true);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);

  const next = useCallback(() => {
    setStep((s) => (s + 1) % totalSteps);
  }, [totalSteps]);

  const prev = useCallback(() => {
    setStep((s) => (s - 1 + totalSteps) % totalSteps);
  }, [totalSteps]);

  const goTo = useCallback((target: number) => setStep(target), []);

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % totalSteps);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, intervalMs]);

  const onMouseEnter = useCallback(() => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    wasPlayingBeforeHover.current = isPlaying;
    setIsPlaying(false);
  }, [isPlaying]);

  const onMouseLeave = useCallback(() => {
    if (wasPlayingBeforeHover.current) {
      resumeTimer.current = setTimeout(() => {
        setIsPlaying(true);
        resumeTimer.current = null;
      }, 5000);
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  return {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    goTo,
    totalSteps,
    containerProps: { onMouseEnter, onMouseLeave },
  };
}
