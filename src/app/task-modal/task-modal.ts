import {
  Component,
  ElementRef,
  viewChild,
  input,
  computed,
  inject,
  effect,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Priority, Status } from '../tasks';
import type { Task } from '../tasks';
import type { User } from '../users';
import { TodoService } from '../services/todo/todo-service';

type Option<T> = {
  id: T;
  label: string;
};

const PRIORITY_OPTIONS: Option<Priority>[] = Object.entries(Priority).map(
  ([label, id]) => ({
    id,
    label,
  }),
);

const STATUS_OPTIONS: Option<Status>[] = Object.entries(Status).map(
  ([label, id]) => ({
    id,
    label,
  }),
);

@Component({
  selector: 'task-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModal {
  taskService = inject(TodoService);
  user = input<User>();
  task = input<Task>();
  isEditingTask = computed(() => this.task() != undefined);
  dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  taskForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    priority: new FormControl<Priority>(Priority.Low, [Validators.required]),
    status: new FormControl<Status>(Status.Planned, [Validators.required]),
  });

  get priorityOptions(): Option<Priority>[] {
    return PRIORITY_OPTIONS;
  }
  get statusOptions(): Option<Status>[] {
    return STATUS_OPTIONS;
  }

  public submitForm(): void {
    if (this.taskForm.valid) {
      if (this.isEditingTask()) {
        this.editTask();
      } else {
        this.addTask();
      }

      this.closeModal();
    }
  }

  public cancelForm(): void {
    this.closeModal();
  }

  public openModal() {
    this.taskForm.setValue({
      title: this.task()?.title || '',
      description: this.task()?.description || '',
      priority: this.task()?.priority || Priority.Low,
      status: this.task()?.status || Status.Planned,
    });
    this.dialog()?.nativeElement.showModal();
  }

  private addTask() {
    const isComplete = this.taskForm.value.status === Status.Complete;
    this.taskService.addTask({
      id: `t-${crypto.randomUUID()}`,
      userId: this.user()?.id!,
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description!,
      priority: this.taskForm.value.priority!,
      createdAt: new Date(Date.now()),
      updatedAt: isComplete ? new Date(Date.now()) : undefined,
      completedAt: isComplete ? new Date(Date.now()) : undefined,
      status: this.taskForm.value.status!,
    });
  }

  private editTask() {
    const t = this.task()!;
    const isComplete = this.taskForm.value.status === Status.Complete;
    this.taskService.updateTask({
      ...t,
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description!,
      priority: this.taskForm.value.priority!,
      status: this.taskForm.value.status!,
      updatedAt: new Date(Date.now()),
      completedAt: isComplete ? new Date(Date.now()) : undefined,
    });
  }

  private closeModal() {
    this.dialog()?.nativeElement.close();
  }
}
