import { describe, expect, it } from "vitest";
import { CURRENT_CUSTOMER_ID, getCustomerDeliverySites } from "@/app/sedi/page";
import { customers } from "@/lib/mock-data";

describe("sedi di consegna", () => {
  it("elenca tutte le sedi del cliente collegato con indirizzo completo", () => {
    const customer = customers.find((c) => c.id === CURRENT_CUSTOMER_ID)!;
    const sites = getCustomerDeliverySites(CURRENT_CUSTOMER_ID);

    expect(sites).toHaveLength(customer.deliverySites.length);
    for (const site of sites) {
      expect(site.address.trim().length).toBeGreaterThan(0);
    }
  });

  it("segnala esattamente una sede come predefinita", () => {
    const sites = getCustomerDeliverySites(CURRENT_CUSTOMER_ID);
    expect(sites.filter((site) => site.isDefault)).toHaveLength(1);
  });

  it("restituisce un elenco vuoto se il cliente non ha sedi", () => {
    expect(getCustomerDeliverySites("cust-senza-sedi")).toEqual([]);
  });
});
