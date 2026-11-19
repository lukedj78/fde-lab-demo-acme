import Link from "next/link";
import { CURRENT_CUSTOMER_ID } from "@/app/sedi/page";
import { customers, orders } from "@/lib/mock-data";
import { formatOrderTotal } from "@/lib/format-order-total";
import type { DeliverySite, Order } from "@/lib/types";

export type OrderWithDeliverySite = Order & { deliverySite: DeliverySite };

export function getCustomerOrders(customerId: string): OrderWithDeliverySite[] {
  const customer = customers.find((c) => c.id === customerId);
  if (!customer) return [];

  const result: OrderWithDeliverySite[] = [];
  for (const order of orders) {
    if (order.customerId !== customerId) continue;
    const deliverySite = customer.deliverySites.find((site) => site.id === order.deliverySiteId);
    if (deliverySite) result.push({ ...order, deliverySite });
  }
  return result;
}

export default function OrdiniPage() {
  const customerOrders = getCustomerOrders(CURRENT_CUSTOMER_ID);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">Ordini</h1>
      {customerOrders.length === 0 ? (
        <p className="mt-4 text-zinc-600">Non ci sono ordini per questo cliente.</p>
      ) : (
        <table className="mt-4 w-full divide-y divide-zinc-200">
          <thead>
            <tr className="text-left">
              <th className="py-2">Sede di consegna</th>
              <th className="py-2">Totale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {customerOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2">
                  <Link href={`/ordini/${order.id}`} className="text-blue-600 hover:underline">
                    {order.deliverySite.name} — {order.deliverySite.address}
                  </Link>
                </td>
                <td className="py-2">{formatOrderTotal(order.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
