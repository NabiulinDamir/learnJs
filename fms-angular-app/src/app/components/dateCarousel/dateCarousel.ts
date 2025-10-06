import { Component, input, output, computed, model, effect, viewChild, ElementRef, signal } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { MovableDirective } from '../../directives/movable.directive';
import { Renderer2 } from '@angular/core';
import { PointnerDirective } from '../../directives/pointner.directive';
import { Filter } from '../../servises/filter.service';
@Component({
  selector: 'my-date-carousel',
  template: `
  {{filter.date()}}
  <div class="position-relative h-5 overflow-x-hidden bg-emphasis" >
    
    <ul #option_list class="nav position-absolute p-1 h-100 d-flex flex-nowrap " movable [left]='position' >
      @for(item of allDatesArray; track $index){
        <li class=" rounded-3 d-flex justify-content-center" 
          [style.width]='calcWidth(item.name.length)' 
          (click)="selectDate(item.date)"
          selectable
          pointner
          [class.bg-primary]="isSelectedDate(item.date)"
          >{{item.name}}</li>
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
  imports: [MovableDirective, SelectableDirective, PointnerDirective],
  providers: [DatePipe],
})
export class DateCarousel {
  public position: number = 0;
  public allDatesArray: { name: string, date: Date }[] = [];
  private ELEMENT_LIST_PARRENT = viewChild<any>('option_list');

  constructor(public localStorage: LocalStorage, private datePipe: DatePipe, public filter: Filter) {
    effect(() => {
      this.setAllDatesArray();
      this.setDefaultItem();
      this.navigateToSelectedItem();
    })
  }


  setAllDatesArray() {
    console.log("Сборка дат")
    this.allDatesArray = [];
    const allOperations = this.localStorage.allOperations().sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    for (const operation of allOperations) {
      const name = <string>this.datePipe.transform(operation.date, this.datePattern);
      if (this.allDatesArray.map(a => a.name).includes(name)) { continue }
      this.allDatesArray.push({ name: name, date: operation.date });
    }


  }

  setDefaultItem() {
    const today: Date = new Date();
    const todayFormat = <string>this.datePipe.transform(today, this.datePattern);
    if (this.allDatesArray.find(a => a.name === todayFormat)) {
      this.filter.setDate(today);
    }
    else {
      this.filter.setDate(this.allDatesArray[this.allDatesArray.length - 1]?.date);
    }
  }


  setDatesArray(): void {

  }

  ///////////////////////////////////////////////////////////////////////

  calcWidth(length: number) {
    return (11 - length) * 100 + "px"
  }

  navigateToSelectedItem() {
    const children = this.ELEMENT_LIST_PARRENT().nativeElement.children;
    Array.from(children).forEach((child: unknown) => {
      const element = child as HTMLElement;
      const text = element.textContent?.trim();
      if (text === this.datePipe.transform(this.filter.date(), this.datePattern)) {
        const containerWidth = window.innerWidth;
        const containerCenter = containerWidth / 2;
        const elemCenter = element.offsetLeft + (element.offsetWidth / 2);
        this.position = containerCenter - elemCenter;
      }
    });
  }

  selectDate(newDate: Date): void {
    this.filter.setDate(newDate);
  }

  isSelectedDate(date: Date): boolean {
    const currentDate = <string>this.datePipe.transform(date, this.datePattern)
    const filterDate = <string>this.datePipe.transform(this.filter.date(), this.datePattern)
    return currentDate === filterDate
  }

  ngOnInit() {
    // this.localStorage.onOperationsChanged.subscribe((value) => { this.setData(); });
    // this.filter.onDateChange.subscribe(async (value) => { this.navigateToSelectedItem(); })
    // this.filter.onIntervalChanged.subscribe(async(value) => { this.setData(); this.setDefaultItem() })
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (date1.getTime() === date2.getTime())
  }

  public get datePattern(): string {
    switch (this.filter.interval()) {
      case "day":
        return "dd.MM.yyyy";
      case "month":
        return "MM.yyyy";
      case "year":
        return "yyyy";
      default:
        return "dd.MM.yyyy";
    }
  }

}
