# INSTRUKSI KERJA UNTUK AI MODEL - Dapoer Mama Ami Website
> Dokumen ini dibuat untuk model AI murah / kecil / low-cost (contoh: GPT-3.5, Claude Haiku, Gemini Flash, Llama 3 8B) agar paham tugas tanpa halusinasi.

## 1. APA PROJECTNYA?
Buat website UMKM vegan: **Dapoer Mama Ami**.
Jualan: Bacang, Rendang Vegetarian, Sapi Lada Hitam Vegetarian, Ayam Kuluyuk, Mooncake, Nasi Box.
Sistem: PO (Pre-Order) saja, tidak ready stock.
Lokasi: Binong, Banten.
Brand: Hangat, keluarga, tradisi Chinese-Indonesian tapi 100% tumbuhan.

## 2. TECH STACK WAJIB
- Framework: **Next.js 15 App Router** (TypeScript)
- Styling: **Tailwind CSS** saja. Jangan pakai CSS module lain.
- UI: **shadcn/ui** (hanya Button, Card, Badge, Dialog)
- Gallery: **CSS columns** saja (jangan pakai library masonry berat)
- Blog: **File MDX di folder /content/blog** (jangan pakai database)
- Image: **next/image** untuk semua foto
- Deploy: Vercel-ready

## 3. TUGAS UTAMA (3 HALAMAN)
Kamu hanya buat 3 halaman. Jangan buat yang lain.

### Halaman A: Landing Page (/)
- Navbar minimal: Logo text "DAPOER MAMA AMI" + link Produk, Galeri, Blog + tombol WhatsApp
- Hero: Judul "Bacang & Rendang Vegetarian Autentik." + 1 kalimat deskripsi + 1 tombol WhatsApp. Kanan: 1 foto besar bacang.
- Produk: Grid 3 kolom, 6 card (Bacang Best Seller, Rendang, Sapi Lada Hitam, Ayam Kuluyuk, Mooncake, Nasi Box)
- Jadwal Festival: List vertical sederhana (Imlek, Ce It, Duan Wu Jie Juni - highlight, Mooncake)
- Testimoni: 1 quote besar di tengah
- Footer minimal

### Halaman B: Galeri (/galeri) - INI YANG PALING PENTING
**Jangan buat grid rapih 3x3. Harus TIDAK RAPIH agar unik.**

Cara buat tidak rapih:
1. Gunakan CSS `columns: 3` tapi setiap item punya tinggi beda-beda (random).
2. Beberapa item dibuat LEBIH BESAR (span 2x).
3. Beberapa item diberi ROTASI kecil (rotate-1, -rotate-1, rotate-2).
4. Beberapa item diberi border style beda (ada yang tebal, ada yang tipis).
5. Susunan tidak simetris, biar terlihat seperti ditempel manual / scrapbook.

Contoh class yang harus dipakai:
- Item 1: `h-[320px] rotate-[-1deg]`
- Item 2: `h-[420px] rotate-[1deg]`
- Item 3: `h-[280px] rotate-[0.5deg]` + `border-2`
- Item 4: `h-[500px] -rotate-[1.5deg]` (ini jadi hero di galeri)
- Item 5: `h-[350px]`
- Ulangi pola acak.

Filter: Tombol di atas galeri: All, Bacang, Rendang, Mooncake, Nasi Box. Klik filter hanya show/hide dengan state React sederhana (useState).

Lightbox: Klik foto -> buka Dialog (shadcn) dengan foto besar + judul.

Data foto: Buat file `/data/gallery.ts` dengan array 12 foto (pakai unsplash placeholder dulu):
```ts
{ id: 1, src: "/images/bacang.jpg", title: "Bacang Bangka Daun Pandan", category: "Bacang", height: "tall" }
```

### Halaman C: Blog (/blog dan /blog/[slug])
- /blog: Grid 3 kolom card artikel (cover, kategori, judul, tanggal)
- /blog/[slug]: Baca file .mdx dari /content/blog
- Buat 3 file dummy dulu:
  - `apa-itu-ce-it.mdx`
  - `manfaat-vegetarian-keluarga.mdx`
  - `resep-bacang-vegan-sederhana.mdx`
- Format MDX:
```md
---
title: "Apa itu Ce It?"
date: "2026-03-10"
category: "Edukasi Festival"
cover: "/images/blog1.jpg"
---
Isi artikel minimal 3 paragraf, bahasa Indonesia hangat.
```

## 4. DESAIN RULES (ANTI GAGAL)
- Background: Putih #FFFFFF saja
- Text: Hitam #111827, abu #6B7280
- Accent: Hijau #1F4D3A untuk tombol saja
- Font: Inter (Google Fonts) saja
- Max width konten: 1120px, tengah
- Padding section: py-20 atau py-28
- Jangan pakai animasi berat, gradient, shadow tebal
- Semua card: border 1px #E5E7EB, rounded 16px

## 5. STRUKTUR FOLDER YANG HARUS KAMU BUAT
```
/app
  /page.tsx (landing)
  /galeri/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
/components
  /Navbar.tsx
  /MasonryGallery.tsx (yang tidak rapih)
  /BlogCard.tsx
/data
  /gallery.ts
/content/blog
  /apa-itu-ce-it.mdx
  /manfaat-vegetarian-keluarga.mdx
  /resep-bacang-vegan-sederhana.mdx
/public/images (placeholder)
```

## 6. LANGKAH KERJA UNTUK MODEL MURAH (KERJAKAN SATU PER SATU)
Jangan kerjakan semua sekaligus. Kerjakan urut:

Langkah 1: Buat Next.js project + Tailwind + shadcn Button
Langkah 2: Buat /app/page.tsx landing (copy paste dari instruksi Halaman A)
Langkah 3: Buat /data/gallery.ts dengan 12 data
Langkah 4: Buat /components/MasonryGallery.tsx dengan layout TIDAK RAPIH (paling penting)
Langkah 5: Buat /app/galeri/page.tsx yang pakai MasonryGallery
Langkah 6: Buat /content/blog dengan 3 file MDX
Langkah 7: Buat /app/blog/page.tsx
Langkah 8: Buat /app/blog/[slug]/page.tsx

Setiap langkah selesai, cek `npm run dev` tidak error.

## 7. CONTOH CODE GALERI TIDAK RAPIH (COPY PASTE INI)
```tsx
// app/galeri/page.tsx
"use client"
import { useState } from "react"
import { galleryData } from "@/data/gallery"

export default function GaleriPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? galleryData : galleryData.filter(i => i.category === filter)
  
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-20">
      <div className="flex gap-2 mb-8">
        {["All","Bacang","Rendang","Mooncake"].map(c => (
          <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-1.5 rounded-full text-xs border ${filter===c ? 'bg-[#1F4D3A] text-white' : 'bg-white'}`}>{c}</button>
        ))}
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, idx) => (
          <div key={item.id} 
            className={`
              break-inside-avoid border border-[#E5E7EB] rounded-[16px] overflow-hidden bg-white
              ${idx % 4 === 0 ? 'h-[320px] -rotate-[1deg]' : ''}
              ${idx % 4 === 1 ? 'h-[420px] rotate-[1deg]' : ''}
              ${idx % 4 === 2 ? 'h-[280px] rotate-[0.5deg] border-2' : ''}
              ${idx % 4 === 3 ? 'h-[500px] -rotate-[1deg]' : ''}
            `}
          >
            <img src={item.src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 8. YANG TIDAK BOLEH DILAKUKAN
- JANGAN pakai library masonry lain selain CSS columns
- JANGAN buat grid rapih sempurna (harus acak tinggi + rotasi)
- JANGAN pakai database, pakai file MDX saja
- JANGAN pakai warna merah / gold / banyak warna
- JANGAN buat halaman admin

## 9. CEK AKHIR (ACCEPTANCE)
- npm run dev jalan tanpa error
- /galeri terlihat TIDAK RAPIH (ada yang miring, tinggi beda)
- Filter galeri berfungsi
- /blog list muncul 3 artikel
- /blog/[slug] bisa dibuka
- Tombol WhatsApp link ke wa.me

SELESAI. Jika semua cek hijau, project siap di-push ke GitHub untuk portfolio.
