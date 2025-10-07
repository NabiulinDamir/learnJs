import { Component, OnDestroy, ElementRef, AfterViewInit, HostListener, computed, effect, OnInit, signal } from '@angular/core';
import * as echarts from 'echarts';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { DatePipe } from '@angular/common';
import { Filter } from '../../servises/filter.service';
import { IOperation } from '../../models/dataTypes.model';

@Component({
  selector: 'my-chart-two-rounded',
  providers: [DatePipe],
  template: `
    <div class="position-relative w-100 d-flex justify-content-around" >
      <div id="my-chart-rounded-income" [class.opacity-50]="!hasData" style="width: 30rem; height: 350px; max-width: 40vw;"></div>
      <div id="my-chart-rounded-expens" [class.opacity-50]="!hasData" style="width: 30rem; height: 350px; max-width: 40vw;"></div>
      @if(!hasData){ 
        <div class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center"> Нет данных </div>
      }
    </div>
  `,
})
export class ChartTwoRounded implements OnDestroy {
  private _incomeChart: echarts.ECharts | undefined = undefined;
  private _expensChart: echarts.ECharts | undefined = undefined;
  private observer!: IntersectionObserver;
  private _isVisible = signal<boolean>(false);
  constructor(private localStorage: LocalStorage, private datePipe: DatePipe, private element: ElementRef, public filter: Filter) {
    effect(() => {
      if (!this._isVisible()) return;
      const chartDomIncome = document.getElementById('my-chart-rounded-income');
      const chartDomExpens = document.getElementById('my-chart-rounded-expens');
      chartDomIncome?.removeAttribute('_echarts_instance_');
      chartDomExpens?.removeAttribute('_echarts_instance_');
      if (!this._incomeChart) { this._incomeChart = echarts.init(chartDomIncome); }
      if (!this._expensChart) { this._expensChart = echarts.init(chartDomExpens); }
      this._incomeChart.setOption(this.getOption("income"));
      this._expensChart.setOption(this.getOption("expens"));

    });
  }


  getOption(type: string) {
    const data = this.localStorage.getOperationsByType(type)
    const formatData = this.format(data)
    return {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: `${type === "income" ? "Доходы" : "Расходы"}: ${data.reduce((sum, item) => sum += item.value, 0)} руб.`,
        position: 'top'
      },

      series: [
        {
          name: 'Категория',
          type: 'pie',
          radius: ['40%', '70%'],
          data: formatData,
          top: '10%',
          label: {
            show: true,
            position: 'outside'

          },
          color: [
            '#0d6efd', // основной
            '#0a58ca', // темнее
            '#3d8bfd', // светлее
            '#6ea8fe', // еще светлее
            '#9fcdff', // самый светлый
            '#084298', // очень темный
            '#052c65'  // максимально темный
          ],


        }]
    };
  }

  format(data: IOperation[]): { name: string, value: number }[] {
    const resultMap = new Map();
    data.forEach(item => {
      const category = item.category;
      if (!resultMap.has(category)) { resultMap.set(category, { name: category, value: 0 }) }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }

  formatDate(date: Date): string | null {
    const pattern = () => {
      switch (this.filter.interval()) {
        case "day":
          return "H";
        case "month":
          return "d";
        case "year":
          return "MMMM";
        default:
          return "dd.MM.yyyy";
      }
    }
    return this.datePipe.transform(date, pattern())
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      this._isVisible.set(entry.isIntersecting);
    });

    this.observer.observe(this.element.nativeElement);
  }


  ngOnDestroy() {
    this._incomeChart?.dispose();
    this._expensChart?.dispose();
    this.observer?.disconnect();
  }


  @HostListener('window:resize')
  onWindowResize() {
    if (this._incomeChart) { this._incomeChart.resize(); }
    if (this._expensChart) { this._expensChart.resize(); }
  }

  get hasData(): boolean {
    return this.localStorage.filterOperations().length > 0;
  }
}
