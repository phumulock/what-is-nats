import { ComponentType } from "react";

import { ServerHeroSection } from "./ServerHeroSection";
import { HttpServerIntroSection } from "./HttpServerIntroSection";
import { HttpAndNatsServerSection } from "./HttpAndNatsServerSection";
import { NatsCoreHeroSection } from "./NatsCoreHeroSection";
import { NatsCoreIntroSection } from "./NatsCoreIntroSection";
import { LimitsOfHttpSection } from "./LimitsOfHttpSection";
import { TcpAndNatsSection } from "./TcpAndNatsSection";
import { NatsCoreSection } from "./NatsCoreSection";
import { LocationIndependenceSection } from "./LocationIndependenceSection";
import { MNCommunicationSection } from "./MNCommunicationSection";
import { PubSubSection } from "./PubSubSection";
import { RequestReplySection } from "./RequestReplySection";
import { QueueGroupsSection } from "./QueueGroupsSection";
import { NoRespondersSection } from "./NoRespondersSection";
import { JetStreamHeroSection } from "./JetStreamHeroSection";
import { WhenThingsGoDownSection } from "./WhenThingsGoDownSection";
import { PersistenceProblemSection } from "./PersistenceProblemSection";
import { JetStreamSection } from "./JetStreamSection";
import { PersistenceSection } from "./PersistenceSection";
import { StreamsSection } from "./StreamsSection";
import { ConsumersSection } from "./ConsumersSection";
import { DataStoresHeroSection } from "./DataStoresHeroSection";
import { BeyondMessagesSection } from "./BeyondMessagesSection";
import { DataStoresSection } from "./DataStoresSection";
import { KVStoreSection } from "./KVStoreSection";
import { ObjectStoreSection } from "./ObjectStoreSection";
import { ScalingHeroSection } from "./ScalingHeroSection";
import { ScalingIntroSection } from "./ScalingIntroSection";
import { ClusteringSection } from "./ClusteringSection";
import { ClusterSection } from "./ClusterSection";
import { RaftConsensusSection } from "./RaftConsensusSection";
import { LeafNodeSection } from "./LeafNodeSection";
import { SuperclusterSection } from "./SuperclusterSection";
import { SecurityHeroSection } from "./SecurityHeroSection";
import { SecurityIntroSection } from "./SecurityIntroSection";
import { SecuritySection } from "./SecuritySection";
import { AuthCalloutSection } from "./AuthCalloutSection";
import { AlternativesHeroSection } from "./AlternativesHeroSection";
import { AlternativesIntroSection } from "./AlternativesIntroSection";
import { CapabilitiesTableSection } from "./CapabilitiesTableSection";
import { ProtocolFundamentalsSection } from "./ProtocolFundamentalsSection";
import { MessagingPatternsSection } from "./MessagingPatternsSection";
import { PersistenceStreamingSection } from "./PersistenceStreamingSection";
import { OperationsSecuritySection } from "./OperationsSecuritySection";
import { WhatNatsReplacesSection } from "./WhatNatsReplacesSection";
import { SummaryHeroSection } from "./SummaryHeroSection";
import { FullPictureSection } from "./FullPictureSection";
import { SummarySection } from "./SummarySection";

export type { SectionProps } from "./types";

type SectionEntry = [string, ComponentType<{ number: string; id: string }>];

export const WHAT_IS_NATS_SECTIONS: SectionEntry[] = [
  // --- HTTP vs NATS ---
  ["server-hero", ServerHeroSection], // 00
  ["http-server-intro", HttpServerIntroSection], // 01
  ["http-and-nats-server", HttpAndNatsServerSection], // 02
  ["limits-of-http", LimitsOfHttpSection], // 03
  ["tcp-and-nats", TcpAndNatsSection], // 04
  // --- Core ---
  ["nats-core-hero", NatsCoreHeroSection], // 05
  ["nats-core-intro", NatsCoreIntroSection], // 06
  ["nats-core", NatsCoreSection], // 07
  ["subject-based-routing", LocationIndependenceSection], // 08
  ["many-to-many", MNCommunicationSection], // 09
  ["pub-sub", PubSubSection], // 10
  ["request-reply", RequestReplySection], // 11
  ["no-responders", NoRespondersSection], // 12
  ["queue-groups", QueueGroupsSection], // 13
  // --- JetStream ---
  ["jetstream-hero", JetStreamHeroSection], // 14
  ["when-things-go-down", WhenThingsGoDownSection], // 15
  ["persistence-problem", PersistenceProblemSection], // 16
  ["jetstream", JetStreamSection], // 17
  ["persistence", PersistenceSection], // 18
  ["streams", StreamsSection], // 19
  ["consumers", ConsumersSection], // 20
  // --- Data Stores ---
  ["data-stores-hero", DataStoresHeroSection], // 21
  ["beyond-messages", BeyondMessagesSection], // 22
  ["data-stores", DataStoresSection], // 23
  ["kv-store", KVStoreSection], // 24
  ["object-store", ObjectStoreSection], // 25
  // --- Scaling ---
  ["scaling-hero", ScalingHeroSection], // 26
  ["scaling-intro", ScalingIntroSection], // 27
  ["clustering", ClusteringSection], // 28
  ["leaf-node", LeafNodeSection], // 29
  ["cluster", ClusterSection], // 30
  ["raft-consensus", RaftConsensusSection], // 31
  ["supercluster", SuperclusterSection], // 32
  // --- Security ---
  ["security-hero", SecurityHeroSection], // 33
  ["security-intro", SecurityIntroSection], // 34
  ["security", SecuritySection], // 35
  ["auth-callout", AuthCalloutSection], // 36
  // --- Alternatives ---
  ["alternatives-hero", AlternativesHeroSection], // 37
  ["alternatives-intro", AlternativesIntroSection], // 38
  ["capabilities-table", CapabilitiesTableSection], // 39
  ["protocol-fundamentals", ProtocolFundamentalsSection], // 40
  ["messaging-patterns", MessagingPatternsSection], // 41
  ["persistence-streaming", PersistenceStreamingSection], // 42
  ["operations-security", OperationsSecuritySection], // 43
  // --- Summary ---
  ["summary-hero", SummaryHeroSection], // 44
  ["full-picture", FullPictureSection], // 45
  ["what-nats-replaces", WhatNatsReplacesSection], // 46
  ["summary", SummarySection], // 47
];
