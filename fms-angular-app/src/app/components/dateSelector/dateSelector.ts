import { Component, input, output, computed, model, effect } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { PointnerDirective } from '../../directives/pointner.directive';

@Component({
  selector: 'my-date-selector',
  template: `

      <div class="bg-primary-subtle position-relative d-flex justify-content-center">
        <!-- <div class="bg-emphasis h-100 rounded-top-4 position-relative  d-flex justify-content-evenly overflow-hidden">
          <span class="w-5-rem d-flex bg-emphasis justify-content-center p-1"              selectable [selected]="false">День</span>
          <span class="w-5-rem d-flex bg-emphasis justify-content-center p-1 border-start" selectable [selected]="false">Неделя</span>
          <span class="w-5-rem d-flex bg-emphasis justify-content-center p-1 border-start" selectable [selected]="false">Месяц</span>
          <span class="w-5-rem d-flex bg-emphasis justify-content-center p-1 border-start" selectable [selected]="false">Год</span>
        </div> -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link w-5-rem d-flex justify-content-center p-1"
              pointner
              aria-current="page"
              [class.active]="localStorage.filterOption.length === 'day'"
              (click)="localStorage.setFilterOptionsLength('day')"
              >День</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link w-5-rem d-flex justify-content-center p-1"
              pointner
              aria-current="page"
              [class.active]="localStorage.filterOption.length === 'month'"
              (click)="localStorage.setFilterOptionsLength('month')"
              >Месяц</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link w-5-rem d-flex justify-content-center p-1"
              pointner
              aria-current="page"
              [class.active]="localStorage.filterOption.length === 'year'"
              (click)="localStorage.setFilterOptionsLength('year')"
              >Год</a
            >
          </li>
        </ul>
      </div>


    <style>
      .w-3 {
        width: 20rem;
      }

      .w-5-rem {
        width: 5rem;
      }
    </style>
  `,
  imports: [ PointnerDirective],
  providers: [],
})
export class DataSelector {
  constructor(public localStorage: LocalStorage) {}


  selectedLength(option: string): void{
    this.localStorage.filterOption.length = option
  }
}
