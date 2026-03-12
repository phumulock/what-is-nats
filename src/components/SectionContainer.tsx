import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  variant?: "default" | "hero";
}

export function SectionContainer({
  children,
  variant = "default",
}: SectionContainerProps) {
  if (variant === "hero") {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        {children}
      </section>
    );
  }
  return <section>{children}</section>;
}
