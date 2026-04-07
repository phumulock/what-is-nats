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
  { name: "The HTTP Server", startIndex: 0, endIndex: 4 },
  { name: "Core", startIndex: 4, endIndex: 13 },
  { name: "JetStream", startIndex: 13, endIndex: 20 },
  { name: "Data Stores", startIndex: 20, endIndex: 25 },
  { name: "Scaling", startIndex: 25, endIndex: 32 },
  { name: "Security", startIndex: 32, endIndex: 36 },
  { name: "Alternatives", startIndex: 36, endIndex: 43 },
  { name: "Summary", startIndex: 43, endIndex: 47 },
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
const GLOBAL_SPOTLIGHT = [0, 2, 5, 14, 21, 26, 33, 37, 45];

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
  makePageConfig("/", "What is NATS?", 0, 47, [
    { label: "Core", examples: "Pub/Sub, request/reply, queue groups", color: "#4ade80" },
  ]),
];

export function getPageSections(page: PageConfig) {
  return WHAT_IS_NATS_SECTIONS.slice(page.startIndex, page.endIndex);
}

export function getPageIndex(pathname: string): number {
  return PAGES.findIndex((p) => p.path === pathname);
}
