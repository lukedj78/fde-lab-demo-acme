export type DeliverySite = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

export type Customer = {
  id: string;
  name: string;
  deliverySites: DeliverySite[];
};

export type Order = {
  id: string;
  customerId: string;
  deliverySiteId: string;
  totalCents: number;
};
