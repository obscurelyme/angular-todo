import { Component, input, computed } from '@angular/core';

import { TASKS } from '../tasks';
import { UserTask } from '../user-task/user-task';
import type { User } from '../users';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'user-tasks',
  imports: [UserTask, Avatar],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.scss',
})
export class UserTasks {
  user = input.required<User>();

  title = computed(() => `${this.user().name}'s tasks`);
  tasks = computed(() => this.filterTasksByUserId());

  public addTask() {}

  private filterTasksByUserId() {
    return TASKS.filter((task) => task.userId === this.user().id);
  }
}
