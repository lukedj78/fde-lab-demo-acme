import Link from "next/link";
import { getOrdersForCustomer, DEMO_CUSTOMER_ID } from "@/lib/mock-orders";
import { getOrderDetailView } from "./order-detail-view";

export function generateStaticParams() {
  return getOrdersForCustomer(DEMO_CUSTOMER_ID).map((order) => ({
    id: order.id,
  }));
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const view = getOrderDetailView(DEMO_CUSTOMER_ID, id);

  if (!view.trovato) {
    return (
      <main className="mx-auto max-w-2xl p-4 sm:p-8">
        <p className="text-zinc-600">Ordine non trovato.</p>
        <Link href="/ordini" className="mt-4 inline-block text-blue-600 underline">
          Torna all&apos;elenco ordini
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-8">
      <Link href="/ordini" className="text-sm text-blue-600 underline">
        &larr; Torna all&apos;elenco ordini
      </Link>

      <h1 className="mt-4 text-2xl font-semibold break-words">
        Ordine {view.numero}
      </h1>

      <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600">
        <div>
          <dt className="inline font-medium">Data:</dt>{" "}
          <dd className="inline">{view.data}</dd>
        </div>
        <div>
          <dt className="inline font-medium">Stato:</dt>{" "}
          <dd className="inline">
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-800">
              {view.statoLabel}
            </span>
          </dd>
        </div>
      </dl>

      <h2 className="mt-6 text-lg font-semibold">Articoli</h2>
      <ul className="mt-2 divide-y divide-zinc-200">
        {view.righe.map((riga, index) => (
          <li key={index} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2">
            <span className="break-words">
              {riga.descrizione} &times; {riga.quantita} (
              {riga.prezzoUnitarioFormattato} cad.)
            </span>
            <span className="font-medium whitespace-nowrap">{riga.subtotaleFormattato}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 flex justify-between border-t border-zinc-200 pt-4 text-lg font-semibold">
        <span>Totale</span>
        <span>{view.totaleFormattato}</span>
      </p>

      {view.indirizzoSpedizione && (
        <>
          <h2 className="mt-6 text-lg font-semibold">Indirizzo di spedizione</h2>
          <address className="mt-2 not-italic text-zinc-600">
            {view.indirizzoSpedizione.destinatario}
            <br />
            {view.indirizzoSpedizione.via}
            <br />
            {view.indirizzoSpedizione.cap} {view.indirizzoSpedizione.citta} (
            {view.indirizzoSpedizione.provincia})
          </address>
        </>
      )}
    </main>
  );
}
