import { Redis } from "@upstash/redis";
import crypto from "node:crypto";
import type { ContactPayload } from "@/lib/contact-validation";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const OTP_TTL = 600;
const MAX_ATTEMPTS = 5;
const MAX_RESENDS = 3;

export interface OtpData {
  email: string;
  otpHash: string;
  expiresAt: number;
  lastSentAt: number;
  attemptCount: number;
  maxAttempts: number;
  resendCount: number;
  maxResends: number;
  consumed: boolean;
  contactPayload: ContactPayload;
}

function getRedis(): Redis {
  if (!redisUrl || !redisToken) {
    throw new Error(
      "Upstash Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local",
    );
  }
  return new Redis({ url: redisUrl, token: redisToken });
}

function generateVerificationId(): string {
  return crypto.randomBytes(32).toString("hex");
}

function generateOtp(): string {
  return String(crypto.randomInt(100000, 999999));
}

function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function getRedisKey(verificationId: string): string {
  return `otp:${verificationId}`;
}

export async function createOtp(
  contactPayload: ContactPayload,
): Promise<{ verificationId: string; otp: string }> {
  const redis = getRedis();
  const verificationId = generateVerificationId();
  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const now = Date.now();

  const otpData: OtpData = {
    email: contactPayload.email,
    otpHash,
    expiresAt: now + OTP_TTL * 1000,
    lastSentAt: now,
    attemptCount: 0,
    maxAttempts: MAX_ATTEMPTS,
    resendCount: 0,
    maxResends: MAX_RESENDS,
    consumed: false,
    contactPayload,
  };

  await redis.set(getRedisKey(verificationId), JSON.stringify(otpData), {
    ex: OTP_TTL,
  });

  return { verificationId, otp };
}

export async function verifyOtp(
  verificationId: string,
  otp: string,
): Promise<{ valid: boolean; error?: string; contactPayload?: ContactPayload }> {
  const redis = getRedis();
  const key = getRedisKey(verificationId);
  const raw = await redis.get<string>(key);

  if (!raw) {
    return { valid: false, error: "Verification code expired. Request a new code." };
  }

  let data: OtpData;
  try {
    data = JSON.parse(raw);
  } catch {
    return { valid: false, error: "Invalid verification data." };
  }

  if (data.consumed) {
    return { valid: false, error: "This verification code has already been used." };
  }

  if (Date.now() > data.expiresAt) {
    return { valid: false, error: "Verification code expired. Request a new code." };
  }

  if (data.attemptCount >= data.maxAttempts) {
    return { valid: false, error: "Too many attempts. Request a new code." };
  }

  data.attemptCount += 1;
  await redis.set(key, JSON.stringify(data), { ex: OTP_TTL });

  const otpHash = hashOtp(otp);
  if (!secureCompare(otpHash, data.otpHash)) {
    return { valid: false, error: "Incorrect verification code." };
  }

  data.consumed = true;
  await redis.set(key, JSON.stringify(data), { ex: OTP_TTL });

  return { valid: true, contactPayload: data.contactPayload };
}

export async function resendOtp(
  verificationId: string,
): Promise<{ success: boolean; otp?: string; email?: string; name?: string; error?: string }> {
  const redis = getRedis();
  const key = getRedisKey(verificationId);
  const raw = await redis.get<string>(key);

  if (!raw) {
    return { success: false, error: "Verification session expired. Please submit the form again." };
  }

  let data: OtpData;
  try {
    data = JSON.parse(raw);
  } catch {
    return { success: false, error: "Invalid verification data." };
  }

  if (data.consumed) {
    return { success: false, error: "This verification has already been completed." };
  }

  const now = Date.now();

  if (now - data.lastSentAt < 60000) {
    const remaining = Math.ceil((60000 - (now - data.lastSentAt)) / 1000);
    return { success: false, error: `Please wait ${remaining}s before resending.` };
  }

  if (data.resendCount >= data.maxResends) {
    return {
      success: false,
      error: "Maximum resend attempts reached. Please submit the form again.",
    };
  }

  const newOtp = generateOtp();
  const newOtpHash = hashOtp(newOtp);

  data.otpHash = newOtpHash;
  data.expiresAt = now + OTP_TTL * 1000;
  data.lastSentAt = now;
  data.attemptCount = 0;
  data.resendCount += 1;

  await redis.set(key, JSON.stringify(data), { ex: OTP_TTL });

  return { success: true, otp: newOtp, email: data.email, name: data.contactPayload.name };
}
