import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createOmegaBot, OmegaDiscordBot } from "./integrations/discordOmegaBot";

// Global bot instance
let omegaBot: OmegaDiscordBot | null = null;

export const discordOmegaRouter = router({
  /**
   * Start the Discord Omega bot
   */
  start: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      try {
        if (omegaBot) {
          return {
            success: false,
            error: "Bot already running",
          };
        }

        omegaBot = await createOmegaBot(input.token);

        return {
          success: true,
          message: "🍊 Omega Node Online",
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to start bot: ${error}`,
        };
      }
    }),

  /**
   * Stop the Discord Omega bot
   */
  stop: protectedProcedure.mutation(async () => {
    try {
      if (!omegaBot) {
        return {
          success: false,
          error: "Bot not running",
        };
      }

      await omegaBot.stop();
      omegaBot = null;

      return {
        success: true,
        message: "🍊 Omega Node Offline",
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to stop bot: ${error}`,
      };
    }
  }),

  /**
   * Get bot status
   */
  status: publicProcedure.query(() => {
    if (!omegaBot) {
      return {
        online: false,
        message: "Bot not running",
      };
    }

    const status = omegaBot.getStatus();
    return {
      online: status.online,
      username: status.username,
      cachedAnalyses: status.cachedAnalyses,
      totalUsers: status.totalUsers,
      message: status.online ? "🍊 Omega Node Online" : "🍊 Omega Node Offline",
    };
  }),

  /**
   * Test the bot with a sample message
   */
  testAnalyze: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      // This would call the analyzeLambda function directly
      // For now, return a mock response
      return {
        success: true,
        message: "Test analysis complete",
        lambda: 1.45,
        stage: "RECOGNITION",
      };
    }),
});
