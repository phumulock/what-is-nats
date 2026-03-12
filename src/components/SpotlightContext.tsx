"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import {
  motionValue,
  useMotionValue,
  useSpring,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

const DEFAULT_DIM = motionValue(0);

interface SpotlightContextValue {
  dimAmount: MotionValue<number>;
  register: (el: HTMLElement) => () => void;
}

const SpotlightCtx = createContext<SpotlightContextValue>({
  dimAmount: DEFAULT_DIM,
  register: () => () => {},
});

export const useSpotlight = () => useContext(SpotlightCtx);

function computeCenteredness(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const elementCenter = rect.top + rect.height / 2;
  const distance = Math.abs(viewportCenter - elementCenter);
  const maxDistance = window.innerHeight / 2 + rect.height / 2;
  return Math.max(0, 1 - distance / maxDistance);
}

export function SpotlightProvider({ children }: { children: ReactNode }) {
  const elements = useRef(new Set<HTMLElement>());
  const rawDim = useMotionValue(0);
  const dimAmount = useSpring(rawDim, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    let maxC = 0;
    for (const el of elements.current) {
      maxC = Math.max(maxC, computeCenteredness(el));
    }
    // Start dimming as soon as a spotlight section is prominently visible
    const dimRaw = Math.max(0, (maxC - 0.3) / 0.7);
    rawDim.set(dimRaw);
  });

  const register = useCallback((el: HTMLElement) => {
    elements.current.add(el);
    return () => {
      elements.current.delete(el);
    };
  }, []);

  return (
    <SpotlightCtx.Provider value={{ dimAmount, register }}>
      {children}
    </SpotlightCtx.Provider>
  );
}
