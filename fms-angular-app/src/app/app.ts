import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorage } from './servises/LocalStorage.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { Table } from './components/table/table';
import { CrudTableComponent } from './components/crudTableComponent/crudTableComponent';
import { DataSelector } from './components/dateSelector/dateSelector';
import { ChartsSlider } from './components/charts-slider/charts-slider';
import { DateCarousel } from './components/dateCarousel/dateCarousel';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrudTableComponent, DataSelector, DateCarousel, ChartsSlider],
  providers: [LocalStorage],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('fms-angular-app');
  items: string[] = [];
  constructor(protected localStorage: LocalStorage) {
    localStorage.setOperations()
    localStorage.setCategories()
    localStorage.setDaefaultData()
  }

  async ngOnInit() {}
}
