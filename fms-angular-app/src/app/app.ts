import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header.component';
import { LocalStorage } from './servises/LocalStorage.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  providers: [LocalStorage],
  template: `
  <main class="main">
    <my-header/>
    <router-outlet />
  </main>`,
})
export class App {
  protected readonly title = signal('fms-angular-app');

  constructor(public localStorage: LocalStorage) {}
  
  async ngOnInit() {
    await this.localStorage.setCategories();
    await this.localStorage.setOperations();
  }

}
