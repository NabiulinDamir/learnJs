import {
  Component,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  HostListener,
  computed,
  effect,
  OnInit,
  signal,
} from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../../servises/filter.service';
import { IOperation } from '../../../models/dataTypes.model';
import { Theme } from '../../../servises/theme.service';
import { init } from 'echarts/types/src/echarts.all.js';

@Component({
  selector: 'my-chart-two-rounded',
  providers: [DatePipe],
  template: `
    <div class="position-relative h-100 w-100 d-flex justify-content-around">
      <div
        id="my-chart-rounded-income"
        [class.opacity-50]="!hasData"
        style="width: 30rem; max-width: 40vw;"
      ></div>
      <div
        id="my-chart-rounded-expens"
        [class.opacity-50]="!hasData"
        style="width: 30rem; max-width: 40vw;"
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
export class ChartTwoRounded implements OnDestroy {
  private _incomeChart: echarts.ECharts | undefined = undefined;
  private _expensChart: echarts.ECharts | undefined = undefined;
  constructor(
    private localStorage: LocalStorage,
    private datePipe: DatePipe,
    public filter: Filter,
    public theme: Theme
  ) {
    effect(() => {
      this.setOption();
    });
  }

  public setOption(): void {
    const incomeData = this.localStorage.filter(this.localStorage.getOperationsByType('income'));
    const expensData = this.localStorage.filter(this.localStorage.getOperationsByType('expens'));
    this._incomeChart?.setOption(this.getOption(incomeData, 'Доходы'));
    this._expensChart?.setOption(this.getOption(expensData, 'Расходы'));
  }

  public init(): void {
    const chartDomIncome = document.getElementById('my-chart-rounded-income');
    const chartDomExpens = document.getElementById('my-chart-rounded-expens');
    chartDomIncome?.removeAttribute('_echarts_instance_');
    chartDomExpens?.removeAttribute('_echarts_instance_');
    this._incomeChart = echarts.init(chartDomIncome, this.theme.darkTheme() ? 'dark' : '');
    this._expensChart = echarts.init(chartDomExpens, this.theme.darkTheme() ? 'dark' : '');
    this.setOption();
  }

  getOption(data: IOperation[], title?: string) {
    const formatData = this.format(data);
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
      },
      title: {
        text: `${title}: ${data.reduce(
          (sum, item) => (sum += item.value),
          0
        )} руб.`,
        position: 'top',
      },

      series: [
        {
          name: 'Категория',
          type: 'pie',
          radius: ['40%', '70%'],
          data: formatData,
          top: '10%',
          label: {
            show: true,
            position: 'outside',
          },
          color: [
            '#0d6efd', // основной
            '#0a58ca', // темнее
            '#3d8bfd', // светлее
            '#6ea8fe', // еще светлее
            '#9fcdff', // самый светлый
            '#084298', // очень темный
            '#052c65', // максимально темный
          ],
        },
      ],
    };
  }

  format(data: IOperation[]): { name: string; value: number }[] {
    const resultMap = new Map();
    data.forEach((item) => {
      const category = item.category;
      if (!resultMap.has(category)) {
        resultMap.set(category, { name: category, value: 0 });
      }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }

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
    this._incomeChart?.dispose();
    this._expensChart?.dispose();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this._incomeChart) {
      this._incomeChart.resize();
    }
    if (this._expensChart) {
      this._expensChart.resize();
    }
  }

  get hasData(): boolean {
    return this.localStorage.filter(this.localStorage.allOperations()).length > 0;
  }
}
