import { Component, input, computed } from '@angular/core';
import { ICategory, IOperation } from '../../models/dataTypes.model';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';

import { Sort } from './sort.servicee';

@Component({
  selector: 'my-table',
  templateUrl: './table.html',

  imports: [DatePipe],
  providers: [Sort],
})
export class Table {
  title = input<string>('');
  allData = input<IOperation[]>([]);
  allCategories = input<ICategory[]>([]);

  sortedData = computed(() => this.sortService.sort(this.allData()));

  allCategoriesToString = computed(() => (this.allCategories()).map(a => a.name))

  constructor(protected sortService: Sort) {}

  valueSort(): void {
    this.sortService.setOption('value');
  }

  categorySort(): void {
    this.sortService.setOption('category');
  }

  dateSort(): void {
    this.sortService.setOption('date');
  }
}
