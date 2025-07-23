import { Component, computed, input, output } from '@angular/core';
import type { User } from '../users';

@Component({
  selector: 'user-avatar',
  imports: [],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  image = input.required<string>();
  name = input.required<string>();
  userId = input.required<string>();
  fullWidth = input(false);
  clickable = input(true);

  onUserSelected = output<User>();

  imageAltText = computed(() => `${this.name()}'s thumbnail avatar`);

  public handleClick() {
    this.onUserSelected.emit({
      id: this.userId(),
      name: this.name(),
      image: this.image(),
    });
  }

  // NOTE: need to handle keydown and ensure that it's not a repeat key
  public handleKeyDown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault();
      this.handleClick();
    }
  }
}
