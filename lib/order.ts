import type { OrderStatus } from "@/lib/order-status";

export type OrderAddress = {
  destinatario: string;
  via: string;
  citta: string;
  cap: string;
  provincia: string;
};

export type OrderLine = {
  descrizione: string;
  quantita: number;
  /** Prezzo unitario in centesimi di euro. */
  prezzoUnitarioCents: number;
  /** Subtotale di riga in centesimi di euro (quantita * prezzoUnitarioCents). */
  subtotaleCents: number;
};

export type Order = {
  id: string;
  numero: string;
  clienteId: string;
  data: string;
  stato: OrderStatus;
  righe: OrderLine[];
  /** Totale dell'ordine in centesimi di euro (somma dei subtotali delle righe). */
  totaleCents: number;
  indirizzoSpedizione?: OrderAddress;
};
