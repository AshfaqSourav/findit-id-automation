// utils/getBaseUrl.js
import { config } from '../config/testConfig.js';

export function getBaseUrl() {
  const ENV = process.env.ENV?.trim() || 'FI_QA'; // includes fallback

  if (!config[ENV]) {
    throw new Error(`❌ Invalid ENV: '${ENV}'. Valid options are: ${Object.keys(config).join(', ')}`);
  }

  return config[ENV];
}
export function getOpsUrl() {
  const env = process.env.ENV?.trim();
  if (!env || !env.startsWith('FI_')) {
    throw new Error(`❌ Invalid FI ENV: '${env}'. Expected something like 'FI_QA' or 'FI_PROD'`);
  }

  const opsEnv = env.replace(/^FI_/, 'OPS_');
  const opsUrl = config[opsEnv];

  if (!opsUrl) {
    throw new Error(`❌ OPS URL not found for: ${opsEnv}`);
  }

  return opsUrl;
}

