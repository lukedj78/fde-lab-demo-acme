import { formatOrderTotal } from "@/lib/format-order-total";
import { getOrderForCustomer } from "@/lib/mock-orders";
import { ORDER_STATUS_LABELS } from "@/lib/order-status";

export type OrderDetailLine = {
  descrizione: string;
  quantita: number;
  prezzoUnitarioFormattato: string;
  subtotaleFormattato: string;
};

export type OrderDetailView =
  | {
      trovato: true;
      numero: string;
      data: string;
      statoLabel: string;
      righe: OrderDetailLine[];
      totaleFormattato: string;
      indirizzoSpedizione?: {
        destinatario: string;
        via: string;
        citta: string;
        cap: string;
        provincia: string;
      };
    }
  | { trovato: false };

/**
 * Recupera e valida l'ordine per il cliente indicato, distinguendo un ordine
 * trovato da uno non trovato (inesistente o di un altro cliente).
 */
export function getOrderDetailView(
  customerId: string,
  orderId: string,
): OrderDetailView {
  const order = getOrderForCustomer(customerId, orderId);

  if (!order) {
    return { trovato: false };
  }

  return {
    trovato: true,
    numero: order.numero,
    data: order.data,
    statoLabel: ORDER_STATUS_LABELS[order.stato],
    righe: order.righe.map((riga) => ({
      descrizione: riga.descrizione,
      quantita: riga.quantita,
      prezzoUnitarioFormattato: formatOrderTotal(riga.prezzoUnitarioCents),
      subtotaleFormattato: formatOrderTotal(riga.subtotaleCents),
    })),
    totaleFormattato: formatOrderTotal(order.totaleCents),
    indirizzoSpedizione: order.indirizzoSpedizione,
  };
}
