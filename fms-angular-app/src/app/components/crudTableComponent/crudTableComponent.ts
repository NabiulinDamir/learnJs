import { Component, input, computed, Input, effect, viewChild } from '@angular/core';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { Table } from '../table/table';
import { Modal } from '../../shared/ui/modal/modal';
import { Form } from '../form/form';
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
  editModalElement = viewChild<any>('editModal');
  deleteModalElement = viewChild<any>('deleteModal');
  tmpEditOperationKey: number | undefined = undefined;

  constructor(protected localStorage: LocalStorage) {
    effect(async () => {
      await localStorage.setCategories();
    });
  }

  async createOperation({ value, category, date }: { value: number, category: string, date: Date }) {
    this.modalIsLoad = true;
    const type = <string>this.type();
    await this.localStorage.createOperation({ type, value, category, date });
    this.modalIsLoad = false;
    this.createModalElement().hide();
  }
  async updateOperation({ value, category, date }: { value: number, category: string, date: Date }) {
    this.modalIsLoad = true;
    const type = <string>this.type();
    if (this.tmpEditOperationKey == undefined) { 
      alert("Ошибка на стороне клиента"); 
      this.editModalElement().hide(); 
      return 
    }
    const id = <number>this.tmpEditOperationKey;
    await this.localStorage.updateOperation({ id, type, value, category, date });
    this.modalIsLoad = false;
    this.editModalElement().hide();
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
