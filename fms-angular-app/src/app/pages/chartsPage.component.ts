import { Component, signal } from '@angular/core';
import { ChartMega } from '../components/Components_Chart/charts/ChartMega.component';
@Component({
  selector: 'my-app-main-page',
  imports: [ChartMega],
  standalone: true,
  providers: [],
  template: ` 
    <div class='h-100 w-100'>
      <my-chart-mega/>
    </div>
    `,
})
export class ChartsPage {
  protected readonly title = signal('fms-angular-app');

  constructor() {}

}
