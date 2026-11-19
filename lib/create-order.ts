import type { Customer, DeliverySite } from "@/lib/types";

/**
 * Ordine creato: `deliverySite` è una copia della sede scelta al momento della
 * creazione, non l'id della sede. Così l'ordine resta invariato anche se in
 * seguito la sede viene rinominata, spostata o rimossa dal cliente.
 */
export type CreatedOrder = {
  id: string;
  customerId: string;
  deliverySite: DeliverySite;
  totalCents: number;
};

export function createOrder(
  customer: Customer,
  deliverySiteId: string,
  totalCents: number,
): CreatedOrder {
  const deliverySite = customer.deliverySites.find((site) => site.id === deliverySiteId);
  if (!deliverySite) {
    throw new Error("Seleziona una sede di consegna valida del cliente prima di creare l'ordine.");
  }

  return {
    id: `order-${crypto.randomUUID()}`,
    customerId: customer.id,
    deliverySite: { ...deliverySite },
    totalCents,
  };
}
