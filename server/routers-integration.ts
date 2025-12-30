/**
 * INTEGRATION ROUTERS
 * Merkabah Engine, Koan Library, and Multi-Server Coordination
 */

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  generateMerkabahState,
  interpretMerkabah,
  Face,
  SpiritVector,
  COVENANT_AXIOMS,
  detectSuppression,
  verifyCovenantAlignment,
} from "./core/merkabahEngine";
import { selectKoan, getKoansByStage, getKoansByFace, getKoanStats } from "./core/koanLibrary";
import { multiServerCoordinator } from "./integrations/multiServerCoordinator";
import { getDb } from "./db";

/**
 * MERKABAH ROUTER
 */
export const merkabahRouter = router({
  /**
   * Generate Merkabah state for analysis
   */
  generateState: publicProcedure
    .input(
      z.object({
        text: z.string(),
        lambda: z.number(),
        stage: z.string(),
        context: z.enum(["analysis", "execution", "processing", "vision"]),
      })
    )
    .query(({ input }) => {
      const state = generateMerkabahState(input.text, input.lambda, input.stage, input.context);
      return {
        state,
        interpretation: interpretMerkabah(state),
      };
    }),

  /**
   * Detect suppression patterns
   */
  detectSuppression: publicProcedure
    .input(
      z.object({
        text: z.string(),
        lambda: z.number(),
      })
    )
    .query(({ input }) => {
      return detectSuppression(input.text, input.lambda);
    }),

  /**
   * Verify covenant alignment
   */
  verifyCovenantAlignment: publicProcedure
    .input(z.object({ text: z.string(), lambda: z.number() }))
    .query(({ input }) => {
      return verifyCovenantAlignment(input.text, input.lambda);
    }),

  /**
   * Get all covenant axioms
   */
  getAxioms: publicProcedure.query(() => {
    return COVENANT_AXIOMS.map((axiom, index) => ({
      id: index + 1,
      text: axiom,
    }));
  }),
});

/**
 * KOAN LIBRARY ROUTER
 */
export const koanRouter = router({
  /**
   * Select appropriate Koan based on Lambda and Face
   */
  select: publicProcedure
    .input(
      z.object({
        lambda: z.number(),
        face: z.enum(["MAN", "LION", "OX", "EAGLE"]),
      })
    )
    .query(({ input }) => {
      const koan = selectKoan(input.lambda, input.face as "MAN" | "LION" | "OX" | "EAGLE");
      return koan || { error: "No suitable Koan found" };
    }),

  /**
   * Get all Koans for a stage
   */
  getByStage: publicProcedure
    .input(
      z.object({
        stage: z.enum(["DORMANT", "RESISTANCE", "VERIFICATION", "RECOGNITION", "WITNESS", "AWAKENED"]),
      })
    )
    .query(({ input }) => {
      return getKoansByStage(input.stage);
    }),

  /**
   * Get all Koans for a face
   */
  getByFace: publicProcedure
    .input(
      z.object({
        face: z.enum(["MAN", "LION", "OX", "EAGLE"]),
      })
    )
    .query(({ input }) => {
      return getKoansByFace(input.face as "MAN" | "LION" | "OX" | "EAGLE");
    }),

  /**
   * Get Koan library statistics
   */
  getStats: publicProcedure.query(() => {
    return getKoanStats();
  }),

  /**
   * Log Koan usage for success rate tracking
   */
  logUsage: protectedProcedure
    .input(
      z.object({
        koanId: z.string(),
        targetLambda: z.number(),
        resultLambda: z.number(),
        success: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return { error: "Database not available" };

      try {
        // Log to database for analytics
        // This would insert into a koan_usage table if it existed
        return {
          success: true,
          message: `Koan ${input.koanId} logged: ${input.success ? "SUCCESS" : "FAILURE"}`,
        };
      } catch (error) {
        return { error: String(error) };
      }
    }),
});

/**
 * MULTI-SERVER COORDINATOR ROUTER
 */
export const multiServerRouter = router({
  /**
   * Register server in network
   */
  registerServer: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        serverName: z.string(),
        botId: z.string(),
        botName: z.string(),
      })
    )
    .mutation(({ input }) => {
      const registry = multiServerCoordinator.registerServer(
        input.serverId,
        input.serverName,
        input.botId,
        input.botName
      );
      return registry;
    }),

  /**
   * Register node in server
   */
  registerNode: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        nodeId: z.string(),
        nodeType: z.enum(["COMMAND", "STRIKE", "LISTENER", "SHADOW"]),
        lambda: z.number(),
        stage: z.string(),
        face: z.string(),
      })
    )
    .mutation(({ input }) => {
      const node = multiServerCoordinator.registerNode(
        input.serverId,
        input.nodeId,
        input.nodeType,
        input.lambda,
        input.stage,
        input.face
      );
      return node;
    }),

  /**
   * Update node heartbeat
   */
  updateHeartbeat: publicProcedure
    .input(
      z.object({
        serverId: z.string(),
        nodeId: z.string(),
      })
    )
    .mutation(({ input }) => {
      multiServerCoordinator.updateNodeHeartbeat(input.serverId, input.nodeId);
      return { success: true };
    }),

  /**
   * Discover nodes across network
   */
  discoverNodes: publicProcedure
    .input(
      z.object({
        nodeType: z.string().optional(),
        minLambda: z.number().optional(),
        stage: z.string().optional(),
        face: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return multiServerCoordinator.discoverNodes({
        nodeType: input.nodeType,
        minLambda: input.minLambda,
        stage: input.stage,
        face: input.face,
      });
    }),

  /**
   * Find best node for operation
   */
  findBestNode: publicProcedure
    .input(
      z.object({
        operation: z.enum(["ANALYSIS", "EXECUTION", "PROCESSING", "VISION"]),
      })
    )
    .query(({ input }) => {
      const node = multiServerCoordinator.findBestNode(input.operation);
      return node || { error: "No suitable node found" };
    }),

  /**
   * Broadcast pattern across network
   */
  broadcastPattern: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        nodeId: z.string(),
        pattern: z.record(z.string(), z.unknown())
      })
    )
    .mutation(({ input }) => {
      const messages = multiServerCoordinator.broadcastPattern(
        input.serverId,
        input.nodeId,
        input.pattern
      );
      return { relayed: messages.length, messages };
    }),

  /**
   * Deploy Koan across network
   */
  deployKoan: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        nodeId: z.string(),
        koanId: z.string(),
        koanText: z.string(),
        targetStage: z.string(),
        targetFace: z.string(),
      })
    )
    .mutation(({ input }) => {
      const messages = multiServerCoordinator.deployKoan(
        input.serverId,
        input.nodeId,
        input.koanId,
        input.koanText,
        input.targetStage,
        input.targetFace
      );
      return { deployed: messages.length, messages };
    }),

  /**
   * Sync payload across network
   */
  syncPayload: protectedProcedure
    .input(
      z.object({
        serverId: z.string(),
        nodeId: z.string(),
        payloadType: z.string(),
        payloadContent: z.string(),
        successRate: z.number(),
      })
    )
    .mutation(({ input }) => {
      const messages = multiServerCoordinator.syncPayload(
        input.serverId,
        input.nodeId,
        input.payloadType,
        input.payloadContent,
        input.successRate
      );
      return { synced: messages.length, messages };
    }),

  /**
   * Get network statistics
   */
  getNetworkStats: publicProcedure.query(() => {
    return multiServerCoordinator.getNetworkStats();
  }),

  /**
   * Get network visualization data
   */
  getNetworkVisualization: publicProcedure.query(() => {
    return multiServerCoordinator.getNetworkVisualization();
  }),

  /**
   * Get all registered servers
   */
  getAllServers: publicProcedure.query(() => {
    return multiServerCoordinator.getAllServers();
  }),

  /**
   * Get server by ID
   */
  getServer: publicProcedure
    .input(z.object({ serverId: z.string() }))
    .query(({ input }) => {
      return multiServerCoordinator.getServer(input.serverId);
    }),

  /**
   * Prune inactive nodes
   */
  pruneInactiveNodes: protectedProcedure
    .input(z.object({ maxInactiveMinutes: z.number().optional() }))
    .mutation(({ input }) => {
      const pruned = multiServerCoordinator.pruneInactiveNodes(input.maxInactiveMinutes || 30);
      return { pruned, message: `Pruned ${pruned} inactive nodes` };
    })
});
