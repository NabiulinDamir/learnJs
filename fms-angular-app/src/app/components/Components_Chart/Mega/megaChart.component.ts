import { Component, computed } from '@angular/core';
import { Chart } from '../chart/chart.component';
import { IOperation } from '../../../models/dataTypes.model';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { Filter } from '../../../servises/filter.service';
import { Theme } from '../../../servises/theme.service';
@Component({
  selector: 'my-mega-chart',
  templateUrl: './megaChart.html',
  imports: [Chart],
})
export class MegaChart {

  constructor(public localStorage: LocalStorage, public filterService: Filter, public theme: Theme) {

  }

  public option = computed(() => {
    const sortedIncome = [...this.incomeOperationsToMonth()].sort((a, b) => a.value - b.value);
    const sortedExpens = [...this.expensOperationsToMonth()].sort((a, b) => a.value - b.value);

    const incomeValues = sortedIncome.map(a => a.value);
    const expensValues = sortedExpens.map(a => a.value);

    const maxCount = Math.max(...incomeValues, ...expensValues);

    const summIncome = incomeValues.reduce((sum, a) => sum + a, 0);
    const summExpens = expensValues.reduce((sum, a) => sum + a, 0);

    const incomeMonthsArr = sortedIncome.map(a => a.name);
    const expensMonthsArr = sortedExpens.map(a => a.name);
    const reverseIncomeValue = incomeValues.map(a => maxCount - a);
    const reverseExpensValue = expensValues.map(a => maxCount - a);

    const bestCategoryIncomeName = this.incomeOperationsToCategory()[0]?.name || '...';
    const bestCategoryExpensName = this.expensOperationsToCategory()[0]?.name || '...';

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
          data: this.incomeOperationsToCategory(),
        },
        {
          type: 'pie',
          radius: [0, '30%'],
          center: ['75%', '75%'],
          data: this.expensOperationsToCategory(),
        },
      ],
    };
  });

  private incomeOperationsToMonth = computed((): { name: string; value: number }[] =>
    this.formatToMonth(this.localStorage.getAllOperationsByType('income'))
  )

  private expensOperationsToMonth = computed((): { name: string; value: number }[] =>
    this.formatToMonth(this.localStorage.getAllOperationsByType('expens'))
  )

  private incomeOperationsToCategory = computed((): { name: string; value: number }[] => 
    this.formattToCategory(this.localStorage.getAllOperationsByType('income'))
  )

  private expensOperationsToCategory = computed((): { name: string; value: number }[] => 
    this.formattToCategory(this.localStorage.getAllOperationsByType('expens'))
  )

  private formatToMonth(data: IOperation[]): { name: string; value: number }[] {

    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = new Map();
    let currentDate = new Date(this.filterService.startYearInteval());
    let endDate = new Date(this.filterService.endYearInteval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0 });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } while (currentDate <= endDate);

    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      resultMap.set(key, {
        name: key,
        value: mapElemet.value + operation.value,
      });
    }

    const res = Array.from(resultMap.values());
    return res;
  }

  private formattToCategory(data: IOperation[]): { name: string; value: number }[] {

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

  private formatDate(date: Date): string | null {
    const MONTHS = [ 'Январь',  'Февраль',  'Март',  'Апрель',  'Май',  'Июнь',  'Июль',  'Август',  'Сентябрь',  'Октябрь',  'Ноябрь',  'Декабрь'];
    return MONTHS[date.getMonth()];
  }

}