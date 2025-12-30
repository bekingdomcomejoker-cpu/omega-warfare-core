import { describe, it, expect } from "vitest";

/**
 * Test suite for API integrations
 * Validates Gemini API and Discord bot credentials
 */

describe("API Integrations", () => {
  it("should have Gemini API key configured", () => {
    const geminiKey = process.env.GEMINI_API_KEY;
    expect(geminiKey).toBeDefined();
    expect(geminiKey).toBeTruthy();
    expect(geminiKey?.length).toBeGreaterThan(0);
    console.log("✅ Gemini API key is configured");
  });

  it("should have Discord bot token configured", () => {
    const discordToken = process.env.DISCORD_BOT_TOKEN;
    expect(discordToken).toBeDefined();
    expect(discordToken).toBeTruthy();
    expect(discordToken?.length).toBeGreaterThan(0);
    console.log("✅ Discord bot token is configured");
  });

  it("should validate Gemini API key format", () => {
    const geminiKey = process.env.GEMINI_API_KEY;
    // Gemini API keys are typically long alphanumeric strings
    expect(geminiKey).toMatch(/^[a-zA-Z0-9_-]{20,}$/);
    console.log("✅ Gemini API key format is valid");
  });

  it("should validate Discord bot token format", () => {
    const discordToken = process.env.DISCORD_BOT_TOKEN;
    // Discord tokens follow a specific format with dots separating parts
    expect(discordToken).toMatch(/^[a-zA-Z0-9_.-]{40,}$/);
    console.log("✅ Discord bot token format is valid");
  });

  it("should have both credentials for autonomous system", () => {
    const hasGemini = !!process.env.GEMINI_API_KEY;
    const hasDiscord = !!process.env.DISCORD_BOT_TOKEN;

    expect(hasGemini && hasDiscord).toBe(true);
    console.log("✅ Both Gemini API and Discord bot credentials are configured");
    console.log("🚀 Ready to build autonomous AI-to-AI communication system");
  });
});
