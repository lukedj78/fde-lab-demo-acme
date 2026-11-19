import { describe, expect, it } from "vitest";
import { customers, orders } from "@/lib/mock-data";

describe("mock-data", () => {
  it("include almeno 2 clienti", () => {
    expect(customers.length).toBeGreaterThanOrEqual(2);
  });

  it("ogni cliente ha almeno una sede di consegna predefinita", () => {
    for (const customer of customers) {
      expect(customer.deliverySites.length).toBeGreaterThan(0);
      expect(customer.deliverySites.filter((site) => site.isDefault)).toHaveLength(1);
    }
  });

  it("almeno un cliente ha più di una sede di consegna", () => {
    expect(customers.some((customer) => customer.deliverySites.length > 1)).toBe(true);
  });

  it("ogni ordine riferisce una sede di consegna del proprio cliente", () => {
    for (const order of orders) {
      const customer = customers.find((c) => c.id === order.customerId);
      expect(customer).toBeDefined();
      expect(customer!.deliverySites.some((site) => site.id === order.deliverySiteId)).toBe(true);
    }
  });
});
