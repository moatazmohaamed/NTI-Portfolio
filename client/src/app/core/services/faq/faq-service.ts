import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/faqs';
  getFAQs() {
    return this.http.get<any>(this.apiUrl);
  }
}
