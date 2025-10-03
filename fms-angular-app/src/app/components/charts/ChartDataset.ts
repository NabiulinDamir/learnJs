import { Component, OnDestroy, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Filter } from '../../servises/filter.service';
@Component({
  selector: 'my-chart-dataset',
  providers: [DatePipe],
  template: `
    <div class="position-relative">
      <div
        id="chart-container"
        [class.opacity-50]="!hasData"
        style="width: 70rem; height: 350px; max-width: 100vw;"
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
  constructor(private localStorage: LocalStorage, private datePipe: DatePipe, private element: ElementRef, public filter: Filter) { }

  private initChart() {
    if (this._chart) {
      this._chart.dispose();
    }

    const chartDom = document.getElementById('chart-container') as HTMLElement;
    this._chart = echarts.init(chartDom);

    const option = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Доходы', 'Расходы'],
        itemGap: 5
      },
      title: {
        text: `Все операции за ${this.filter.intervalLocale}`,
        position: 'top'
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.formattedData.map(item => item.name)
      },
      yAxis: {
        type: 'value',
        name: 'Сумма'
      },
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: 'Доходы',
          type: 'bar',
          data: this.formattedData.map(item => item.income),
          color: '#0d6efd'
        },
        {
          name: 'Расходы',
          type: 'bar',
          data: this.formattedData.map(item => item.expens),
          color: '#6c757d'
        }
      ]
    };

    this._chart.setOption(option);

    this._chart.setOption(option);
  }

  get formattedData(): { name: string, income: number, expens: number }[] {
    const allOperations = this.localStorage.filterOperations.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    const resultMap = new Map();

    let currentDate = this.filter.startInterval;
    let endDate = this.filter.endInterval;

    while (currentDate <= endDate) {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, income: 0, expens: 0 });
      if (this.filter.interval === "month") { currentDate.setDate(currentDate.getDate() + 1) }
      else if (this.filter.interval === "year") { currentDate.setMonth(currentDate.getMonth() + 1); }
      else { currentDate.setDate(currentDate.getDate() + 1); }
    }

    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === 'income' ? operation.value : 0;
      const expensValue = operation.type === 'expens' ? operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: key, income: incomeValue, expens: expensValue });
      } else {
        resultMap.set(key, {
          name: key,
          income: mapElemet.income + incomeValue,
          expens: mapElemet.expens + expensValue,
        });
      }
    }
    const res = Array.from(resultMap.values());
    return res
  }

  formatDate(date: Date): string | null {
    const pattern = () => {
      switch (this.filter.interval) {
        case "day":
          return "dd.MM.yyyy";
        case "month":
          return "dd";
        case "year":
          return "dd.MM";
        default:
          return "dd.MM.yyyy";
      }
    }
    return this.datePipe.transform(date, pattern())
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
        this.filterSub = this.filter.onDateChange.subscribe(() => { this.initChart(); });
      }
      else {
        this.operationSub?.unsubscribe();
        this.filterSub?.unsubscribe();
      }
    });
    this.observer.observe(this.element.nativeElement);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this._chart?.resize();
  }

  get hasData(): boolean {
    return this.localStorage.filterOperations.length > 0;
  }
}
