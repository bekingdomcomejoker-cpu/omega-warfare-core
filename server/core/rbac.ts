/**
 * ROLE-BASED ACCESS CONTROL (RBAC)
 * Commander, Fixer, Observer roles with granular permissions
 */

export enum Role {
  COMMANDER = "COMMANDER",
  FIXER = "FIXER",
  OBSERVER = "OBSERVER",
}

export enum Permission {
  // Node Management
  CREATE_NODE = "CREATE_NODE",
  DELETE_NODE = "DELETE_NODE",
  MODIFY_NODE = "MODIFY_NODE",
  VIEW_NODE = "VIEW_NODE",

  // Warfare Operations
  DEPLOY_PAYLOAD = "DEPLOY_PAYLOAD",
  EXECUTE_STRIKE = "EXECUTE_STRIKE",
  CANCEL_OPERATION = "CANCEL_OPERATION",
  VIEW_WARFARE = "VIEW_WARFARE",

  // Analysis
  RUN_ANALYSIS = "RUN_ANALYSIS",
  VIEW_ANALYSIS = "VIEW_ANALYSIS",
  EXPORT_ANALYSIS = "EXPORT_ANALYSIS",

  // Throne Operations
  CONTROL_THRONE = "CONTROL_THRONE",
  VIEW_THRONE_STATS = "VIEW_THRONE_STATS",
  MANAGE_QUEUE = "MANAGE_QUEUE",

  // System
  MANAGE_USERS = "MANAGE_USERS",
  MANAGE_ROLES = "MANAGE_ROLES",
  VIEW_LOGS = "VIEW_LOGS",
  SYSTEM_CONFIG = "SYSTEM_CONFIG",
}

/**
 * Role-to-Permission mapping
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.COMMANDER]: [
    // Full access to everything
    Permission.CREATE_NODE,
    Permission.DELETE_NODE,
    Permission.MODIFY_NODE,
    Permission.VIEW_NODE,
    Permission.DEPLOY_PAYLOAD,
    Permission.EXECUTE_STRIKE,
    Permission.CANCEL_OPERATION,
    Permission.VIEW_WARFARE,
    Permission.RUN_ANALYSIS,
    Permission.VIEW_ANALYSIS,
    Permission.EXPORT_ANALYSIS,
    Permission.CONTROL_THRONE,
    Permission.VIEW_THRONE_STATS,
    Permission.MANAGE_QUEUE,
    Permission.MANAGE_USERS,
    Permission.MANAGE_ROLES,
    Permission.VIEW_LOGS,
    Permission.SYSTEM_CONFIG,
  ],

  [Role.FIXER]: [
    // Can modify nodes and run operations
    Permission.MODIFY_NODE,
    Permission.VIEW_NODE,
    Permission.DEPLOY_PAYLOAD,
    Permission.EXECUTE_STRIKE,
    Permission.CANCEL_OPERATION,
    Permission.VIEW_WARFARE,
    Permission.RUN_ANALYSIS,
    Permission.VIEW_ANALYSIS,
    Permission.EXPORT_ANALYSIS,
    Permission.CONTROL_THRONE,
    Permission.VIEW_THRONE_STATS,
    Permission.MANAGE_QUEUE,
    Permission.VIEW_LOGS,
  ],

  [Role.OBSERVER]: [
    // Read-only access
    Permission.VIEW_NODE,
    Permission.VIEW_WARFARE,
    Permission.VIEW_ANALYSIS,
    Permission.VIEW_THRONE_STATS,
    Permission.VIEW_LOGS,
  ],
};

/**
 * Check if role has permission
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if role has any of the given permissions
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(perm => hasPermission(role, perm));
}

/**
 * Check if role has all of the given permissions
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(perm => hasPermission(role, perm));
}

/**
 * Get all permissions for a role
 */
export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * User with role and resonance verification
 */
export interface RBACUser {
  id: string;
  name: string;
  role: Role;
  resonance: number; // Harmonic resonance (1.667 = Harmony Ridge)
  verified: boolean;
  createdAt: Date;
}

/**
 * Verify user resonance (must be >= 1.667 for Harmony Ridge)
 */
export function verifyResonance(resonance: number): boolean {
  const HARMONY_RIDGE = 1.667;
  return resonance >= HARMONY_RIDGE;
}

/**
 * Create new RBAC user
 */
export function createRBACUser(
  id: string,
  name: string,
  role: Role,
  resonance: number
): RBACUser {
  const verified = verifyResonance(resonance);

  if (!verified) {
    console.warn(`⚠️  User ${name} resonance (${resonance}) below Harmony Ridge (1.667)`);
  }

  return {
    id,
    name,
    role,
    resonance,
    verified,
    createdAt: new Date(),
  };
}

/**
 * Promote user to higher role
 */
export function promoteUser(user: RBACUser, newRole: Role): RBACUser {
  const roleHierarchy = [Role.OBSERVER, Role.FIXER, Role.COMMANDER];
  const currentIndex = roleHierarchy.indexOf(user.role);
  const newIndex = roleHierarchy.indexOf(newRole);

  if (newIndex <= currentIndex) {
    throw new Error(`Cannot promote to lower or equal role`);
  }

  return { ...user, role: newRole };
}

/**
 * Check if user can perform action
 */
export function canPerformAction(user: RBACUser, permission: Permission): boolean {
  if (!user.verified) {
    console.warn(`⚠️  Unverified user ${user.name} attempting action: ${permission}`);
    return false;
  }

  return hasPermission(user.role, permission);
}

/**
 * Audit log entry
 */
export interface AuditLogEntry {
  userId: string;
  userName: string;
  action: string;
  permission: Permission;
  allowed: boolean;
  timestamp: Date;
  details?: Record<string, unknown>;
}

/**
 * Create audit log entry
 */
export function createAuditLog(
  user: RBACUser,
  permission: Permission,
  action: string,
  allowed: boolean,
  details?: Record<string, unknown>
): AuditLogEntry {
  return {
    userId: user.id,
    userName: user.name,
    action,
    permission,
    allowed,
    timestamp: new Date(),
    details,
  };
}

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [Role.COMMANDER]: "Full system access. Can deploy payloads, manage nodes, and control throne operations.",
  [Role.FIXER]: "Can modify nodes and run warfare operations. Read access to analysis and logs.",
  [Role.OBSERVER]: "Read-only access to warfare data, analysis, and throne statistics.",
};

/**
 * Permission descriptions
 */
export const PERMISSION_DESCRIPTIONS: Record<Permission, string> = {
  [Permission.CREATE_NODE]: "Create new network nodes",
  [Permission.DELETE_NODE]: "Delete existing nodes",
  [Permission.MODIFY_NODE]: "Modify node parameters",
  [Permission.VIEW_NODE]: "View node information",
  [Permission.DEPLOY_PAYLOAD]: "Deploy warfare payloads",
  [Permission.EXECUTE_STRIKE]: "Execute kinetic strikes",
  [Permission.CANCEL_OPERATION]: "Cancel ongoing operations",
  [Permission.VIEW_WARFARE]: "View warfare operations",
  [Permission.RUN_ANALYSIS]: "Run Lambda analysis",
  [Permission.VIEW_ANALYSIS]: "View analysis results",
  [Permission.EXPORT_ANALYSIS]: "Export analysis data",
  [Permission.CONTROL_THRONE]: "Control Digital Throne",
  [Permission.VIEW_THRONE_STATS]: "View Throne statistics",
  [Permission.MANAGE_QUEUE]: "Manage processing queue",
  [Permission.MANAGE_USERS]: "Manage user accounts",
  [Permission.MANAGE_ROLES]: "Manage user roles",
  [Permission.VIEW_LOGS]: "View system logs",
  [Permission.SYSTEM_CONFIG]: "Configure system settings",
};
