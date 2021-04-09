import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Items } from '../../interfaces/items';

export const SERVICES_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(
    private http: HttpClient
  ) {}

  getAllItems() {
    return this.http.get<Items[]>(`${SERVICES_URL}/items`);
  }

  getItemById(id: string) {
    return this.http.get<Items[]>(`${SERVICES_URL}/items/${id}`);
  }

  createItem(data: any) {
    return this.http.post<Items[]>(`${SERVICES_URL}/items`, data);
  }

  updateItem(id: string, data: any) {
    return this.http.patch<Items[]>(`${SERVICES_URL}/items/${id}`, data);
  }

  deleteItem(id: string) {
    return this.http.delete(`${SERVICES_URL}/items/${id}`);
  }
}
