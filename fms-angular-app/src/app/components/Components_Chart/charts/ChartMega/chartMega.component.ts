import { Component, OnDestroy, HostListener, effect } from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../../../servises/filter.service';
import { IOperation } from '../../../../models/dataTypes.model';
import { Theme } from '../../../../servises/theme.service';

@Component({
  selector: 'my-chart-mega',
  providers: [DatePipe],
  templateUrl: './chartMega.html',
})
export class ChartMega implements OnDestroy {
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
    });
  }

  setOption() {
    this._chart?.setOption(this._option);
  }

  init(): void {
    const theme = this.theme.darkTheme() ? 'dark' : '';
    const chartDom = document.getElementById('chart-container');
    this._chart?.dispose();
    if (chartDom?.clientHeight === 0) return;
    this._chart = echarts.init(chartDom, theme);
  }

  updateOption() {
    const incomeOperationsFormat = this.formatToMonth(
      this.localStorage.getOperationsByType('income')
    );
    const expensOperationsFormat = this.formatToMonth(
      this.localStorage.getOperationsByType('expens')
    );

    const incomeCategoriesFormat = this.formatToCategory(
      this.localStorage.getOperationsByType('income')
    );
    const expensCategoriesFormat = this.formatToCategory(
      this.localStorage.getOperationsByType('expens')
    );

    const sortedIncome = [...incomeOperationsFormat].sort((a, b) => a.value - b.value);
    const sortedExpens = [...expensOperationsFormat].sort((a, b) => a.value - b.value);

    const incomeValues = sortedIncome.map(a => a.value);
    const expensValues = sortedExpens.map(a => a.value);

    const maxCount = Math.max(...incomeValues, ...expensValues);

    const summIncome = incomeValues.reduce((sum, a) => sum + a, 0);
    const summExpens = expensValues.reduce((sum, a) => sum + a, 0);

    const incomeMonthsArr = sortedIncome.map(a => a.name);
    const expensMonthsArr = sortedExpens.map(a => a.name);
    const reverseIncomeValue = incomeValues.map(a => maxCount - a);
    const reverseExpensValue = expensValues.map(a => maxCount - a);

    const bestCategoryIncomeName = incomeCategoriesFormat[0]?.name || '...';
    const bestCategoryExpensName = expensCategoriesFormat[0]?.name || '...';

    this._option = {
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
          subtext: 'Больше всего доходов: ' + bestCategoryIncomeName,
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
          subtext: 'Больше всего трат: ' + bestCategoryExpensName,
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
          data: incomeCategoriesFormat,
        },
        {
          type: 'pie',
          radius: [0, '30%'],
          center: ['75%', '75%'],
          data: expensCategoriesFormat,
        },
      ],
    };
  }

  formatToMonth(data: IOperation[]): { name: string; value: number }[] {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = new Map();
    let currentDate = new Date(this.filter.startYearInteval());
    let endDate = new Date(this.filter.endYearInteval());
    do {
      const key = this.datePipe.transform(isNaN(currentDate.getTime()) ? new Date() : currentDate, 'MMMM');
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
    return this.localStorage.allOperations().length > 0;
  }
}
