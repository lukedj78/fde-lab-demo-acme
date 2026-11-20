import { describe, expect, it } from "vitest";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/lib/order-status";

describe("order-status", () => {
  it("ogni stato ha un'etichetta in italiano univoca", () => {
    const labels = ORDER_STATUSES.map((status) => ORDER_STATUS_LABELS[status]);

    expect(labels).toHaveLength(ORDER_STATUSES.length);
    labels.forEach((label) => {
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    });
    expect(new Set(labels).size).toBe(labels.length);
  });
});
