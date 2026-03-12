"use client";

import { ReactNode } from "react";
import { ScrollProgress } from "./ScrollProgress";

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}
