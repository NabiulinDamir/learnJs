import { Component, signal } from '@angular/core';
import { ChartMega } from '../../components/Components_Chart/charts/ChartMega/chartMega.component';
@Component({
  selector: 'my-app-main-page',
  imports: [ChartMega],
  standalone: true,
  providers: [],
  templateUrl: './chartPage.html',
})
export class ChartsPage {
  protected readonly title = signal('fms-angular-app');

  constructor() {}

}
