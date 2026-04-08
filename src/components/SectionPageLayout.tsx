"use client";

import { Fragment } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { RevealSection } from "@/components/RevealSection";
import { SpotlightProvider } from "@/components/SpotlightContext";
import { ScrollNav } from "@/components/ScrollNav";
import { HamburgerNav } from "@/components/HamburgerNav";
import type { PageConfig } from "@/config/pages";
import { getPageSections, SECTION_GROUPS } from "@/config/pages";
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
        href="https://synadia.com?utm_source=whatisnats&utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-4"
      >
        <img src="/images/synadia-logo.png" alt="Synadia" className="h-8" />
      </a>
      <main className="min-h-screen px-6 py-12 md:py-20">
        <SpotlightProvider>
          <div className="max-w-2xl mx-auto space-y-32">
            <div className="min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-10rem)] flex flex-col items-center justify-center gap-4 py-12">
              <span className="text-sm tracking-widest text-accent-green/40 uppercase">
                Interactive Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight text-center">
                {page.title}
              </h1>
              <div className="mt-4 border-l-2 border-green-400/40 pl-6 text-left max-w-xl">
                <p className="text-white text-lg">
                  A communication fabric for distributed applications.
                </p>
                <p className="mt-4 text-gray-200 text-lg">
                  NATS lets any service talk to any other service&mdash;without
                  knowing where it lives, how many instances are running, or
                  whether it&apos;s even online yet. One protocol covers pub/sub,
                  request/reply, queue-based load distribution, persistent
                  streaming, key-value storage, and object storage. Layer on
                  multi-region clustering, edge deployments via leaf nodes, and
                  built-in security with accounts and decentralized
                  auth&mdash;all from a single binary.
                </p>
                <p className="mt-4 text-gray-200 text-lg">
                  But to understand what that means&mdash;and everything NATS can
                  do&mdash;let&apos;s start with something everyone knows.
                </p>
              </div>
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
        href="https://synadia.com?utm_source=whatisnats&utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-8"
      >
        <img src="/images/synadia-logo.png" alt="Synadia" className="h-8" />
      </a>
    </PageWrapper>
  );
}
