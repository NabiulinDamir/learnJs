import { Component, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'my-chart-dataset',
  providers: [DatePipe],
  template: `
    <div class="position-relative">
      <div
        id="chart-container"
        [class.opacity-50]="!hasData"
        style="width: 450px; height: 350px;"
      ></div>
      @if(!hasData){
      <div
        class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center"
      >
        Нет данных
      </div>
      }
    </div>

    <style></style>
  `,
})
export class ChartDataset implements OnDestroy, AfterViewInit {
  private _chart: echarts.ECharts | undefined = undefined;
  private observer!: IntersectionObserver;
  private operationSub?: Subscription;
  private filterSub?: Subscription;
  constructor(private localStorage: LocalStorage, private datePipe: DatePipe, private element: ElementRef) { }

  private initChart() {
    if (this._chart) {
      this._chart.dispose();
    }
    const chartDom = <HTMLElement>document.getElementById('chart-container');
    this._chart = <echarts.ECharts>echarts.init(chartDom);

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: this.formattedData,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          name: 'Доходы',
          type: 'bar',
          color: ['#0d6efd'],
        },
        {
          name: 'Расходы',
          type: 'bar',
          color: ['#6c757d'],
        },
      ],
    };

    this._chart.setOption(option);
  }

  get formattedData() {
    const allOperations = this.localStorage.filterOperations.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    const resultMap = new Map();

    for (const operation of allOperations) {
      const key = this.datePipe.transform(operation.date, 'dd.MM.yyyy');
      const name = this.datePipe.transform(operation.date, 'dd');
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === 'income' ? operation.value : 0;
      const expensValue = operation.type === 'expens' ? operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: name, income: incomeValue, expens: expensValue });
      } else {
        resultMap.set(key, {
          name: name,
          income: mapElemet.income + incomeValue,
          expens: mapElemet.expens + expensValue,
        });
      }
    }
    return Array.from(resultMap.values());
  }

  ngOnDestroy() {
    this._chart?.dispose();
    this.operationSub?.unsubscribe();
    this.filterSub?.unsubscribe();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.initChart();
        this.operationSub = this.localStorage.onOperationsChanged.subscribe(() => { this.initChart(); });
        this.filterSub = this.localStorage.onFilterOptionDateChanged.subscribe(() => { this.initChart(); });
      }
      else {
        this.operationSub?.unsubscribe();
        this.filterSub?.unsubscribe();
      }
    });
    this.observer.observe(this.element.nativeElement);
  }

  checkVisibility(): boolean {
    const element = this.element.nativeElement;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  get hasData(): boolean {
    return this.localStorage.filterOperations.length > 0;
  }
}
