import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slider } from './shared/ui/slider/slider';
import { LocalStorage } from './servises/LocalStorage.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { Table } from './components/table/table';
import { Modal } from './shared/ui/modal/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Slider, Table, Modal],
  providers: [LocalStorage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fms-angular-app');
  items: string[] = [];
  constructor(protected localStorage: LocalStorage) {}

  async ngOnInit() {
    await this.localStorage.setDaefaultData();
    await this.localStorage.setOperations();
    console.log(this.localStorage.operations);
    console.log(this.localStorage.incomeOperations);
    console.log(this.localStorage.expensOperations);
  }
}
