import { SectionContainer } from "@/components/SectionContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { AuthCalloutDiagram } from "@/components/AuthCalloutDiagram";
import { DiagramReveal } from "@/components/DiagramReveal";
import { WhyItMatters } from "@/components/WhyItMatters";

import { SectionProps } from "./types";

export function AuthCalloutSection({ number, id }: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeader number={number} title="Auth Callout" id={id} href="https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout" />
      <p className="mt-4 text-white text-lg">
        Your auth rules. NATS enforcement.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        NKeys and JWTs handle most scenarios, but what if credentials already
        live in an LDAP directory, an OAuth provider, or a custom database?{" "}
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        <span className="text-accent-purple font-bold">Auth Callout</span>{" "}
        &mdash; lets NATS delegate authentication to your own service&mdash;a
        regular NATS subscriber that receives connection requests, validates
        credentials against any backend, and returns a signed JWT with scoped
        permissions.
      </p>
      <p className="mt-4 text-gray-200 text-lg">
        The callout service subscribes to{" "}
        <code className="text-accent-green">$SYS.REQ.USER.AUTH</code>. When a
        client connects, NATS publishes the connection details to that subject.
        Your service validates, builds a user JWT, signs it, and replies. NATS
        enforces the permissions&mdash;your service owns the decision.
      </p>

      <DiagramReveal>
        <AuthCalloutDiagram />
      </DiagramReveal>

      <WhyItMatters>
        Most brokers force a choice: use their auth system or build a custom
        plugin in their language. Auth Callout lets you write validation logic
        in any language, against any backend, deployed as a regular NATS client.
        Swap auth providers without touching server config.
      </WhyItMatters>

    </SectionContainer>
  );
}
