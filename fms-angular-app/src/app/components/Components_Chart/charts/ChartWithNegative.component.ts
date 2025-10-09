import { Component, OnDestroy, ElementRef, HostListener, computed, effect, signal } from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../../servises/filter.service';
import { IOperation } from '../../../models/dataTypes.model';
import { Theme } from '../../../servises/theme.service';

@Component({
  selector: 'my-chart-negative',
  providers: [DatePipe],
  template: `
    <div class="position-relative w-100 d-flex justify-content-around">
      <div
        id="chart-negative-container"
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
  `,
})
export class ChartWithNegative implements OnDestroy {
  private _chart: echarts.ECharts | undefined = undefined;
  private observer!: IntersectionObserver;
  private _isVisible = signal<boolean>(false);
  constructor(
    private localStorage: LocalStorage,
    private datePipe: DatePipe,
    private element: ElementRef,
    public filter: Filter,
    theme: Theme
  ) {
    effect(() => {
      if (!this._isVisible()) return;
      const chartDom = document.getElementById('chart-negative-container');
      chartDom?.removeAttribute('_echarts_instance_');
      this._chart = echarts.init(chartDom, theme.darkTheme() ? 'dark' : '');
      this._chart.setOption(this.option());
      this._chart.off('click');
      this._chart.on('click', (params: any) => {
        this.clickToChart(params);
      });
    });
  }

  option = computed(() => {
    const data = this.format(this.localStorage.filterOperations());
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      title: {
        text: `Орерации за ${this.filter.intervalLocale}`,
        position: 'top',
      },
      grid: {
        top: 80,
        bottom: 30,
      },
      yAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      xAxis: {
        data: data.map((item) => item.name),
        type: 'category',
        axisLine: { show: false },
        axisLabel: {},
        axisTick: { show: false },
        splitLine: { show: false },
      },
      series: [
        {
          markLine: {
            data: [
              {
                yAxis: 0,
                lineStyle: {
                  color: '#0d6efd',
                  width: 2,
                },
                label: { show: false },
              },
            ],
          },
          name: 'Итого',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            formatter: '{c}',
          },
          itemStyle: {
            color: (params: any) => {
              if (params.value > 0) {
                return '#28a745';
              } else if (params.value < 0) {
                return '#dc3545';
              } else {
                return '#000000';
              }
            },
          },
          data: data,
        },
      ],
    };
  });

  format(data: IOperation[]): { name: string; value: number; date: Date }[] {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());

    const resultMap = new Map();

    let currentDate = new Date(this.filter.startInterval);
    let endDate = new Date(this.filter.endInterval);

    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0, date: currentDate });
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
      const expensValue = operation.type === 'expens' ? -operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: key, value: incomeValue + expensValue, date: operation.date });
      } else {
        resultMap.set(key, {
          name: key,
          value: mapElemet.value + incomeValue + expensValue,
          date: operation.date,
        });
      }
    }

    const res = Array.from(resultMap.values());
    return res;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  clickToChart(params: any): void {
    if (params.componentType === 'series') {
      this.filter.downInterval();
      setTimeout(() => this.filter.setDate(params.data.date), 100);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  formatDate(date: Date): string | null {
    const pattern = () => {
      switch (this.filter.interval()) {
        case 'day':
          return 'H';
        case 'month':
          return 'dd';
        case 'year':
          return 'MMMM';
        default:
          return 'dd.MM.yyyy';
      }
    };
    return this.datePipe.transform(date, pattern());
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      this._isVisible.set(entry.isIntersecting);
    });

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this._chart?.dispose();
    this.observer?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this._chart) {
      this._chart.resize();
    }
  }

  get hasData(): boolean {
    return this.localStorage.filterOperations().length > 0;
  }
}
