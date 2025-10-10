import { Component, signal, computed } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { Theme } from '../../servises/theme.service';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { RouterLink, Router } from '@angular/router';
import { PointnerDirective } from '../../directives/pointner.directive';
import { Filter } from '../../servises/filter.service';
@Component({
  selector: 'my-header',
  imports: [ RouterLink, NgOptimizedImage, PointnerDirective ],
  providers: [],
  standalone: true,
  template: `
    <header class="th-primmary ">
      <!-- <div class="me-auto position-relative">
        <button class="btn btn-secondary" [disabled]="IsLoading" (click)="setDefaultData()" style="width: 15rem;">
          @if(IsLoading){<span class="spinner-border spinner-border-sm"></span>} @else{Установить тестовые данные}
        </button>
      </div>

      <button class="btn btn-secondary " (click)="theme.toggleDarkTheme()">
        {{ theme.darkTheme() ? 'O' : 'X' }}
      </button> -->
      
      
<nav class="navbar navbar-expand-lg th-primmary">
  <div class="container-fluid ">
    <a class="navbar-brand" href="/">FMS Angular</a>
    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 d-flex">
          <li class="nav-item">
            <a class="nav-link " routerLink="/" [class.active]="router.url === '/' ? 'page' : null">Главная</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" routerLink="charts" [class.active]="router.url === '/charts' ? 'page' : null">Статистика {{ filter.date()?.getFullYear() }}</a>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0 d-flex">
          <li class="nav-item dropdown ">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Дополнительно
            </a>
            <ul class="dropdown-menu" [attr.data-bs-theme]="theme.darkTheme() ? 'dark' : null">
              <li><a class="dropdown-item w-100 text-wrap" (click)="setDefaultData()" pointner>Установить тестовые данные</a></li>
              <!-- <hr> -->
            </ul>
          </li>

          <button class="btn" (click)="theme.toggleDarkTheme()">
            <img [ngSrc]='imagePath()' alt="theme" class="" priority width="25" height="25" />
          </button>
          
        <!-- <button class="btn btn-secondary" [disabled]="IsLoading" (click)="setDefaultData()" style="width: 15rem;">
          @if(IsLoading){<span class="spinner-border spinner-border-sm"></span>} @else{Установить тестовые данные}
        </button> -->
      </ul>
    </div>
  </div>
</nav>


    </header>
  `,
})
export class Header {
  public IsLoading: boolean = false;
  public imagePath = computed(() => this.theme.darkTheme() ? 'assets/images/moon.svg' : 'assets/images/sun.svg')
  
  constructor(public theme: Theme, public localStorage: LocalStorage, public router: Router, public filter: Filter) {}

  public async setDefaultData(): Promise<void> {
    this.IsLoading = true;
    await this.localStorage.setDaefaultData();
    this.IsLoading = false;
  }
}
