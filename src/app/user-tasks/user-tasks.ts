import { Component, input, computed, inject } from '@angular/core';

import { TodoService } from '../services/todo/todo-service';
import type { Task } from '../tasks';
import { UserTask } from '../user-task/user-task';
import type { User } from '../users';
import { Avatar } from '../avatar/avatar';
import { TaskModal } from '../task-modal/task-modal';

@Component({
  selector: 'user-tasks',
  imports: [UserTask, Avatar, TaskModal],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.scss',
})
export class UserTasks {
  taskService = inject(TodoService);
  user = input.required<User>();

  title = computed(() => `${this.user().name}'s tasks`);
  get tasks(): Task[] {
    return this.taskService.getTasks(this.user().id);
  }
}
