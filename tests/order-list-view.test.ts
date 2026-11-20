import { describe, expect, it } from "vitest";
import { buildOrderListView } from "@/app/ordini/order-list-view";
import { formatOrderTotal } from "@/lib/format-order-total";
import { DEMO_CUSTOMER_ID, getOrdersForCustomer } from "@/lib/mock-orders";
import { ORDER_STATUS_LABELS } from "@/lib/order-status";

describe("buildOrderListView", () => {
  it("la vista elenco include solo gli ordini del cliente demo", () => {
    const orders = getOrdersForCustomer(DEMO_CUSTOMER_ID);
    const view = buildOrderListView(orders);

    expect(view.rows.length).toBe(orders.length);
    expect(view.rows.map((row) => row.id).sort()).toEqual(
      orders.map((order) => order.id).sort(),
    );
  });

  it("le righe della vista elenco sono ordinate per data decrescente", () => {
    const orders = getOrdersForCustomer(DEMO_CUSTOMER_ID);
    const view = buildOrderListView([...orders].reverse());

    const dates = view.rows.map((row) => row.data);
    const sortedDesc = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sortedDesc);
  });

  it("ogni riga della vista elenco include numero data stato e totale formattato", () => {
    const orders = getOrdersForCustomer(DEMO_CUSTOMER_ID);
    const view = buildOrderListView(orders);

    view.rows.forEach((row) => {
      const order = orders.find((o) => o.id === row.id)!;
      expect(row.numero).toBe(order.numero);
      expect(row.data).toBe(order.data);
      expect(row.statoLabel).toBe(ORDER_STATUS_LABELS[order.stato]);
      expect(row.totaleFormattato).toBe(formatOrderTotal(order.totaleCents));
    });
  });

  it("ogni riga della vista elenco include il link al dettaglio del proprio ordine", () => {
    const orders = getOrdersForCustomer(DEMO_CUSTOMER_ID);
    const view = buildOrderListView(orders);

    view.rows.forEach((row) => {
      expect(row.href).toBe(`/ordini/${row.id}`);
    });
  });

  it("la vista elenco segnala la lista vuota quando il cliente non ha ordini", () => {
    const view = buildOrderListView([]);

    expect(view.isEmpty).toBe(true);
    expect(view.rows).toHaveLength(0);
  });
});
