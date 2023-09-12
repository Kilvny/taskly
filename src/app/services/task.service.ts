import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks";
  headers: HttpHeaders = new HttpHeaders({
    "content-type": "application/json; charset=utf-8"
  })

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const tasks = this.http.get<Task[]>(this.apiUrl, {
      headers: this.headers
    })
    return tasks;
  }

  addTask(task: Task): Observable<Task> {
    const postedTask = this.http.post<Task>(this.apiUrl,task, {
      headers: this.headers
    })
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
