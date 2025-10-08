import { Component, signal } from '@angular/core';
import { LocalStorage } from '../servises/LocalStorage.service';
import { CrudTableComponent } from '../components/Components_DataTable/crudTableComponent/crudTableComponent';
import { IntervalSelector } from '../components/Components_DateSelector/IntervalSelector/IntervalSelector';
import { ChartsSlider } from '../components/Components_Chart/charts-slider/charts-slider';
import { DateCarousel } from '../components/Components_DateSelector/dateCarousel/dateCarousel';
@Component({
  selector: 'my-app-main-page',
  imports: [ CrudTableComponent, IntervalSelector, DateCarousel, ChartsSlider],
  providers: [LocalStorage],
  template: ` 
    <section id="up-content" class="th-background-second">
      <my-charts-slider/>
    </section>
    <my-interval-selector/>
    <my-date-carousel/>
    <section class="d-flex flex-wrap flex-md-nowrap">
      <my-crud-table class="w-100" dataType="income" [loadTable]="operationsLoaded" />
      <my-crud-table class="w-100" dataType="expens" [loadTable]="operationsLoaded" />
    </section>`,
})
export class MainPage {
  protected readonly title = signal('fms-angular-app');
  operationsLoaded = false;

  constructor(protected localStorage: LocalStorage) {
    localStorage.setCategories();
    localStorage.setDaefaultData();
  }

  async ngOnInit() {
    this.operationsLoaded = true;
    await this.localStorage.setOperations();
    this.operationsLoaded = false;
  }
}
