"use client";

import { SectionPageLayout } from "@/components/SectionPageLayout";
import { PAGES } from "@/config/pages";

export default function Home() {
  return <SectionPageLayout page={PAGES[0]} />;
}
