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
    ref: React.RefCallback<HTMLDivElement>;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export const DIAGRAM_INTERVAL = 2500;
const RESUME_DELAY = 5000;

export function useDiagramPlayback(
  totalSteps: number,
  intervalMs: number = DIAGRAM_INTERVAL
): DiagramPlayback {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasPlayingBeforeHover = useRef(false);
  const wasPlayingBeforeScroll = useRef(false);
  const isPlayingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      }, RESUME_DELAY);
    }
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Ref callback that sets up IntersectionObserver when element mounts
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    containerRef.current = node;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          wasPlayingBeforeScroll.current = isPlayingRef.current;
          setIsPlaying(false);
        } else {
          if (wasPlayingBeforeScroll.current) {
            setIsPlaying(true);
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    observerRef.current = observer;
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
    containerProps: { ref: setContainerRef, onMouseEnter, onMouseLeave },
  };
}
