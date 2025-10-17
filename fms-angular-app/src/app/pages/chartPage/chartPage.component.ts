import { Component, signal } from '@angular/core';
import { ChartMega } from '../../components/Components_Chart/charts/ChartMega/chartMega.component';
import { ChartOptions } from '../../components/Components_Chart/charts/chart/chartOptions.service';
import { Chart } from '../../components/Components_Chart/charts/chart/chart.component';
@Component({
  selector: 'my-app-main-page',
  imports: [ Chart ],
  standalone: true,
  providers: [ChartOptions],
  templateUrl: './chartPage.html',
})
export class ChartsPage {
  protected readonly title = signal('fms-angular-app');

  constructor(public chartOptions: ChartOptions) {}

}
