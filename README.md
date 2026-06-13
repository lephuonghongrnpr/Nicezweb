# XML UPDATE Gallery

เว็บแกลเลอรีแบบ dark theme สำหรับ showcase สินค้า/คอนเทนต์ XML UPDATE — สร้างด้วย Next.js 15 + Tailwind CSS

## เริ่มต้นใช้งาน (Local)

### 1. ติดตั้ง Node.js

ดาวน์โหลดและติดตั้ง [Node.js LTS](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป)

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. ตั้งค่า environment (optional)

คัดลอก `.env.example` เป็น `.env.local` ถ้าต้องการตั้ง URL สำหรับ SEO:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. รัน dev server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### 5. Build production

```bash
npm run build
npm start
```

## Deploy บน Vercel

ตั้ง environment variable บน Vercel (Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

ใช้สำหรับ Open Graph URL, robots.txt, sitemap และหน้า admin

> **หมายเหตุ:** หน้า admin บันทึกข้อมูลลงไฟล์ (`data/media.json` + `public/uploads/`) จึงทำงานได้เต็มที่บน **local หรือ server ที่มี filesystem เขียนได้** (VPS, Railway, Docker) — บน Vercel serverless การบันทึกจะไม่ persist ระหว่าง deploy

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

## Admin — จัดการรูปภาพ

เปิด [http://localhost:3000/admin](http://localhost:3000/admin) แล้ว login ด้วยรหัสผ่าน **`123456`** (เปลี่ยนได้ใน `ADMIN_PASSWORD`)

**ทำได้:**
- อัปโหลดรูป/วิดีโอแทนที่รายการเดิม
- แก้คำอธิบาย (alt), ประเภท (รูป/วิดีโอ), URL
- เพิ่ม/ลบรายการ
- บันทึกแล้วหน้าแรกอัปเดตทันที

ไฟล์ที่ admin แก้:
| ไฟล์ | เนื้อหา |
|------|---------|
| `data/media.json` | รายการทั้งหมดในกริด |
| `public/uploads/` | รูป/วิดีโอที่อัปโหลดใหม่ |

## แก้ไขเนื้อหา (แบบ manual)

| สิ่งที่ต้องการแก้ | ไฟล์ |
|------------------|------|
| รูป/วิดีโอในกริด | ใช้ `/admin` หรือแก้ `data/media.json` โดยตรง |
| โลโก้ | `public/logo.svg` |

### เพิ่มวิดีโอ

สำหรับรายการ `type: "video"` อัปโหลดไฟล์ `.mp4`/`.webm` ผ่าน admin หรือกำหนด `videoSrc` ใน `data/media.json`:

```json
{
  "id": "1",
  "type": "video",
  "src": "/uploads/poster.jpg",
  "videoSrc": "/uploads/showcase-1.mp4",
  "alt": "คำอธิบาย"
}
```

ถ้าไม่มี `videoSrc` lightbox จะแสดงรูป poster แทน

### เพิ่มรายการใหม่

ใช้ปุ่ม **เพิ่มรายการ** ในหน้า admin หรือเพิ่ม object ใน `data/media.json`:

```json
{ "id": "13", "type": "image", "src": "/uploads/photo.jpg", "alt": "คำอธิบาย" }
```

## โครงสร้างโปรเจกต์

```
app/           → หน้าเว็บ + admin + API routes
components/    → MediaGrid, MediaCard, MediaLightbox, admin/
data/          → media.json (ข้อมูลกริด)
lib/           → media.ts
public/        → รูปภาพ, โลโก้, uploads/
```

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **lucide-react** (icons)
- **TypeScript**
