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
