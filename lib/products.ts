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
