import { Component, input } from '@angular/core';

import type { Task } from '../tasks';
import { TaskStatus } from '../task-status/task-status';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'user-task',
  imports: [TaskStatus, DatePipe],
  templateUrl: './user-task.html',
  styleUrl: './user-task.scss',
})
export class UserTask {
  task = input.required<Task>();
}
