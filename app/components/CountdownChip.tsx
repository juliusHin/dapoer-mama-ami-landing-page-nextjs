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

  return (
    <div className="min-h-10" aria-live="polite">
      {info && (
        <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-gold/40 bg-gold-light px-4 py-2 text-xs font-medium text-brown md:text-sm">
          {info.days === 0
            ? `⏳ PO ${info.name} ditutup HARI INI`
            : `⏳ PO ${info.name} ditutup ${info.days} hari lagi`}
        </div>
      )}
    </div>
  );
}
