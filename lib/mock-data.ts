import type { Customer, Order } from "@/lib/types";

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Rossi Costruzioni Srl",
    deliverySites: [
      {
        id: "site-1-sede",
        name: "Sede legale",
        address: "Via Roma 10, Milano",
        isDefault: true,
      },
      {
        id: "site-1-cantiere",
        name: "Cantiere Nord",
        address: "Via delle Industrie 45, Bergamo",
        isDefault: false,
      },
    ],
  },
  {
    id: "cust-2",
    name: "Bianchi Edilizia Spa",
    deliverySites: [
      {
        id: "site-2-sede",
        name: "Magazzino centrale",
        address: "Via Torino 22, Torino",
        isDefault: true,
      },
    ],
  },
];

export const orders: Order[] = [
  {
    id: "order-1",
    customerId: "cust-1",
    deliverySiteId: "site-1-sede",
    totalCents: 1234567,
  },
  {
    id: "order-2",
    customerId: "cust-1",
    deliverySiteId: "site-1-cantiere",
    totalCents: 50000,
  },
  {
    id: "order-3",
    customerId: "cust-2",
    deliverySiteId: "site-2-sede",
    totalCents: 987654,
  },
];
