import { describe, expect, it } from "vitest";
import { formatOrderTotal } from "@/lib/format-order-total";

describe("formatOrderTotal", () => {
  it("formatta i centesimi in euro con la virgola decimale", () => {
    expect(formatOrderTotal(1234567).replace(/\s/g, " ")).toBe("12.345,67 €");
  });
  it("gestisce lo zero", () => {
    expect(formatOrderTotal(0).replace(/\s/g, " ")).toBe("0,00 €");
  });
});
