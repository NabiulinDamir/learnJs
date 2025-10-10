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
  selector: 'my-chart-mega',
  providers: [DatePipe],
  template: `
    <div class="position-relative d-flex justify-content-around h-25rem">
      <div
        id="chart-container"
        class=" w-100"
        [class.opacity-50]="!hasData"
        style="height: 800px; max-width: 100vw;"
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
export class ChartMega implements OnDestroy {
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
      if (!this._isVisible()) return;
      const chartDom = document.getElementById('chart-container');
      chartDom?.removeAttribute('_echarts_instance_');
      if (!chartDom || chartDom.clientWidth === 0) return;
      this._chart = echarts.init(chartDom, theme.darkTheme() ? 'dark' : '');
      this._chart.setOption(this.option());
    });
  }

  option = computed(() => {

    const incomeOperationsFormat =  this.formatToMonth(this.localStorage.getOperationsByType('income'));
    const expensOperationsFormat =  this.formatToMonth(this.localStorage.getOperationsByType('expens'));

    const incomeCategoriesFormat = this.formatToCategory(this.localStorage.getOperationsByType('income'))
    const expensCategoriesFormat = this.formatToCategory(this.localStorage.getOperationsByType('expens'))

    //страшный мапинг :(
    const incomeValues = incomeOperationsFormat.map(a => a.value).sort((a, b) => a - b);
    const expensValues = expensOperationsFormat.map(a => a.value).sort((a, b) => a - b);
    const incomeMonthsArr = incomeOperationsFormat.sort((a, b) => a.value - b.value).map(a => a.name);
    const expensMonthsArr = expensOperationsFormat.sort((a, b) => a.value - b.value).map(a => a.name);
    const maxCount = Math.max(...incomeValues.concat(expensValues))
    const summIncome = incomeValues ? incomeValues.reduce((summ, a) => a + summ) : 0;
    const summExpens = expensValues ? expensValues.reduce((summ, a) => a + summ) : 0;
    const reverseIncomeValue = incomeValues.map((a) => maxCount - a)
    const reverseExpensValue = expensValues.map((a) => maxCount - a)
    
    const bestCategoryIncomeName = incomeCategoriesFormat.length ? incomeCategoriesFormat.reduce((max, a) => a.value > max.value ? a : max).name : '...';
    const bestCategoryExpensName = expensCategoriesFormat.length ? expensCategoriesFormat.reduce((max, a) => a.value > max.value ? a : max).name : '...';

    return {
      backgroundColor: 'transparent',
      tooltip: {},
      title: [
        {
          text: 'Доходы',
          subtext: 'Суммарно: ' + summIncome,
          left: '25%',
          textAlign: 'center',
        },
        {
          text: 'Категории доходов',
          subtext: "Больше всего доходов: " + bestCategoryIncomeName,
          left: '75%',
          textAlign: 'center',
        },
        {
          text: 'Расходы',
          subtext: 'Суммарно: ' + summExpens,
          left: '25%',
          top: '50%',
          textAlign: 'center',
        },
        {
          text: 'Категории расходов',
          subtext: "Больше всего трат: " + bestCategoryExpensName,
          left: '75%',
          top: '50%',
          textAlign: 'center',
        },
      ],
      grid: [
        {
          top: '8%',
          width: '50%',
          bottom: '50%',
          left: 10,
          containLabel: true,
        },
        {
          top: '56%',
          width: '50%',
          bottom: 0,
          left: 10,
          containLabel: true,
        },
      ],
      xAxis: [
        {
          type: 'value',
          max: maxCount,
          splitLine: {
            show: false,
          },
        },
        {
          type: 'value',
          max: maxCount,
          gridIndex: 1,
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'category',
          data: incomeMonthsArr,
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
          splitLine: {
            show: false,
          },
        },
        {
          gridIndex: 1,
          type: 'category',
          data: expensMonthsArr,
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: 'bar',
          stack: 'chart',
          z: 3,
          label: {
            position: 'right',
            show: true,
          },
          data: incomeValues,
        },
        {
          type: 'bar',
          stack: 'chart',
          silent: true,
          itemStyle: {
            color: this.theme.darkTheme() ? '#353232ee' : '#eeee',
          },
          data: reverseIncomeValue,
        },
        {
          type: 'bar',
          stack: 'component',
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            position: 'right',
            show: true,
          },
          data: expensValues,
        },
        {
          type: 'bar',
          stack: 'component',
          silent: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: this.theme.darkTheme() ? '#353232ee' : '#eeee',
          },
          data: reverseExpensValue,
        },
        {
          type: 'pie',
          radius: [0, '30%'],
          center: ['75%', '25%'],
          data: incomeCategoriesFormat
        },
        {
          type: 'pie',
          radius: [0, '30%'],
          center: ['75%', '75%'],
          data: expensCategoriesFormat
        },
      ],
    };
  });

  formatToMonth(data: IOperation[]): { name: string; value: number;}[] {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = new Map();
    let currentDate = new Date(this.filter.startYearInteval);
    let endDate = new Date(this.filter.endYearInteval);
    do {
      const key = this.datePipe.transform(currentDate, 'MMMM');
      resultMap.set(key, { name: key, value: 0 });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } while (currentDate <= endDate);

    for (const operation of allOperations) {
      const key = this.datePipe.transform(operation.date, 'MMMM');
      const mapElemet = resultMap.get(key);
      resultMap.set(key, {
        name: key,
        value: mapElemet.value + operation.value,
      });
    }

    const res = Array.from(resultMap.values());
    return res;
  }



  formatToCategory(data: IOperation[]): { name: string; value: number }[] {
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
  ////////////////////////////////////////////////////////////////////////////////

  // clickToChart(params: any): void {
  //   if (params.componentType === 'series') {
  //     this.filter.downInterval();
  //     setTimeout(() => this.filter.setDate(params.data.date), 100);
  //   }
  // }

  ////////////////////////////////////////////////////////////////////////////////


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
    return this.localStorage.allOperations().length > 0;
  }
}
