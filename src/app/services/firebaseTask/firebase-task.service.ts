import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseTaskService {
  private baseUrl = 'http://localhost:8000/tasks';
  constructor(private httpClient: HttpClient) { }

  getTaskList(): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/getAll`, {})
    .map(response => {
      return response;
    });
  }

  deleteTask(key: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${key}`)
    .map(response => {
      return response;
    });
  }

  createTask(addtask: Task): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/TaskSet`, addtask)
    .map(response => {
      return response;
    });
  }

  updateTask(key: string, value: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/update/${key}`, value)
    .map(response => {
      return response;
    });
  }

  toggleDone(key: string, value: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/update/${key}`, value)
    .map(response => {
      return response;
    });
  }
}
