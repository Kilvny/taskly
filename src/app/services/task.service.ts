import { Injectable } from '@angular/core';
import { TASKS } from '../mock-tasks';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const tasks = this.http.get<Task[]>("http://localhost:5000/tasks")
    return tasks;
  }
}
