import { customers } from "@/lib/mock-data";
import type { DeliverySite } from "@/lib/types";

// Non c'è ancora autenticazione: il cliente collegato è fissato a questo mock.
export const CURRENT_CUSTOMER_ID = "cust-1";

export function getCustomerDeliverySites(customerId: string): DeliverySite[] {
  return customers.find((customer) => customer.id === customerId)?.deliverySites ?? [];
}

export default function SediPage() {
  const sites = getCustomerDeliverySites(CURRENT_CUSTOMER_ID);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">Sedi di consegna</h1>
      {sites.length === 0 ? (
        <p className="mt-4 text-zinc-600">
          Non ci sono sedi di consegna configurate per questo cliente.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-200">
          {sites.map((site) => (
            <li key={site.id} className="py-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">{site.name}</span>
                {site.isDefault && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Predefinita
                  </span>
                )}
              </div>
              <p className="text-zinc-600">{site.address}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
