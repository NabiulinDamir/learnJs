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
  templateUrl: './header.html',
})
export class Header {
  public IsLoading: boolean = false;
  public imagePath = computed(() => this.theme.darkTheme() ? 'assets/images/moon.svg' : 'assets/images/sun.svg')
  public statisticYear: number = 2025;
  
  constructor(public theme: Theme, public localStorage: LocalStorage, public router: Router, public filter: Filter) {
    this.statisticYear = filter.date()?.getFullYear();
  }

  public async setDefaultData(): Promise<void> {
    this.IsLoading = true;
    await this.localStorage.setDaefaultData();
    this.IsLoading = false;
  }
}
