import { Component, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
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
  public imagePath = computed(() => this.theme.darkTheme() ? 'assets/images/moon.svg' : 'assets/images/sun.svg')
  public statisticYear = computed(() => this.filter.date()?.getFullYear())
  
  constructor(public theme: Theme, public localStorage: LocalStorage, public router: Router, public filter: Filter) {}

  public async setDefaultData(): Promise<void> {
    await this.localStorage.setDaefaultData();
  }
}
