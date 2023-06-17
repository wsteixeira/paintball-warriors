export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ResponseUsers {
  total?: number;
  hasNext?: boolean;
  items: User[];
}
