import { Component, input, computed, Input, effect } from '@angular/core';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { Table } from '../table/table';
import { Modal } from '../../shared/ui/modal/modal';
import { Form } from '../../shared/ui/form/form';
import { ICategory } from '../../models/dataTypes.model';

@Component({
  selector: 'my-crud-table',
  templateUrl: './crudTableComponent.html',
  imports: [Table, Modal, Form],
})
export class CrudTableComponent {
  title = input<string>();
  type = input<string>();

  /////////////////////////////////////////////////////////
  categories: ICategory[] = [];

  /////////////////////////////////////////////////////////

  constructor(protected localStorage: LocalStorage) {
    effect(() => {
      switch (this.type()) {
        case 'income':
          this.categories = localStorage.incomeCategories;
          break;
        case 'expens':
          this.categories = localStorage.expensCategories;
          break;
        default:
          break;
      }
    });
  }

  con() {
    console.log('hui');
  }

  formatToStringArr(categoryArr: ICategory[]): string[] {
    return categoryArr.map((a) => a.name);
  }
}
