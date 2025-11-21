export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug: (msg: string, meta?: unknown) => void;
  info: (msg: string, meta?: unknown) => void;
  warn: (msg: string, meta?: unknown) => void;
  error: (msg: string, meta?: unknown) => void;
}

// Minimal console-based implementation.
// Other repos can wrap this (e.g. pino, Winston) but keep the same interface.
export const consoleLogger: Logger = {
  debug: (msg, meta) => console.debug(msg, meta ?? ''),
  info: (msg, meta) => console.info(msg, meta ?? ''),
  warn: (msg, meta) => console.warn(msg, meta ?? ''),
  error: (msg, meta) => console.error(msg, meta ?? ''),
};
