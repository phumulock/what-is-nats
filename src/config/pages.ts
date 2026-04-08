import { WHAT_IS_NATS_SECTIONS } from "@/components/sections";

export interface HeroLayer {
  label: string;
  examples: string;
  color: string;
}

export interface SectionGroup {
  name: string;
  startIndex: number;
  endIndex: number;
}

export const SECTION_GROUPS: SectionGroup[] = [
  { name: "HTTP vs NATS", startIndex: 0, endIndex: 5 },
  { name: "Core", startIndex: 5, endIndex: 14 },
  { name: "JetStream", startIndex: 14, endIndex: 21 },
  { name: "Data Stores", startIndex: 21, endIndex: 26 },
  { name: "Scaling", startIndex: 26, endIndex: 33 },
  { name: "Security", startIndex: 33, endIndex: 37 },
  { name: "Alternatives", startIndex: 37, endIndex: 44 },
  { name: "Summary", startIndex: 44, endIndex: 48 },
];

export interface PageConfig {
  path: string;
  title: string;
  startIndex: number;
  endIndex: number;
  spotlightIndices: Set<number>;
  heroLayers?: HeroLayer[];
}

// Global spotlight indices from the original single-page layout
const GLOBAL_SPOTLIGHT = [0, 1, 3, 6, 15, 22, 27, 34, 38, 46];

function makePageConfig(
  path: string,
  title: string,
  startIndex: number,
  endIndex: number,
  heroLayers?: HeroLayer[]
): PageConfig {
  return {
    path,
    title,
    startIndex,
    endIndex,
    spotlightIndices: new Set(
      GLOBAL_SPOTLIGHT
        .filter((i) => i >= startIndex && i < endIndex)
        .map((i) => i - startIndex)
    ),
    heroLayers,
  };
}

export const PAGES: PageConfig[] = [
  makePageConfig("/", "What is NATS?", 0, 48, [
    { label: "Core", examples: "Pub/Sub, request/reply, queue groups", color: "#4ade80" },
  ]),
];

export function getPageSections(page: PageConfig) {
  return WHAT_IS_NATS_SECTIONS.slice(page.startIndex, page.endIndex);
}

export function getPageIndex(pathname: string): number {
  return PAGES.findIndex((p) => p.path === pathname);
}
