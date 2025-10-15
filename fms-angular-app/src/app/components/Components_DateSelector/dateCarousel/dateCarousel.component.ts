import { Component, effect, viewChild, HostListener, untracked, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SelectableDirective } from '../../../directives/selectable.directive';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { MovableDirective } from '../../../directives/movable.directive';
import { PointnerDirective } from '../../../directives/pointner.directive';
import { Filter } from '../../../servises/filter.service';
import { IOperation } from '../../../models/dataTypes.model';

@Component({
  selector: 'my-date-carousel',
  templateUrl: './dateCarousel.html',
  imports: [MovableDirective, SelectableDirective, PointnerDirective],
  providers: [DatePipe],
})
export class DateCarousel {
  public slidePosition: number = 0;
  
  private ELEMENT_LIST_PARRENT = viewChild<any>('option_list');

  constructor(public localStorage: LocalStorage, public datePipe: DatePipe, public filter: Filter) {
    effect(() => this.navigateToItem())
  }

  public setDefaultItem = effect(() => {
    // console.log('Дефолт');
    const dates = this.allDatesArray();
    const pattern = this.datePattern();
    const today: Date = new Date();

    if (dates.find((a) => a.name === this.datePipe.transform(today, pattern))) {
      this.filter.setDate(today);
    } else {
      const lastDate = dates[dates.length - 1]?.date;
      this.filter.setDate(lastDate);
    }
  })

  public allDatesArray = computed(() => {
    // console.log('Операции');
    const pattern = this.datePattern();
    let allDates = structuredClone(this.localStorage.allOperations());
    let result: { name: string; date: Date }[] = [];
    allDates.sort((a, b) => a.date.getTime() - b.date.getTime());
    for (const operation of allDates) {
      const name = <string>this.datePipe.transform(operation.date, pattern);
      if (result.map((a) => a.name).includes(name)) {
        continue;
      }
      result.push({ name: name, date: operation.date });
    }
    return result;
  });

  public buttonsWidth = computed(() => {
    //console.log('ширина');
    const interval = this.filter.interval();
    switch (interval) {
      case 'day':
        return 100;
      case 'month':
        return 350;
      case 'year':
        return 500;
      default:
        return 200;
    }
  });

  public formatSelectedDate = computed(() => {
    //console.log('Формат');
    const pattern = this.datePattern();
    const date = this.filter.date();
    return <string>this.datePipe.transform(date, pattern);
  });

  public datePattern = computed(() => {
    //console.log('паттерн');
    const interval = this.filter.interval()
    switch (interval) {
      case 'day':
        return 'dd.MM.yyyy';
      case 'month':
        return 'MM.yyyy';
      case 'year':
        return 'yyyy';
      default:
        return 'dd.MM.yyyy';
    }
  });

  public navigateToItem(){
    const children = this.ELEMENT_LIST_PARRENT().nativeElement.children;
    const pattern = this.datePattern();
    const date = this.filter.date();
    setTimeout(() => {
      //console.log('Навигация');
      Array.from(children).forEach((child: unknown) => {
        const element = child as HTMLElement;
        const text = element.textContent?.trim();
        if (text === this.datePipe.transform(date, pattern)) {
          const containerWidth = window.innerWidth;
          const containerCenter = containerWidth / 2;
          const elemCenter = element.offsetLeft + element.offsetWidth / 2;
          this.slidePosition = containerCenter - elemCenter;
        }
      });
    }, 100);
  }

  selectDate(newDate: Date): void {
    //console.log('Выбор даты');
    this.filter.setDate(newDate);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.navigateToItem();
  }


}
