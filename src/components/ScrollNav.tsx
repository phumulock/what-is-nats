"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PAGES, getPageIndex } from "@/config/pages";
import type { SectionGroup } from "@/config/pages";
import { sectionLabel } from "@/lib/sections";

interface NavSection {
  id: string;
  globalIndex: number;
}

interface ScrollNavProps {
  sections: NavSection[];
  groups: SectionGroup[];
}

function scrollToSection(id: string, globalIndex: number) {
  if (globalIndex === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  const section = el?.closest("section");
  (section ?? el)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ScrollNav({ sections, groups }: ScrollNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const pathname = usePathname();
  const currentIndex = getPageIndex(pathname);
  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const nextPage =
    currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;
  const firstPage = PAGES[0];
  const lastPage = PAGES[PAGES.length - 1];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PAGES.length - 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  const activeSection = sections.find((s) => s.id === activeId);

  const activeGroup = useMemo(() => {
    if (!activeSection) return groups[0];
    return (
      groups.find(
        (g) =>
          activeSection.globalIndex >= g.startIndex &&
          activeSection.globalIndex < g.endIndex
      ) ?? groups[0]
    );
  }, [activeSection, groups]);

  const visibleSections = useMemo(() => {
    return sections
      .filter(
        (s) =>
          s.globalIndex > activeGroup.startIndex &&
          s.globalIndex < activeGroup.endIndex
      )
      .map((s) => ({
        ...s,
        label: sectionLabel(s.id),
      }));
  }, [sections, activeGroup]);

  // Map each group to the section ID of its hero (first section in the group)
  const groupHeroes = useMemo(() => {
    return groups.map((g) => {
      const hero = sections.find((s) => s.globalIndex === g.startIndex);
      return { name: g.name, id: hero?.id ?? "", startIndex: g.startIndex };
    });
  }, [groups, sections]);

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex items-center gap-3">
      {/* Main section labels column */}
      <div className="flex flex-col items-start gap-2">
        {!isFirst ? (
          <Link
            href={firstPage.path}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-accent-green/30 bg-accent-green/5 text-accent-green/70 hover:bg-accent-green hover:text-black transition-all"
            aria-label="Go to start"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 11L8 7L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 7L8 3L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <div className="w-8 h-8" />
        )}

        {prevPage ? (
          <Link
            href={prevPage.path}
            className="group w-10 h-10 rounded-full flex items-center justify-center border border-accent-green/40 bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-black transition-all mb-2"
            aria-label={`Previous: ${prevPage.title}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 10L8 6L12 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <div className="w-10 h-10 mb-2" />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-start gap-2"
          >
            {/* Groups before active */}
            {groupHeroes
              .filter((hero) => hero.startIndex < activeGroup.startIndex)
              .map((hero) => (
                <button
                  key={hero.name}
                  onClick={() => scrollToSection(hero.id, hero.startIndex)}
                  className="text-xs text-gray-300 hover:text-white whitespace-nowrap transition-all"
                >
                  {hero.name}
                </button>
              ))}

            {/* Active group name */}
            <button
              onClick={() => {
                const hero = groupHeroes.find((h) => h.name === activeGroup.name);
                if (hero) {
                  scrollToSection(hero.id, hero.startIndex);
                }
              }}
              className="text-sm font-semibold text-accent-green whitespace-nowrap transition-all"
            >
              {activeGroup.name}
            </button>

            {/* Section labels within active group */}
            {visibleSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.globalIndex)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-all whitespace-nowrap pl-2 ${
                  activeId === section.id
                    ? "text-accent-green"
                    : "text-gray-300 hover:text-white"
                }`}
                aria-label={`Go to ${section.label}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${
                    activeId === section.id
                      ? "bg-accent-green"
                      : "bg-gray-400"
                  }`}
                />
                {section.label}
              </button>
            ))}

            {/* Groups after active */}
            {groupHeroes
              .filter((hero) => hero.startIndex > activeGroup.startIndex)
              .map((hero) => (
                <button
                  key={hero.name}
                  onClick={() => scrollToSection(hero.id, hero.startIndex)}
                  className="text-xs text-gray-300 hover:text-white whitespace-nowrap transition-all"
                >
                  {hero.name}
                </button>
              ))}
          </motion.div>
        </AnimatePresence>

        {nextPage ? (
          <Link
            href={nextPage.path}
            className="group w-10 h-10 rounded-full flex items-center justify-center border border-accent-green/40 bg-accent-green/10 text-accent-green hover:bg-accent-green hover:text-black transition-all mt-2"
            aria-label={`Next: ${nextPage.title}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <div className="w-10 h-10 mt-2" />
        )}

        {!isLast ? (
          <Link
            href={lastPage.path}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-accent-green/30 bg-accent-green/5 text-accent-green/70 hover:bg-accent-green hover:text-black transition-all"
            aria-label="Go to end"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M4 5L8 9L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 9L8 13L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>

    </nav>
  );
}
