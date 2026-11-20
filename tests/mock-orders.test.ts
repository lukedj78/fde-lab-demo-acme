import { describe, expect, it } from "vitest";
import {
  DEMO_CUSTOMER_ID,
  MOCK_ORDERS,
  getOrderForCustomer,
  getOrdersForCustomer,
} from "@/lib/mock-orders";

describe("getOrdersForCustomer", () => {
  it("getOrdersForCustomer restituisce solo gli ordini del cliente demo ordinati per data decrescente", () => {
    const orders = getOrdersForCustomer(DEMO_CUSTOMER_ID);

    expect(orders.length).toBeGreaterThan(0);
    orders.forEach((order) => {
      expect(order.clienteId).toBe(DEMO_CUSTOMER_ID);
    });

    const dates = orders.map((order) => order.data);
    const sortedDesc = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sortedDesc);
  });
});

describe("dataset mock", () => {
  it("il totale di ogni ordine mock corrisponde alla somma dei subtotali delle righe", () => {
    MOCK_ORDERS.forEach((order) => {
      const sommaSubtotali = order.righe.reduce(
        (sum, riga) => sum + riga.subtotaleCents,
        0,
      );
      expect(order.totaleCents).toBe(sommaSubtotali);
    });
  });
});

describe("getOrderForCustomer", () => {
  it("getOrderForCustomer restituisce undefined per un ordine inesistente o di un altro cliente", () => {
    expect(
      getOrderForCustomer(DEMO_CUSTOMER_ID, "ord-inesistente"),
    ).toBeUndefined();

    const ordineAltroCliente = MOCK_ORDERS.find(
      (order) => order.clienteId !== DEMO_CUSTOMER_ID,
    );
    expect(ordineAltroCliente).toBeDefined();
    expect(
      getOrderForCustomer(DEMO_CUSTOMER_ID, ordineAltroCliente!.id),
    ).toBeUndefined();
  });
});
