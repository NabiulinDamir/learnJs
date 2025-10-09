import { Component, signal } from '@angular/core';
import { Theme } from '../../servises/theme.service';
import { LocalStorage } from '../../servises/LocalStorage.service';
@Component({
  selector: 'my-header',
  imports: [],
  providers: [],
  template: `
    <header class="th-background bg-primary d-flex p-2 gap-2">
      <div class="me-auto position-relative">
        <button class="btn btn-secondary" [disabled]="IsLoading" (click)="setDefaultData()" style="width: 15rem;">
          @if(IsLoading){<span class="spinner-border spinner-border-sm"></span>} @else{Установить тестовые данные}
        </button>
      </div>

      <button class="btn btn-secondary " (click)="theme.toggleDarkTheme()">
        {{ theme.darkTheme() ? 'O' : 'X' }}
      </button>
      <!-- <button class="btn btn-secondary ">X</button> -->
    </header>
  `,
})
export class Header {
  public IsLoading: boolean = false;

  constructor(public theme: Theme, public localStorage: LocalStorage) {}

  public async setDefaultData(): Promise<void> {
    this.IsLoading = true;
    await this.localStorage.setDaefaultData();
    this.IsLoading = false;
  }
}
