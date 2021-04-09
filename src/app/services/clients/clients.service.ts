import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Clients } from '../../interfaces/clients';

export const SERVICES_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class ClientsService {
  constructor(
    private http: HttpClient
  ) {}

  getClients() {
    return this.http.get<Clients[]>(`${SERVICES_URL}/clients`);
  }

  getClientById(id: string) {
    return this.http.get<Clients[]>(`${SERVICES_URL}/clients/${id}`);
  }

  addClient(data) {
    return this.http.post(`${SERVICES_URL}/clients`, data);
  }

  updateClient(id, data) {
    return this.http.patch(`${SERVICES_URL}/clients/${id}`, data);
  }

  deleteClient(id) {
    return this.http.delete(`${SERVICES_URL}/clients/${id}`)
  }
}
