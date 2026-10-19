# Dapoer Mama Ami — Landing Page

Portfolio project: mengubah usaha Instagram-only UMKM vegan/vegetarian **Dapoer Mama Ami** (Binong, Tangerang) menjadi landing page satu halaman yang premium, hangat, dan conversion-focused — setiap section mengarahkan pengunjung ke **WhatsApp**.

> "Rasa Tradisi, 100% Tumbuhan" — Bacang & Rendang Vegetarian Autentik, Pre-Order only.

## Highlight Teknis

- **Single-page murni** — tanpa halaman lain; alur scroll: Hero → Trust Badges → Cerita → Produk → Kalender Festival → Testimoni → Cara Pesan → FAQ → Footer. Semua CTA = wa.me deep link dengan pesan terisi per konteks (tanya-tanya, pesan per produk, konsultasi nasi box, pengingat PO).
- **Countdown PO dinamis** — chip di Hero + badge di timeline festival menandai PO terbuka berikutnya (deadline akhir-hari WIB, offset-qualified, TZ-safe — diuji di UTC/Jakarta/Kiritimati).
- **Animasi daun pandan jatuh** — CSS-only, 7 daun deterministik (tanpa Math.random), hormat `prefers-reduced-motion`.
- **Scrapbook IG footer** — grid Instagram gaya polaroid miring ala ditempel manual, semua foto menaut ke profil IG.
- **Click-to-load Google Maps** — peta Baru saja dimuat hanya setelah diklik (Lighthouse-friendly).
- **A11y menyeluruh** — kontras AA terverifikasi hitung, focus-visible rings, keyboard-pausable carousel (WCAG 2.2.2), reduced-motion untuk semua animasi.
- **Next.js 16 cacheComponents-ready** — nol `Date` di render server; tahun copyright via komponen `"use cache"`.

## Stack

Next.js 16.4.2 (App Router, Turbopack) · Tailwind CSS v4 · motion · TypeScript · bun (runtime + test runner)

## Getting Started

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build
bun run start    # serve production build
bun test         # 10 unit tests (data layer)
bun run lint
```

## Mengganti Konten (untuk pemilik usaha / developer berikutnya)

| Apa | Di mana |
|---|---|
| Nomor WhatsApp | `lib/site.ts` → `waNumber` |
| Teks pesan WA per tombol | `lib/site.ts` → `waMessages` |
| Produk (nama/deskripsi/foto/min. order) | `lib/products.ts` |
| Jadwal festival & deadline PO | `lib/festivals.ts` (tanggal lunar — perbarui tiap tahun) |
| Testimoni / FAQ | `lib/testimonials.ts` / `lib/faqs.ts` |

### Mengganti gambar placeholder dengan foto asli

Seluruh gambar saat ini adalah placeholder berwarna. Letakkan foto asli (dari konten IG) di folder mana pun lalu jalankan:

```bash
# konversi batch ke webp (nama file sama dengan path di lib/products.ts & components)
bun scripts/generate-placeholder-images.mjs   # regenerasi placeholder (fallback)
```

Untuk foto asli: konversi ke `.webp` (≤200KB), simpan dengan nama & path yang sama seperti daftar di bawah — tanpa mengubah kode:

```
public/images/hero-bacang.webp        (1000×1250)
public/images/about-mama-ami.webp     (1200×900)
public/images/products/*.webp         (800×600, 6 file)
public/images/ig/*.webp               (400×400, 6 file)
public/og-image.png                   (1200×630, OG share)
```

## Struktur

```
app/
├── layout.tsx          # fonts, SEO metadata, viewport, JSON-LD, StickyWhatsApp
├── page.tsx            # susun 10 section
├── globals.css         # design tokens Tailwind v4 (@theme) — warm earthy palette
├── components/         # 18 komponen (5 client leaf, sisanya server)
└── lib/                # data + logika (site, festivals, products, testimonials, faqs) + tests
scripts/                # generator gambar placeholder (sharp)
docs/superpowers/plans/ # implementation plan lengkap
```

## Checklist Manual Pasca-Deploy

- [ ] Ganti `metadataBase` di `app/layout.tsx` dengan domain produksi
- [ ] Perbarui tanggal festival 2028 di `lib/festivals.ts`
- [ ] Ganti semua foto placeholder dengan foto IG asli
- [ ] Audit Lighthouse mobile (target ≥90) di domain produksi

---

Dibuat dengan ❤️ untuk Dapoer Mama Ami — portfolio transformasi IG UMKM → web.
