import { Component, computed } from '@angular/core';
import { Chart } from '../chart/chart.component';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { Filter } from '../../../servises/filter.service';
@Component({
  selector: 'my-negative-chart',
  templateUrl: './negativeChart.html',
  imports: [ Chart ],
})
export class NegativeChart {

  constructor(public localStorege: LocalStorage, public filterService: Filter) {

  }

  public option = computed(() => {
    const data = this.formattedData();
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      title: {
        text: `Орерации за ${this.filterService.intervalLocale()}`,
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

  private formattedData = computed(():  { name: string; value: number; date: Date }[] => {
    const allOperations = this.localStorege.getFilteredOperations().sort((a, b) => a.date.getTime() - b.date.getTime());

    const resultMap = new Map();

    let currentDate = new Date(this.filterService.startInterval());
    let endDate = new Date(this.filterService.endInterval());

    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0, date: currentDate });
      if (this.filterService.interval() === 'day') {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (this.filterService.interval() === 'month') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (this.filterService.interval() === 'year') {
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