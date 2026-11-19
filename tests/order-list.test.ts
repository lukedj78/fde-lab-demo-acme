import { describe, expect, it } from "vitest";
import { CURRENT_CUSTOMER_ID } from "@/app/sedi/page";
import { getCustomerOrders } from "@/app/ordini/page";
import { getOrderById } from "@/app/ordini/[id]/page";
import { orders } from "@/lib/mock-data";
import { formatOrderTotal } from "@/lib/format-order-total";

describe("elenco ordini del cliente", () => {
  it("elenca tutti gli ordini del cliente con sede di consegna e totale formattato", () => {
    const expectedOrders = orders.filter((order) => order.customerId === CURRENT_CUSTOMER_ID);
    const customerOrders = getCustomerOrders(CURRENT_CUSTOMER_ID);

    expect(customerOrders).toHaveLength(expectedOrders.length);
    for (const order of customerOrders) {
      expect(order.deliverySite.address.trim().length).toBeGreaterThan(0);
      expect(formatOrderTotal(order.totalCents)).toMatch(/€/);
    }
  });

  it("restituisce un elenco vuoto se il cliente non ha ordini", () => {
    expect(getCustomerOrders("cust-senza-ordini")).toEqual([]);
  });
});

describe("dettaglio di un ordine", () => {
  it("mostra il dettaglio completo di un ordine esistente, inclusa la sede di consegna", () => {
    const existingOrder = orders.find((order) => order.customerId === CURRENT_CUSTOMER_ID)!;

    const order = getOrderById(existingOrder.id);

    expect(order).toBeDefined();
    expect(order!.totalCents).toBe(existingOrder.totalCents);
    expect(order!.deliverySite.id).toBe(existingOrder.deliverySiteId);
    expect(order!.deliverySite.address.trim().length).toBeGreaterThan(0);
  });

  it("restituisce undefined per un id ordine inesistente", () => {
    expect(getOrderById("order-inesistente")).toBeUndefined();
  });
});
