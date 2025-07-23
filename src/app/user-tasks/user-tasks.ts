import { Component, input, computed } from '@angular/core';

import { TASKS } from '../tasks';
import { UserTask } from '../user-task/user-task';

@Component({
  selector: 'user-tasks',
  imports: [UserTask],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.scss',
})
export class UserTasks {
  userId = input.required<string>();

  tasks = computed(() => this.filterTasksByUserId());

  private filterTasksByUserId() {
    return TASKS.filter((task) => task.userId === this.userId());
  }
}
