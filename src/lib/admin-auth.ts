import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

type AdminTokenPayload = {
  sub: number;
  username: string;
  exp: number;
};

const defaultSecret = "colloque-admin-dev-secret-change-me";

function getSecret() {
  return process.env.ADMIN_AUTH_SECRET || defaultSecret;
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function signValue(value: string) {
  return base64UrlEncode(createHmac("sha256", getSecret()).update(value).digest());
}

export function createAdminToken(payload: Omit<AdminTokenPayload, "exp">) {
  const tokenPayload: AdminTokenPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  return `${encodedPayload}.${signValue(encodedPayload)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);
  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminTokenPayload;

    if (!payload.sub || !payload.username || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function ensureDefaultAdmin() {
  const usersCount = await prisma.adminUser.count();

  if (usersCount > 0) {
    return;
  }

  await prisma.adminUser.create({
    data: {
      username: "admin",
      fullName: "Administrateur",
      passwordHash: await bcrypt.hash("admin", 12),
      role: "super-admin",
    },
  });
}

export async function getCurrentAdminUser() {
  const cookieStore = await cookies();
  const payload = verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  if (!payload) {
    return null;
  }

  const user = await prisma.adminUser.findFirst({
    where: {
      id: payload.sub,
      username: payload.username,
      active: true,
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
      active: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  return user;
}

export async function requireAdminApi() {
  const user = await getCurrentAdminUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Authentification admin requise." }, { status: 401 }),
    };
  }

  return { user, response: null };
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function hashAdminPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyAdminPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
