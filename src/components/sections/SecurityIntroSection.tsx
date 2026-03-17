import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function SecurityIntroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Locking It Down" id={id} />
      <div className="mt-6 border-l-2 border-purple-400/40 pl-6">
        <p className="text-white text-lg">
          Clusters spanning regions, leaf nodes at the edge, messages flowing
          everywhere&mdash;but who&apos;s allowed to connect? And what stops one
          tenant&apos;s data from leaking into another?
        </p>
        <p className="mt-4 text-gray-500">
          Most messaging systems bolt security on after the fact&mdash;an
          external auth service here, a firewall rule there. Nats takes the
          opposite approach: authentication, authorization, and multi-tenancy
          are built into the protocol itself.
        </p>
        <p className="mt-4 text-gray-500">
          No external databases to secure. No config file restarts to add
          users. Just cryptographic identity baked into every connection.
        </p>
      </div>
    </SectionContainer>
  );
}
