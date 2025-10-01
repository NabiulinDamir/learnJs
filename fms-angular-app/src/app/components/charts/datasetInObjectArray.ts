import { Component, OnInit, OnDestroy, input, computed, effect } from '@angular/core';
import * as echarts from 'echarts';
import { IFilterOption, IOperation } from '../../models/dataTypes.model';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'my-dataset-chart',
  providers: [ DatePipe ],
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

  get hasData(): boolean { return this.localStorage.operations.length > 0; }

  constructor(
    private localStorage: LocalStorage,  
    private datePipe: DatePipe) { }

  private initChart() {
    const chartDom = <HTMLElement>document.getElementById('chart-container');
    this._chart = <echarts.ECharts>echarts.init(chartDom);

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source:
          this.formattedData
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


  get formattedData() {
    const allOperations = this.localStorage.operations.sort((a, b) => a.date.getTime() - b.date.getTime());

    const resultMap = new Map();

    for (const operation of allOperations) {
      const key = this.datePipe.transform(operation.date, 'dd.MM.yyyy');
      const name = this.datePipe.transform(operation.date, 'dd');
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === "income" ? operation.value : 0;
      const expensValue = operation.type === "expens" ? operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: name, income: incomeValue, expens: expensValue });
      }
      else {
        resultMap.set(key, { name: name, income: mapElemet.income + incomeValue, expens: mapElemet.expens + expensValue })
      }
    }
    console.log(Array.from(resultMap.values()))
    return Array.from(resultMap.values())
  }

  ngOnInit() {
    this.initChart();
    this.localStorage.onOperationsChanged.subscribe(value => {
      if (this._chart) {
        this._chart.dispose();
        this.initChart()
      }
      
    })
  }

  ngOnDestroy() {
    this._chart?.dispose();
  }


}