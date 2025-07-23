import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'user-avatar',
  imports: [],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  image = input('');
  name = input('');

  imageAltText = computed(() => `${this.name()}'s thumbnail avatar`);

  public handleClick() {
    console.log('do this');
  }

  // NOTE: need to handle keydown and ensure that it's not a repeat key
  public handleKeyDown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault();
      this.handleClick();
    }
  }
}
