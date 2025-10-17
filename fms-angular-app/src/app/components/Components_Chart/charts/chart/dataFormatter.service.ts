import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { IOperation } from '../../../../models/dataTypes.model';
import { LocalStorage } from '../../../../servises/LocalStorage.service';
import { Filter } from '../../../../servises/filter.service';

@Injectable({ providedIn: 'root' })
export class DataFormatter {
  constructor(public filterService: Filter) {}

  megaFormatToMonth(data: IOperation[]): { name: string; value: number }[] {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = new Map();
    let currentDate = new Date(this.filterService.startYearInteval());
    let endDate = new Date(this.filterService.endYearInteval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0 });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } while (currentDate <= endDate);

    for (const operation of allOperations) {
      const key = this.formatDate(currentDate);
      const mapElemet = resultMap.get(key);
      resultMap.set(key, {
        name: key,
        value: mapElemet.value + operation.value,
      });
    }

    const res = Array.from(resultMap.values());
    return res;
  }

  megaFormatToCategory(data: IOperation[]): { name: string; value: number }[] {
    const resultMap = new Map();
    data.forEach((item) => {
      const category = item.category;
      if (!resultMap.has(category)) {
        resultMap.set(category, { name: category, value: 0 });
      }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }

  roundedFormat(data: IOperation[]): { name: string; value: number }[] {
    const resultMap = new Map();
    data.forEach((item) => {
      const category = item.category;
      if (!resultMap.has(category)) {
        resultMap.set(category, { name: category, value: 0 });
      }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }

  public negativeFormat(data: IOperation[]): { name: string; value: number; date: Date }[] {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());

    const resultMap = new Map();

    let currentDate = new Date(this.filterService.startInterval());
    let endDate = new Date(this.filterService.endInterval());

    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0, date: currentDate });
      if (this.filterService.interval() === 'day') {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (this.filterService.interval() === 'month') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (this.filterService.interval() === 'year') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);

    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === 'income' ? operation.value : 0;
      const expensValue = operation.type === 'expens' ? -operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: key, value: incomeValue + expensValue, date: operation.date });
      } else {
        resultMap.set(key, {
          name: key,
          value: mapElemet.value + incomeValue + expensValue,
          date: operation.date,
        });
      }
    }

    const res = Array.from(resultMap.values());
    return res;
  }

  public datasetFormat(data: IOperation[]): { name: string; income: number; expens: number; date: Date }[] {
    const filterInterval = this.filterService.interval();

    const resultMap = new Map();
    let currentDate = new Date(this.filterService.startInterval());
    let endDate = new Date(this.filterService.endInterval());

    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, income: 0, expens: 0 });
      if (filterInterval === 'day') {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (filterInterval === 'month') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (filterInterval === 'year') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);

    for (const operation of data) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === 'income' ? operation.value : 0;
      const expensValue = operation.type === 'expens' ? operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, {
          name: key,
          income: incomeValue,
          expens: expensValue,
          date: operation.date,
        });
      } else {
        resultMap.set(key, {
          name: key,
          income: mapElemet.income + incomeValue,
          expens: mapElemet.expens + expensValue,
          date: operation.date,
        });
      }
    }
    return Array.from(resultMap.values());
  }

  formatDate(date: Date): string | null {
    switch (this.filterService.interval()) {
      case 'day':
        return date.getHours().toString();
      case 'month':
        return date.getDate().toString();
      case 'year':
        return date.getMonth().toString();
      default:
        return 'dd.MM.yyyy';
    }
  }
}
