import { formatOrderTotal } from "@/lib/format-order-total";
import type { Order } from "@/lib/order";
import { ORDER_STATUS_LABELS } from "@/lib/order-status";

export type OrderListRow = {
  id: string;
  numero: string;
  data: string;
  statoLabel: string;
  totaleFormattato: string;
  href: string;
};

export type OrderListView = {
  rows: OrderListRow[];
  isEmpty: boolean;
};

/** Prepara le righe dell'elenco ordini: ordinamento per data decrescente e link al dettaglio. */
export function buildOrderListView(orders: Order[]): OrderListView {
  const rows = [...orders]
    .sort((a, b) => b.data.localeCompare(a.data))
    .map((order) => ({
      id: order.id,
      numero: order.numero,
      data: order.data,
      statoLabel: ORDER_STATUS_LABELS[order.stato],
      totaleFormattato: formatOrderTotal(order.totaleCents),
      href: `/ordini/${order.id}`,
    }));

  return { rows, isEmpty: rows.length === 0 };
}
