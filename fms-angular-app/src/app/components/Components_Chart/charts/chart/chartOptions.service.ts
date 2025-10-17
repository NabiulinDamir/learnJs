import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { IOperation } from '../../../../models/dataTypes.model';
import { LocalStorage } from '../../../../servises/LocalStorage.service';
import { Filter } from '../../../../servises/filter.service';
import { DataFormatter } from './dataFormatter.service';

@Injectable({ providedIn: 'root' })
export class ChartOptions {
  constructor(protected localStorage: LocalStorage, public filterService: Filter, public dataFormatter: DataFormatter) {}

  public MEGA = computed(() => {

    const incomeOperationsFormat = this.dataFormatter.megaFormatToMonth(
      this.localStorage.getAllOperationsByType('income')
    );
    const expensOperationsFormat = this.dataFormatter.megaFormatToMonth(
      this.localStorage.getAllOperationsByType('expens')
    );

    const incomeCategoriesFormat = this.dataFormatter.megaFormatToCategory(
      this.localStorage.getAllOperationsByType('income')
    );
    const expensCategoriesFormat = this.dataFormatter.megaFormatToCategory(
      this.localStorage.getAllOperationsByType('expens')
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

    const option = {
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
            // color: this.theme.darkTheme() ? '#353232ee' : '#eeee',
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
            // color: this.theme.darkTheme() ? '#353232ee' : '#eeee',
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
  return option
  
})

  public ROUNDED = computed(() => {
    const formatIncomeData = this.dataFormatter.roundedFormat(this.localStorage.getFilteredOperationsByType('income'));
    const formatExpensData = this.dataFormatter.roundedFormat(this.localStorage.getFilteredOperationsByType('expens'));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
      },

      title: [
        {
          text: `${'Доходы'}: ${formatIncomeData.reduce((summ, a) => summ += a.value, 0)} руб.`,
          left: '30%',
          top: '10%',
          textAlign: 'center',
        },
        {
          text: `${'Расходы'}: ${formatExpensData.reduce((summ, a) => summ += a.value, 0)} руб.`,
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
          data: formatIncomeData,
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
          data: formatExpensData,
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

  public NEGATIVE = computed(() => {
    const intervalLocaleRu = this.filterService.intervalLocale();

    const allOperations = this.localStorage.getFilteredOperations().sort((a, b) => a.date.getTime() - b.date.getTime());
    const formattedData = this.dataFormatter.negativeFormat(allOperations)

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      title: {
        text: `Орерации за ${intervalLocaleRu}`,
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
        data: formattedData.map((item) => item.name),
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
          data: formattedData,
        },
      ],
    };

    return option;
  });

  public DATASET = computed(() => {
    const filteredOperations = this.localStorage
      .getFilteredOperations()
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    const intervalLocaleRu = this.filterService.intervalLocale();

    const formattedData = this.dataFormatter.datasetFormat(filteredOperations);
    
    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Доходы', 'Расходы'],
        itemGap: 5,
      },
      title: {
        text: `Операции за ${intervalLocaleRu}`,
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
    return option;
  });


}






