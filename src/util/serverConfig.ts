import { configureServerLinks } from '../config';
import { ACCOUNT_SLOT } from './multiaccount';

export const SERVER_CONFIG_STORAGE_KEY = 'baigram_server_config';
export const SERVER_LOOKUP_URL = 'https://server-worker.pages.dev/getserver';

const REQUEST_TIMEOUT_MS = 10000;

let serverIconRequest: Promise<ServerConfig | undefined> | undefined;

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
  dflink?: string;
  deeplink?: string;
  icon?: string;
  iconLight?: string;
  iconDark?: string;
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
  dflink?: string;
  deeplink?: string;
  systray_light?: string;
  systray_dark?: string;
  icon?: string;
  icon_url?: string;
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
      dflink: data.dflink || undefined,
      deeplink: data.deeplink || undefined,
      iconLight: data.systray_light || undefined,
      iconDark: data.systray_dark || undefined,
      icon: data.icon || data.icon_url || undefined,
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

export function resolveServerIconUrl(config: ServerConfig): string | undefined {
  const icon = config.iconLight || config.iconDark || config.icon;
  if (!icon) return undefined;

  try {
    const url = new URL(icon, globalThis.location.href);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.toString();
    }
  } catch {
    // data url fallback
  }

  return icon.startsWith('data:image/') ? icon : undefined;
}

export function applyServerFavicon(config = readServerConfig()) {
  const iconUrl = config && resolveServerIconUrl(config);
  if (!iconUrl) return;

  document.querySelectorAll('link[rel~="icon"]').forEach((link) => {
    link.remove();
  });

  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = iconUrl;
  document.head.appendChild(link);
}

export function applyServerLinks(config = readServerConfig()) {
  configureServerLinks(config?.dflink, config?.deeplink);
}

export function ensureServerIcon(): Promise<ServerConfig | undefined> {
  const storedConfig = readServerConfig();
  if (!storedConfig || (storedConfig.iconLight && storedConfig.dflink && storedConfig.deeplink)) {
    return Promise.resolve(storedConfig);
  }

  serverIconRequest ??= requestServerConfig(storedConfig.id)
    .then((freshConfig) => {
      if (!freshConfig.iconLight && !freshConfig.iconDark && !freshConfig.dflink && !freshConfig.deeplink) {
        return storedConfig;
      }

      const updatedConfig: ServerConfig = {
        ...storedConfig,
        dflink: freshConfig.dflink || storedConfig.dflink,
        deeplink: freshConfig.deeplink || storedConfig.deeplink,
        icon: undefined,
        iconLight: freshConfig.iconLight,
        iconDark: freshConfig.iconDark,
      };
      saveServerConfig(updatedConfig);
      applyServerLinks(updatedConfig);
      applyServerFavicon(updatedConfig);
      return updatedConfig;
    })
    .catch(() => storedConfig)
    .finally(() => {
      serverIconRequest = undefined;
    });

  return serverIconRequest;
}
