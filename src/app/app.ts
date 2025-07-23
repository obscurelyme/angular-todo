import { Component, signal, computed } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { UserAvatar } from './user-avatar/user-avatar';

import { USERS } from './users';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, UserAvatar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  users = signal(USERS);
}
