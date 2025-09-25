import { Component, input, computed } from '@angular/core';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { Table } from '../table/table';
import { Modal } from '../../shared/ui/modal/modal';
import { Form } from '../../shared/ui/form/form';
import { ICategory } from '../../models/dataTypes.model';
@Component({
  selector: 'my-table-container',
  templateUrl: './tableContainer.html',
  imports: [Table, Modal, Form],
})
export class TableContainer {
  constructor(protected localStorage: LocalStorage) {}


  con(){
    console.log('hui')
  }


  formatToStringArr(categoryArr: ICategory[]):string[]{
    return categoryArr.map(a => a.name)
  }
}
