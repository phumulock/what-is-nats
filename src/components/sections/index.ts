import { ComponentType } from "react";

import { WhatIsNatsSection } from "./WhatIsNatsSection";
import { HttpServerSection } from "./HttpServerSection";
import { SingleBinarySection } from "./SingleBinarySection";
import { HttpHeroSection } from "./HttpHeroSection";
import { ProblemWithHttpSection } from "./ProblemWithHttpSection";
import { NatsCoreHeroSection } from "./NatsCoreHeroSection";
import { NatsCoreIntroSection } from "./NatsCoreIntroSection";
import { LimitsOfHttpSection } from "./LimitsOfHttpSection";
import { StillHttpSection } from "./StillHttpSection";
import { TcpTradeoffsSection } from "./TcpTradeoffsSection";
import { NatsOnTcpSection } from "./NatsOnTcpSection";
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
import { MessagingAlternativesSection } from "./MessagingAlternativesSection";
import { StreamingAlternativesSection } from "./StreamingAlternativesSection";
import { WhatNatsReplacesSection } from "./WhatNatsReplacesSection";
import { SummaryHeroSection } from "./SummaryHeroSection";
import { FullPictureSection } from "./FullPictureSection";
import { SummarySection } from "./SummarySection";

export type { SectionProps } from "./types";

type SectionEntry = [string, ComponentType<{ number: string; id: string }>];

export const WHAT_IS_NATS_SECTIONS: SectionEntry[] = [
  ["what-is-nats", WhatIsNatsSection], // 00
  ["http-server", HttpServerSection], // 01
  ["single-binary", SingleBinarySection], // 02
  // --- Why Not HTTP? ---
  ["http-hero", HttpHeroSection], // 03
  ["problem-with-http", ProblemWithHttpSection], // 04
  ["limits-of-http", LimitsOfHttpSection], // 05
  ["still-http", StillHttpSection], // 06
  ["tcp-tradeoffs", TcpTradeoffsSection], // 07
  ["nats-on-tcp", NatsOnTcpSection], // 08
  // --- Core ---
  ["nats-core-hero", NatsCoreHeroSection], // 09
  ["nats-core-intro", NatsCoreIntroSection], // 10
  ["nats-core", NatsCoreSection], // 11
  ["subject-based-routing", LocationIndependenceSection], // 12
  ["many-to-many", MNCommunicationSection], // 13
  ["pub-sub", PubSubSection], // 14
  ["request-reply", RequestReplySection], // 15
  ["no-responders", NoRespondersSection], // 16
  ["queue-groups", QueueGroupsSection], // 17
  // --- JetStream ---
  ["jetstream-hero", JetStreamHeroSection], // 18
  ["when-things-go-down", WhenThingsGoDownSection], // 19
  ["persistence-problem", PersistenceProblemSection], // 20
  ["jetstream", JetStreamSection], // 21
  ["persistence", PersistenceSection], // 22
  ["streams", StreamsSection], // 23
  ["consumers", ConsumersSection], // 24
  // --- Data Stores ---
  ["data-stores-hero", DataStoresHeroSection], // 25
  ["beyond-messages", BeyondMessagesSection], // 26
  ["data-stores", DataStoresSection], // 27
  ["kv-store", KVStoreSection], // 28
  ["object-store", ObjectStoreSection], // 29
  // --- Scaling ---
  ["scaling-hero", ScalingHeroSection], // 30
  ["scaling-intro", ScalingIntroSection], // 31
  ["clustering", ClusteringSection], // 32
  ["leaf-node", LeafNodeSection], // 33
  ["cluster", ClusterSection], // 34
  ["raft-consensus", RaftConsensusSection], // 35
  ["supercluster", SuperclusterSection], // 36
  // --- Security ---
  ["security-hero", SecurityHeroSection], // 37
  ["security-intro", SecurityIntroSection], // 38
  ["security", SecuritySection], // 39
  ["auth-callout", AuthCalloutSection], // 40
  // --- Alternatives ---
  ["alternatives-hero", AlternativesHeroSection], // 41
  ["alternatives-intro", AlternativesIntroSection], // 42
  ["messaging-alternatives", MessagingAlternativesSection], // 43
  ["streaming-alternatives", StreamingAlternativesSection], // 44
  // --- Summary ---
  ["summary-hero", SummaryHeroSection], // 45
  ["full-picture", FullPictureSection], // 46
  ["what-nats-replaces", WhatNatsReplacesSection], // 47
  ["summary", SummarySection], // 48
];
