import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { UserAvatar } from './user-avatar/user-avatar';

import type { User } from './users';
import { USERS } from './users';
import { UserTasks } from './user-tasks/user-tasks';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, UserAvatar, UserTasks],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  users = signal(USERS);
  selectedUser = signal<User | null>(null);

  public handleUserSelect(user: User) {
    this.selectedUser.set(user);
  }
}
