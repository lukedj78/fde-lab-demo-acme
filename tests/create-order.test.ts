import { describe, expect, it } from "vitest";
import { createOrder } from "@/lib/create-order";
import { formatOrderTotal } from "@/lib/format-order-total";
import { customers } from "@/lib/mock-data";
import type { Customer } from "@/lib/types";

describe("createOrder", () => {
  it("registra sulla ordine la sede scelta tra quelle del cliente", () => {
    const customer = customers.find((c) => c.id === "cust-1")!;
    const site = customer.deliverySites[0];

    const order = createOrder(customer, site.id, 1234567);

    expect(order.customerId).toBe(customer.id);
    expect(order.deliverySite).toEqual(site);
    expect(formatOrderTotal(order.totalCents).replace(/\s/g, " ")).toBe("12.345,67 €");
  });

  it("rifiuta la creazione se non viene scelta una sede del cliente", () => {
    const customer = customers.find((c) => c.id === "cust-1")!;

    expect(() => createOrder(customer, "", 1000)).toThrow();
    expect(() => createOrder(customer, "sede-inesistente", 1000)).toThrow();
  });

  it("rifiuta una sede che appartiene a un altro cliente", () => {
    const customer1 = customers.find((c) => c.id === "cust-1")!;
    const customer2 = customers.find((c) => c.id === "cust-2")!;

    expect(() => createOrder(customer1, customer2.deliverySites[0].id, 1000)).toThrow();
  });

  it("la sede registrata resta invariata se in seguito le sedi del cliente cambiano", () => {
    // Copia profonda del cliente, come se arrivasse da uno store separato
    // dall'oggetto che verrà modificato in seguito.
    const customer: Customer = JSON.parse(JSON.stringify(customers.find((c) => c.id === "cust-1")));
    const site = customer.deliverySites[0];

    const order = createOrder(customer, site.id, 50000);

    // Le sedi del cliente cambiano dopo la creazione dell'ordine...
    customer.deliverySites[0] = { ...site, name: "Nome aggiornato", address: "Indirizzo aggiornato" };
    customer.deliverySites.pop();

    // ...ma la sede registrata sull'ordine resta quella scelta al momento della creazione.
    expect(order.deliverySite).toEqual(site);
  });
});
