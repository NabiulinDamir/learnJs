import {
  Component,
  OnDestroy,
  HostListener,
  effect, computed
} from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../../../servises/filter.service';
import { IOperation } from '../../../../models/dataTypes.model';
import { Theme } from '../../../../servises/theme.service';

@Component({
  selector: 'my-chart-two-rounded',
  providers: [DatePipe],
  templateUrl: './chartTwoRounded.html',
})
export class ChartTwoRounded implements OnDestroy {
  private _incomeChart: echarts.ECharts | undefined = undefined;
  private _expensChart: echarts.ECharts | undefined = undefined;
  private _incomeOption: any | undefined = undefined;
  private _expensOption: any | undefined = undefined;

  constructor(
    private localStorage: LocalStorage,
    private datePipe: DatePipe,
    public filterService: Filter,
    public theme: Theme
  ) {
    effect(() => {
      this.updateIncomeOption();
      this.updateExpensOption();
      this.setOption();
    });
    effect(() => {
      this.init();
      this.setOption();
    });
  }

  public setOption(): void {
    this._incomeChart?.setOption(this._incomeOption);
    this._expensChart?.setOption(this._expensOption);
  }

  public init(): void {
    const theme = this.theme.darkTheme() ? 'dark' : '';
    const chartDomIncome = document.getElementById('my-chart-rounded-income');
    const chartDomExpens = document.getElementById('my-chart-rounded-expens');
    if (!chartDomIncome?.clientHeight || !chartDomExpens?.clientHeight) {
      return;
    }
    this._incomeChart?.dispose();
    this._expensChart?.dispose();
    this._incomeChart = echarts.init(chartDomIncome, theme);
    this._expensChart = echarts.init(chartDomExpens, theme);
  }

  updateIncomeOption(): void {
    const incomeData = this.localStorage.getFilteredOperationsByType('income');
    this._incomeOption = this.getOption(incomeData, 'Доходы');
  }

  updateExpensOption(): void {
    const expensData = this.localStorage.getFilteredOperationsByType('expens');
    this._expensOption = this.getOption(expensData, 'Доходы');
  }

  getOption(data: IOperation[], title?: string) {
    const formatData = this.format(data);
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
      },
      title: {
        text: `${title}: ${data.reduce((sum, item) => (sum += item.value), 0)} руб.`,
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
      switch (this.filterService.interval()) {
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
    this.setOption();
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

  public hasData = computed(() => {
    return this.localStorage.getFilteredOperations().length > 0;
  })
}
