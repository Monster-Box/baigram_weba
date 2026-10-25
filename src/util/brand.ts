import { APP_BRAND } from '../config';

const BRAND_RE = /Telegram/g;

// fix: remote lang packs still ship Telegram - 统一洗成品牌名
export default function brandify(value: string) {
  return value.replace(BRAND_RE, APP_BRAND);
}
