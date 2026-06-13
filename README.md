# XML UPDATE Gallery

เว็บแกลเลอรีแบบ dark theme สำหรับ showcase สินค้า/คอนเทนต์ XML UPDATE — สร้างด้วย Next.js 15 + Tailwind CSS

## เริ่มต้นใช้งาน (Local)

### 1. ติดตั้ง Node.js

ดาวน์โหลดและติดตั้ง [Node.js LTS](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป)

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. รัน dev server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### 4. Build production

```bash
npm run build
npm start
```

## Deploy บน Vercel

ตั้ง environment variable บน Vercel (Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

ใช้สำหรับ Open Graph URL, robots.txt และ sitemap

### วิธีที่ 1: ผ่าน GitHub (แนะนำ)

1. สร้าง repository บน GitHub
2. Push โปรเจกต์ขึ้น GitHub:

```bash
git init
git add .
git commit -m "Initial commit: XML UPDATE gallery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. ไปที่ [vercel.com](https://vercel.com) → **Add New Project**
4. Import repository จาก GitHub
5. Vercel จะ detect เป็น Next.js อัตโนมัติ → กด **Deploy**
6. ทุกครั้งที่ push ขึ้น GitHub จะ auto-deploy

### วิธีที่ 2: ผ่าน Vercel CLI

```bash
npm i -g vercel
vercel
```

## แก้ไขเนื้อหา

| สิ่งที่ต้องการแก้ | ไฟล์ |
|------------------|------|
| ข้อความ, ราคา, ชื่อโปรไฟล์ | `lib/data.ts` (`captionShort`, `captionFull`) |
| รูป/วิดีโอในกริด | แทนที่ไฟล์ใน `public/placeholders/` แล้วอัปเดต path ใน `lib/data.ts` |
| โลโก้ | `public/logo.svg` |

### เพิ่มวิดีโอ

สำหรับรายการ `type: "video"` ให้ใส่ไฟล์ `.mp4` หรือ `.webm` ใน `public/` แล้วกำหนด `videoSrc`:

```ts
{
  id: "1",
  type: "video",
  src: "/placeholders/item-1.jpg",      // poster/thumbnail
  videoSrc: "/videos/showcase-1.mp4",   // ไฟล์วิดีโอจริง
  alt: "คำอธิบาย",
}
```

ถ้าไม่มี `videoSrc` lightbox จะแสดงรูป poster แทน

### เพิ่มรายการใหม่

เพิ่ม object ใน array `mediaItems` ใน `lib/data.ts`:

```ts
{ id: "13", type: "image", src: "/placeholders/item-13.jpg", alt: "คำอธิบาย" }
```

## โครงสร้างโปรเจกต์

```
app/           → หน้าเว็บ (layout, page, styles)
components/    → Navbar, MediaGrid, MediaCard, MediaLightbox, ProfileOverlay
lib/data.ts    → ข้อมูลคงที่ทั้งหมด
public/        → รูปภาพ, โลโก้, placeholder
```

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **lucide-react** (icons)
- **TypeScript**
