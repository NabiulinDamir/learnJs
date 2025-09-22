import { Component, input } from '@angular/core';
import { IOperation } from '../../models/dataTypes.model';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { Modal } from '../../shared/ui/modal/modal';
@Component({
  selector: 'my-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  imports: [DatePipe, Modal],
})
export class Table {
  allData = input<IOperation[]>();
  title = input<string>();
  
  greet() {
    console.log('hui');
  }
}
