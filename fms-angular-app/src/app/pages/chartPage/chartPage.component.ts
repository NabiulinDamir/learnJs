import { Component, signal } from '@angular/core';
import { MegaChart } from '../../components/Components_Chart/Mega/megaChart.component';

@Component({
  selector: 'my-app-main-page',
  imports: [ MegaChart ],
  standalone: true,
  providers: [],
  templateUrl: './chartPage.html',
})
export class ChartsPage {
  protected readonly title = signal('fms-angular-app');

  constructor() {}

}
