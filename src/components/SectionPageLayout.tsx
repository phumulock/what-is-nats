"use client";

import { Fragment } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { RevealSection } from "@/components/RevealSection";
import { SpotlightProvider } from "@/components/SpotlightContext";
import { ScrollNav } from "@/components/ScrollNav";
import { HamburgerNav } from "@/components/HamburgerNav";
import type { PageConfig } from "@/config/pages";
import { getPageSections, SECTION_GROUPS } from "@/config/pages";
import { NestedDiagram } from "@/components/NestedDiagram";
import { pad } from "@/lib/sections";

interface SectionPageLayoutProps {
  page: PageConfig;
}

export function SectionPageLayout({
  page,
}: SectionPageLayoutProps) {
  const sections = getPageSections(page);

  return (
    <PageWrapper>
      <ScrollNav
        sections={sections.map(([id], i) => ({
          id,
          globalIndex: page.startIndex + i,
        }))}
        groups={SECTION_GROUPS}
      />
      <HamburgerNav
        sections={sections.map(([id], i) => ({
          id,
          globalIndex: page.startIndex + i,
        }))}
        groups={SECTION_GROUPS}
      />
      <a
        href="https://synadia.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-4"
      >
        <img src="/images/synadia-logo.png" alt="Synadia" className="h-8" />
      </a>
      <main className="min-h-screen px-6 py-12 md:py-20">
        <SpotlightProvider>
          <div className="max-w-2xl mx-auto space-y-32">
            <div className="h-[calc(100dvh-6rem)] md:h-[calc(100dvh-10rem)] flex flex-col items-center justify-center gap-4 py-12">
              <span className="text-sm tracking-widest text-accent-green/40 uppercase">
                Interactive Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight text-center">
                {page.title}
              </h1>
              {page.heroLayers && (
                <div className="mt-4">
                  <NestedDiagram layers={page.heroLayers} />
                </div>
              )}
              <p className="text-gray-300 text-sm">Scroll to explore</p>
            </div>
            {sections.map(([id, Component], i) => (
              <Fragment key={id}>
                {i > 0 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                )}
                <RevealSection isSpotlight={page.spotlightIndices.has(i)}>
                  <Component number={pad(page.startIndex + i)} id={id} />
                </RevealSection>
              </Fragment>
            ))}
          </div>
        </SpotlightProvider>
      </main>
      <a
        href="https://synadia.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-8"
      >
        <img src="/images/synadia-logo.png" alt="Synadia" className="h-8" />
      </a>
    </PageWrapper>
  );
}
