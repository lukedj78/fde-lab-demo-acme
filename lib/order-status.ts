/** Insieme chiuso di stati possibili per un ordine, con etichette in italiano. */
export const ORDER_STATUSES = [
  "in_lavorazione",
  "spedito",
  "consegnato",
  "annullato",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  in_lavorazione: "In lavorazione",
  spedito: "Spedito",
  consegnato: "Consegnato",
  annullato: "Annullato",
};
