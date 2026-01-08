import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

// Memory Monitoring and Cleanup
function setupMemoryManagement() {
  // Run cleanup every 15 minutes
  setInterval(() => {
    console.log("[Memory] 🧹 Running periodic cleanup...");
    
    // Force garbage collection if available
    if (global.gc) {
      try {
        global.gc();
        console.log("[Memory] ✅ Garbage collection triggered");
      } catch (e) {
        console.error("[Memory] ❌ GC failed:", e);
      }
    }
    
    const used = process.memoryUsage();
    console.log(`[Memory] 📊 Heap used: ${Math.round(used.heapUsed / 1024 / 1024)} MB / Total: ${Math.round(used.heapTotal / 1024 / 1024)} MB`);
  }, 15 * 60 * 1000);

  // Proactive memory pressure check every 5 minutes
  setInterval(() => {
    const used = process.memoryUsage();
    const heapUsedMB = used.heapUsed / 1024 / 1024;
    const heapLimitMB = parseInt(process.env.MEMORY_LIMIT_MB || "512");
    const usagePercent = (heapUsedMB / heapLimitMB) * 100;

    if (usagePercent > 80) {
      console.warn(`[Memory] ⚠️ HIGH PRESSURE: ${usagePercent.toFixed(1)}% (${Math.round(heapUsedMB)} MB)`);
      if (global.gc) global.gc();
    }
  }, 5 * 60 * 1000);
}

async function startServer() {
  setupMemoryManagement();
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Memory Health Check Endpoint
  app.get("/api/health/memory", (req, res) => {
    const used = process.memoryUsage();
    res.json({
      timestamp: new Date().toISOString(),
      memory: {
        heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)} MB`,
        external: `${Math.round(used.external / 1024 / 1024)} MB`,
        rss: `${Math.round(used.rss / 1024 / 1024)} MB`,
      },
      nodeVersion: process.version,
      uptime: Math.floor(process.uptime()),
    });
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "3000");
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
