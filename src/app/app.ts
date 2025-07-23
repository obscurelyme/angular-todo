import { Component, signal, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { UserAvatar } from './user-avatar/user-avatar';

import { USERS } from './users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, UserAvatar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('todo');
  users = signal(USERS);

  protected readonly computedTitle = computed(
    () => `Computed: ${this.title()}`,
  );
}
