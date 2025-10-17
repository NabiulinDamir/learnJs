import { Component, computed } from '@angular/core';
import { Chart } from '../chart/chart.component';
import { IOperation } from '../../../models/dataTypes.model';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { Filter } from '../../../servises/filter.service';
@Component({
  selector: 'my-rounded-chart',
  templateUrl: './roundedChart.html',
  imports: [ Chart ],
})
export class RoundedChart {

  constructor(public localStorege: LocalStorage, public filterService: Filter) {

  }

  public option = computed(() => {
    const incomeData = this.formattedIncomeData();
    const expensData = this.formattedExpensData();

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
      },

      title: [
        {
          text: `${'Доходы'}: ${incomeData.reduce((summ, a) => summ += a.value, 0)} руб.`,
          left: '30%',
          top: '10%',
          textAlign: 'center',
        },
        {
          text: `${'Расходы'}: ${expensData.reduce((summ, a) => summ += a.value, 0)} руб.`,
          left: '70%',
          top: '10%',
          textAlign: 'center',
        },
      ],

      series: [
        {
          name: 'Категория',
          type: 'pie',
          radius: ['40%', '70%'],
          data: incomeData,
          top: '10%',
          label: {
            show: true,
            position: 'outside',
          },
          center: ['30%', '50%'],
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
        {
          name: 'Категория',
          type: 'pie',
          radius: ['40%', '70%'],
          data: expensData,
          top: '10%',
          label: {
            show: true,
            position: 'outside',
          },
          center: ['70%', '50%'],
          color: ['#0d6efd', '#0a58ca', '#3d8bfd', '#6ea8fe', '#9fcdff', '#084298', '#052c65'],
        },
      ],
    };
  });

  private formattedIncomeData = computed(() => 
    this.format(this.localStorege.getFilteredOperationsByType('income'))
  )

  private formattedExpensData = computed(() => 
    this.format(this.localStorege.getFilteredOperationsByType('expens'))
  )

  private format(data: IOperation[]): { name: string; value: number }[] {
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
    switch (this.filterService.interval()) {
      case 'day':
        return date.getHours().toString();
      case 'month':
        return date.getDate().toString();
      case 'year':
        return date.getMonth().toString();
      default:
        return 'dd.MM.yyyy';
    }
  }

}