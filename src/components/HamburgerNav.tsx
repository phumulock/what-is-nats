"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionGroup } from "@/config/pages";
import { pad, sectionLabel } from "@/lib/sections";

interface NavSection {
  id: string;
  globalIndex: number;
}

interface HamburgerNavProps {
  sections: NavSection[];
  groups: SectionGroup[];
}

const GROUP_DESCRIPTIONS: Record<string, string> = {
  "What is NATS?": "The communication fabric",
  "Why Not HTTP?": "The limits of request/response",
  "Core": "Pub/Sub, request/reply & more",
  "JetStream": "Persistence & guaranteed delivery",
  "Data Stores": "KV, Object Store & beyond",
  "Scaling": "Clusters, Leaf Nodes & Superclusters",
  "Security": "Auth, accounts & zero trust",
  "Alternatives": "How NATS compares",
  "Summary": "The full picture",
};

export function HamburgerNav({ sections, groups }: HamburgerNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  // Scroll the menu to the active section when opened
  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const activeEl = overlay.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "instant" });
      }
    });
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps -- only scroll menu on open, not on every activeId change

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

  const activeGroupName = useMemo(() => {
    const activeSection = sections.find((s) => s.id === activeId);
    if (!activeSection) return groups[0]?.name ?? "";
    const group = groups.find(
      (g) =>
        activeSection.globalIndex >= g.startIndex &&
        activeSection.globalIndex < g.endIndex
    );
    return group?.name ?? groups[0]?.name ?? "";
  }, [activeId, sections, groups]);

  const handleSectionClick = (id: string, globalIndex: number) => {
    close();
    requestAnimationFrame(() => {
      if (globalIndex === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(id);
        if (el) {
          const section = el.closest("section");
          (section ?? el).scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  };

  // Group sections by their group
  const groupedSections = useMemo(() => {
    return groups.map((group) => ({
      group,
      description: GROUP_DESCRIPTIONS[group.name] ?? "",
      sections: sections.filter(
        (s) =>
          s.globalIndex >= group.startIndex &&
          s.globalIndex < group.endIndex
      ),
    }));
  }, [sections, groups]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent-green/10 border border-accent-green/40 flex items-center justify-center hover:bg-accent-green hover:text-black text-accent-green transition-all xl:hidden"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <motion.line
            x1="4"
            x2="16"
            animate={
              isOpen
                ? { y1: 10, y2: 10, rotate: 45 }
                : { y1: 5, y2: 5, rotate: 0 }
            }
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "center" }}
          />
          <motion.line
            x1="4"
            y1="10"
            x2="16"
            y2="10"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.line
            x1="4"
            x2="16"
            animate={
              isOpen
                ? { y1: 10, y2: 10, rotate: -45 }
                : { y1: 15, y2: 15, rotate: 0 }
            }
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "center" }}
          />
        </motion.svg>
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-surface overflow-y-auto"
          >
            <div className="max-w-md mx-auto px-6 py-16 pb-24">
              <div className="space-y-6">
                {groupedSections.map(({ group, description, sections: groupSecs }) => {
                  if (groupSecs.length === 0) return null;
                  const hero = groupSecs[0];
                  const subSections = groupSecs.slice(1);

                  return (
                    <div key={group.name}>
                      {/* Hero / group heading */}
                      <button
                        data-section-id={hero.id}
                        onClick={() => handleSectionClick(hero.id, hero.globalIndex)}
                        className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-accent-green/50 font-mono w-5 shrink-0">
                            {pad(hero.globalIndex)}
                          </span>
                          <div>
                            <span className={`group-hover:text-accent-green transition-colors font-medium ${activeGroupName === group.name ? "text-accent-green" : "text-white"}`}>
                              {group.name}
                            </span>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {description}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Sub-sections */}
                      {subSections.length > 0 && (
                        <div className="ml-8 mt-1 space-y-0.5">
                          {subSections.map((section) => (
                            <button
                              key={section.id}
                              data-section-id={section.id}
                              onClick={() => handleSectionClick(section.id, section.globalIndex)}
                              className={`w-full text-left px-3 py-1 rounded text-sm hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3 ${activeId === section.id ? "text-accent-green bg-accent-green/10" : "text-gray-500"}`}
                            >
                              <span className="text-xs text-gray-700 font-mono w-5 shrink-0">
                                {pad(section.globalIndex)}
                              </span>
                              <span>{sectionLabel(section.id)}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
