import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IServices } from '../../interfaces/IServices';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getServices() {
    return this.http.get<any>(`${this.baseUrl}/services`);
  }
}
