import { Component, input, output, computed, model, effect } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../../directives/selectable.directive';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { PointnerDirective } from '../../../directives/pointner.directive';
import { Filter } from '../../../servises/filter.service';

@Component({
  selector: 'my-interval-selector',
  templateUrl: './IntervalSelector.html',
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
