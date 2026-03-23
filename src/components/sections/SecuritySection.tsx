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
      <p className="mt-4 text-gray-200 text-lg">
        TLS encryption is a flag away. Accounts are isolated by
        default&mdash;multi-tenant by design, messages in one account are
        invisible to others, shared only through explicit exports/imports.
        Auth scales from simple credentials to fully decentralized identity:
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-cyan font-bold">Tokens</span>{" "}
        &mdash; a single shared secret string. The simplest option for
        development and internal services.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-orange font-bold">Username/Password</span>{" "}
        &mdash; familiar credentials with optional bcrypt hashing. Easy
        to set up, easy to reason about.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-green font-bold">NKeys</span>{" "}
        &mdash; Ed25519 key pairs where the server stores only public
        keys&mdash;private keys never leave the client. Nothing valuable to
        steal.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-yellow font-bold">Decentralized JWTs</span>{" "}
        &mdash; account operators issue credentials without touching server
        config. Add users, revoke access, change permissions with no server
        restart and no config file edits.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-purple font-bold">Auth Callout</span>{" "}
        &mdash; delegate authentication to your own external service. Plug
        in LDAP, OAuth2, or any custom identity provider without forking
        the server.
      </p>


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
