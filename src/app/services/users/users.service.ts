import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Users } from '../../interfaces/users';

export const SERVICES_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient
  ) {}

  getAllUsers() {
    return this.http.get<Users[]>(`${SERVICES_URL}/users`);
  }

  getUserById(id: string) {
    return this.http.get<Users[]>(`${SERVICES_URL}/users/${id}`);
  }

  createUser(data) {
    return this.http.post<Users[]>(`${SERVICES_URL}/users`, data);
  }

  updateUser(id: string, data: any) {
    return this.http.patch<Users[]>(`${SERVICES_URL}/users/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete<Users[]>(`${SERVICES_URL}/users/${id}`);
  }
}
