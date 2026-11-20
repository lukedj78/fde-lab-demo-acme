import Link from "next/link";
import { buildOrderListView } from "@/app/ordini/order-list-view";
import { DEMO_CUSTOMER_ID, getOrdersForCustomer } from "@/lib/mock-orders";

export default function OrdiniPage() {
  const orders = getOrdersForCustomer(DEMO_CUSTOMER_ID);
  const view = buildOrderListView(orders);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">I miei ordini</h1>

      {view.isEmpty ? (
        <p className="mt-4 text-zinc-600">Non hai ancora effettuato ordini.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {view.rows.map((row) => (
            <li key={row.id}>
              <Link
                href={row.href}
                className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 hover:border-zinc-400 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium">{row.numero}</span>
                <span className="text-sm text-zinc-600">{row.data}</span>
                <span className="w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-sm text-zinc-700">
                  {row.statoLabel}
                </span>
                <span className="font-medium">{row.totaleFormattato}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
