import { Component, OnInit, OnDestroy, input, computed, effect } from '@angular/core';
import * as echarts from 'echarts';
import { IFilterOption, IOperation } from '../../../models/dataTypes.model';

@Component({
  selector: 'my-dataset-chart',
  template: `
  <div class="position-relative" >
    <div id="chart-container" [class.opacity-50]='!hasData'  style="width: 450px; height: 350px;"></div>
    @if(!hasData){<div class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center">Нет данных</div>}
  </div>

  <style>

  </style>
  `,
})
export class DatasetInObjectArray implements OnInit, OnDestroy {
  private _chart: echarts.ECharts | undefined = undefined;
  data = input<IOperation[]>([]);
  filterOption = input<IFilterOption>({ length: 'day', date: new Date() });

  get hasData(): boolean {//!!!Оптимизация мертва!!!
    console.log()
    return this.data().length > 0;

  }
  constructor() {
    effect(() => {
      if (this._chart) {
        this._chart.dispose(); // Уничтожь предыдущий инстанс
        this.initChart()
      }
    });
  }



  ngOnInit() {
    this.initChart();
  }

  private initChart() {
    const chartDom = <HTMLElement>document.getElementById('chart-container');
    this._chart = <echarts.ECharts>echarts.init(chartDom);

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        // dimensions: ['period', 'income', 'expens'],
        source:
          // this.formattedData()
          [
            { period: '01.02.2004', income: 430, expens: 130 },
            { period: '01.02.2005', income: 270, expens: 320 },
            { period: '01.02.2006', income: 140, expens: 233 },
            { period: '01.02.2007', income: 530, expens: 350 }
          ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          name: "Доходы",
          type: "bar",
          color: ['#0d6efd',],
        },
        {
          name: "Расходы",
          type: "bar",
          color: ['#6c757d',],
        },

      ],
    };

    this._chart.setOption(option);



  }


  // get formatedDate() {
  //   const allOperations = this.data();
  //   const time_delay = this.filterOption();

  //   const resultMap = new Map();
  //   allOperations.sort((a, b) => a.date.getTime() - b.date.getTime())
  //   allOperations.forEach(item => {
  //     const date = new Date(item.date);

  //     const key = `
  //               ${time_delay.length == "day" ? date.getDate() : ''}.
  //               ${time_delay.length == "day" || time_delay.length == "month" ? date.getMonth() : ''}.
  //               ${date.getFullYear()}`;

  //     const name = `${localDB.formatDate(date)}`;
  //     if (!resultMap.has(key)) { resultMap.set(key, [name, 0, 0]); }
  //     const [_, income, expense] = resultMap.get(key);
  //     if (item.type > 0) {
  //       resultMap.set(key, [name, income + item.value, expense]);
  //     } else {
  //       resultMap.set(key, [name, income, expense + item.value]);
  //     }
  //   });

  //   return Array.from(resultMap.values())
  // }



  ngOnDestroy() {
    this._chart?.dispose();
  }

  formatDateToString(date: Date = new Date) {
    return date.toISOString().split('T')[0]
  }
}