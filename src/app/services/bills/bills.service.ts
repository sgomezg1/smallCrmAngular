import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Bills } from '../../interfaces/bills';
import { Items } from '../../interfaces/items';

export const SERVICES_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class BillsService {
  constructor(
    private http: HttpClient
  ) {}

  getBills() {
    return this.http.get<Bills[]>(`${SERVICES_URL}/bills`);
  }

  getBillById(id: string) {
    return this.http.get<Bills[]>(`${SERVICES_URL}/bills/${id}`);
  }

  addBill(data: Bills) {
    return this.http.post<Bills[]>(`${SERVICES_URL}/bills`, data)
  }

  updateBillById(id: string, data: any) {
    return this.http.patch<Bills[]>(`${SERVICES_URL}/bills/${id}`, data)
  }

  deleteBillById(id: string) {
    return this.http.delete<Bills[]>(`${SERVICES_URL}/bills/${id}`);
  }

  getItemsByBill(id: string) {
    return this.http.get<Items[]>(`${SERVICES_URL}/bills/${id}/items`);
  }

  // Routes to local server to generate PDF and send PDF to client via email

  generatePdf(data) {
    return this.http.post(`http://localhost:3000/bill-pdf`, data, {
      responseType: 'arraybuffer'
    });
  }
  
  sendEmailPdf(data) {
    return this.http.post(`http://localhost:3000/send-bill-pdf`, data);
  }
}
