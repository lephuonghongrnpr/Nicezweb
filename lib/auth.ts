import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

function getAdminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return session?.value === token;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export function getSessionToken(): string | null {
  return getAdminToken();
}

export function getSessionCookieOptions(maxAge = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}
