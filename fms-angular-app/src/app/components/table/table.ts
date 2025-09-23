import { Component, input, computed } from '@angular/core';
import { IOperation } from '../../models/dataTypes.model';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { Modal } from '../../shared/ui/modal/modal';
import { Form } from '../../shared/ui/form/form';
import { Sort } from './sort.servicee';

@Component({
  selector: 'my-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  imports: [DatePipe, Modal, Form],
  providers: [Sort],
})
export class Table {
  allData = input<IOperation[]>([]);
  sortedData = computed(() => this.sortService.sort(this.allData()));
  title = input<string>();

  constructor(protected sortService: Sort) {}

  valueSort(): void {
    this.sortService.setOption('value');
    console.log(this.allData());
  }

  categorySort(): void {
    this.sortService.setOption('category');
    console.log(this.allData());
  }

  dateSort(): void {
    this.sortService.setOption('date');
    console.log(this.allData());
  }
}
