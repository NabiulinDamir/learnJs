import { Component, ContentChildren, QueryList, AfterContentInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTwoRounded } from '../charts/ChartTwoRounded.component';
import { ChartDataset } from '../charts/ChartDataset.component';
import { ChartWithNegative } from '../charts/ChartWithNegative.component';
@Component({
  selector: 'my-charts-slider',
  standalone: true,
  imports: [CommonModule, ChartTwoRounded, ChartDataset, ChartWithNegative],
  template: `
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators m-0">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner p-3">
        <div class="carousel-item active">
            <my-chart-two-rounded />
        </div>
        <div class="carousel-item">
            <my-chart-dataset />
        </div>
        <div class="carousel-item">
          <my-chart-negative />
        </div>
      </div>
      <button class="carousel-control-prev z-3" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next z-3" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `
})
export class ChartsSlider {
constructor(){}

}
