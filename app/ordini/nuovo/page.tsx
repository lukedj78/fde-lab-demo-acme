"use client";

import { useState, type FormEvent } from "react";
import { CURRENT_CUSTOMER_ID, getCustomerDeliverySites } from "@/app/sedi/page";
import { customers } from "@/lib/mock-data";
import { createOrder, type CreatedOrder } from "@/lib/create-order";
import { formatOrderTotal } from "@/lib/format-order-total";

export default function NuovoOrdinePage() {
  const customer = customers.find((c) => c.id === CURRENT_CUSTOMER_ID);
  const deliverySites = getCustomerDeliverySites(CURRENT_CUSTOMER_ID);

  const [deliverySiteId, setDeliverySiteId] = useState("");
  const [totalInput, setTotalInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<CreatedOrder | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!customer) {
      setError("Cliente non trovato.");
      return;
    }
    if (!deliverySiteId) {
      setError("Seleziona una sede di consegna prima di creare l'ordine.");
      return;
    }

    const totalCents = Math.round(Number(totalInput.replace(",", ".")) * 100);
    if (!Number.isFinite(totalCents) || totalCents <= 0) {
      setError("Inserisci un totale valido.");
      return;
    }

    setCreatedOrder(createOrder(customer, deliverySiteId, totalCents));
  }

  if (createdOrder) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <h1 className="text-3xl font-semibold">Ordine creato</h1>
        <p className="mt-4 text-zinc-600">
          Sede di consegna: {createdOrder.deliverySite.name} — {createdOrder.deliverySite.address}
        </p>
        <p className="mt-2 text-lg font-medium">
          Totale: {formatOrderTotal(createdOrder.totalCents)}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">Nuovo ordine</h1>
      {!customer || deliverySites.length === 0 ? (
        <p className="mt-4 text-zinc-600">
          Nessuna sede di consegna disponibile per questo cliente: impossibile creare un ordine.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-medium">Sede di consegna</span>
            <select
              required
              value={deliverySiteId}
              onChange={(event) => setDeliverySiteId(event.target.value)}
              className="rounded border border-zinc-300 p-2"
            >
              <option value="">Seleziona una sede...</option>
              {deliverySites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name} — {site.address}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-medium">Totale ordine (€)</span>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={totalInput}
              onChange={(event) => setTotalInput(event.target.value)}
              className="rounded border border-zinc-300 p-2"
            />
          </label>

          {error && <p className="text-red-600">{error}</p>}

          <button type="submit" className="rounded bg-zinc-900 px-4 py-2 text-white">
            Crea ordine
          </button>
        </form>
      )}
    </main>
  );
}
