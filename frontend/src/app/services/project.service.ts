import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private baseUrl = `${environment.BACKEND_URL}projects`;

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get(this.baseUrl);
  }

  getProjectById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProject(project: any) {
    return this.http.post(this.baseUrl, project);
  }

  updateProject(id: string, project: any) {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
