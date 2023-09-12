import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output()
  onAddTask: EventEmitter<Task> = new EventEmitter();
  showAddSection!: boolean;
  subscription!: Subscription;

  /**
   *
   */
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
                        .onToggle()
                        .subscribe(val => this.showAddSection = val)
  }

  text!: string;
  day!: string;
  reminder: boolean = false;

  onSubmit(): void {
    const task: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(task)

    this.text = "";
    this.day = "";
    this.reminder = false

  }
}
