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
