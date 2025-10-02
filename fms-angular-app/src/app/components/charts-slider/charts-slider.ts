import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartScope } from '../charts/ChartScope';
import { ChartDataset } from '../charts/ChartDataset';
@Component({
  selector: 'my-charts-slider',
  standalone: true,
  imports: [CommonModule, ChartScope, ChartDataset],
  template: `
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators m-0">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner p-3">
        <div class="carousel-item active">
          <div class='w-100 d-flex flex-nowrap justify-content-around'>
            <my-chart-scope/>
            <my-chart-scope/>
          </div>
        </div>
        <div class="carousel-item">
          <div class='w-100 d-flex flex-nowrap justify-content-around'>
            <my-chart-dataset/>
          </div>
        </div>
        <div class="carousel-item">
          <img src="..." class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `
})
export class ChartsSlider{


}
