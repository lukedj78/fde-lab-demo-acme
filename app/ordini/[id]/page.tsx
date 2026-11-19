import { CURRENT_CUSTOMER_ID } from "@/app/sedi/page";
import { getCustomerOrders, type OrderWithDeliverySite } from "@/app/ordini/page";
import { formatOrderTotal } from "@/lib/format-order-total";

export function getOrderById(id: string): OrderWithDeliverySite | undefined {
  return getCustomerOrders(CURRENT_CUSTOMER_ID).find((order) => order.id === id);
}

export default async function OrdineDettaglioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-3xl font-semibold">Ordine non trovato</h1>
        <p className="mt-4 text-zinc-600">Nessun ordine corrisponde all&apos;id indicato.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">Ordine {order.id}</h1>
      <p className="mt-4 text-zinc-600">
        Sede di consegna: {order.deliverySite.name} — {order.deliverySite.address}
      </p>
      <p className="mt-2 text-lg font-medium">Totale: {formatOrderTotal(order.totalCents)}</p>
    </main>
  );
}
