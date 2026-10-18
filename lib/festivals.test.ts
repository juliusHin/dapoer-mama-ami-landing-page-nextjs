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
