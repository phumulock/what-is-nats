import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { AccountIsolationDiagram } from "@/components/AccountIsolationDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function SecuritySection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Security" id={id} href="https://docs.nats.io/running-a-nats-service/configuration/securing_nats" />
      <p className="mt-4 text-white text-lg">Secure by default, decentralized by design.</p>
      <p className="mt-4 text-gray-500">
        TLS encryption is a flag away. Authentication supports everything
        from simple tokens to public-key cryptography. And unlike
        centralized auth databases, NATS can verify credentials without
        hitting any external system.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-green font-bold">NKeys</span>{" "}
        &mdash; Ed25519 key pairs where the server stores only public
        keys&mdash;private keys never leave the client. Nothing valuable to
        steal.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-yellow font-bold">Decentralized JWTs</span>{" "}
        &mdash; account operators issue credentials without touching server
        config. Add users, revoke access, change permissions with no server
        restart and no config file edits.
      </p>
      <p className="mt-4 text-gray-500">
        <span className="text-accent-blue font-bold">Account isolation</span>{" "}
        &mdash; multi-tenant by design. Messages in one account are invisible
        to others, and you share specific subjects between accounts with
        explicit exports/imports&mdash;nothing leaks by accident.
      </p>

      <div className="mt-6 border border-border rounded-lg p-4">
        <div className="text-sm text-gray-500 mb-2">AUTH METHODS</div>
        <div className="flex flex-wrap gap-2">
          {["Token", "Username/Password", "NKeys", "JWT", "Auth Callout"].map((method) => (
            <span
              key={method}
              className="px-3 py-1 border border-border rounded text-sm hover:border-accent-green cursor-default transition-colors"
            >
              {method}
            </span>
          ))}
        </div>
      </div>


      <DiagramReveal>
        <AccountIsolationDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Most message brokers need external auth systems for production.
        NATS bakes multi-tenancy into the protocol. Onboard new customers
        without server changes. Revoke access instantly. Keep tenants
        isolated without running separate clusters.
      </WhyItMatters>

    </SectionContainer>
  );
}
