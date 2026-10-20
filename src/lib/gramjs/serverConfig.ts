import { addServerPublicKey } from './crypto/RSA';

export const CUSTOM_SERVER_DC_ID = 2;

export type CustomServerConfig = {
  ip: string;
  port: number;
  wsIp?: string;
  wsPort?: number;
  pubkey?: string;
};

let customServerConfig: CustomServerConfig | undefined;

export async function setCustomServerConfig(config?: CustomServerConfig) {
  customServerConfig = config && config.ip && config.port > 0 ? config : undefined;

  if (customServerConfig?.pubkey && customServerConfig.pubkey !== 'NULL') {
    await addServerPublicKey(customServerConfig.pubkey);
  }
}

export function getCustomServerConfig() {
  return customServerConfig;
}

export function getCustomServerAddress(config: CustomServerConfig) {
  return {
    ip: config.wsIp || config.ip,
    port: config.wsPort || config.port,
  };
}
