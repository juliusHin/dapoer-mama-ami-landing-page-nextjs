import { describe, expect, it } from "bun:test";
import { daysUntil, festivals, getNextFestival } from "./festivals";

describe("getNextFestival", () => {
  it("mengembalikan Imlek jika sekarang sebelum deadline PO Imlek", () => {
    expect(getNextFestival(new Date("2026-10-18T12:00:00+07:00")).id).toBe(
      "imlek"
    );
  });

  it("mengembalikan Mooncake setelah deadline Duan Wu", () => {
    expect(getNextFestival(new Date("2027-06-05T12:00:00+07:00")).id).toBe(
      "mooncake"
    );
  });

  it("null jika semua deadline terlewat", () => {
    expect(getNextFestival(new Date("2028-01-01T12:00:00+07:00"))).toBeNull();
  });
});

describe("daysUntil", () => {
  it("menghitung selisih hari dibulatkan ke atas", () => {
    expect(
      daysUntil("2027-01-27T23:59:59+07:00", new Date("2027-01-17T23:59:59+07:00"))
    ).toBe(10);
  });
});

describe("batas deadline PO", () => {
  it("tepat di momen deadline: festival sudah tidak tersedia (eksklusif)", () => {
    expect(getNextFestival(new Date("2027-01-27T23:59:59+07:00")).id).toBe("ce-it");
  });

  it("satu detik sebelum deadline: masih tersedia", () => {
    expect(getNextFestival(new Date("2027-01-27T23:59:58+07:00")).id).toBe("imlek");
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
