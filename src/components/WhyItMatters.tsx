import { ReactNode } from "react";

interface WhyItMattersProps {
  children: ReactNode;
}

export function WhyItMatters({ children }: WhyItMattersProps) {
  return (
    <div className="mt-6 p-4 border-l-2 border-accent-green bg-accent-green/5">
      <p className="text-sm">
        <strong className="text-white">Why this matters:</strong>{" "}
        <span className="text-gray-200">{children}</span>
      </p>
    </div>
  );
}
