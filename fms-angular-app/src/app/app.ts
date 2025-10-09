import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  providers: [],
  template: `
  <main class="main">
    <my-header/>
    <router-outlet />
  </main>`,
})
export class App {
  protected readonly title = signal('fms-angular-app');

  constructor() {}
}
