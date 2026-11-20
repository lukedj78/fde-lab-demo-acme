import type { Order } from "@/lib/order";

/** Cliente demo fisso: nessuna autenticazione reale nell'MVP. */
export const DEMO_CUSTOMER_ID = "cliente-demo";

const ALTRO_CLIENTE_ID = "cliente-altro";

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-1001",
    numero: "ORD-1001",
    clienteId: DEMO_CUSTOMER_ID,
    data: "2026-01-15",
    stato: "consegnato",
    righe: [
      {
        descrizione: "Tastiera meccanica",
        quantita: 1,
        prezzoUnitarioCents: 8900,
        subtotaleCents: 8900,
      },
      {
        descrizione: "Mouse wireless",
        quantita: 2,
        prezzoUnitarioCents: 2500,
        subtotaleCents: 5000,
      },
    ],
    totaleCents: 13900,
    indirizzoSpedizione: {
      destinatario: "Mario Rossi",
      via: "Via Roma 10",
      citta: "Milano",
      cap: "20100",
      provincia: "MI",
    },
  },
  {
    id: "ord-1002",
    numero: "ORD-1002",
    clienteId: DEMO_CUSTOMER_ID,
    data: "2026-02-20",
    stato: "spedito",
    righe: [
      {
        descrizione: "Monitor 27 pollici",
        quantita: 1,
        prezzoUnitarioCents: 24900,
        subtotaleCents: 24900,
      },
    ],
    totaleCents: 24900,
    indirizzoSpedizione: {
      destinatario: "Mario Rossi",
      via: "Via Roma 10",
      citta: "Milano",
      cap: "20100",
      provincia: "MI",
    },
  },
  {
    id: "ord-1003",
    numero: "ORD-1003",
    clienteId: DEMO_CUSTOMER_ID,
    data: "2026-03-05",
    stato: "in_lavorazione",
    righe: [
      {
        descrizione: "Webcam HD",
        quantita: 1,
        prezzoUnitarioCents: 4500,
        subtotaleCents: 4500,
      },
      {
        descrizione: "Microfono USB",
        quantita: 1,
        prezzoUnitarioCents: 6000,
        subtotaleCents: 6000,
      },
      {
        descrizione: "Cuffie con microfono",
        quantita: 1,
        prezzoUnitarioCents: 3500,
        subtotaleCents: 3500,
      },
    ],
    totaleCents: 14000,
  },
  {
    id: "ord-1004",
    numero: "ORD-1004",
    clienteId: DEMO_CUSTOMER_ID,
    data: "2025-11-01",
    stato: "annullato",
    righe: [
      {
        descrizione: "Stampante laser",
        quantita: 1,
        prezzoUnitarioCents: 15900,
        subtotaleCents: 15900,
      },
    ],
    totaleCents: 15900,
  },
  {
    id: "ord-2001",
    numero: "ORD-2001",
    clienteId: ALTRO_CLIENTE_ID,
    data: "2026-03-10",
    stato: "consegnato",
    righe: [
      {
        descrizione: "Sedia da ufficio",
        quantita: 1,
        prezzoUnitarioCents: 19900,
        subtotaleCents: 19900,
      },
    ],
    totaleCents: 19900,
  },
];

/** Restituisce gli ordini del cliente demo, ordinati per data decrescente. */
export function getOrdersForCustomer(customerId: string): Order[] {
  return MOCK_ORDERS.filter((order) => order.clienteId === customerId).sort(
    (a, b) => b.data.localeCompare(a.data),
  );
}

/**
 * Restituisce l'ordine richiesto se appartiene al cliente indicato,
 * altrimenti undefined (ordine inesistente o di un altro cliente).
 */
export function getOrderForCustomer(
  customerId: string,
  orderId: string,
): Order | undefined {
  return MOCK_ORDERS.find(
    (order) => order.id === orderId && order.clienteId === customerId,
  );
}
