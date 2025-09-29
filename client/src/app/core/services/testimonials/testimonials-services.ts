import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly message: string;
  readonly photo: string;
  readonly rating: number;
  readonly approved: boolean;
  readonly order: number;
  readonly isActive: boolean;
  readonly createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestimonialsServices {
  private apiUrl = `${environment.apiUrl}/testimonials`;

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<{ testimonials: Testimonial[] }> {
    return this.http
      .get<{ testimonials: Testimonial[] }>(this.apiUrl)
  }

  
}
