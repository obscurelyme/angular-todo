import { Injectable } from '@angular/core';

import type { Task } from '../../tasks';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks: Task[] = [];

  public constructor() {
    const t = localStorage.getItem('tasks');
    if (t) {
      this.tasks = JSON.parse(t);
    }
  }

  public getTask(id: string): Task {
    return this.tasks.filter((t) => t.id === id)[0];
  }

  public getTasks(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  public addTask(task: Task): void {
    this.tasks.unshift(task);
    this.saveTasks();
  }

  public updateTask(task: Partial<Task>): void {
    this.tasks = this.tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          ...task,
        };
      }
      return t;
    });
    this.saveTasks();
  }

  public deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((t) => t.id != taskId);
    this.saveTasks();
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
