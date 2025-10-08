import { Component, signal } from '@angular/core';
import { Theme } from '../../servises/theme.service';
@Component({
  selector: 'my-header',
  imports: [],
  providers: [],
  template: `
    <header class="th-background bg-primary d-flex p-2 gap-2">
      <button class="btn btn-secondary me-auto">Установить тестовые данные</button>
      <button class="btn btn-secondary " (click)="theme.toggleDarkTheme()">{{ theme.darkTheme() ? "O" : "X"  }}</button>
      <!-- <button class="btn btn-secondary ">X</button> -->
    </header>
  `,
})
export class Header {
  constructor(public theme: Theme) {}
}
