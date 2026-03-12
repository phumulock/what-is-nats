"use client";

import { Fragment } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { RevealSection } from "@/components/RevealSection";
import { SpotlightProvider } from "@/components/SpotlightContext";
import { ScrollNav } from "@/components/ScrollNav";
import { HamburgerNav } from "@/components/HamburgerNav";
import { SmartLink } from "@/components/SmartLink";
import type { PageConfig } from "@/config/pages";
import { getPageSections, SECTION_GROUPS } from "@/config/pages";
import { NestedDiagram } from "@/components/NestedDiagram";

const pad = (n: number) => String(n).padStart(2, "0");

interface SectionPageLayoutProps {
  page: PageConfig;
  showFooter?: boolean;
}

export function SectionPageLayout({
  page,
  showFooter,
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
              <p className="text-gray-500 text-sm">Scroll to explore</p>
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
            {showFooter && (
              <footer className="pt-12 pb-8 text-center text-sm text-gray-500">
                <p>
                  Built to explain{" "}
                  <SmartLink href="https://nats.io">NATS</SmartLink>
                </p>
              </footer>
            )}
          </div>
        </SpotlightProvider>
      </main>
    </PageWrapper>
  );
}
