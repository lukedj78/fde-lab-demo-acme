/** Formatta un totale d'ordine in euro, formato italiano (es. "12.345,67 €"). */
export function formatOrderTotal(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
