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
  { name: "What is Nats?", startIndex: 0, endIndex: 3 },
  { name: "Why Not Http?", startIndex: 3, endIndex: 9 },
  { name: "Core", startIndex: 9, endIndex: 18 },
  { name: "Jetstream", startIndex: 18, endIndex: 25 },
  { name: "Data Stores", startIndex: 25, endIndex: 30 },
  { name: "Scaling", startIndex: 30, endIndex: 37 },
  { name: "Security", startIndex: 37, endIndex: 41 },
  { name: "Alternatives", startIndex: 41, endIndex: 48 },
  { name: "Summary", startIndex: 48, endIndex: 52 },
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
const GLOBAL_SPOTLIGHT = [0, 4, 10, 19, 26, 31, 38, 42, 50];

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
  makePageConfig("/", "What is Nats?", 0, 52, [
    { label: "Core", examples: "Pub/Sub, request/reply, queue groups", color: "#4ade80" },
  ]),
];

export function getPageSections(page: PageConfig) {
  return WHAT_IS_NATS_SECTIONS.slice(page.startIndex, page.endIndex);
}

export function getPageIndex(pathname: string): number {
  return PAGES.findIndex((p) => p.path === pathname);
}
