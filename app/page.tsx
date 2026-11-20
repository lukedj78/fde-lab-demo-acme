import Link from "next/link";
import { formatOrderTotal } from "@/lib/format-order-total";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-semibold">Portale ordini Acme</h1>
      <p className="mt-4 text-zinc-600">
        Qui i clienti Acme potranno consultare e gestire i propri ordini.
        Pagina segnaposto di una demo.
      </p>
      <p className="mt-4">Esempio di totale ordine: {formatOrderTotal(1234567)}</p>
      <p className="mt-4">
        <Link href="/ordini" className="font-medium text-blue-600 hover:underline">
          Vai ai miei ordini
        </Link>
      </p>
    </main>
  );
}
