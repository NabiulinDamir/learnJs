import { Component, OnInit, OnDestroy, input, computed, effect } from '@angular/core';
import * as echarts from 'echarts';
import { IFilterOption, IOperation } from '../../models/dataTypes.model';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'my-chart-scope',
  providers: [DatePipe],
  template: `
    <div class="position-relative">
      <div id="dataset-scope" [class.opacity-50]="!hasData" style="width: 450px; height: 350px;" ></div>
      @if(!hasData){
      <div class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center" > Нет данны </div>
      }
    </div>

    <style></style>
  `,
})
export class ChartScope implements OnInit, OnDestroy {
  private _chart: echarts.ECharts | undefined = undefined;

  get hasData(): boolean {
    return this.localStorage.filterOperations.length > 0;
  }

  constructor(private localStorage: LocalStorage, private datePipe: DatePipe) { }

  private initChart() {
    if (this._chart) {
      this._chart.dispose();
    }

    const chartDom = <HTMLElement>document.getElementById('dataset-scope');
    this._chart = <echarts.ECharts>echarts.init(chartDom);

    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: this.formattedData,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          name: 'Доходы',
          type: 'bar',
          color: ['#0d6efd'],
        },
        {
          name: 'Расходы',
          type: 'bar',
          color: ['#6c757d'],
        },
      ],
    };

    this._chart.setOption(option);
  }

  get formattedData() {
    const allOperations = this.localStorage.filterOperations().sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    const result: string[] = [];
    
    const startDate: Date = new Date;

    return []


    // for (const operation of allOperations) {
    //   const key = this.datePipe.transform(operation.date, 'dd.MM.yyyy');
    //   const name = this.datePipe.transform(operation.date, 'dd');
    //   const mapElemet = resultMap.get(key);
    //   const incomeValue = operation.type === 'income' ? operation.value : 0;
    //   const expensValue = operation.type === 'expens' ? operation.value : 0;
    //   if (!mapElemet) {
    //     resultMap.set(key, { name: name, income: incomeValue, expens: expensValue });
    //   } else {
    //     resultMap.set(key, {
    //       name: name,
    //       income: mapElemet.income + incomeValue,
    //       expens: mapElemet.expens + expensValue,
    //     });
    //   }
    // }
    // return Array.from(resultMap.values());
  }

  ngOnInit() {
    // this.initChart();
    // this.localStorage.onOperationsChanged.subscribe((value) => { this.initChart(); });
    // this.localStorage.onFilterOptionLengthChanged.subscribe((value) => { this.initChart(); })
    // this.localStorage.onFilterOptionDateChanged.subscribe((value) => { this.initChart(); })
  }

  ngOnDestroy() {
    console.log("ltcnhjq")
    this._chart?.dispose();
  }
}
