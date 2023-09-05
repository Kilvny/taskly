import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const tasks = this.http.get<Task[]>(this.apiUrl)
    return tasks;
  }

  deleteTask(task: Task): Observable<Task> {
    const tasks = this.http.delete<Task>(`${this.apiUrl}/${task.id}`)
    return tasks
  }
}
