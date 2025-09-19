import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slider } from './shared/ui/slider/slider';
import { LocalStorage } from './servises/LocalStorage.service';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Slider],
  providers: [LocalStorage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fms-angular-app');
  items: string[] = [];
  constructor(protected localStorage: LocalStorage) {}

  ngOnInit() {
    this.localStorage.setDaefaultData();
  }
}
