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
