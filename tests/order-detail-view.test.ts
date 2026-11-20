import { describe, expect, it } from "vitest";
import { getOrderDetailView } from "@/app/ordini/[id]/order-detail-view";
import { DEMO_CUSTOMER_ID, MOCK_ORDERS } from "@/lib/mock-orders";

const ordineConIndirizzo = MOCK_ORDERS.find(
  (order) =>
    order.clienteId === DEMO_CUSTOMER_ID && order.indirizzoSpedizione,
)!;

const ordineAltroCliente = MOCK_ORDERS.find(
  (order) => order.clienteId !== DEMO_CUSTOMER_ID,
)!;

describe("getOrderDetailView", () => {
  it("la vista dettaglio include numero data stato e indirizzo quando presente", () => {
    const view = getOrderDetailView(DEMO_CUSTOMER_ID, ordineConIndirizzo.id);

    expect(view.trovato).toBe(true);
    if (!view.trovato) return;

    expect(view.numero).toBe(ordineConIndirizzo.numero);
    expect(view.data).toBe(ordineConIndirizzo.data);
    expect(view.statoLabel.length).toBeGreaterThan(0);
    expect(view.indirizzoSpedizione).toEqual(
      ordineConIndirizzo.indirizzoSpedizione,
    );
  });

  it("la vista dettaglio include le righe articolo con subtotale", () => {
    const view = getOrderDetailView(DEMO_CUSTOMER_ID, ordineConIndirizzo.id);

    expect(view.trovato).toBe(true);
    if (!view.trovato) return;

    expect(view.righe).toHaveLength(ordineConIndirizzo.righe.length);
    view.righe.forEach((riga, index) => {
      const rigaOriginale = ordineConIndirizzo.righe[index];
      expect(riga.descrizione).toBe(rigaOriginale.descrizione);
      expect(riga.quantita).toBe(rigaOriginale.quantita);
      expect(riga.prezzoUnitarioFormattato).toContain("€");
      expect(riga.subtotaleFormattato).toContain("€");
    });
  });

  it("il totale della vista dettaglio corrisponde alla somma dei subtotali delle righe", () => {
    MOCK_ORDERS.filter((order) => order.clienteId === DEMO_CUSTOMER_ID).forEach(
      (order) => {
        const view = getOrderDetailView(DEMO_CUSTOMER_ID, order.id);
        expect(view.trovato).toBe(true);
        if (!view.trovato) return;

        const sommaSubtotaliCents = order.righe.reduce(
          (sum, riga) => sum + riga.subtotaleCents,
          0,
        );
        expect(order.totaleCents).toBe(sommaSubtotaliCents);
        expect(view.totaleFormattato).toBe(
          new Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
          }).format(order.totaleCents / 100),
        );
      },
    );
  });

  it("la vista dettaglio segnala non trovato per un ordine inesistente", () => {
    const view = getOrderDetailView(DEMO_CUSTOMER_ID, "ord-inesistente");

    expect(view.trovato).toBe(false);
  });

  it("la vista dettaglio segnala non trovato per un ordine di un altro cliente", () => {
    const view = getOrderDetailView(DEMO_CUSTOMER_ID, ordineAltroCliente.id);

    expect(view.trovato).toBe(false);
  });
});
