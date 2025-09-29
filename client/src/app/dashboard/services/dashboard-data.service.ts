import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  success?: boolean;
  status?: string;
  results?: number;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  image: string;
  link?: string;
  technologies: string[];
  category: Category | string;
  client: {
    name?: string;
    industry?: string;
  };
  featured: boolean;
  completionDate?: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  createdAt: string;
  updatedAt: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export interface Technology {
  name: string;
}

export interface Story {
  part1: string;
  part2: string;
  part3: string;
}

export interface CompanyInfo {
  foundedYear: string;
  mission: string;
  vision: string;
  story: Story;
}

export interface About {
  _id?: string;
  statistics: Statistic[];
  coreValues: CompanyValue[];
  technologies: Technology[];
  companyInfo: CompanyInfo;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
  };
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  photo?: string;
  rating: number;
  approved: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http
      .get<ApiResponse<Category[]>>(`${this.baseUrl}/categories`)
      .pipe(map((response) => response.data));
  }

  createCategory(data: FormData | any): Observable<Category> {
    return this.http
      .post<ApiResponse<Category>>(`${this.baseUrl}/categories`, data)
      .pipe(map((response) => response.data));
  }

  updateCategory(slug: string, data: FormData | any): Observable<Category> {
    return this.http
      .put<ApiResponse<Category>>(`${this.baseUrl}/categories/${slug}`, data)
      .pipe(map((response) => response.data));
  }

  deleteCategory(slug: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${slug}`);
  }

  // Projects
  getProjects(): Observable<Project[]> {
    return this.http
      .get<ApiResponse<Project[]>>(`${this.baseUrl}/projects`)
      .pipe(map((response) => response.data));
  }

  createProject(data: FormData): Observable<Project> {
    return this.http
      .post<ApiResponse<Project>>(`${this.baseUrl}/projects`, data)
      .pipe(map((response) => response.data));
  }

  updateProject(id: string, data: FormData): Observable<Project> {
    return this.http
      .put<ApiResponse<Project>>(`${this.baseUrl}/projects/${id}`, data)
      .pipe(map((response) => response.data));
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }

  // Services
  getServices(): Observable<Service[]> {
    return this.http
      .get<ApiResponse<Service[]>>(`${this.baseUrl}/services`)
      .pipe(map((response) => response.data));
  }

  createService(data: FormData): Observable<Service> {
    return this.http
      .post<ApiResponse<Service>>(`${this.baseUrl}/services`, data)
      .pipe(map((response) => response.data));
  }

  updateService(id: string, data: FormData): Observable<Service> {
    return this.http
      .put<ApiResponse<Service>>(`${this.baseUrl}/services/${id}`, data)
      .pipe(map((response) => response.data));
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/services/${id}`);
  }

  // Team Members
  getTeamMembers(): Observable<TeamMember[]> {
    const url = `${this.baseUrl}/team-members`;
    return this.http
      .get<ApiResponse<TeamMember[]>>(url)
      .pipe(map((response) => response.data));
  }

  createTeamMember(data: FormData): Observable<TeamMember> {
    const url = `${this.baseUrl}/team-members`;
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    return this.http
      .post<ApiResponse<TeamMember>>(url, data)
      .pipe(map((response) => response.data));
  }

  updateTeamMember(id: string, data: FormData): Observable<TeamMember> {
    const url = `${this.baseUrl}/team-members/${id}`;
    return this.http
      .put<ApiResponse<TeamMember>>(url, data)
      .pipe(map((response) => response.data));
  }

  deleteTeamMember(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/team-members/${id}`);
  }

  // Testimonials
  getTestimonials(): Observable<Testimonial[]> {
    return this.http
      .get<any>(`${this.baseUrl}/testimonials`)
      .pipe(map((response) => {
        // Handle the nested response structure from testimonials controller
        if (response.data && response.data.testimonials) {
          return response.data.testimonials;
        }
        return response.data || response;
      }));
  }

  createTestimonial(data: FormData): Observable<Testimonial> {
    return this.http
      .post<ApiResponse<Testimonial>>(`${this.baseUrl}/testimonials`, data)
      .pipe(map((response) => response.data));
  }

  updateTestimonial(id: string, data: FormData): Observable<Testimonial> {
    return this.http
      .put<ApiResponse<Testimonial>>(`${this.baseUrl}/testimonials/${id}`, data)
      .pipe(map((response) => response.data));
  }

  deleteTestimonial(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/testimonials/${id}`);
  }

  // FAQs
  getFAQs(): Observable<FAQ[]> {
    return this.http.get<any>(`${this.baseUrl}/faqs`);
  }

  createFAQ(data: any): Observable<FAQ> {
    return this.http.post<any>(`${this.baseUrl}/faqs`, data);
  }

  updateFAQ(id: string, data: any): Observable<FAQ> {
    return this.http.put<any>(`${this.baseUrl}/faqs/${id}`, data);
  }

  deleteFAQ(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/faqs/${id}`);
  }

  // Contacts
  getContacts(): Observable<Contact[]> {
    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/contact/submissions`)
      .pipe(map((response) => response.data));
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contact/submissions/${id}`);
  }

  // About Us
  getAbout(): Observable<About> {
    return this.http
      .get<any>(`${this.baseUrl}/about-us`)
      .pipe(map((response) => response.about));
  }

  createAbout(data: About): Observable<About> {
    return this.http
      .post<any>(`${this.baseUrl}/about-us`, data)
      .pipe(map((response) => response.about));
  }

  updateAbout(id: string, data: About): Observable<About> {
    return this.http
      .put<any>(`${this.baseUrl}/about-us/${id}`, data)
      .pipe(map((response) => response.about));
  }

  deleteAbout(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/about-us/${id}`);
  }


}
