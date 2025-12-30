/**
 * Error Handling & Logging Service
 * Centralized error tracking and monitoring
 */

export interface ErrorLog {
  timestamp: Date;
  level: "error" | "warning" | "info";
  message: string;
  path?: string;
  userId?: number;
  metadata?: Record<string, any>;
}

const errorLogs: ErrorLog[] = [];

export function logError(
  message: string,
  level: "error" | "warning" | "info" = "error",
  metadata?: Record<string, any>
) {
  const log: ErrorLog = {
    timestamp: new Date(),
    level,
    message,
    metadata,
  };

  errorLogs.push(log);

  // Keep only last 1000 logs in memory
  if (errorLogs.length > 1000) {
    errorLogs.shift();
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[${level.toUpperCase()}] ${message}`, metadata);
  }
}

export function logRouteError(path: string, userId?: number, metadata?: Record<string, any>) {
  logError(`Undefined route accessed: ${path}`, "warning", {
    path,
    userId,
    ...metadata,
  });
}

export function getErrorLogs(limit: number = 100): ErrorLog[] {
  return errorLogs.slice(-limit);
}

export function getErrorStats() {
  const errors = errorLogs.filter((log) => log.level === "error").length;
  const warnings = errorLogs.filter((log) => log.level === "warning").length;
  const infos = errorLogs.filter((log) => log.level === "info").length;

  return { errors, warnings, infos, total: errorLogs.length };
}
