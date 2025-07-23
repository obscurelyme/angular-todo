import { Component, computed, input } from '@angular/core';

import { Status } from '../tasks';

const STATUS_BADGE_CLASSLIST_MAP: Record<Status, string> = {
  [Status.Blocked]: 'badge bg-danger',
  [Status.Complete]: 'badge bg-success',
  [Status.InProgress]: 'badge bg-primary',
  [Status.InReview]: 'badge bg-warning',
  [Status.Planned]: 'badge bg-secondary',
};

@Component({
  selector: 'task-status',
  imports: [],
  templateUrl: './task-status.html',
  styleUrl: './task-status.scss',
})
export class TaskStatus {
  status = input.required<Status>();

  badgeClassList = computed(() => STATUS_BADGE_CLASSLIST_MAP[this.status()]);
}
