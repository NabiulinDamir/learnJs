import { Component, signal,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTwoRounded } from '../charts/ChartTwoRounded/chartTwoRounded.component';
import { ChartDataset } from '../charts/ChartDataset/chartDataset.component';
import { ChartWithNegative } from '../charts/ChartWithNegative/chartWithNegative.component';
import { Chart } from '../charts/chart/chart.component';
import { ChartOptions } from '../charts/chart/chartOptions.service';
@Component({
  selector: 'my-charts-slider',
  standalone: true,
  imports: [CommonModule, Chart],
  providers: [ChartOptions],
  templateUrl: './charts-slider.html',
})
export class ChartsSlider {
  activeSlide = signal(0);

  constructor(@Inject(ChartOptions) public chartOptions: ChartOptions){}

  ngAfterViewInit() {
    const carousel = document.getElementById('carouselExampleIndicators');
    carousel?.addEventListener('slid.bs.carousel', (event: any) => {
      this.activeSlide.set(event.to);
    });
  }

  isActiveSlide(index: number): boolean {
    return this.activeSlide() === index;
  }
}
