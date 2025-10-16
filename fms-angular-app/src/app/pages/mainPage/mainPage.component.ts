import { Component, signal } from '@angular/core';
import { CrudTableComponent } from '../../components/Components_DataTable/crudTableComponent/crudTable.component';
import { IntervalSelector } from '../../components/Components_DateSelector/IntervalSelector/IntervalSelector.component';
import { ChartsSlider } from '../../components/Components_Chart/charts-slider/charts-slider.component';
import { DateCarousel } from '../../components/Components_DateSelector/dateCarousel/dateCarousel.component';
@Component({
  selector: 'my-app-main-page',
  imports: [ CrudTableComponent, IntervalSelector, DateCarousel, ChartsSlider],
  providers: [],
  standalone: true,
  templateUrl: './mainPage.html',
})
export class MainPage {
  protected readonly title = signal('fms-angular-app');

  constructor() {}


}
