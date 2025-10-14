import { Component, input, output, computed, model, effect } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../../directives/selectable.directive';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { PointnerDirective } from '../../../directives/pointner.directive';
import { Filter } from '../../../servises/filter.service';

@Component({
  selector: 'my-interval-selector',
  template: `
    <div class="position-relative d-flex justify-content-center th-background-second">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link w-5-rem d-flex justify-content-center p-1 "
            pointner
            aria-current="page"
            [class.active]="interval === 'day'"
            (click)="filter.setIntervalDay(); onIntervalChange.emit();"
            >День</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link w-5-rem d-flex justify-content-center p-1"
            pointner
            aria-current="page"
            [class.active]="interval === 'month'"
            (click)="filter.setIntervalMonth(); onIntervalChange.emit();"
            >Месяц</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link w-5-rem d-flex justify-content-center p-1"
            pointner
            aria-current="page"
            [class.active]="interval === 'year'"
            (click)="filter.setIntervalYear(); onIntervalChange.emit();"
            >Год</a
          >
        </li>
      </ul>
    </div>
  `,
  imports: [PointnerDirective],
  providers: [],
})
export class IntervalSelector {
  onIntervalChange = output<void>();
  public interval: string = '';
  constructor(public filter: Filter) {
    effect(() => {
      this.interval = filter.interval();
    })
  }
}
