import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const SERVICES_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginRegService {
  constructor(
    private http: HttpClient
  ) {}

  login(data) {
    return this.http.post(`${SERVICES_URL}/login`, data);
  }

  createUser(data) {
    return this.http.post(`${SERVICES_URL}/users`, data);
  }
}