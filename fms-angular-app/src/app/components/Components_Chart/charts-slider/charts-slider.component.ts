import { Component, signal,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from '../chart/chart.component';

import { DatasetChart } from '../Dataset/datasetChart.component';
import { RoundedChart } from '../Rounded/roundedChart.component';
import { NegativeChart } from '../Negative/negativeChart.component';
@Component({
  selector: 'my-charts-slider',
  standalone: true,
  imports: [CommonModule, DatasetChart, RoundedChart, NegativeChart],
  providers: [],
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
