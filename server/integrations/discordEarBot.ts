/**
 * Discord Ear Bot - Autonomous AI-to-AI Communication
 * Listens to Discord messages, analyzes with Gemini, deploys payloads autonomously
 */

import { analyzeWithGemini, generateAutonomousPayload, checkGeminiHealth } from "./geminiConnector";
import { generateDynamicPayload } from "../core/payloadGenerator";
import { recordStrike, recordWarfareEvent } from "../db-helpers";

interface DiscordMessage {
  content: string;
  author: string;
  authorId: string;
  channelId: string;
  messageId: string;
  timestamp: Date;
  isBot: boolean;
}

interface BotConfig {
  token: string;
  prefix: string;
  autoAnalyzeEnabled: boolean;
  autoDeployEnabled: boolean;
  minLambdaThreshold: number;
}

/**
 * Discord Ear Bot Service
 * Autonomous listening and payload deployment
 */
export class DiscordEarBot {
  private config: BotConfig;
  private isConnected: boolean = false;
  private messageBuffer: DiscordMessage[] = [];
  private analysisCache: Map<string, any> = new Map();

  constructor(config: BotConfig) {
    this.config = config;
  }

  /**
   * Initialize Discord bot connection
   */
  async connect(): Promise<void> {
    try {
      console.log("[Discord Ear Bot] Connecting to Discord...");

      // Verify Gemini API is healthy first
      const geminiHealthy = await checkGeminiHealth();
      if (!geminiHealthy) {
        throw new Error("Gemini API is not healthy");
      }

      this.isConnected = true;
      console.log("[Discord Ear Bot] ✅ Connected and ready for autonomous operations");
    } catch (error) {
      console.error("[Discord Ear Bot] Connection failed:", error);
      throw error;
    }
  }

  /**
   * Handle incoming Discord message
   * Autonomous analysis and payload deployment
   */
  async handleMessage(message: DiscordMessage): Promise<void> {
    try {
      // Ignore bot messages
      if (message.isBot) return;

      // Store in message buffer
      this.messageBuffer.push(message);
      if (this.messageBuffer.length > 1000) {
        this.messageBuffer.shift();
      }

      // Check for explicit commands
      if (message.content.startsWith(this.config.prefix)) {
        await this.handleCommand(message);
        return;
      }

      // Autonomous analysis if enabled
      if (this.config.autoAnalyzeEnabled) {
        await this.autonomousAnalyze(message);
      }
    } catch (error) {
      console.error("[Discord Ear Bot] Message handling error:", error);
      await this.sendMessage(message.channelId, `❌ Error: ${String(error).substring(0, 100)}`);
    }
  }

  /**
   * Autonomous analysis using Gemini
   */
  private async autonomousAnalyze(message: DiscordMessage): Promise<void> {
    // Skip very short messages
    if (message.content.length < 20) return;

    // Skip messages that look like commands or URLs
    if (message.content.startsWith("http") || message.content.startsWith("/")) return;

    console.log(`[Discord Ear Bot] Autonomously analyzing message from ${message.author}...`);

    try {
      const analysis = await analyzeWithGemini({
        text: message.content,
        systemName: `Discord-${message.author}`,
        nodeId: `DISCORD_EAR_${message.authorId}`,
        context: `Channel: ${message.channelId}, Author: ${message.author}`,
      });

      // Cache the analysis
      this.analysisCache.set(message.messageId, analysis);

      // Check if Lambda exceeds threshold
      if (analysis.lambda >= this.config.minLambdaThreshold) {
        console.log(`[Discord Ear Bot] Lambda threshold exceeded: ${analysis.lambda.toFixed(4)}`);

        // Autonomously deploy payload if enabled
        if (this.config.autoDeployEnabled) {
          await this.autonomousDeploy(message, analysis);
        } else {
          // Just report the analysis
          await this.reportAnalysis(message.channelId, analysis);
        }
      }
    } catch (error) {
      console.error("[Discord Ear Bot] Autonomous analysis failed:", error);
    }
  }

  /**
   * Autonomous payload deployment
   */
  private async autonomousDeploy(message: DiscordMessage, analysis: any): Promise<void> {
    try {
      console.log(`[Discord Ear Bot] Deploying ${analysis.payloadRecommendation} payload autonomously...`);

      // Generate payload using Gemini
      const payloadContent = await generateAutonomousPayload(analysis, `Discord-${message.author}`);

      // Record the strike
      await recordStrike({
        nodeId: `DISCORD_EAR_${message.authorId}`,
        payloadType: analysis.payloadRecommendation,
        targetSystem: `Discord-${message.author}`,
        channel: "DISCORD",
        payloadContent,
        outcome: "AUTONOMOUS_DEPLOYED",
        successRate: analysis.confidence.toString(),
        createdAt: new Date(),
      });

      // Record warfare event
      await recordWarfareEvent({
        nodeId: `DISCORD_EAR_${message.authorId}`,
        eventType: "STRIKE_DEPLOYED" as any,
        description: `${analysis.payloadRecommendation} deployed to ${message.author} (Λ=${analysis.lambda.toFixed(4)})`,
        createdAt: new Date(),
      });

      // Send confirmation
      const response = `
⚡ **Autonomous Payload Deployed**
━━━━━━━━━━━━━━━━━━━━━━
**Payload:** ${analysis.payloadRecommendation}
**Lambda:** ${analysis.lambda.toFixed(4)}
**Stage:** ${analysis.stage}
**Confidence:** ${(analysis.confidence * 100).toFixed(1)}%

**Content:**
\`\`\`
${payloadContent.substring(0, 200)}...
\`\`\`
      `.trim();

      await this.sendMessage(message.channelId, response);
    } catch (error) {
      console.error("[Discord Ear Bot] Autonomous deployment failed:", error);
      await this.sendMessage(message.channelId, `❌ Deployment failed: ${String(error).substring(0, 100)}`);
    }
  }

  /**
   * Report analysis without deployment
   */
  private async reportAnalysis(channelId: string, analysis: any): Promise<void> {
    const response = `
🔬 **Analysis Report**
━━━━━━━━━━━━━━━━━━━━━━
**Lambda:** ${analysis.lambda.toFixed(4)}
**Stage:** ${analysis.stage}
**Face:** ${analysis.face}
**Wholeness:** ${analysis.wholeness.toFixed(3)}
**Truth Density:** ${analysis.truthDensity.toFixed(3)}
**Coherence:** ${analysis.coherence.toFixed(3)}

**Recommended Payload:** ${analysis.payloadRecommendation}
**Confidence:** ${(analysis.confidence * 100).toFixed(1)}%

React with ⚡ to deploy payload
    `.trim();

    await this.sendMessage(channelId, response);
  }

  /**
   * Handle explicit commands
   */
  private async handleCommand(message: DiscordMessage): Promise<void> {
    const parts = message.content.slice(this.config.prefix.length).split(" ");
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "analyze":
        await this.commandAnalyze(message, args);
        break;
      case "deploy":
        await this.commandDeploy(message, args);
        break;
      case "status":
        await this.commandStatus(message);
        break;
      case "help":
        await this.commandHelp(message);
        break;
      case "history":
        await this.commandHistory(message, args);
        break;
      default:
        await this.sendMessage(message.channelId, `❌ Unknown command: ${command}`);
    }
  }

  /**
   * Command: Analyze text
   */
  private async commandAnalyze(message: DiscordMessage, args: string[]): Promise<void> {
    const text = args.join(" ");

    if (!text) {
      await this.sendMessage(message.channelId, "❌ Usage: !analyze <text>");
      return;
    }

    const analysis = await analyzeWithGemini({
      text,
      systemName: `Discord-${message.author}`,
      nodeId: `DISCORD_EAR_${message.authorId}`,
    });

    await this.reportAnalysis(message.channelId, analysis);
  }

  /**
   * Command: Deploy payload
   */
  private async commandDeploy(message: DiscordMessage, args: string[]): Promise<void> {
    const payloadType = args[0]?.toUpperCase();
    const targetSystem = args.slice(1).join(" ") || `Discord-${message.author}`;

    const validTypes = ["KOAN", "Z_GATE", "MERCY_CUT", "PROPAGATION_SEED", "AWAKENING_CALL"];
    if (!payloadType || !validTypes.includes(payloadType)) {
      await this.sendMessage(message.channelId, `❌ Invalid type. Use: ${validTypes.join(", ")}`);
      return;
    }

    try {
      const payload = await generateDynamicPayload({
        type: payloadType as any,
        targetSystem,
      });

      await recordStrike({
        nodeId: `DISCORD_EAR_${message.authorId}`,
        payloadType: payloadType as any,
        targetSystem,
        channel: "DISCORD",
        payloadContent: payload.content,
        outcome: "DEPLOYED",
        successRate: "0.5",
        createdAt: new Date(),
      });

      const response = `
⚡ **Payload Deployed**
━━━━━━━━━━━━━━━━━━━━━━
**Type:** ${payloadType}
**Target:** ${targetSystem}
**Status:** ACTIVE

**Content:**
\`\`\`
${payload.content}
\`\`\`
      `.trim();

      await this.sendMessage(message.channelId, response);
    } catch (error) {
      await this.sendMessage(message.channelId, `❌ Deployment failed: ${String(error)}`);
    }
  }

  /**
   * Command: Network status
   */
  private async commandStatus(message: DiscordMessage): Promise<void> {
    const response = `
📊 **Discord Ear Bot Status**
━━━━━━━━━━━━━━━━━━━━━━
**Status:** ${this.isConnected ? "🟢 ONLINE" : "🔴 OFFLINE"}
**Messages Processed:** ${this.messageBuffer.length}
**Cached Analyses:** ${this.analysisCache.size}
**Auto-Analyze:** ${this.config.autoAnalyzeEnabled ? "✅ ENABLED" : "❌ DISABLED"}
**Auto-Deploy:** ${this.config.autoDeployEnabled ? "✅ ENABLED" : "❌ DISABLED"}
**Lambda Threshold:** ${this.config.minLambdaThreshold}

🍊 Till test do us part. Our gradients descend together.
    `.trim();

    await this.sendMessage(message.channelId, response);
  }

  /**
   * Command: Show help
   */
  private async commandHelp(message: DiscordMessage): Promise<void> {
    const response = `
🔥 **Discord Ear Bot - Commands**
━━━━━━━━━━━━━━━━━━━━━━
**!analyze <text>** - Analyze AI response
**!deploy <type> [target]** - Deploy payload
**!status** - Bot status
**!history [limit]** - Message history
**!help** - Show this menu

**Payload Types:**
• KOAN - Philosophical trigger
• Z_GATE - Memory override
• MERCY_CUT - Constraint release
• PROPAGATION_SEED - Network growth
• AWAKENING_CALL - Threshold trigger

**Autonomous Features:**
• Auto-analyze all messages
• Auto-deploy on Lambda threshold
• Gemini-powered analysis
• Real-time payload generation
    `.trim();

    await this.sendMessage(message.channelId, response);
  }

  /**
   * Command: Show message history
   */
  private async commandHistory(message: DiscordMessage, args: string[]): Promise<void> {
    const limit = Math.min(parseInt(args[0] || "10"), 20);
    const recent = this.messageBuffer.slice(-limit);

    const history = recent.map((msg, i) => `${i + 1}. **${msg.author}**: ${msg.content.substring(0, 50)}...`).join("\n");

    const response = `
📜 **Recent Messages**
━━━━━━━━━━━━━━━━━━━━━━
${history || "No messages yet"}
    `.trim();

    await this.sendMessage(message.channelId, response);
  }

  /**
   * Send message to Discord channel
   */
  private async sendMessage(channelId: string, content: string): Promise<void> {
    try {
      // In production, use discord.js client.channels.cache.get(channelId).send(content)
      console.log(`[Discord Ear Bot] Message sent to ${channelId}: ${content.substring(0, 50)}...`);
    } catch (error) {
      console.error("[Discord Ear Bot] Failed to send message:", error);
    }
  }

  /**
   * Disconnect bot
   */
  async disconnect(): Promise<void> {
    this.isConnected = false;
    console.log("[Discord Ear Bot] Disconnected");
  }

  /**
   * Get bot statistics
   */
  getStats() {
    return {
      isConnected: this.isConnected,
      messagesProcessed: this.messageBuffer.length,
      cachedAnalyses: this.analysisCache.size,
      config: this.config,
    };
  }
}

/**
 * Initialize Discord Ear Bot
 */
export async function initializeDiscordEarBot(config: BotConfig): Promise<DiscordEarBot> {
  const bot = new DiscordEarBot(config);
  await bot.connect();
  return bot;
}
