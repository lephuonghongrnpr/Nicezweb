import { get, list, put } from "@vercel/blob";

export const BLOB_MEDIA_KEY = "data/media.json";

type BlobAccess = "public" | "private";

export function getBlobToken(): string | undefined {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return token || undefined;
}

export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

export function isBlobStorageEnabled(): boolean {
  if (getBlobToken()) return true;
  if (process.env.BLOB_STORE_ID?.trim() && process.env.VERCEL_OIDC_TOKEN?.trim()) {
    return true;
  }
  return isVercelRuntime();
}

function blobAuthOptions() {
  const token = getBlobToken();
  if (token) {
    return { token };
  }
  return {};
}

function blobRequestOptions(access: BlobAccess = "public") {
  return {
    access,
    ...blobAuthOptions(),
  };
}

export function getStorageMode(): "blob" | "local" {
  return isBlobStorageEnabled() ? "blob" : "local";
}

export function getStorageSetupHint(): string | null {
  if (!isVercelRuntime()) return null;
  if (getBlobToken() || process.env.BLOB_STORE_ID?.trim()) return null;
  return "เชื่อม Blob Store ใน Vercel → Storage → Create Blob แล้ว Redeploy";
}

export async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, blobRequestOptions("public"));
    if (!result || result.statusCode === 404 || !result.stream) {
      return null;
    }

    const raw = await new Response(result.stream).text();
    return JSON.parse(raw) as T;
  } catch {
    // Fallback for older blobs saved at root path.
    try {
      const legacyKey = pathname.replace(/^data\//, "");
      const { blobs } = await list({ prefix: legacyKey, ...blobRequestOptions("public") });
      const blob = blobs.find((entry) => entry.pathname === legacyKey);
      if (!blob) return null;

      const res = await fetch(blob.url, { cache: "no-store" });
      if (!res.ok) return null;

      return (await res.json()) as T;
    } catch (error) {
      console.error("Failed to read blob:", error);
      return null;
    }
  }
}

export async function writeJsonBlob(pathname: string, payload: string): Promise<void> {
  const body = Buffer.from(payload, "utf-8");

  try {
    await put(pathname, body, {
      ...blobRequestOptions("public"),
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    // Retry legacy path if a root-level blob already exists.
    if (pathname.startsWith("data/")) {
      const legacyKey = pathname.replace(/^data\//, "");
      try {
        await put(legacyKey, body, {
          ...blobRequestOptions("public"),
          allowOverwrite: true,
          addRandomSuffix: false,
          contentType: "application/json",
        });
        return;
      } catch (legacyError) {
        const legacyMessage =
          legacyError instanceof Error ? legacyError.message : String(legacyError);
        throw new Error(`${message} | legacy: ${legacyMessage}`);
      }
    }

    throw error instanceof Error ? error : new Error(message);
  }
}

export function getBlobSaveErrorMessage(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  const setupHint = getStorageSetupHint();

  if (setupHint) return setupHint;
  if (msg.includes("Cannot save media without Blob")) {
    return "Vercel ต้องใช้ Blob Store — สร้างใน Storage แล้ว Redeploy";
  }
  if (/unauthorized|forbidden|401|403|invalid token/i.test(msg)) {
    return "Token Blob ไม่ถูกต้อง — ลบ BLOB_READ_WRITE_TOKEN แล้วสร้าง Blob Store ใหม่";
  }
  if (/store.*not found|BLOB_STORE|No store/i.test(msg)) {
    return "ยังไม่ได้เชื่อม Blob Store กับโปรเจกต์ — ไปที่ Vercel Storage แล้ว Connect";
  }

  return `บันทึกลง storage ไม่สำเร็จ (${msg.slice(0, 100)})`;
}

export async function uploadBlobFile(
  pathname: string,
  data: Buffer,
  contentType: string,
): Promise<string> {
  const blob = await put(pathname, data, {
    ...blobRequestOptions("public"),
    contentType,
  });
  return blob.url;
}
