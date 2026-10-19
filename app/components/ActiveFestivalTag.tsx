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
