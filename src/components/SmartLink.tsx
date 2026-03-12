import { ReactNode } from "react";

interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function SmartLink({ href, children, className = "" }: SmartLinkProps) {
  return (
    <a
      href={href}
      className={className || "text-green-400 font-bold hover:text-green-300 underline underline-offset-2 transition-colors"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
