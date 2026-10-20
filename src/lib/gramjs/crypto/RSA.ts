import { concat } from '../../../util/encoding/buffer';

import {
  generateRandomBytes,
  modExp,
  readBigIntFromBuffer,
  readBufferFromBigInt,
  sha1,
} from '../Helpers';

export const SERVER_KEYS = [
  {
    fingerprint: BigInt('-3414540481677951611'),
    n: BigInt(
      '2937959817066933702298617714945612856538843112005886376816255642404751219133084745514657634448776440866'
      + '1701890505066208632169112269581063774293102577308490531282748465986139880977280302242772832972539403531'
      + '3160108704012876427630091361567343395380424193887227773571344877461690935390938502512438971889287359033'
      + '8945177273024525306296338410881284207988753897636046529094613963869149149606209957083647645485599631919'
      + '2747663615955633778034897140982517446405334423701359108810182097749467210509584293428076654573384828809'
      + '574217079944388301239431309115013843331317877374435868468779972014486325557807783825502498215169806323',
    ),
    e: 65537,
  },
  {
    fingerprint: BigInt('-5595554452916591101'),
    n: BigInt(
      '2534288944884041556497168959071347320689884775908477905258202659454602246385394058588521595116849196570'
      + '8222649399180603818074200620463776135424884632162512403163793083921641631564740959529419359595852941166'
      + '8489405859523376133330223960965841179548922160312292373029437018775884567383353986024616752250817918203'
      + '9315375750495263623495132323782003654358104782690612092797248736680529211579223142368426126233039432475'
      + '0785450942589751755390156647751460719351439969059949569615302809050721500330239005077889855323917509948'
      + '255722081644689442127297605422579707142646660768825302832201908302295573257427896031830742328565032949',
    ),
    e: 65537,
  },
].reduce((acc, { fingerprint, ...keyInfo }) => {
  acc.set(fingerprint, keyInfo);
  return acc;
}, new Map<bigint, { n: bigint; e: number }>());

export type ParsedServerKey = {
  n: bigint;
  e: number;
};

type DerElement = {
  tag: number;
  contentStart: number;
  end: number;
};

function readDerElement(bytes: Uint8Array, offset: number): DerElement | undefined {
  if (offset + 2 > bytes.length) {
    return undefined;
  }
  const tag = bytes[offset];
  let cursor = offset + 1;
  let length = bytes[cursor++];
  if (length & 0x80) {
    const lengthBytes = length & 0x7f;
    if (!lengthBytes || lengthBytes > 4 || cursor + lengthBytes > bytes.length) {
      return undefined;
    }
    length = 0;
    for (let i = 0; i < lengthBytes; i++) {
      length = (length << 8) | bytes[cursor++];
    }
  }
  if (cursor + length > bytes.length) {
    return undefined;
  }
  return { tag, contentStart: cursor, end: cursor + length };
}

function readDerInteger(bytes: Uint8Array, element: DerElement) {
  if (element.tag !== 0x02) {
    return undefined;
  }
  let start = element.contentStart;
  while (start < element.end && bytes[start] === 0) {
    start++;
  }
  let value = 0n;
  for (let i = start; i < element.end; i++) {
    value = (value << 8n) | BigInt(bytes[i]);
  }
  return value;
}

function parsePkcs1PublicKey(bytes: Uint8Array): ParsedServerKey | undefined {
  const sequence = readDerElement(bytes, 0);
  if (!sequence || sequence.tag !== 0x30) {
    return undefined;
  }
  const modulusElement = readDerElement(bytes, sequence.contentStart);
  if (!modulusElement) {
    return undefined;
  }
  const modulus = readDerInteger(bytes, modulusElement);
  const exponentElement = readDerElement(bytes, modulusElement.end);
  if (modulus === undefined || !exponentElement) {
    return undefined;
  }
  const exponent = readDerInteger(bytes, exponentElement);
  if (!modulus || !exponent) {
    return undefined;
  }
  return { n: modulus, e: Number(exponent) };
}

function parseSpkiPublicKey(bytes: Uint8Array): ParsedServerKey | undefined {
  const sequence = readDerElement(bytes, 0);
  if (!sequence || sequence.tag !== 0x30) {
    return undefined;
  }
  const algorithm = readDerElement(bytes, sequence.contentStart);
  if (!algorithm || algorithm.tag !== 0x30) {
    return undefined;
  }
  const bitString = readDerElement(bytes, algorithm.end);
  if (!bitString || bitString.tag !== 0x03 || bitString.end !== sequence.end) {
    return undefined;
  }
  // A BIT STRING's first content byte counts unused bits
  return parsePkcs1PublicKey(bytes.subarray(bitString.contentStart + 1, bitString.end));
}

function pemToDer(pem: string): Uint8Array | undefined {
  const match = /-----BEGIN (?:RSA )?PUBLIC KEY-----([\s\S]*?)-----END (?:RSA )?PUBLIC KEY-----/.exec(pem);
  if (!match) {
    return undefined;
  }
  try {
    const binary = atob(match[1].replace(/\s+/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return undefined;
  }
}

export function parseServerPublicKey(pem: string): ParsedServerKey | undefined {
  const der = pemToDer(pem);
  if (!der) {
    return undefined;
  }
  const sequence = readDerElement(der, 0);
  if (!sequence || sequence.tag !== 0x30) {
    return undefined;
  }
  const firstChild = readDerElement(der, sequence.contentStart);
  return firstChild?.tag === 0x30 ? parseSpkiPublicKey(der) : parsePkcs1PublicKey(der);
}

function toBigEndianBytes(value: bigint) {
  return readBufferFromBigInt(value, Math.ceil(value.toString(2).length / 8), false);
}

function serializeBytes(bytes: Uint8Array) {
  const isLong = bytes.length > 253;
  const headerLength = isLong ? 4 : 1;
  const paddedLength = (headerLength + bytes.length + 3) & ~3;
  const result = new Uint8Array(paddedLength);
  if (isLong) {
    result[0] = 254;
    result[1] = bytes.length & 0xff;
    result[2] = (bytes.length >> 8) & 0xff;
    result[3] = (bytes.length >> 16) & 0xff;
  } else {
    result[0] = bytes.length;
  }
  result.set(bytes, headerLength);
  return result;
}

async function computeFingerprint(key: ParsedServerKey) {
  const data = concat(
    serializeBytes(toBigEndianBytes(key.n)),
    serializeBytes(toBigEndianBytes(BigInt(key.e))),
  );
  const hash = await sha1(data);
  let fingerprint = 0n;
  for (let i = 19; i >= 12; i--) {
    fingerprint = (fingerprint << 8n) | BigInt(hash[i]);
  }
  return fingerprint >= (1n << 63n) ? fingerprint - (1n << 64n) : fingerprint;
}

export async function addServerPublicKey(pem: string): Promise<boolean> {
  const key = parseServerPublicKey(pem);
  if (!key) {
    return false;
  }
  SERVER_KEYS.set(await computeFingerprint(key), key);
  return true;
}

/**
 * Encrypts the given data known the fingerprint to be used
 * in the way Telegram requires us to do so (sha1(data) + data + padding)

 * @param fingerprint the fingerprint of the RSA key.
 * @param data the data to be encrypted.
 * @returns the cipher text, or undefined if no key matching this fingerprint is found.
 */
export async function encrypt(fingerprint: bigint, data: Uint8Array): Promise<Uint8Array | undefined> {
  const key = SERVER_KEYS.get(fingerprint);
  if (!key) {
    return undefined;
  }

  // len(sha1.digest) is always 20, so we're left with 255 - 20 - x padding
  const rand = generateRandomBytes(235 - data.length);

  const toEncrypt = concat(await sha1(data), data, rand);

  // rsa module rsa.encrypt adds 11 bits for padding which we don't want
  // rsa module uses rsa.transform.bytes2int(to_encrypt), easier way:
  const payload = readBigIntFromBuffer(toEncrypt, false);
  const encrypted = modExp(payload, BigInt(key.e), key.n);
  // rsa module uses transform.int2bytes(encrypted, keylength), easier:
  return readBufferFromBigInt(encrypted, 256, false);
}
