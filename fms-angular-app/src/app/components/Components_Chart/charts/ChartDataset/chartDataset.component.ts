import {
  Component,
  OnDestroy,
  HostListener,
  effect,
} from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../../../servises/filter.service';
import { IOperation } from '../../../../models/dataTypes.model';
import { Theme } from '../../../../servises/theme.service';
@Component({
  selector: 'my-chart-dataset',
  providers: [DatePipe],
  templateUrl: './chartDataset.html',
})
export class ChartDataset implements OnDestroy {
  private _chart: echarts.ECharts | undefined = undefined;
  private _option: any | undefined = undefined;
  constructor(
    private localStorage: LocalStorage,
    private datePipe: DatePipe,
    public filter: Filter,
    public theme: Theme
  ) {
    effect(() => {
      this.updateOption();
      this.setOption();
    });
    effect(() => {
      this.init();
      this.setOption();
    })
  }

  public setOption(): void {
    if(this._option) { this._chart?.setOption(this._option) }
  }

  public init(): void {
    const theme = this.theme.darkTheme() ? 'dark' : '';
    const chartDom = document.getElementById('chart-container');
    if(!chartDom?.clientHeight){ return };
    this._chart?.dispose();
    this._chart = echarts.init(chartDom, theme);
    this._chart.off('click');
    this._chart.on('click', (params: any) => {
      this.clickToChart(params);
    });
  }

  updateOption(){
    const data = this.localStorage.filter(this.localStorage.allOperations());
    const formattedData = this.format(data)
    this._option = {
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
    this.setOption();
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
