import { Injectable, signal, computed } from '@angular/core';
import { IOperation } from '../models/dataTypes.model';

@Injectable({ providedIn: 'root' })
export class Filter {
  public interval = signal<string>('month');
  public date = signal<Date>(new Date());

  constructor() {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  public intervalLocale = computed((): string => {
    switch (this.interval()) {
      case 'day':
        return 'день';
      case 'month':
        return 'месяц';
      case 'year':
        return 'год';
      default:
        return 'пасхалка';
    }
  })

  public startInterval = computed((): Date => {
    const interval = this.interval();
    const result = new Date(this.date());
    if (!this.date()) { return new Date(); }
    result.setHours(0, 0, 0);
    if (interval === 'month') { result.setDate(1); }
    if (interval === 'year') { result.setDate(1); result.setMonth(0); }
    return result;
  })

  public endInterval = computed((): Date => {
    const interval = this.interval();
    const result = new Date(this.date());
    if (!this.date()) { return new Date() }
    result.setHours(23, 59, 59);
    if (interval === 'month') { result.setMonth(result.getMonth() + 1, 0); }
    if (interval === 'year') { result.setMonth(11, 31); }
    return result;
  })

  public startYearInteval = computed((): Date => {
    const result = new Date(this.date());
    result.setHours(0, 0, 0);
    result.setDate(1);
    result.setMonth(0);
    return result;
  })

  public endYearInteval = computed((): Date => {
    const result = new Date(this.date());
    result.setHours(23, 59, 59);
    result.setMonth(11, 31);
    return result;
  })

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры

  public setDate(newValue: Date): void {
    // console.log("Установить дату: " + newValue)
    this.date.set(newValue);
  }

  public setIntervalDay(): void {
    // console.log("Установить интервал дня")
    this.interval.set('day');
  }

  public setIntervalMonth(): void {
    // console.log("Установить интервал месяца")
    this.interval.set('month');
  }

  public setIntervalYear(): void {
    // console.log("Установить интервал года")
    this.interval.set('year');
  }

  public downInterval(): void {
    if (this.interval() === 'day') {
      return;
    } else if (this.interval() === 'month') {
      this.setIntervalDay();
    } else if (this.interval() === 'year') {
      this.setIntervalMonth();
    } else {
      return;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Фильтрация

  public filter(array: IOperation[]): IOperation[] {
    // console.log("Отфильтровать")
    if (!this.date()) {
      return [];
    }
    const startInterval = this.startInterval();
    const endInterval = this.endInterval();
    return array.filter((a) => a.date >= startInterval && a.date <= endInterval);
  }
}
