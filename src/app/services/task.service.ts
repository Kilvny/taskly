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

  addTask(task: Task): Observable<Task> {
    const postedTask = this.http.post<Task>(this.apiUrl,task)
    return postedTask
  }

  deleteTask(task: Task): Observable<Task> {
    const tasks = this.http.delete<Task>(`${this.apiUrl}/${task.id}`)
    return tasks
  }

  toggleReminder(task: Task): Observable<Task> {
    const tasks = this.http.put<Task>(`${this.apiUrl}/${task.id}`, task)
    return tasks
  }

}
