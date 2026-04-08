import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { SectionProps } from "./types";

export function HttpServerIntroSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="The HTTP Server" id={id} />
      <div className="mt-6 border-l-2 border-green-400/40 pl-6">
        <p className="text-white text-lg">A process listening on a port.</p>
        <p className="mt-4 text-gray-200 text-lg">
          Everyone is familiar with the HTTP server. It&apos;s just a process
          running on a machine. It binds to a port (usually 80 or 443), accepts
          connections, and speaks a protocol: HTTP. Under the hood, it&apos;s all
          built on{" "}
          <span className="text-accent-green font-bold">TCP</span>&mdash;Transmission
          Control Protocol handles the reliable delivery so the application
          doesn&apos;t have to.
        </p>
      </div>
    </SectionContainer>
  );
}
