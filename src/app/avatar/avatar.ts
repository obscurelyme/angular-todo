import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  image = input.required<string>();
  name = input.required<string>();
  imageAltText = computed(() => `${this.name()}'s thumbnail image`);
}
