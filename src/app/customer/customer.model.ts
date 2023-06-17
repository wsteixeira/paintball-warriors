export interface Customer {
  id: number;
  name: string;
  city: string;
  state: string;
  federalId: string;
  email: string;
}

export interface ResponseCustomers {
  total?: number;
  hasNext?: boolean;
  items: Customer[];
}
