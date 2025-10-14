import { Component, effect, viewChild, HostListener, untracked } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SelectableDirective } from '../../../directives/selectable.directive';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { MovableDirective } from '../../../directives/movable.directive';
import { PointnerDirective } from '../../../directives/pointner.directive';
import { Filter } from '../../../servises/filter.service';
import { IOperation } from '../../../models/dataTypes.model';

@Component({
  selector: 'my-date-carousel',
  template: `
    <div class="position-relative h-2-rem overflow-x-hidden">
      <ul
        #option_list
        class="nav position-absolute p-1 h-100 d-flex flex-nowrap gap-2"
        movable
        [left]="position"
      >
        @for(item of allDatesArray; track $index){
        <li
          class="rounded-3 d-flex justify-content-center th-background-second th-text"
          [style.width]="buttonsWidth + 'px'"
          (click)="selectDate(item.date)"
          selectable
          pointner
          [class.th-primmary]="item.name === formatSelectedDay"
        >
          {{ item.name }}
        </li>
        }
      </ul>
    </div>
  `,
  imports: [MovableDirective, SelectableDirective, PointnerDirective],
  providers: [DatePipe],
})
export class DateCarousel {
  public position: number = 0;
  public allDatesArray: { name: string; date: Date }[] = [];
  private ELEMENT_LIST_PARRENT = viewChild<any>('option_list');

  public interval: string = '';

  /////Вынес в переменные/////
  public buttonsWidth: number = 0;
  public formatSelectedDay: string = '';
  /////Вынес в переменные/////

  constructor(
    localStorage: LocalStorage,
    public datePipe: DatePipe,
    public filter: Filter
  ) {
    effect(() => {
      const allOperations = localStorage.allOperations();
      this.interval = filter.interval();
      this.setAllDatesArray(allOperations);
      this.setDefaultItem();
      this.calcWidth(this.interval);
    });
    effect(() => {
      const filterSelectedDate = filter.date();
      this.setFormatSelectedDate(filterSelectedDate);
      setTimeout(() => { this.navigateToItem(filterSelectedDate) }, 200);
    })
  }

  setAllDatesArray(allOperations: IOperation[]) {
    this.allDatesArray = [];
    allOperations.sort((a, b) => a.date.getTime() - b.date.getTime());
    for (const operation of allOperations) {
      const name = <string>this.datePipe.transform(operation.date, this.datePattern);
      if (this.allDatesArray.map((a) => a.name).includes(name)) {
        continue;
      }
      this.allDatesArray.push({ name: name, date: operation.date });
    }
  }

  setDefaultItem() {
    const today: Date = new Date();
    if (this.allDatesArray.find((a) => a.name === this.datePipe.transform(today, this.datePattern))) {
      this.filter.setDate(today);
    } else {
      const lastDate = this.allDatesArray[this.allDatesArray.length - 1]?.date
      this.filter.setDate(lastDate);
    }
  }

  ///////////////////////////////////////////////////////////////////////

  calcWidth(filterInterval: string) {
    let result = 0;
    switch(filterInterval){
      case 'day': 
        result = 100;
        break;
      case 'month':
        result = 350;
        break;
      case 'year': 
        result = 500;
        break;
      default: 
        result = 200;
        break;
    }
    this.buttonsWidth = result;
  }

  navigateToItem(currentDate: Date) {
    const children = this.ELEMENT_LIST_PARRENT().nativeElement.children;
    Array.from(children).forEach((child: unknown) => {
      const element = child as HTMLElement;
      const text = element.textContent?.trim();
      if (text === this.datePipe.transform(currentDate, this.datePattern)) {
        const containerWidth = window.innerWidth;
        const containerCenter = containerWidth / 2;
        const elemCenter = element.offsetLeft + element.offsetWidth / 2;
        this.position = containerCenter - elemCenter;
      }
    });
  }

  selectDate(newDate: Date): void {
    this.filter.setDate(newDate);
    this.navigateToItem(newDate);
  }

  setFormatSelectedDate(filterDate: Date): void {
    this.formatSelectedDay = <string>this.datePipe.transform(filterDate, this.datePattern);
  }


  @HostListener('window:resize')
  onWindowResize() {
    this.navigateToItem(this.filter.date());
  }

  public get datePattern(): string {
    switch (this.interval) {
      case 'day':
        return 'dd.MM.yyyy';
      case 'month':
        return 'MM.yyyy';
      case 'year':
        return 'yyyy';
      default:
        return 'dd.MM.yyyy';
    }
  }
}
