import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTwoRounded } from '../charts/ChartTwoRounded/chartTwoRounded.component';
import { ChartDataset } from '../charts/ChartDataset/chartDataset.component';
import { ChartWithNegative } from '../charts/ChartWithNegative/chartWithNegative.component';
@Component({
  selector: 'my-charts-slider',
  standalone: true,
  imports: [CommonModule, ChartTwoRounded, ChartDataset, ChartWithNegative],
  templateUrl: './charts-slider.html',
})
export class ChartsSlider {
  activeSlide = signal(0);

  constructor(){}

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
