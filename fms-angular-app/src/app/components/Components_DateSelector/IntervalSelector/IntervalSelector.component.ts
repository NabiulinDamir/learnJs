import { Component, output } from '@angular/core';
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
  constructor(public filter: Filter) {}
}
