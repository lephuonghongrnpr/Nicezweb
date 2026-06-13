import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  getSessionCookieOptions,
  getSessionToken,
  verifyAdminPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured" },
      { status: 500 },
    );
  }

  const { password } = (await request.json()) as { password?: string };

  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }

  const token = getSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Auth configuration error" }, { status: 500 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, getSessionCookieOptions());

  return NextResponse.json({ ok: true });
}
