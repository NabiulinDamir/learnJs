import {
  Component,
  OnDestroy,
  ElementRef,
  HostListener,
  computed,
  effect,
  signal,
} from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../../servises/filter.service';
import { IOperation } from '../../../models/dataTypes.model';
import { Theme } from '../../../servises/theme.service';
@Component({
  selector: 'my-chart-dataset',
  providers: [DatePipe],
  template: `
    <div class="position-relative w-100 d-flex justify-content-around h-100 ">
      <div
        id="chart-container"
        [class.opacity-50]="!hasData"
        style="width: 70rem; max-width: 100vw;"
      ></div>
      @if(!hasData){
      <div
        class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center"
      >
        Нет данных
      </div>
      }
    </div>
  `,
})
export class ChartDataset implements OnDestroy {
  private _chart: echarts.ECharts | undefined = undefined;
  private observer!: IntersectionObserver;
  private _isVisible = signal<boolean>(false);

  constructor(
    private localStorage: LocalStorage,
    private datePipe: DatePipe,
    private element: ElementRef,
    public filter: Filter,
    public theme: Theme
  ) {
    effect(() => {
      this.setOption();
    });
  }

  public setOption(): void {
    const data = this.getOption((this.localStorage.filter(this.localStorage.allOperations())));
    this._chart?.setOption(data);
  }

  public init(): void {
    const chartDom = document.getElementById('chart-container');
    chartDom?.removeAttribute('_echarts_instance_');
    this._chart = echarts.init(chartDom, this.theme.darkTheme() ? 'dark' : '');
    this._chart.off('click');
    this._chart.on('click', (params: any) => {
      this.clickToChart(params);
    });
    this.setOption();
  }

  getOption(data: IOperation[]){
    const formattedData = this.format(data)
    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Доходы', 'Расходы'],
        itemGap: 5,
      },
      title: {
        text: `Операции за ${this.filter.intervalLocale}`,
        position: 'top',
      },
      dataset: {
        source: formattedData,
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
        name: 'Сумма',
      },
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: 'Доходы',
          type: 'bar',
          color: '#0d6efd',
        },
        {
          name: 'Расходы',
          type: 'bar',
          color: '#6c757d',
        },
      ],
    };
  };

  format(data: IOperation[]): { name: string; income: number; expens: number; date: Date }[] {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());

    const resultMap = new Map();

    let currentDate = new Date(this.filter.startInterval);
    let endDate = new Date(this.filter.endInterval);

    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, income: 0, expens: 0 });
      if (this.filter.interval() === 'day') {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (this.filter.interval() === 'month') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (this.filter.interval() === 'year') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);

    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === 'income' ? operation.value : 0;
      const expensValue = operation.type === 'expens' ? operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, {
          name: key,
          income: incomeValue,
          expens: expensValue,
          date: operation.date,
        });
      } else {
        resultMap.set(key, {
          name: key,
          income: mapElemet.income + incomeValue,
          expens: mapElemet.expens + expensValue,
          date: operation.date,
        });
      }
    }

    const res = Array.from(resultMap.values());
    return res;
  }

  ////////////////////////////////////////////////////////////////////////////////

  clickToChart(params: any): void {
    if (params.componentType === 'series') {
      this.filter.downInterval();
      setTimeout(() => this.filter.setDate(params.data.date), 100);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  formatDate(date: Date): string | null {
    const pattern = () => {
      switch (this.filter.interval()) {
        case 'day':
          return 'H';
        case 'month':
          return 'd';
        case 'year':
          return 'MMMM';
        default:
          return 'dd.MM.yyyy';
      }
    };
    return this.datePipe.transform(date, pattern());
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {
    this._chart?.dispose();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this._chart) {
      this._chart.resize();
    }
  }

  get hasData(): boolean {
    return this.localStorage.filter(this.localStorage.allOperations()).length > 0;
  }
}
