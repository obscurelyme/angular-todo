import { Component, signal } from '@angular/core';

const TITLE = '// TODO';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly title = signal(TITLE);
}
