export const COLORS = {
  green: "#4ade80",
  blue: "#60a5fa",
  yellow: "#fbbf24",
  purple: "#a78bfa",
  pink: "#f472b6",
  red: "#ef4444",
  orange: "#f97316",
  cyan: "#22d3ee",
  teal: "#34d399",
  indigo: "#818cf8",
  purpleLight: "#c084fc",
  pinkBright: "#fb7185",
  border: "#333333",
  borderLight: "#444444",
  surface: "#0a0a0a",
  terminalBg: "#1a1a1a",
  textTertiary: "#555555",
  textQuaternary: "#666666",
  surfaceDark: "#0f0f0f",
} as const;

export function withAlpha(hex: string, opacity: number): string {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `${hex}${alpha}`;
}
