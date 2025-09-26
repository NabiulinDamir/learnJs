import { Component, input, computed, Input, effect, viewChild } from '@angular/core';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { Table } from '../table/table';
import { Modal } from '../../shared/ui/modal/modal';
import { Form } from '../../shared/ui/form/form';
import { ICategory, IOperation } from '../../models/dataTypes.model';

@Component({
  selector: 'my-crud-table',
  templateUrl: './crudTableComponent.html',
  imports: [Table, Modal, Form],
})
export class CrudTableComponent {
  type = input<string>();
  modalIsLoad: boolean = false;
  selectedOperations: IOperation[] = [];
  createModalElement = viewChild<any>('createModal');
  deleteModalElement = viewChild<any>('deleteModal');

  constructor(protected localStorage: LocalStorage) {
    effect(async () => {
      await localStorage.setCategories();
    });
  }

  async createOperation(operation: IOperation) {
    this.modalIsLoad = true;
    operation.type = <string>this.type();
    await this.localStorage.createOperation(operation);
    this.modalIsLoad = false;
    this.createModalElement().hide();
  }
  async updateOperation(operation: IOperation) {
    this.modalIsLoad = true;
    operation.type = <string>this.type();
    console.log(operation);
    this.modalIsLoad = false;
  }
  async deleteSelectedOperations() {
    this.modalIsLoad = true;
    this.localStorage.deleteOperations(this.selectedOperations);
    this.modalIsLoad = false;
    this.selectedOperations = [];
    this.deleteModalElement().hide();
  }

  formatToStringArr(categoryArr: ICategory[]): string[] {
    return categoryArr.map((a) => a.name);
  }
}
