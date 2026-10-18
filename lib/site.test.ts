import { describe, expect, it } from "bun:test";
import { waLink, waMessages } from "./site";

describe("waLink", () => {
  it("membuat URL wa.me dengan teks terenkode", () => {
    expect(waLink("Halo Mama!")).toBe(
      "https://wa.me/6287782238049?text=Halo%20Mama!"
    );
  });

  it("mengenkode emoji dan baris baru dengan aman", () => {
    const url = waLink("pesan 🎋\nbaris 2");
    expect(url).toContain("%F0%9F%8E%8B");
    expect(url).toContain("%0A");
  });
});

describe("waMessages.order", () => {
  it("menyisipkan nama produk", () => {
    expect(waMessages.order("Bacang Bangka")).toContain("Bacang Bangka");
  });
});
