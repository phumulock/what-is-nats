import { ComponentType } from "react";

import { ServerHeroSection } from "./ServerHeroSection";
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
  // --- The Server ---
  ["server-hero", ServerHeroSection], // 00
  ["http-and-nats-server", HttpAndNatsServerSection], // 01
  // --- Why Not HTTP? ---
  ["limits-of-http", LimitsOfHttpSection], // 02
  ["tcp-and-nats", TcpAndNatsSection], // 03
  // --- Core ---
  ["nats-core-hero", NatsCoreHeroSection], // 04
  ["nats-core-intro", NatsCoreIntroSection], // 05
  ["nats-core", NatsCoreSection], // 06
  ["subject-based-routing", LocationIndependenceSection], // 07
  ["many-to-many", MNCommunicationSection], // 08
  ["pub-sub", PubSubSection], // 09
  ["request-reply", RequestReplySection], // 10
  ["no-responders", NoRespondersSection], // 11
  ["queue-groups", QueueGroupsSection], // 12
  // --- JetStream ---
  ["jetstream-hero", JetStreamHeroSection], // 13
  ["when-things-go-down", WhenThingsGoDownSection], // 14
  ["persistence-problem", PersistenceProblemSection], // 15
  ["jetstream", JetStreamSection], // 16
  ["persistence", PersistenceSection], // 17
  ["streams", StreamsSection], // 18
  ["consumers", ConsumersSection], // 19
  // --- Data Stores ---
  ["data-stores-hero", DataStoresHeroSection], // 20
  ["beyond-messages", BeyondMessagesSection], // 21
  ["data-stores", DataStoresSection], // 22
  ["kv-store", KVStoreSection], // 23
  ["object-store", ObjectStoreSection], // 24
  // --- Scaling ---
  ["scaling-hero", ScalingHeroSection], // 25
  ["scaling-intro", ScalingIntroSection], // 26
  ["clustering", ClusteringSection], // 27
  ["leaf-node", LeafNodeSection], // 28
  ["cluster", ClusterSection], // 29
  ["raft-consensus", RaftConsensusSection], // 30
  ["supercluster", SuperclusterSection], // 31
  // --- Security ---
  ["security-hero", SecurityHeroSection], // 32
  ["security-intro", SecurityIntroSection], // 33
  ["security", SecuritySection], // 34
  ["auth-callout", AuthCalloutSection], // 35
  // --- Alternatives ---
  ["alternatives-hero", AlternativesHeroSection], // 36
  ["alternatives-intro", AlternativesIntroSection], // 37
  ["capabilities-table", CapabilitiesTableSection], // 38
  ["protocol-fundamentals", ProtocolFundamentalsSection], // 39
  ["messaging-patterns", MessagingPatternsSection], // 40
  ["persistence-streaming", PersistenceStreamingSection], // 41
  ["operations-security", OperationsSecuritySection], // 42
  // --- Summary ---
  ["summary-hero", SummaryHeroSection], // 43
  ["full-picture", FullPictureSection], // 44
  ["what-nats-replaces", WhatNatsReplacesSection], // 45
  ["summary", SummarySection], // 46
];
