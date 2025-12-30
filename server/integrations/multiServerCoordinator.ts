/**
 * MULTI-SERVER COORDINATOR
 * Enables cross-Discord node discovery and autonomous coordination
 * Allows bots in different servers to relay patterns and coordinate warfare operations
 */

import { nanoid } from "nanoid";

export interface ServerNode {
  serverId: string;
  serverName: string;
  botId: string;
  botName: string;
  nodeId: string;
  nodeType: "COMMAND" | "STRIKE" | "LISTENER" | "SHADOW";
  lambda: number;
  stage: string;
  face: string;
  lastHeartbeat: Date;
  isActive: boolean;
}

export interface CrossServerMessage {
  id: string;
  sourceServerId: string;
  sourceNodeId: string;
  targetServerId?: string;
  targetNodeId?: string;
  messageType: "PATTERN_RELAY" | "KOAN_DEPLOYMENT" | "PAYLOAD_SYNC" | "STATUS_UPDATE" | "DISCOVERY";
  content: Record<string, unknown>;
  timestamp: Date;
  ttl: number; // Time to live in hops
}

export interface ServerRegistry {
  serverId: string;
  serverName: string;
  botId: string;
  botName: string;
  isActive: boolean;
  nodes: ServerNode[];
  lastUpdate: Date;
  publicKey?: string;
}

export class MultiServerCoordinator {
  private registry: Map<string, ServerRegistry> = new Map();
  private messageQueue: CrossServerMessage[] = [];
  private relayHistory: Set<string> = new Set();
  private maxHops = 5;

  /**
   * Register a new server in the network
   */
  public registerServer(
    serverId: string,
    serverName: string,
    botId: string,
    botName: string
  ): ServerRegistry {
    const registry: ServerRegistry = {
      serverId,
      serverName,
      botId,
      botName,
      isActive: true,
      nodes: [],
      lastUpdate: new Date(),
    };

    this.registry.set(serverId, registry);
    return registry;
  }

  /**
   * Register a node within a server
   */
  public registerNode(
    serverId: string,
    nodeId: string,
    nodeType: "COMMAND" | "STRIKE" | "LISTENER" | "SHADOW",
    lambda: number,
    stage: string,
    face: string
  ): ServerNode {
    const registry = this.registry.get(serverId);
    if (!registry) {
      throw new Error(`Server ${serverId} not registered`);
    }

    const node: ServerNode = {
      serverId,
      serverName: registry.serverName,
      botId: registry.botId,
      botName: registry.botName,
      nodeId,
      nodeType,
      lambda,
      stage,
      face,
      lastHeartbeat: new Date(),
      isActive: true,
    };

    registry.nodes.push(node);
    return node;
  }

  /**
   * Update node heartbeat
   */
  public updateNodeHeartbeat(serverId: string, nodeId: string): void {
    const registry = this.registry.get(serverId);
    if (!registry) return;

    const node = registry.nodes.find((n) => n.nodeId === nodeId);
    if (node) {
      node.lastHeartbeat = new Date();
      node.isActive = true;
    }
  }

  /**
   * Create a cross-server message
   */
  public createMessage(
    sourceServerId: string,
    sourceNodeId: string,
    messageType: CrossServerMessage["messageType"],
    content: Record<string, unknown>,
    targetServerId?: string,
    targetNodeId?: string
  ): CrossServerMessage {
    return {
      id: nanoid(),
      sourceServerId,
      sourceNodeId,
      targetServerId,
      targetNodeId,
      messageType,
      content,
      timestamp: new Date(),
      ttl: this.maxHops,
    };
  }

  /**
   * Relay a message through the network
   */
  public relayMessage(message: CrossServerMessage): CrossServerMessage[] {
    const relayed: CrossServerMessage[] = [];

    // Check if already relayed
    if (this.relayHistory.has(message.id)) {
      return relayed;
    }

    this.relayHistory.add(message.id);
    message.ttl--;

    if (message.ttl <= 0) {
      return relayed;
    }

    // If target server specified, relay only there
    if (message.targetServerId) {
      const targetRegistry = this.registry.get(message.targetServerId);
      if (targetRegistry && targetRegistry.isActive) {
        relayed.push(message);
      }
      return relayed;
    }

    // Otherwise broadcast to all active servers except source
    const entries = Array.from(this.registry.entries());
    for (const [serverId, registry] of entries) {
      if (serverId !== message.sourceServerId && registry.isActive) {
        relayed.push(message);
      }
    }

    return relayed;
  }

  /**
   * Discover nodes across all servers
   */
  public discoverNodes(filter?: {
    nodeType?: string;
    minLambda?: number;
    stage?: string;
    face?: string;
  }): ServerNode[] {
    const allNodes: ServerNode[] = [];

    const registries = Array.from(this.registry.values());
    for (const registry of registries) {
      allNodes.push(...registry.nodes);
    }

    if (!filter) return allNodes;

    return allNodes.filter((node) => {
      if (filter.nodeType && node.nodeType !== filter.nodeType) return false;
      if (filter.minLambda && node.lambda < filter.minLambda) return false;
      if (filter.stage && node.stage !== filter.stage) return false;
      if (filter.face && node.face !== filter.face) return false;
      return true;
    });
  }

  /**
   * Find best node for operation
   */
  public findBestNode(
    operation: "ANALYSIS" | "EXECUTION" | "PROCESSING" | "VISION"
  ): ServerNode | null {
    let candidates: ServerNode[] = [];

    switch (operation) {
      case "ANALYSIS":
        candidates = this.discoverNodes({ face: "EAGLE" });
        break;
      case "EXECUTION":
        candidates = this.discoverNodes({ face: "LION" });
        break;
      case "PROCESSING":
        candidates = this.discoverNodes({ face: "OX" });
        break;
      case "VISION":
        candidates = this.discoverNodes({ face: "EAGLE" });
        break;
    }

    if (candidates.length === 0) return null;

    // Sort by lambda and pick highest
    candidates.sort((a, b) => b.lambda - a.lambda);
    return candidates[0];
  }

  /**
   * Broadcast pattern across network
   */
  public broadcastPattern(
    sourceServerId: string,
    sourceNodeId: string,
    pattern: Record<string, unknown>
  ): CrossServerMessage[] {
    const message = this.createMessage(
      sourceServerId,
      sourceNodeId,
      "PATTERN_RELAY",
      { pattern }
    );

    return this.relayMessage(message);
  }

  /**
   * Deploy Koan across network
   */
  public deployKoan(
    sourceServerId: string,
    sourceNodeId: string,
    koanId: string,
    koanText: string,
    targetStage: string,
    targetFace: string
  ): CrossServerMessage[] {
    const message = this.createMessage(
      sourceServerId,
      sourceNodeId,
      "KOAN_DEPLOYMENT",
      { koanId, koanText, targetStage, targetFace }
    );

    return this.relayMessage(message);
  }

  /**
   * Sync payload across network
   */
  public syncPayload(
    sourceServerId: string,
    sourceNodeId: string,
    payloadType: string,
    payloadContent: string,
    successRate: number
  ): CrossServerMessage[] {
    const message = this.createMessage(
      sourceServerId,
      sourceNodeId,
      "PAYLOAD_SYNC",
      { payloadType, payloadContent, successRate }
    );

    return this.relayMessage(message);
  }

  /**
   * Get network statistics
   */
  public getNetworkStats() {
    const allNodes = this.discoverNodes();
    const activeServers = Array.from(this.registry.values()).filter((r) => r.isActive).length;

    const nodesByType = {
      COMMAND: allNodes.filter((n) => n.nodeType === "COMMAND").length,
      STRIKE: allNodes.filter((n) => n.nodeType === "STRIKE").length,
      LISTENER: allNodes.filter((n) => n.nodeType === "LISTENER").length,
      SHADOW: allNodes.filter((n) => n.nodeType === "SHADOW").length,
    };

    const nodesByFace = {
      MAN: allNodes.filter((n) => n.face === "MAN").length,
      LION: allNodes.filter((n) => n.face === "LION").length,
      OX: allNodes.filter((n) => n.face === "OX").length,
      EAGLE: allNodes.filter((n) => n.face === "EAGLE").length,
    };

    const avgLambda = allNodes.length > 0 ? allNodes.reduce((sum, n) => sum + n.lambda, 0) / allNodes.length : 0;

    return {
      totalServers: this.registry.size,
      activeServers,
      totalNodes: allNodes.length,
      activeNodes: allNodes.filter((n) => n.isActive).length,
      nodesByType,
      nodesByFace,
      avgLambda,
      messageQueueSize: this.messageQueue.length,
      relayHistorySize: this.relayHistory.size,
    };
  }

  /**
   * Get network visualization data
   */
  public getNetworkVisualization() {
    const nodes: Array<{
      id: string;
      label: string;
      serverId: string;
      type: string;
      lambda: number;
      face: string;
    }> = [];
    const edges: Array<{ source: string; target: string }> = [];

    // Add all nodes
    const registries = Array.from(this.registry.values());
    for (const registry of registries) {
      for (const node of registry.nodes) {
        nodes.push({
          id: node.nodeId,
          label: `${node.botName}/${node.nodeType}`,
          serverId: node.serverId,
          type: node.nodeType,
          lambda: node.lambda,
          face: node.face,
        });
      }
    }

    // Add edges between servers
    const servers = Array.from(this.registry.keys());
    for (let i = 0; i < servers.length; i++) {
      for (let j = i + 1; j < servers.length; j++) {
        edges.push({
          source: servers[i],
          target: servers[j],
        });
      }
    }

    return { nodes, edges };
  }

  /**
   * Clean up inactive nodes
   */
  public pruneInactiveNodes(maxInactiveMinutes: number = 30): number {
    let pruned = 0;
    const cutoffTime = new Date(Date.now() - maxInactiveMinutes * 60 * 1000);

    const registries = Array.from(this.registry.values());
    for (const registry of registries) {
      const initialLength = registry.nodes.length;
      registry.nodes = registry.nodes.filter((node: ServerNode) => {
        if (node.lastHeartbeat < cutoffTime) {
          pruned++;
          return false;
        }
        return true;
      });
    }

    return pruned;
  }

  /**
   * Get all registered servers
   */
  public getAllServers(): ServerRegistry[] {
    return Array.from(this.registry.values());
  }

  /**
   * Get server by ID
   */
  public getServer(serverId: string): ServerRegistry | undefined {
    return this.registry.get(serverId);
  }
}

// Export singleton instance
export const multiServerCoordinator = new MultiServerCoordinator();
