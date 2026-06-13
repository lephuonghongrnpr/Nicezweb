"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, LogOut, Plus, Trash2, Upload } from "lucide-react";
import { CATEGORIES, DEFAULT_CATEGORY_ID } from "@/lib/categories";
import type { MediaItem } from "@/lib/media";

function emptyItem(): MediaItem {
  return {
    id: Date.now().toString(36),
    type: "image",
    src: "/placeholders/item-2.svg",
    alt: "รายการใหม่",
    categoryId: DEFAULT_CATEGORY_ID,
  };
}

export default function AdminPanel() {
  const router = useRouter();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const loadItems = useCallback(async () => {
    const res = await fetch("/api/media");
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const saveItems = async (nextItems: MediaItem[]) => {
    setSaving(true);
    const res = await fetch("/api/media", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextItems),
    });

    if (res.ok) {
      setItems(await res.json());
      showMessage("บันทึกแล้ว");
      router.refresh();
    } else {
      showMessage("บันทึกไม่สำเร็จ");
    }
    setSaving(false);
  };

  const updateItem = (id: string, patch: Partial<MediaItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const handleUpload = async (id: string, file: File) => {
    setUploadingId(id);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/media/upload", { method: "POST", body: formData });

    if (!res.ok) {
      const data = await res.json();
      showMessage(data.error ?? "อัปโหลดไม่สำเร็จ");
      setUploadingId(null);
      return;
    }

    const { url, isVideo } = (await res.json()) as { url: string; isVideo: boolean };
    const nextItems = items.map((item) => {
      if (item.id !== id) return item;
      if (isVideo) {
        return { ...item, type: "video" as const, src: item.src, videoSrc: url };
      }
      return { ...item, type: "image" as const, src: url, videoSrc: undefined };
    });

    setItems(nextItems);
    await saveItems(nextItems);
    setUploadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ลบรายการนี้?")) return;
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    await saveItems(nextItems);
  };

  const handleAdd = async () => {
    const nextItems = [...items, emptyItem()];
    setItems(nextItems);
    await saveItems(nextItems);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-6 w-6 animate-spin text-white/60" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/95 px-4 py-3 backdrop-blur sm:px-6">
        <div>
          <h1 className="text-base font-semibold">Admin — จัดการรูปภาพ</h1>
          <p className="text-xs text-white/50">{items.length} รายการ</p>
        </div>
        <div className="flex items-center gap-2">
          {message && <span className="text-xs text-emerald-400">{message}</span>}
          {saving && <Loader2 className="h-4 w-4 animate-spin text-white/50" />}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
          >
            ดูเว็บ
            <ExternalLink className="h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
          >
            <LogOut className="h-3 w-3" />
            ออก
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <button
          type="button"
          onClick={handleAdd}
          className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          เพิ่มรายการ
        </button>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-white/10 bg-neutral-950 p-4 sm:flex-row"
            >
              <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-black sm:h-28 sm:w-28">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">#{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    ลบ
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[item.id] = el;
                    }}
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(item.id, file);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={uploadingId === item.id}
                    onClick={() => fileInputRefs.current[item.id]?.click()}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5 disabled:opacity-50"
                  >
                    {uploadingId === item.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    อัปโหลดรูป/วิดีโอ
                  </button>

                  <select
                    value={item.type}
                    onChange={(e) =>
                      updateItem(item.id, { type: e.target.value as MediaItem["type"] })
                    }
                    className="rounded-lg border border-white/10 bg-black px-3 py-1.5 text-xs outline-none"
                  >
                    <option value="image">รูปภาพ</option>
                    <option value="video">วิดีโอ</option>
                  </select>

                  <select
                    value={item.categoryId ?? DEFAULT_CATEGORY_ID}
                    onChange={(e) => updateItem(item.id, { categoryId: e.target.value })}
                    className="rounded-lg border border-white/10 bg-black px-3 py-1.5 text-xs outline-none"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-white/50">คำอธิบาย (alt)</label>
                  <input
                    type="text"
                    value={item.alt}
                    onChange={(e) => updateItem(item.id, { alt: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black px-3 py-1.5 text-sm outline-none focus:border-emerald-400/50"
                  />
                </div>

                {item.type === "video" && (
                  <div>
                    <label className="mb-1 block text-xs text-white/50">
                      URL วิดีโอ (videoSrc)
                    </label>
                    <input
                      type="text"
                      value={item.videoSrc ?? ""}
                      onChange={(e) => updateItem(item.id, { videoSrc: e.target.value || undefined })}
                      placeholder="/uploads/video.mp4"
                      className="w-full rounded-lg border border-white/10 bg-black px-3 py-1.5 text-sm outline-none focus:border-emerald-400/50"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs text-white/50">URL รูป (src)</label>
                  <input
                    type="text"
                    value={item.src}
                    onChange={(e) => updateItem(item.id, { src: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-black px-3 py-1.5 text-sm outline-none focus:border-emerald-400/50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-4 mt-6 flex justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={() => saveItems(items)}
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black shadow-lg hover:bg-white/90 disabled:opacity-50"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกทั้งหมด"}
          </button>
        </div>
      </div>
    </div>
  );
}
