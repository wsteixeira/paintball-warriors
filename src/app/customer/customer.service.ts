import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Customer, ResponseCustomers } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly endpoint = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  createResource(resource: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.endpoint, resource);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  getResources(params?: HttpParams): Observable<ResponseCustomers> {
    return this.http.get<ResponseCustomers>(this.endpoint, { params });
  }

  getResource(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.endpoint}/${id}`);
  }

  updateResource(id: number, resource: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.endpoint}/${id}`, resource);
  }
}
