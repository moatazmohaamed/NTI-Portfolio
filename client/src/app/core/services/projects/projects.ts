import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../interfaces/IProject';

@Injectable({
  providedIn: 'root',
})
export class Projects {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getProjects(page: number = 1, limit: number = 6): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects?page=${page}&limit=${limit}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`);
  }

  createProject(projectData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, projectData);
  }

  updateProject(id: string, projectData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${id}`, projectData);
  }

  deleteProject(id: string): Observable<{ status: string; message: string }> {
    return this.http.delete<{ status: string; message: string }>(`${this.apiUrl}/projects/${id}`);
  }
}
