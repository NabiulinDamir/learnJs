import { Component, input, output, computed, model, effect } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { PointnerDirective } from '../../directives/pointner.directive';
import { Filter } from '../../servises/filter.service';

@Component({
  selector: 'my-date-selector',
  template: `

      <div class="bg-primary-subtle position-relative d-flex justify-content-center">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link w-5-rem d-flex justify-content-center p-1"
              pointner
              aria-current="page"
              [class.active]="filter.interval === 'day'"
              (click)="filter.interval = 'day'"
              >День</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link w-5-rem d-flex justify-content-center p-1"
              pointner
              aria-current="page"
              [class.active]="filter.interval === 'month'"
              (click)="filter.interval = 'month'"
              >Месяц</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link w-5-rem d-flex justify-content-center p-1"
              pointner
              aria-current="page"
              [class.active]="filter.interval === 'year'"
              (click)="filter.interval = 'year'"
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
  constructor(public localStorage: LocalStorage, public filter: Filter) {}


  selectedLength(option: string): void{
    this.filter.interval = option
  }
}
