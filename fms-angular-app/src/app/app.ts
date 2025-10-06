import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorage } from './servises/LocalStorage.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { Table } from './components/table/table';
import { CrudTableComponent } from './components/crudTableComponent/crudTableComponent';
import { IntervalSelector } from './components/IntervalSelector/IntervalSelector';
import { ChartsSlider } from './components/charts-slider/charts-slider';
import { DateCarousel } from './components/dateCarousel/dateCarousel';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrudTableComponent, IntervalSelector, DateCarousel, ChartsSlider],
  providers: [LocalStorage],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('fms-angular-app');
  operationsLoaded = false;

  constructor(protected localStorage: LocalStorage) {
    localStorage.setCategories()
    localStorage.setDaefaultData()
  }

  async ngOnInit() {
    this.operationsLoaded = true;
    await this.localStorage.setOperations()
    this.operationsLoaded = false;
  }
}
