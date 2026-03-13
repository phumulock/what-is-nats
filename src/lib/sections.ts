export const pad = (n: number) => String(n).padStart(2, "0");

export const CUSTOM_LABELS: Record<string, string> = {
  "http-hero": "The HTTP Era",
  "nats-core-hero": "Enter the Core",
  "jetstream-hero": "Beyond Fire & Forget",
  "data-stores-hero": "More Than Messages",
  "scaling-hero": "Going Big",
  "security-hero": "Locking It Down",
  "alternatives-hero": "The Landscape",
  "summary-hero": "The Big Picture",
  "kv-store": "Key Value Store",
  "nats-core-intro": "A Different Kind of Messaging",
  "scaling-intro": "Beyond One Server",
  "security-intro": "Crypto Baked In",
  "alternatives-intro": "But What About ___?",
};

export function sectionLabel(id: string): string {
  if (CUSTOM_LABELS[id]) return CUSTOM_LABELS[id];
  return id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
