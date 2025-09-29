import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/contact';

  sendContactForm(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}
