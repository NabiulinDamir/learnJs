import { Component, computed } from '@angular/core';
import { Chart } from '../chart/chart.component';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { Filter } from '../../../servises/filter.service';
@Component({
  selector: 'my-dataset-chart',
  templateUrl: './datasetChart.html',
  imports: [ Chart ],
})
export class DatasetChart {

  constructor(public localStorege: LocalStorage, public filterService: Filter) {

  }

  public option = computed(() => {
    const data = this.formattedData();
    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Доходы', 'Расходы'],
        itemGap: 5,
      },
      title: {
        text: `Операции за ${this.filterService.intervalLocale()}`,
        position: 'top',
      },
      dataset: {
        source: data,
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
    return option;
  });

  private formattedData = computed((): { name: string; income: number; expens: number; date: Date }[] => {

    const data = this.localStorege.getFilteredOperations();
    const filterInterval = this.filterService.interval();

    const resultMap = new Map();

    let currentDate = new Date(this.filterService.startInterval());
    let endDate = new Date(this.filterService.endInterval());

    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, income: 0, expens: 0 });
      if (filterInterval === 'day') {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (filterInterval === 'month') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (filterInterval === 'year') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);

    for (const operation of data) {
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
    return Array.from(resultMap.values());
  })

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