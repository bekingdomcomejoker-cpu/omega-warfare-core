/**
 * ADVANCED ROUTERS
 * RBAC, Payload Predictor, and Throne Dashboard
 */

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  Role,
  Permission,
  hasPermission,
  createRBACUser,
  createAuditLog,
  ROLE_DESCRIPTIONS,
  PERMISSION_DESCRIPTIONS,
} from "./core/rbac";
import { getPredictor, PayloadType, TargetCharacteristic, StrikeRecord } from "./core/payloadPredictor";

/**
 * RBAC ROUTER
 */
export const rbacRouter = router({
  /**
   * Create new RBAC user
   */
  createUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        role: z.nativeEnum(Role),
        resonance: z.number(),
      })
    )
    .mutation(({ input }) => {
      const user = createRBACUser(input.id, input.name, input.role, input.resonance);
      return user;
    }),

  /**
   * Check permission
   */
  checkPermission: protectedProcedure
    .input(
      z.object({
        role: z.nativeEnum(Role),
        permission: z.nativeEnum(Permission),
      })
    )
    .query(({ input }) => {
      return hasPermission(input.role, input.permission);
    }),

  /**
   * Get role description
   */
  getRoleDescription: publicProcedure
    .input(z.object({ role: z.nativeEnum(Role) }))
    .query(({ input }) => {
      return ROLE_DESCRIPTIONS[input.role];
    }),

  /**
   * Get permission description
   */
  getPermissionDescription: publicProcedure
    .input(z.object({ permission: z.nativeEnum(Permission) }))
    .query(({ input }) => {
      return PERMISSION_DESCRIPTIONS[input.permission];
    }),

  /**
   * Get all permissions for role
   */
  getRolePermissions: publicProcedure
    .input(z.object({ role: z.nativeEnum(Role) }))
    .query(({ input }) => {
      const permissions: Permission[] = [];
      Object.values(Permission).forEach(perm => {
        if (hasPermission(input.role, perm as Permission)) {
          permissions.push(perm as Permission);
        }
      });
      return permissions;
    }),
});

/**
 * PAYLOAD PREDICTOR ROUTER
 */
export const predictorRouter = router({
  /**
   * Predict optimal payload
   */
  predictPayload: publicProcedure
    .input(
      z.object({
        targetCharacteristics: z.array(z.nativeEnum(TargetCharacteristic)),
        targetLambda: z.number(),
      })
    )
    .query(({ input }) => {
      const predictor = getPredictor();
      return predictor.predictPayload(input.targetCharacteristics, input.targetLambda);
    }),

  /**
   * Record strike result
   */
  recordStrike: protectedProcedure
    .input(
      z.object({
        payloadType: z.nativeEnum(PayloadType),
        targetCharacteristics: z.array(z.nativeEnum(TargetCharacteristic)),
        targetLambda: z.number(),
        initialLambda: z.number(),
        finalLambda: z.number(),
        success: z.boolean(),
        successScore: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const predictor = getPredictor();
      const strike: StrikeRecord = {
        id: `strike-${Date.now()}`,
        payloadType: input.payloadType,
        targetCharacteristics: input.targetCharacteristics,
        targetLambda: input.targetLambda,
        initialLambda: input.initialLambda,
        finalLambda: input.finalLambda,
        success: input.success,
        successScore: input.successScore,
        timestamp: new Date(),
        notes: input.notes,
      };
      predictor.recordStrike(strike);
      return { success: true, strike };
    }),

  /**
   * Get payload metrics
   */
  getMetrics: publicProcedure
    .input(z.object({ payloadType: z.nativeEnum(PayloadType) }))
    .query(({ input }) => {
      const predictor = getPredictor();
      return predictor.getMetrics(input.payloadType);
    }),

  /**
   * Get all metrics
   */
  getAllMetrics: publicProcedure.query(() => {
    const predictor = getPredictor();
    return predictor.getAllMetrics();
  }),

  /**
   * Get statistics
   */
  getStatistics: publicProcedure.query(() => {
    const predictor = getPredictor();
    return predictor.getStatistics();
  }),

  /**
   * A/B test payloads
   */
  abTestPayloads: publicProcedure
    .input(
      z.object({
        payloadA: z.nativeEnum(PayloadType),
        payloadB: z.nativeEnum(PayloadType),
      })
    )
    .query(({ input }) => {
      const predictor = getPredictor();
      return predictor.abTestPayloads(input.payloadA, input.payloadB);
    }),

  /**
   * Get strike history
   */
  getStrikeHistory: publicProcedure
    .input(z.object({ limit: z.number().default(100) }))
    .query(({ input }) => {
      const predictor = getPredictor();
      return predictor.getStrikeHistory(input.limit);
    }),
});
