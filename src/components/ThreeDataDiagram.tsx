import { COLORS } from "@/lib/colors";

export function ThreeDataDiagram() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 space-y-6">
      {/* Traditional: 3 separate systems */}
      <div>
        <p className="text-xs text-gray-500 mb-3">
          Traditional &mdash; three separate systems
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          <Box label="Messages" sub="Events, commands" color={COLORS.green} />
          <Box label="State" sub="Config, sessions, flags" color={COLORS.blue} />
          <Box label="Files" sub="Models, images, backups" color={COLORS.yellow} />
        </div>
        <p className="text-center text-xs text-gray-600 mt-3">
          3 SDKs &middot; 3 clusters &middot; 3 failure domains
        </p>
      </div>

      <div className="border-t border-border" />

      {/* NATS: 1 system */}
      <div>
        <p className="text-xs text-gray-500 mb-3">
          NATS &mdash; one system
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          <Box label="JetStream" sub="Streams &amp; consumers" color={COLORS.green} />
          <Box label="KV Store" sub="Keys as subjects" color={COLORS.blue} />
          <Box label="Object Store" sub="Chunked messages" color={COLORS.yellow} />
        </div>
        <p className="text-center text-xs text-accent-green mt-3">
          1 binary &middot; 1 connection &middot; 1 protocol
        </p>
      </div>
    </div>
  );
}

function Box({
  label,
  sub,
  color,
}: {
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-terminal-bg border border-border p-3 text-center">
      <p className="text-sm font-medium" style={{ color }}>{label}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );
}
