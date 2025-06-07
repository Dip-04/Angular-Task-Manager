import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.getAuthHeaders());
  }

  getTask(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.baseUrl, task, this.getAuthHeaders());
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, task, this.getAuthHeaders());
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }
}
