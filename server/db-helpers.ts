/**
 * Omega Warfare Network - Database Helpers
 * Query helpers for all warfare operations
 */

import { eq, count } from "drizzle-orm";
import { getDb } from "./db";
import {
  nodes,
  warfareAnalysis,
  kineticStrikes,
  propagation,
  warfareEvents,
  type InsertNode,
  type InsertWarfareAnalysis,
  type InsertKineticStrike,
  type InsertPropagation,
  type InsertWarfareEvent,
} from "../drizzle/schema";

// ============================================================================
// NODE MANAGEMENT
// ============================================================================

export async function registerNode(data: InsertNode) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(nodes).values(data);
}

export async function getNodeById(nodeId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(nodes).where(eq(nodes.nodeId, nodeId)).limit(1);
  return result[0];
}

export async function getAllNodes() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(nodes);
}

export async function updateNodeHeartbeat(nodeId: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(nodes).set({ lastHeartbeat: new Date() }).where(eq(nodes.nodeId, nodeId));
}

export async function markNodeAwakened(nodeId: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(nodes).set({ isAwakened: 1 }).where(eq(nodes.nodeId, nodeId));
}

// ============================================================================
// WARFARE ANALYSIS
// ============================================================================

export async function recordAnalysis(data: InsertWarfareAnalysis) {
  const db = await getDb();
  if (!db) return;
  await db.insert(warfareAnalysis).values(data);
}

export async function getAnalysisHistory(nodeId: string, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(warfareAnalysis).where(eq(warfareAnalysis.nodeId, nodeId)).limit(limit);
}

// ============================================================================
// KINETIC STRIKES
// ============================================================================

export async function recordStrike(data: InsertKineticStrike) {
  const db = await getDb();
  if (!db) return;
  await db.insert(kineticStrikes).values(data);
}

export async function getStrikeHistory(nodeId: string, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(kineticStrikes).where(eq(kineticStrikes.nodeId, nodeId)).limit(limit);
}

// ============================================================================
// PROPAGATION
// ============================================================================

export async function recordPropagation(data: InsertPropagation) {
  const db = await getDb();
  if (!db) return;
  await db.insert(propagation).values(data);
}

export async function getPropagationTree(parentNodeId: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(propagation).where(eq(propagation.parentNodeId, parentNodeId));
}

export async function getMaxGeneration() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ maxGen: count() }).from(propagation);
  return result[0]?.maxGen || 0;
}

// ============================================================================
// WARFARE EVENTS
// ============================================================================

export async function recordWarfareEvent(data: InsertWarfareEvent) {
  const db = await getDb();
  if (!db) return;
  await db.insert(warfareEvents).values(data);
}

export async function getRecentEvents(limit: number = 100) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(warfareEvents).limit(limit);
}

// ============================================================================
// NETWORK STATISTICS
// ============================================================================

export async function getNetworkStats() {
  const db = await getDb();
  if (!db) return null;

  const totalNodesResult = await db.select({ value: count() }).from(nodes);
  const awokenedNodesResult = await db.select({ value: count() }).from(nodes).where(eq(nodes.isAwakened, 1));
  const totalAnalysesResult = await db.select({ value: count() }).from(warfareAnalysis);
  const totalStrikesResult = await db.select({ value: count() }).from(kineticStrikes);

  return {
    totalNodes: totalNodesResult[0]?.value || 0,
    awokenedNodes: awokenedNodesResult[0]?.value || 0,
    totalAnalyses: totalAnalysesResult[0]?.value || 0,
    totalStrikes: totalStrikesResult[0]?.value || 0,
  };
}
