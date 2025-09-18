import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slider } from './shared/ui/slider/slider';
import { LocalStorageService } from './servises/localstorage';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Slider, LocalStorageService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fms-angular-app');
  constructor(protected localStorage: LocalStorageService) {}
}
