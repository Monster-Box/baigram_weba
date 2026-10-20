import { ACCOUNT_SLOT } from './multiaccount';

export const SERVER_CONFIG_STORAGE_KEY = 'baigram_server_config';
export const SERVER_LOOKUP_URL = 'https://server-worker.pages.dev/getserver';

const REQUEST_TIMEOUT_MS = 10000;

export function getServerConfigStorageKey(slot = ACCOUNT_SLOT) {
  return slot && slot !== 1 ? `${SERVER_CONFIG_STORAGE_KEY}_${slot}` : SERVER_CONFIG_STORAGE_KEY;
}

export type ServerConfig = {
  id: string;
  ip: string;
  port: number;
  wsIp?: string;
  wsPort?: number;
  name?: string;
  pubkey?: string;
};

type ServerLookupResponse = {
  code?: number;
  msg?: string;
  query?: string;
  ip?: string;
  port?: number;
  ws_ip?: string;
  ws_port?: number;
  name?: string;
  pubkey?: string;
};

export function isValidServerConfig(config?: Partial<ServerConfig>): config is ServerConfig {
  return Boolean(config)
    && typeof config.id === 'string' && config.id.length > 0
    && typeof config.ip === 'string' && config.ip.length > 0
    && typeof config.port === 'number' && Number.isFinite(config.port)
    && config.port > 0 && config.port < 65536;
}

export function readServerConfig(slot?: number): ServerConfig | undefined {
  try {
    const raw = localStorage.getItem(getServerConfigStorageKey(slot));
    if (!raw) {
      return undefined;
    }
    const config = JSON.parse(raw) as Partial<ServerConfig>;
    return isValidServerConfig(config) ? config : undefined;
  } catch {
    return undefined;
  }
}

export function saveServerConfig(config: ServerConfig, slot?: number): boolean {
  try {
    localStorage.setItem(getServerConfigStorageKey(slot), JSON.stringify(config));
    return true;
  } catch {
    return false;
  }
}

export function clearServerConfig(slot?: number) {
  try {
    localStorage.removeItem(getServerConfigStorageKey(slot));
  } catch {
    // Storage can be unavailable in private mode; there is nothing to clear then
  }
}

export async function requestServerConfig(input: string): Promise<ServerConfig> {
  const query = input.trim();
  if (!query) {
    throw new Error('Please enter a server ID');
  }

  const url = /^https?:\/\//i.test(query)
    ? query
    : `${SERVER_LOOKUP_URL}?id=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      credentials: 'omit',
      cache: 'no-store',
    });
    const data = await response.json() as ServerLookupResponse;

    if (typeof data.code === 'number' && data.code !== 0) {
      throw new Error(data.msg || 'Server error');
    }

    const config: ServerConfig = {
      id: data.query || query,
      ip: data.ip || '',
      port: Number(data.port) || 0,
      wsIp: data.ws_ip || undefined,
      wsPort: data.ws_port ? Number(data.ws_port) : undefined,
      name: data.name || undefined,
      pubkey: data.pubkey || undefined,
    };
    if (!isValidServerConfig(config)) {
      throw new Error('Invalid server response');
    }

    return config;
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new Error('Connection timed out', { cause: err });
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
