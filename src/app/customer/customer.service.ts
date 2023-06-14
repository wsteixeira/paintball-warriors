import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly endpoint = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getResources(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.endpoint);
  }

  createResource(resource: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.endpoint, resource);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeResource(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
