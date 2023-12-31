import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsers, User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  createResource(resource: User): Observable<User> {
    return this.http.post<User>(this.endpoint, resource);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  getResources(params?: HttpParams): Observable<ResponseUsers> {
    return this.http.get<ResponseUsers>(this.endpoint, { params });
  }

  getResource(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  updateResource(id: number, resource: User): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/${id}`, resource);
  }
}
