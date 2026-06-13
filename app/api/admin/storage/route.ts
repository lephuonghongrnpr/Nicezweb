import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getStorageMode,
  getStorageSetupHint,
  getBlobToken,
  isVercelRuntime,
} from "@/lib/blob-storage";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    mode: getStorageMode(),
    vercel: isVercelRuntime(),
    hasBlobToken: Boolean(getBlobToken()),
    hasStoreId: Boolean(process.env.BLOB_STORE_ID?.trim()),
    setupHint: getStorageSetupHint(),
  });
}
