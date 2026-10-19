import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const targets = [
  { path: "public/images/hero-bacang.webp", w: 1000, h: 1250, label: "Hero Bacang", bg: "#5A7D3A" },
  { path: "public/images/about-mama-ami.webp", w: 1200, h: 900, label: "About", bg: "#7A5C4A" },
  { path: "public/images/products/bacang-bangka.webp", w: 800, h: 600, label: "Bacang", bg: "#5A7D3A" },
  { path: "public/images/products/rendang.webp", w: 800, h: 600, label: "Rendang", bg: "#C1272D" },
  { path: "public/images/products/sapi-lada-hitam.webp", w: 800, h: 600, label: "Lada Hitam", bg: "#4A2C1D" },
  { path: "public/images/products/ayam-kuluyuk.webp", w: 800, h: 600, label: "Kuluyuk", bg: "#E8B84A", dark: false },
  { path: "public/images/products/mooncake.webp", w: 800, h: 600, label: "Mooncake", bg: "#B8860B" },
  { path: "public/images/products/nasi-box.webp", w: 800, h: 600, label: "Nasi Box", bg: "#7A5C4A" },
  { path: "public/og-image.png", w: 1200, h: 630, label: "Dapoer Mama Ami — Rasa Tradisi, 100% Tumbuhan", bg: "#FFF8E7", dark: true },
];
const igBg = ["#5A7D3A", "#C1272D", "#E8B84A", "#4A2C1D", "#7A5C4A", "#F5EDD8"];
for (let i = 1; i <= 6; i++) {
  targets.push({
    path: `public/images/ig/${i}.webp`,
    w: 400,
    h: 400,
    label: `IG ${i}`,
    bg: igBg[i - 1],
    dark: i === 6,
  });
}

for (const t of targets) {
  await mkdir(t.path.substring(0, t.path.lastIndexOf("/")), { recursive: true });
  const fg = t.dark ? "#4A2C1D" : "#FFF8E7";
  const fontSize = t.label.length > 20 ? Math.round(t.w / 28) : Math.round(t.w / 12);
  const svg = `<svg width="${t.w}" height="${t.h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${t.bg}"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="${fontSize}" fill="${t.fg}" text-anchor="middle" dominant-baseline="middle">${t.label}</text>
</svg>`;
  const buf = Buffer.from(svg);
  if (t.path.endsWith(".png")) {
    await sharp(buf).png().toFile(t.path);
  } else {
    await sharp(buf).webp({ quality: 80 }).toFile(t.path);
  }
  console.log("OK", t.path);
}
