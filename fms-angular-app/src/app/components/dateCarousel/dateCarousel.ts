import { Component, input, output, computed, model, effect, viewChild } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { MovableDirective } from '../../directives/movable.directive';

@Component({
  selector: 'my-date-carousel',
  template: `
  <div class="position-relative h-5" >
    <ul #movable_line class="nav position-absolute p-1 h-100 d-flex flex-row" movable [left]='position' >
        @for(item of allData; track $index){
          <div class="nav-item rounded-3 bg-white d-flex justify-content-center" 
          [style.width]='calcWidth(item.name.length)' 
          (click)="selectedItem(item.date)"
          selectable
          [selected]="localStorage.filterOption.date === item.date"
          >{{item.name}}</div>
        }
    </ul>
  </div>

  <style> 
    .h-5{
      height: 2rem;
      overflow: hidden;
    }
  </style>
  `,
  imports: [MovableDirective, SelectableDirective],
  providers: [DatePipe],
})
export class DateCarousel {
  public position: number = 0;
  public allData: { name: string, date: Date }[] = [];

  constructor(public localStorage: LocalStorage, public datePipe: DatePipe) { }

  setData() {
    const allOperations = this.localStorage.allOperations.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    this.allData = [];
    for (const operation of allOperations) {
      const name = <string>this.datePipe.transform(operation.date, this.localStorage.datePattern);
      if (this.allData.map(a => a.name).includes(name)) { continue }
      const date = new Date(operation.date)
      date.setHours(0, 0, 0, 0)
      if (this.localStorage.filterOption.length === "month") { date.setDate(1) }
      if (this.localStorage.filterOption.length === "year") { date.setMonth(0);  date.setDate(1) }
      this.allData.push({ name: name, date: date });
    }
  }

  ///////////////////////////////////////////////////////////////////////

  calcWidth(length: number) {
    return 1000 / length * 1.5 + "px"
  }

  selectedItem(item: Date) {
    this.localStorage.setFilterOptionsDate(item);
    console.log(item)

  }

  ngOnInit() {
    this.localStorage.onOperationsChanged.subscribe((value) => { this.setData(); });
    this.localStorage.onFilterOptionChanged.subscribe((value) => { this.setData(); })
  }

}
