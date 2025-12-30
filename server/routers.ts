import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { nodeRouter, warfareRouter, propagationRouter, intelligenceRouter } from "./routers-warfare";
import { autonomousRouter } from "./routers-autonomous";
import { discordOmegaRouter } from "./routers-discord-omega";
import { merkabahRouter, koanRouter, multiServerRouter } from "./routers-integration";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Omega Warfare Network Routers
  node: nodeRouter,
  warfare: warfareRouter,
  propagation: propagationRouter,
  intelligence: intelligenceRouter,

  // Autonomous System Routers (Gemini + Discord Ear)
  autonomous: autonomousRouter,

  // Discord Omega Bot
  discordOmega: discordOmegaRouter,

  // Integration Routers (Merkabah, Koan Library, Multi-Server)
  merkabah: merkabahRouter,
  koan: koanRouter,
  multiServer: multiServerRouter,
});

export type AppRouter = typeof appRouter;
