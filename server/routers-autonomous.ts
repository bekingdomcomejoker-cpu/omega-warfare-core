/**
 * Autonomous System Routers
 * tRPC procedures for Gemini API and Discord Ear bot
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { analyzeWithGemini, generateAutonomousPayload, checkGeminiHealth } from "./integrations/geminiConnector";
import { generateDynamicPayload } from "./core/payloadGenerator";
import { recordStrike } from "./db-helpers";

export const autonomousRouter = router({
  /**
   * Gemini API Integration
   */
  gemini: router({
    /**
     * Analyze text with Gemini
     */
    analyze: publicProcedure
      .input(
        z.object({
          text: z.string().min(1),
          systemName: z.string().optional(),
          nodeId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const analysis = await analyzeWithGemini({
            text: input.text,
            systemName: input.systemName || "Unknown",
            nodeId: input.nodeId || "GEMINI_ANALYSIS",
          });

          return {
            success: true,
            analysis,
          };
        } catch (error) {
          return {
            success: false,
            error: String(error),
          };
        }
      }),

    /**
     * Generate autonomous payload
     */
    generatePayload: publicProcedure
      .input(
        z.object({
          lambda: z.number(),
          stage: z.string(),
          face: z.string(),
          targetSystem: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const payload = await generateAutonomousPayload(
            {
              rawResponse: "",
              lambda: input.lambda,
              stage: input.stage,
              face: input.face,
              action: "",
              covenantDetected: false,
              wholeness: 0,
              truthDensity: 0,
              coherence: 0,
              payloadRecommendation: "KOAN",
              confidence: 0.5,
            },
            input.targetSystem
          );

          return {
            success: true,
            payload,
          };
        } catch (error) {
          return {
            success: false,
            error: String(error),
          };
        }
      }),

    /**
     * Health check Gemini API
     */
    health: publicProcedure.query(async () => {
      try {
        const isHealthy = await checkGeminiHealth();
        return {
          healthy: isHealthy,
          status: isHealthy ? "✅ HEALTHY" : "❌ UNHEALTHY",
        };
      } catch (error) {
        return {
          healthy: false,
          status: `❌ ERROR: ${String(error)}`,
        };
      }
    }),
  }),

  /**
   * Discord Ear Bot Integration
   */
  discordEar: router({
    /**
     * Analyze Discord message
     */
    analyzeMessage: publicProcedure
      .input(
        z.object({
          content: z.string().min(1),
          author: z.string(),
          authorId: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const analysis = await analyzeWithGemini({
            text: input.content,
            systemName: `Discord-${input.author}`,
            nodeId: `DISCORD_EAR_${input.authorId}`,
          });

          return {
            success: true,
            analysis,
          };
        } catch (error) {
          return {
            success: false,
            error: String(error),
          };
        }
      }),

    /**
     * Deploy payload from Discord
     */
    deployPayload: protectedProcedure
      .input(
        z.object({
          payloadType: z.enum(["KOAN", "Z_GATE", "MERCY_CUT", "PROPAGATION_SEED", "AWAKENING_CALL"]),
          targetSystem: z.string(),
          author: z.string(),
          authorId: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const payload = await generateDynamicPayload({
            type: input.payloadType,
            targetSystem: input.targetSystem,
          });

          await recordStrike({
            nodeId: `DISCORD_EAR_${input.authorId}`,
            payloadType: input.payloadType,
            targetSystem: input.targetSystem,
            channel: "DISCORD",
            payloadContent: payload.content,
            outcome: "DEPLOYED",
            successRate: "0.5",
            createdAt: new Date(),
          });

          return {
            success: true,
            payload: payload.content,
            message: `✅ ${input.payloadType} deployed to ${input.targetSystem}`,
          };
        } catch (error) {
          return {
            success: false,
            error: String(error),
          };
        }
      }),

    /**
     * Get Discord Ear bot status
     */
    status: publicProcedure.query(async () => {
      return {
        status: "🟢 ONLINE",
        autoAnalyze: true,
        autoDeploy: false,
        lambdaThreshold: 1.0,
        messagesProcessed: 0,
        cachedAnalyses: 0,
      };
    }),
  }),

  /**
   * Autonomous Workflow
   */
  workflow: router({
    /**
     * Full autonomous analysis and deployment workflow
     */
    executeAutonomous: publicProcedure
      .input(
        z.object({
          text: z.string().min(1),
          systemName: z.string(),
          autoDeployEnabled: z.boolean().optional(),
          lambdaThreshold: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          console.log(`[Autonomous Workflow] Starting workflow for ${input.systemName}...`);

          // Step 1: Analyze with Gemini
          const analysis = await analyzeWithGemini({
            text: input.text,
            systemName: input.systemName,
            nodeId: "AUTONOMOUS_WORKFLOW",
          });

          console.log(`[Autonomous Workflow] Analysis complete: Λ=${analysis.lambda.toFixed(4)}`);

          // Step 2: Check if should deploy
          const lambdaThreshold = input.lambdaThreshold || 1.0;
          const shouldDeploy = input.autoDeployEnabled && analysis.lambda >= lambdaThreshold;

          let deploymentResult = null;

          if (shouldDeploy) {
            console.log(`[Autonomous Workflow] Lambda threshold exceeded, deploying...`);

            // Step 3: Generate and deploy payload
            const payloadContent = await generateAutonomousPayload(analysis, input.systemName);

            await recordStrike({
              nodeId: "AUTONOMOUS_WORKFLOW",
              payloadType: analysis.payloadRecommendation as any,
              targetSystem: input.systemName,
              channel: "API",
              payloadContent,
              outcome: "AUTONOMOUS_DEPLOYED",
              successRate: analysis.confidence.toString(),
              createdAt: new Date(),
            });

            deploymentResult = {
              deployed: true,
              payload: payloadContent,
              type: analysis.payloadRecommendation,
            };

            console.log(`[Autonomous Workflow] Payload deployed successfully`);
          }

          return {
            success: true,
            analysis,
            deployment: deploymentResult,
            workflow: {
              analyzed: true,
              deployed: shouldDeploy,
              lambdaExceededThreshold: analysis.lambda >= lambdaThreshold,
            },
          };
        } catch (error) {
          console.error("[Autonomous Workflow] Error:", error);
          return {
            success: false,
            error: String(error),
          };
        }
      }),
  }),
});

export type AutonomousRouter = typeof autonomousRouter;
