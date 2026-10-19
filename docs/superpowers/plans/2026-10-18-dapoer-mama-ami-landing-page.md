# Dapoer Mama Ami Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing page satu halaman premium, mobile-first, conversion-focused untuk Dapoer Mama Ami — setiap section mengarah ke WhatsApp.

**Architecture:** Fully static single page (App Router, tanpa `"use cache"` karena render murni sinkron), komponen client hanya leaf interaktif (Navbar, CountdownChip, ActiveFestivalTag, TestimonialCarousel, MapsCard), sisanya Server Components. Data-driven dari `lib/*.ts`, satu sumber nomor WA di `lib/site.ts`.

**Tech Stack:** Next.js 16.4.2, Tailwind CSS v4 (@tailwindcss/turbopack), `motion` (animasi), TypeScript, `bun` (runtime + `bun test`, tanpa dependensi test tambahan).

**Keputusan final:**
- Nomor WA asli: `6287782238049` (di `lib/site.ts`)
- Gambar: dummy placeholder berwarna+label (digenerate script sharp Task 16), foto asli IG menyusul tanpa ubah kode
- Single page murni — TANPA /galeri, /blog, atau halaman lain (semua jalan menuju WhatsApp)
- Elemen gabungan dari PANDUAN-AI-MURAH: scrapbook IG grid di footer, larangan eksplisit, disiplin verifikasi per task

**Gotcha Next.js 16 WAJIB:**
- `<Image preload>` bukan `priority` (deprecated)
- `themeColor` di export `viewport`, bukan `metadata`
- JANGAN `new Date()`/`Date.now()` untuk logika dinamis di Server Component (`cacheComponents` aktif) → komponen client + `useEffect`
- Anchor + sticky navbar butuh `scroll-margin-top: 88px` (di globals.css)
- `images.qualities` default hanya `[75]` → tambah `qualities: [75, 90]` di next.config.ts

---

### Task 1: Cleanup + Dependencies

**Files:** Modify: `package.json`, `next.config.ts`, `app/page.tsx`

- [ ] **Step 1: Install motion & test script**

```bash
bun add motion
```

Tambah di `package.json` scripts: `"test": "bun test"`.

- [ ] **Step 2: Modify `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```

- [ ] **Step 3: Kosongkan scaffold** — `app/page.tsx`:

```tsx
export default function Home() {
  return <main />;
}
```

Hapus SVG bawaan:

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 4: Verify** — `bun run build` sukses tanpa error.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: install motion, configure image qualities, clean scaffold"
```

---

### Task 2: Design Tokens + Fonts

**Files:** Modify: `app/globals.css` (seluruh file), `app/layout.tsx` (font saja)

- [ ] **Step 1: `app/globals.css` penuh**

```css
@import "tailwindcss";

@theme inline {
  --color-cream: #fff8e7;
  --color-cream-dark: #f5edd8;
  --color-brown: #4a2c1d;
  --color-brown-light: #7a5c4a;
  --color-pandan: #5a7d3a;
  --color-pandan-light: #eaf0df;
  --color-festival: #c1272d;
  --color-gold: #e8b84a;
  --color-gold-light: #fcf3dc;
  --font-serif: var(--font-playfair);
  --font-sans: var(--font-poppins);
  --radius-card: 20px;
  --radius-hero: 24px;
  --shadow-soft: 0 8px 30px rgba(74, 44, 29, 0.1);
  --shadow-lift: 0 12px 40px rgba(74, 44, 29, 0.16);
  --animate-fall: fall 9s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-5%) translateX(0) rotate(0deg);
    opacity: 0;
  }
  8% {
    opacity: 0.85;
  }
  95% {
    opacity: 0.85;
  }
  100% {
    transform: translateY(105vh) translateX(48px) rotate(320deg);
    opacity: 0;
  }
}

html {
  scroll-behavior: smooth;
}

section[id] {
  scroll-margin-top: 88px;
}

::selection {
  background: #e8b84a;
  color: #4a2c1d;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-fall {
    animation: none;
  }
}
```

- [ ] **Step 2: Font di `app/layout.tsx`** — hapus import Geist, ganti:

```tsx
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
```

`<html lang="id" className={`${playfair.variable} ${poppins.variable} h-full antialiased`}>`, `<body className="min-h-full flex flex-col bg-cream font-sans text-brown">`.

- [ ] **Step 3: Verify** — `bun run build` sukses; token classes (bg-cream dst) dikenali Tailwind.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx && git commit -m "feat: design tokens (warm earthy palette) + Playfair/Poppins fonts"
```

---

### Task 3: `lib/site.ts` — WhatsApp Links (TDD)

**Files:** Create: `lib/site.ts`, `lib/site.test.ts`

- [ ] **Step 1: Failing test** — `lib/site.test.ts`:

```ts
import { describe, expect, it } from "bun:test";
import { waLink, waMessages } from "./site";

describe("waLink", () => {
  it("membuat URL wa.me dengan teks terenkode", () => {
    expect(waLink("Halo Mama!")).toBe(
      "https://wa.me/6287782238049?text=Halo%20Mama!"
    );
  });

  it("mengenkode emoji dan baris baru dengan aman", () => {
    const url = waLink("pesan 🎋\nbaris 2");
    expect(url).toContain("%F0%9F%8E%8B");
    expect(url).toContain("%0A");
  });
});

describe("waMessages.order", () => {
  it("menyisipkan nama produk", () => {
    expect(waMessages.order("Bacang Bangka")).toContain("Bacang Bangka");
  });
});
```

- [ ] **Step 2: Verify fail** — `bun test lib/site.test.ts` → FAIL "Cannot find module './site'".

- [ ] **Step 3: Implement** — `lib/site.ts`:

```ts
export const site = {
  name: "Dapoer Mama Ami",
  tagline: "Rasa Tradisi, 100% Tumbuhan",
  waNumber: "6287782238049",
  igHandle: "dapoermamaami",
  igUrl: "https://instagram.com/dapoermamaami",
  location: "Binong, Tangerang, Banten",
  mapsUrl: "https://maps.google.com/?q=Binong,+Tangerang,+Banten",
  mapsEmbed:
    "https://www.google.com/maps?q=Binong,+Tangerang,+Banten&output=embed",
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general:
    "Halo Dapoer Mama Ami! Saya mau tanya-tanya menu vegetariannya 😊",
  order: (product: string) =>
    `Halo Dapoer Mama Ami! Saya mau pesan ${product}. Mohon info jadwal PO & harga ya 🙏`,
  reminder:
    "Halo Dapoer Mama Ami! Tolong ingatkan saya saat PO festival dibuka ya 🙏",
  catering:
    "Halo Dapoer Mama Ami! Saya ingin konsultasi pesanan nasi box untuk acara keluarga/pernikahan. Bisa info paketnya?",
} as const;
```

- [ ] **Step 4: Verify pass** — `bun test lib/site.test.ts` → 3 passing.

- [ ] **Step 5: Commit**

```bash
git add lib/site.ts lib/site.test.ts && git commit -m "feat: site config + wa.me deep-link builder (TDD)"
```

---

### Task 4: `lib/festivals.ts` — Festival Logic (TDD)

**Files:** Create: `lib/festivals.ts`, `lib/festivals.test.ts`

- [ ] **Step 1: Failing test** — `lib/festivals.test.ts`:

```ts
import { describe, expect, it } from "bun:test";
import { daysUntil, festivals, getNextFestival } from "./festivals";

describe("getNextFestival", () => {
  it("mengembalikan Imlek jika sekarang sebelum deadline PO Imlek", () => {
    expect(getNextFestival(new Date("2026-10-18")).id).toBe("imlek");
  });

  it("mengembalikan Mooncake setelah deadline Duan Wu", () => {
    expect(getNextFestival(new Date("2027-06-05")).id).toBe("mooncake");
  });

  it("null jika semua deadline terlewat", () => {
    expect(getNextFestival(new Date("2028-01-01"))).toBeNull();
  });
});

describe("daysUntil", () => {
  it("menghitung selisih hari dibulatkan ke atas", () => {
    expect(daysUntil("2027-01-27", new Date("2027-01-17T00:00:00"))).toBe(10);
  });
});

describe("integritas data", () => {
  it("4 festival, poDeadline < date", () => {
    expect(festivals).toHaveLength(4);
    for (const f of festivals) {
      expect(new Date(f.poDeadline).getTime()).toBeLessThan(
        new Date(f.date).getTime()
      );
    }
  });
});
```

- [ ] **Step 2: Verify fail** — `bun test lib/festivals.test.ts` → FAIL modul tidak ditemukan.

- [ ] **Step 3: Implement** — `lib/festivals.ts`:

```ts
export type Festival = {
  id: string;
  name: string;
  monthLabel: string;
  /** Tanggal festival (kalender lunar — verifikasi tiap tahun) */
  date: string;
  /** Batas akhir PO, H-10 dari festival */
  poDeadline: string;
  highlight: string;
  emoji: string;
  description: string;
};

export const festivals: Festival[] = [
  {
    id: "imlek",
    name: "Imlek",
    monthLabel: "Januari – Februari",
    date: "2027-02-06",
    poDeadline: "2027-01-27",
    highlight: "Kue Keranjang & Bacang",
    emoji: "🏮",
    description:
      "Sambut tahun baru dengan kue keranjang dan bacang vegetarian untuk sembahyang keluarga.",
  },
  {
    id: "ce-it",
    name: "Ce It",
    monthLabel: "Maret – April",
    date: "2027-04-05",
    poDeadline: "2027-03-26",
    highlight: "Rendang Vegetarian",
    emoji: "🕯️",
    description:
      "Hari sembahyang leluhur — rendang dan hidangan vegetarian tanpa bahan hewani.",
  },
  {
    id: "duan-wu",
    name: "Duan Wu Jie",
    monthLabel: "Juni",
    date: "2027-06-09",
    poDeadline: "2027-05-30",
    highlight: "Bacang Daun Pandan",
    emoji: "🎋",
    description:
      "Musim bacang! Bacang Bangka asli daun pandan, manis dan asin — best seller kami.",
  },
  {
    id: "mooncake",
    name: "Mooncake Festival",
    monthLabel: "September",
    date: "2027-09-15",
    poDeadline: "2027-09-05",
    highlight: "Mooncake",
    emoji: "🥮",
    description:
      "Mooncake isi lembut kulit tipis untuk bereuni keluarga di bawah bulan purnama.",
  },
];

export function getNextFestival(now: Date = new Date()): Festival | null {
  const upcoming = festivals
    .filter((f) => new Date(f.poDeadline).getTime() > now.getTime())
    .sort((a, b) => a.poDeadline.localeCompare(b.poDeadline));
  return upcoming[0] ?? null;
}

export function daysUntil(iso: string, now: Date = new Date()): number {
  return Math.ceil((new Date(iso).getTime() - now.getTime()) / 86_400_000);
}
```

- [ ] **Step 4: Verify pass** — `bun test lib/festivals.test.ts` → 5 passing.

- [ ] **Step 5: Commit**

```bash
git add lib/festivals.ts lib/festivals.test.ts && git commit -m "feat: festival data + next-PO countdown logic (TDD)"
```

---

### Task 5: Content Data (produk, testimoni, FAQ)

**Files:** Create: `lib/products.ts`, `lib/testimonials.ts`, `lib/faqs.ts`

- [ ] **Step 1: `lib/products.ts`**

```ts
export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: "Best Seller" | "Festival";
  minOrder: number;
};

export const products: Product[] = [
  {
    id: "bacang-bangka",
    name: "Bacang Bangka Daun Pandan",
    description:
      "Bacang khas Bangka dibungkus daun pandan — manis & asin, resep asli keluarga.",
    image: "/images/products/bacang-bangka.webp",
    badge: "Best Seller",
    minOrder: 2,
  },
  {
    id: "rendang",
    name: "Rendang Vegetarian",
    description: "Rendang rempah meresap tanpa daging — favorit sembahyang Ce It.",
    image: "/images/products/rendang.webp",
    minOrder: 2,
  },
  {
    id: "sapi-lada-hitam",
    name: "Sapi Lada Hitam Vegetarian",
    description: "Gurih pekat lada hitam — teksturnya bikin tidak percaya ini vegan.",
    image: "/images/products/sapi-lada-hitam.webp",
    minOrder: 2,
  },
  {
    id: "ayam-kuluyuk",
    name: "Ayam Kuluyuk Vegetarian",
    description: "Manis-asam segar dengan topping kriuk, disukai anak-anak.",
    image: "/images/products/ayam-kuluyuk.webp",
    minOrder: 2,
  },
  {
    id: "mooncake",
    name: "Mooncake",
    description: "Isian lembut kulit tipis — hadir saat Mooncake Festival.",
    image: "/images/products/mooncake.webp",
    badge: "Festival",
    minOrder: 2,
  },
  {
    id: "nasi-box",
    name: "Nasi Box Pernikahan Vegetarian",
    description: "Paket nasi box 100% tumbuhan untuk hari bahagia keluarga Anda.",
    image: "/images/products/nasi-box.webp",
    minOrder: 20,
  },
];
```

- [ ] **Step 2: `lib/testimonials.ts`**

```ts
export type Testimonial = {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rina H.",
    event: "Sembahyang Imlek",
    quote:
      "Rasanya gak kalah sama yang hewani, serius! Keluarga saya sampai gak sadar bacangnya vegetarian.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Budi W.",
    event: "PO Duan Wu Jie",
    quote:
      "Bacang daun pandannya wangi banget, nasinya pulen. Jadi langganan tiap festival.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Ibu Theresia",
    event: "Acara Keluarga",
    quote:
      "Rendang vegetariannya enak, rempahnya bener-bener meresap. Anak saya yang susah makan sayur suka.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Mei L.",
    event: "Mooncake Festival",
    quote:
      "Mooncake-nya tidak manis berlebihan, isinya lembut. Kemasan rapi, cocok untuk hadiah.",
    rating: 4,
  },
];
```

- [ ] **Step 3: `lib/faqs.ts`**

```ts
export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "Apakah benar 100% vegan?",
    answer:
      "Ya. Semua produk kami tanpa daging, tanpa santen/kuah hewani, dan tanpa bahan turunan hewani. Resep keluarga asli kami modifikasi agar 100% tumbuhan tanpa mengorbankan rasa.",
  },
  {
    id: "f2",
    question: "Berapa minimal order?",
    answer:
      "Minimal order 2 pcs per item. Karena sistem Pre-Order, kami memasak fresh setelah pesanan dikonfirmasi — tidak ada stok ready.",
  },
  {
    id: "f3",
    question: "Pengiriman ke area mana saja?",
    answer:
      "Kami berbasis di Binong, Tangerang (Banten). Pengiriman area Tangerang/Serpong dan bisa diambil langsung (pickup). Untuk area lain, tanyakan dulu via WhatsApp.",
  },
  {
    id: "f4",
    question: "Bisa untuk acara besar / nasi box pernikahan?",
    answer:
      "Bisa! Nasi box pernikahan dan pesanan sembahyang besar (ratusan porsi) adalah keahlian kami. Chat WhatsApp minimal 2–4 minggu sebelum acara untuk konsultasi menu.",
  },
];
```

- [ ] **Step 4: Verify** — `bun run build && bun test` sukses.

- [ ] **Step 5: Commit**

```bash
git add lib/products.ts lib/testimonials.ts lib/faqs.ts && git commit -m "feat: product/testimonial/faq content data"
```

---

### Task 6: SEO Metadata + Viewport + JSON-LD

**Files:** Modify: `app/layout.tsx`

- [ ] **Step 1: Exports di `app/layout.tsx`** (import `type { Metadata, Viewport } from "next"`):

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://dapoer-mama-ami.vercel.app"),
  title: "Dapoer Mama Ami — Bacang & Rendang Vegetarian Autentik PO",
  description:
    "Bacang Bangka daun pandan, rendang & mooncake 100% tumbuhan. Resep keluarga Chinese-Indonesian, pre-order fresh made. PO Imlek, Ce It, Duan Wu Jie & Mooncake Festival — pesan via WhatsApp.",
  openGraph: {
    title: "Dapoer Mama Ami — Rasa Tradisi, 100% Tumbuhan",
    description:
      "Makanan vegan & vegetarian berbasis PO. Bacang daun pandan, rendang, mooncake — rasa gak kalah sama hewani.",
    type: "website",
    locale: "id_ID",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#C1272D",
};
```

- [ ] **Step 2: JSON-LD** — dalam `<body>` sebelum `{children}`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Dapoer Mama Ami",
      description:
        "UMKM vegan & vegetarian berbasis pre-order. Bacang, rendang, mooncake.",
      servesCuisine: ["Vegetarian", "Vegan", "Chinese-Indonesian"],
      priceRange: "$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Binong",
        addressRegion: "Banten",
        addressCountry: "ID",
      },
      sameAs: ["https://instagram.com/dapoermamaami"],
    }).replace(/</g, "\\u003c"),
  }}
/>
```

- [ ] **Step 3: Verify** — `bun run build` sukses.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx && git commit -m "feat: SEO metadata, viewport themeColor, Restaurant JSON-LD"
```

---

### Task 7: WhatsAppButton + StickyWhatsApp + WhatsAppIcon

**Files:** Create: `app/components/WhatsAppIcon.tsx`, `app/components/WhatsAppButton.tsx`, `app/components/StickyWhatsApp.tsx`; Modify: `app/layout.tsx`

- [ ] **Step 1: `WhatsAppIcon.tsx`**

```tsx
export default function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
```

- [ ] **Step 2: `WhatsAppButton.tsx`**

```tsx
import { waLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

type Variant = "red" | "gold" | "outline" | "brown";

const styles: Record<Variant, string> = {
  red: "bg-festival text-white hover:brightness-90 shadow-lift",
  gold: "bg-gold text-brown hover:brightness-95 shadow-lift",
  outline: "border-2 border-pandan text-pandan hover:bg-pandan-light",
  brown: "bg-brown text-cream hover:brightness-110",
};

export default function WhatsAppButton({
  message,
  variant = "red",
  className = "",
  children,
}: {
  message: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition ${styles[variant]} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
}
```

- [ ] **Step 3: `StickyWhatsApp.tsx`**

```tsx
import { waLink, waMessages } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function StickyWhatsApp() {
  return (
    <a
      href={waLink(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Dapoer Mama Ami"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
```

- [ ] **Step 4: Pasang `<StickyWhatsApp />` di `app/layout.tsx` setelah `{children}`.**

- [ ] **Step 5: Verify + Commit**

```bash
bun run build
git add app/components app/layout.tsx && git commit -m "feat: reusable WhatsApp buttons + sticky float CTA"
```

---

### Task 8: Navbar

**Files:** Create: `app/components/Navbar.tsx`

- [ ] **Step 1: Komponen client**

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { waLink, waMessages } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const links = [
  { href: "#produk", label: "Produk" },
  { href: "#festival", label: "Jadwal Festival" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#cara-pesan", label: "Cara Pesan" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow ${
        scrolled ? "bg-cream/90 shadow-soft backdrop-blur" : "bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="#beranda" className="font-serif text-lg font-bold text-brown">
          🎋 Dapoer Mama Ami
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brown-light transition-colors hover:text-brown"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href={waLink(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-festival px-4 py-2 text-sm font-semibold text-white transition hover:brightness-90 md:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" /> Chat WhatsApp
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-brown md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-brown/10 bg-cream px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-medium text-brown"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-festival px-4 py-2.5 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" /> Chat WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify + Commit**

```bash
bun run build
git add app/components/Navbar.tsx && git commit -m "feat: sticky navbar with mobile menu"
```

---

### Task 9: Hero + PandanLeaves + CountdownChip

**Files:** Create: `app/components/PandanLeaves.tsx`, `app/components/CountdownChip.tsx`, `app/components/Hero.tsx`

- [ ] **Step 1: `PandanLeaves.tsx`** (server, CSS-only, posisi deterministik)

```tsx
const leaves = [
  { left: "6%", delay: "0s", duration: "9s", size: 22 },
  { left: "18%", delay: "3.5s", duration: "11s", size: 16 },
  { left: "34%", delay: "1.8s", duration: "10s", size: 28 },
  { left: "52%", delay: "5s", duration: "12s", size: 18 },
  { left: "68%", delay: "2.6s", duration: "9.5s", size: 24 },
  { left: "82%", delay: "4.2s", duration: "10.5s", size: 15 },
  { left: "93%", delay: "0.9s", duration: "12.5s", size: 20 },
];

export default function PandanLeaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-fall absolute -top-8 text-pandan/50"
          style={{
            left: l.left,
            width: l.size,
            height: l.size,
            animationDelay: l.delay,
            animationDuration: l.duration,
          }}
        >
          <path fill="currentColor" d="M12 2C7 7 4 12 4 16a8 8 0 0 0 16 0c0-4-3-9-8-14z" />
        </svg>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `CountdownChip.tsx`** (client — Date hanya di useEffect)

```tsx
"use client";

import { useEffect, useState } from "react";
import { daysUntil, getNextFestival } from "@/lib/festivals";

export default function CountdownChip() {
  const [info, setInfo] = useState<{ name: string; days: number } | null>(null);

  useEffect(() => {
    const next = getNextFestival();
    if (next) {
      setInfo({ name: next.name, days: Math.max(0, daysUntil(next.poDeadline)) });
    }
  }, []);

  if (!info) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-light px-4 py-2 text-sm font-medium text-brown">
      ⏳ PO {info.name} ditutup {info.days} hari lagi — pesan sekarang!
    </div>
  );
}
```

- [ ] **Step 3: `Hero.tsx`** (server; `preload` bukan `priority`)

```tsx
import Image from "next/image";
import Link from "next/link";
import { waMessages } from "@/lib/site";
import CountdownChip from "./CountdownChip";
import PandanLeaves from "./PandanLeaves";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-cream">
      <PandanLeaves />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <CountdownChip />
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-brown md:text-6xl">
            Rasa Tradisi,
            <br />
            <span className="text-pandan">100% Tumbuhan.</span>
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-brown-light">
            Bacang &amp; Rendang Vegetarian autentik — resep keluarga
            Chinese-Indonesian tanpa bahan hewani. Dibuat fresh berdasarkan
            Pre-Order, minimal order 2 pcs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#festival"
              className="inline-flex items-center rounded-full border-2 border-pandan px-6 py-3 font-semibold text-pandan transition hover:bg-pandan-light"
            >
              Lihat Menu Festival
            </Link>
            <WhatsAppButton message={waMessages.general}>Chat WhatsApp</WhatsAppButton>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-hero shadow-lift">
          <Image
            src="/images/hero-bacang.webp"
            alt="Bacang daun pandan segar Dapoer Mama Ami"
            fill
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify** — `bun run build` (peringatan gambar hilang OK, aset di Task 16)

- [ ] **Step 5: Commit**

```bash
git add app/components/Hero.tsx app/components/PandanLeaves.tsx app/components/CountdownChip.tsx
git commit -m "feat: hero with pandan leaf animation + PO countdown chip"
```

---

### Task 10: TrustBadges + About

**Files:** Create: `app/components/TrustBadges.tsx`, `app/components/About.tsx`

- [ ] **Step 1: `TrustBadges.tsx`**

```tsx
const badges = [
  { icon: "🌱", label: "100% Vegan" },
  { icon: "🥬", label: "100% Vegetarian" },
  { icon: "👩‍🍳", label: "PO Fresh Made" },
  { icon: "👵", label: "Resep Keluarga" },
  { icon: "🕌", label: "Bahan Halal-Friendly" },
];

export default function TrustBadges() {
  return (
    <section aria-label="Keunggulan kami" className="border-y border-brown/10 bg-cream-dark">
      <div className="mx-auto flex max-w-6xl snap-x gap-3 overflow-x-auto px-4 py-5 md:justify-center md:px-8">
        {badges.map((b) => (
          <div
            key={b.label}
            className="flex shrink-0 snap-center items-center gap-2 rounded-full border border-pandan/25 bg-white/60 px-5 py-2.5"
          >
            <span aria-hidden="true">{b.icon}</span>
            <span className="text-sm font-semibold text-brown">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `About.tsx`**

```tsx
import Image from "next/image";

export default function About() {
  return (
    <section id="tentang" className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-soft">
          <Image
            src="/images/about-mama-ami.webp"
            alt="Mama Ami memasak di dapur keluarga"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
            Cerita di Balik Dapoer Mama Ami
          </h2>
          <p className="mt-5 leading-relaxed text-brown-light">
            Dapoer Mama Ami lahir dari dapur keluarga Chinese-Indonesian kami.
            Saat keluarga memilih hidup lebih sehat, Mama Ami bertekad: tradisi
            tidak harus hilang. Resep bakcang, rendang, dan kuluyuk yang
            diwariskan turun-temurun ia olah ulang — 100% dari tumbuhan, 100%
            rasa yang sama.
          </p>
          <p className="mt-4 leading-relaxed text-brown-light">
            Karena kami percaya makanan untuk sembahyang dan acara keluarga
            harus dimasak dengan hati, semua pesanan kami buat fresh setelah
            PO masuk — tidak ada stok mengendap.
          </p>
          <p className="mt-6 font-serif text-lg italic text-brown">
            “Rasa tradisi tidak harus meninggalkan kebiasaan lama.” — Mama Ami
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + Commit**

```bash
bun run build
git add app/components/TrustBadges.tsx app/components/About.tsx && git commit -m "feat: trust badges strip + brand story section"
```

---

### Task 11: ProductGrid + ProductCard

**Files:** Create: `app/components/ProductCard.tsx`, `app/components/ProductGrid.tsx`

- [ ] **Step 1: `ProductCard.tsx`**

```tsx
import Image from "next/image";
import type { Product } from "@/lib/products";
import { waLink, waMessages } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({ product }: { product: Product }) {
  const message =
    product.id === "nasi-box"
      ? waMessages.catering
      : waMessages.order(product.name);

  return (
    <article className="group overflow-hidden rounded-card border border-brown/10 bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              product.badge === "Best Seller" ? "bg-festival text-white" : "bg-gold text-brown"
            }`}
          >
            {product.badge === "Best Seller" ? "⭐ Best Seller" : "🥮 Festival"}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-brown">{product.name}</h3>
        <p className="mt-2 min-h-10 text-sm leading-relaxed text-brown-light">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-brown-light/80">
            Min. order {product.minOrder} pcs
          </span>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-festival px-4 py-2 text-xs font-semibold text-white transition hover:brightness-90"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" /> Pesan
          </a>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: `ProductGrid.tsx`**

```tsx
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="produk" className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
            Menu Andalan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brown-light">
            Semua dibuat setelah PO masuk — fresh dimasak, tanpa pengawet.
            Klik <em>Pesan</em> untuk chat langsung via WhatsApp.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + Commit**

```bash
bun run build
git add app/components/ProductCard.tsx app/components/ProductGrid.tsx && git commit -m "feat: product grid with per-product WA order links"
```

---

### Task 12: FestivalTimeline + ActiveFestivalTag

**Files:** Create: `app/components/ActiveFestivalTag.tsx`, `app/components/FestivalTimeline.tsx`

- [ ] **Step 1: `ActiveFestivalTag.tsx`** (client)

```tsx
"use client";

import { useEffect, useState } from "react";
import { daysUntil, getNextFestival } from "@/lib/festivals";

export default function ActiveFestivalTag({ festivalId }: { festivalId: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const next = getNextFestival();
    if (next?.id === festivalId) {
      setDays(Math.max(0, daysUntil(next.poDeadline)));
    }
  }, [festivalId]);

  if (days === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-festival/10 px-3 py-1 text-xs font-bold text-festival">
      ⏰ PO dibuka — tutup {days} hari lagi
    </span>
  );
}
```

- [ ] **Step 2: `FestivalTimeline.tsx`** (server)

```tsx
import { festivals } from "@/lib/festivals";
import { waMessages } from "@/lib/site";
import ActiveFestivalTag from "./ActiveFestivalTag";
import WhatsAppButton from "./WhatsAppButton";

export default function FestivalTimeline() {
  return (
    <section id="festival" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
            Jadwal Festival
          </h2>
          <p className="mt-3 text-brown-light">
            Kami tampil mengikuti kalender tradisi. Pasang pengingat agar tidak
            kehabisan.
          </p>
        </div>

        <ol className="relative mt-12 space-y-10 border-l-2 border-gold/60 pl-8">
          {festivals.map((f) => (
            <li key={f.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold bg-cream text-sm"
              >
                {f.emoji}
              </span>
              <div className="rounded-card border border-brown/10 bg-white/70 p-5 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold-light px-3 py-1 text-xs font-bold text-brown">
                    {f.monthLabel}
                  </span>
                  <ActiveFestivalTag festivalId={f.id} />
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold text-brown">
                  {f.name} — {f.highlight}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-light">
                  {f.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-card bg-gold-light p-6 text-center shadow-soft">
          <p className="font-semibold text-brown">
            🔔 Ingin diingatkan saat PO festival dibuka?
          </p>
          <p className="mt-1 text-sm text-brown-light">
            Simpan kontak kami dan chat — Mama Ami akan mengabari jadwal PO terbaru.
          </p>
          <WhatsAppButton message={waMessages.reminder} variant="gold" className="mt-4">
            Ingatkan Saya via WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + Commit**

```bash
bun run build && bun test
git add app/components/FestivalTimeline.tsx app/components/ActiveFestivalTag.tsx
git commit -m "feat: festival timeline with dynamic active-PO badge + reminder CTA"
```

---

### Task 13: TestimonialCarousel

**Files:** Create: `app/components/TestimonialCarousel.tsx`

- [ ] **Step 1: Komponen client (motion, autoplay, pause-on-hover)**

```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const goPrev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 6000);
    return () => clearInterval(t);
  }, [paused, goNext]);

  const item = testimonials[index];

  return (
    <section id="testimoni" className="bg-cream-dark py-20 md:py-28">
      <h2 className="text-center font-serif text-3xl font-bold text-brown md:text-4xl">
        Kata Mereka
      </h2>
      <div
        className="mx-auto mt-10 max-w-3xl px-4 text-center md:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative min-h-56 md:min-h-44">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="text-xl tracking-widest text-gold"
                aria-label={`Rating ${item.rating} dari 5`}
              >
                {"★".repeat(item.rating)}
                <span className="text-brown/20">{"★".repeat(5 - item.rating)}</span>
              </div>
              <blockquote className="mt-4 font-serif text-xl italic leading-relaxed text-brown md:text-2xl">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brown-light">
                {item.name} — {item.event}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Testimoni sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-pandan-light"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Testimoni ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-festival" : "bg-brown/20 hover:bg-brown/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            aria-label="Testimoni berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brown/20 text-brown transition hover:bg-pandan-light"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify + Commit**

```bash
bun run build
git add app/components/TestimonialCarousel.tsx && git commit -m "feat: testimonial carousel with autoplay + accessible controls"
```

---

### Task 14: HowToOrder + Faq

**Files:** Create: `app/components/HowToOrder.tsx`, `app/components/Faq.tsx`

- [ ] **Step 1: `HowToOrder.tsx`**

```tsx
import { waMessages } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";

const steps = [
  {
    n: 1,
    title: "Cek Jadwal PO",
    desc: "Lihat kalender festival di atas atau Instagram @dapoermamaami untuk jadwal PO terbuka.",
  },
  {
    n: 2,
    title: "Chat WhatsApp",
    desc: "Klik tombol WhatsApp, sebutkan menu dan jumlah yang diinginkan. Min. order 2 pcs.",
  },
  {
    n: 3,
    title: "Transfer & Tunggu",
    desc: "Setelah pembayaran terkonfirmasi, pesanan Anda masuk antrean — dimasak fresh!",
  },
  {
    n: 4,
    title: "Pengiriman / Pickup",
    desc: "Ambil di Binong, Tangerang, atau atur pengiriman sesuai kesepakatan di chat.",
  },
];

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <h2 className="font-serif text-3xl font-bold text-brown md:text-4xl">
          Cara Pesan
        </h2>
        <p className="mt-3 text-brown-light">Semudah chat dengan saudara sendiri.</p>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-card border border-brown/10 bg-white/70 p-6 text-left shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-festival font-serif text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-brown">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown-light">{s.desc}</p>
            </li>
          ))}
        </ol>
        <WhatsAppButton message={waMessages.general} className="mt-12 px-8 py-4 text-lg">
          Mulai Pesan via WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `Faq.tsx`** (0-JS native details)

```tsx
import { faqs } from "@/lib/faqs";

export default function Faq() {
  return (
    <section id="faq" className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-brown md:text-4xl">
          Pertanyaan Umum
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.id}
              className="group rounded-card border border-brown/10 bg-white/70 px-5 py-4 shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-brown [&::-webkit-details-marker]:hidden">
                {f.question}
                <span className="ml-4 shrink-0 text-pandan transition-transform group-open:rotate-45">
                  ＋
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-brown-light">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + Commit**

```bash
bun run build
git add app/components/HowToOrder.tsx app/components/Faq.tsx && git commit -m "feat: how-to-order steps + accessible FAQ accordion"
```

---

### Task 15: Footer + Scrapbook IG + MapsCard

**Files:** Create: `app/components/MapsCard.tsx`, `app/components/Footer.tsx`

- [ ] **Step 1: `MapsCard.tsx`** (client, click-to-load)

```tsx
"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function MapsCard() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Lokasi Dapoer Mama Ami — Binong, Banten"
        src={site.mapsEmbed}
        className="h-64 w-full rounded-card border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="group relative h-64 w-full overflow-hidden rounded-card bg-pandan-light text-center"
    >
      <span className="absolute inset-0 opacity-15 [background-image:repeating-linear-gradient(45deg,#5A7D3A_0_1px,transparent_1px_12px)]" />
      <span className="relative mt-16 inline-block">
        <span aria-hidden="true" className="text-4xl">📍</span>
        <span className="mt-2 block font-semibold text-brown">{site.location}</span>
        <span className="mt-1 block text-sm text-brown-light group-hover:text-brown">
          Ketuk untuk membuka peta
        </span>
      </span>
    </button>
  );
}
```

- [ ] **Step 2: `Footer.tsx`** (scrapbook IG: rotasi + tinggi bervariasi + polaroid)

```tsx
import Image from "next/image";
import { site, waLink, waMessages } from "@/lib/site";
import MapsCard from "./MapsCard";
import WhatsAppIcon from "./WhatsAppIcon";

const igPosts = [
  { src: "/images/ig/1.webp", alt: "Bacang daun pandan", cls: "h-40 rotate-[-1.5deg]" },
  { src: "/images/ig/2.webp", alt: "Rendang vegetarian", cls: "h-52 rotate-[1deg]" },
  { src: "/images/ig/3.webp", alt: "Mooncake", cls: "h-36 rotate-[0.5deg] border-2 border-gold bg-white p-1.5" },
  { src: "/images/ig/4.webp", alt: "Ayam kuluyuk", cls: "h-48 -rotate-[1deg]" },
  { src: "/images/ig/5.webp", alt: "Proses memasak", cls: "h-40 rotate-[1.5deg] bg-white p-1.5 shadow-lift" },
  { src: "/images/ig/6.webp", alt: "Nasi box", cls: "h-44 rotate-[-0.5deg]" },
];

export default function Footer() {
  return (
    <footer className="bg-brown py-16 text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-serif text-xl font-bold">Ikuti Kami</h3>
          <p className="mt-2 text-sm text-cream/70">
            Lihat proses masak & testimoni terbaru di Instagram.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {igPosts.map((p, i) => (
              <a
                key={i}
                href={site.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block w-28 overflow-hidden rounded-lg shadow-soft transition-transform hover:rotate-0 hover:scale-105 ${p.cls}`}
                aria-label={`Instagram: ${p.alt}`}
              >
                <Image src={p.src} alt={p.alt} fill sizes="112px" className="object-cover" />
              </a>
            ))}
          </div>
          <a
            href={site.igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full border-2 border-gold px-5 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-brown"
          >
            @{site.igHandle} →
          </a>
        </div>

        <div>
          <h3 className="font-serif text-xl font-bold">Hubungi Kami</h3>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-semibold text-white transition hover:brightness-95"
          >
            <WhatsAppIcon className="h-5 w-5" /> Chat WhatsApp
          </a>
          <p className="mt-4 text-sm text-cream/70">
            Pre-Order only — minimal 2 pcs.
            <br />
            Fresh cooked setelah PO dikonfirmasi.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl font-bold">Lokasi</h3>
          <div className="mt-4">
            <MapsCard />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-cream/15 px-4 pt-6 text-center text-sm text-cream/60 md:px-8">
        © {new Date().getFullYear()} Dapoer Mama Ami — {site.tagline}. Dibuat dengan ❤️ di Binong, Banten.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify + Commit**

```bash
bun run build
git add app/components/Footer.tsx app/components/MapsCard.tsx && git commit -m "feat: footer with scrapbook IG grid + click-to-load map"
```

---

### Task 16: Assemble Page + Dummy Images

**Files:** Modify: `app/page.tsx`; Create: `scripts/generate-placeholder-images.mjs`, `public/images/**`

- [ ] **Step 1: `app/page.tsx` final**

```tsx
import About from "./components/About";
import Faq from "./components/Faq";
import FestivalTimeline from "./components/FestivalTimeline";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowToOrder from "./components/HowToOrder";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import TestimonialCarousel from "./components/TestimonialCarousel";
import TrustBadges from "./components/TrustBadges";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBadges />
      <About />
      <ProductGrid />
      <FestivalTimeline />
      <TestimonialCarousel />
      <HowToOrder />
      <Faq />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Script dummy images** — `bun add -d sharp`, lalu `scripts/generate-placeholder-images.mjs`:

```js
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const targets = [
  { path: "public/images/hero-bacang.webp", w: 1000, h: 1250, label: "Hero Bacang", bg: "#5A7D3A" },
  { path: "public/images/about-mama-ami.webp", w: 1200, h: 900, label: "About", bg: "#7A5C4A" },
  { path: "public/images/products/bacang-bangka.webp", w: 800, h: 600, label: "Bacang", bg: "#5A7D3A" },
  { path: "public/images/products/rendang.webp", w: 800, h: 600, label: "Rendang", bg: "#C1272D" },
  { path: "public/images/products/sapi-lada-hitam.webp", w: 800, h: 600, label: "Lada Hitam", bg: "#4A2C1D" },
  { path: "public/images/products/ayam-kuluyuk.webp", w: 800, h: 600, label: "Kuluyuk", bg: "#E8B84A" },
  { path: "public/images/products/mooncake.webp", w: 800, h: 600, label: "Mooncake", bg: "#B8860B" },
  { path: "public/images/products/nasi-box.webp", w: 800, h: 600, label: "Nasi Box", bg: "#7A5C4A" },
  { path: "public/images/og-image.png", w: 1200, h: 630, label: "Dapoer Mama Ami", bg: "#FFF8E7", dark: true },
];
for (let i = 1; i <= 6; i++) {
  targets.push({ path: `public/images/ig/${i}.webp`, w: 400, h: 400, label: `IG ${i}`, bg: ["#5A7D3A", "#C1272D", "#E8B84A", "#4A2C1D", "#7A5C4A", "#F5EDD8"][i - 1] });
}

for (const t of targets) {
  await mkdir(t.path.substring(0, t.path.lastIndexOf("/")), { recursive: true });
  const svg = `<svg width="${t.w}" height="${t.h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${t.bg}"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="${Math.round(t.w / 18)}" fill="${t.dark ? "#4A2C1D" : "#FFF8E7"}" text-anchor="middle" dominant-baseline="middle">${t.label}</text>
</svg>`;
  const buf = Buffer.from(svg);
  if (t.path.endsWith(".png")) {
    await sharp(buf).png().toFile(t.path);
  } else {
    await sharp(buf).webp({ quality: 80 }).toFile(t.path);
  }
  console.log("OK", t.path);
}
```

Jalankan: `bun scripts/generate-placeholder-images.mjs`

- [ ] **Step 3: Verify** — `bun run build && bun test && ls public/images public/images/products public/images/ig` → build sukses, semua file ada.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx scripts public/images package.json bun.lock
git commit -m "feat: assemble landing page + placeholder images (real IG photos drop-in later)"
```

---

### Task 17: README Portfolio + Final Audit

**Files:** Modify: `README.md`

- [ ] **Step 1: README** — case study: masalah (UMKM hanya IG), solusi (landing page conversion-focused), stack, fitur unggulan (countdown PO, scrapbook IG, click-to-load maps, Lighthouse), cara ganti nomor WA/tanggal festival, cara replace dummy images (`raw-images/` + `scripts/to-webp.mjs`).

- [ ] **Step 2: Audit** — `bun run build && bun run start`; Lighthouse mobile ≥90; uji 360/768/1440px; cek tautan WA terbuka dengan prefilled message; anchor tidak tertutup navbar; prefers-reduced-motion mematikan daun jatuh.

- [ ] **Step 3: Final lint + test + commit**

```bash
bun run lint && bun test
git add README.md && git commit -m "docs: portfolio case study README"
```

---

## Larangan Eksplisit

1. **JANGAN** tambah halaman/rute apa pun — single page, semua jalan menuju WhatsApp.
2. **JANGAN** pakai embed Instagram resmi atau iframe Google Maps eager-load.
3. **JANGAN** panggil `Date.now()`/`Math.random()`/`new Date()` untuk logika dinamis di Server Component → komponen client + `useEffect`.
4. **JANGAN** pakai prop `priority` pada Image (deprecated v16) — gunakan `preload`.
5. **JANGAN** tambahkan library UI (shadcn dsb.).
6. **JANGAN** animasi >500ms atau mengabaikan `prefers-reduced-motion`.
