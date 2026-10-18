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
