export const APP_NAME = 'end-to-end-company-products';

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV !== 'production',
} as const;
