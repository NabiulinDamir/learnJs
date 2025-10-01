import { Component, input, computed, Input, effect, viewChild, OnInit, OnDestroy } from '@angular/core';
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

  //////////////////////////////////////////////////////////////

  modalIsLoad: boolean = false;
  selectedOperations: IOperation[] = [];

  //////////////////////////////////////////////////////////////

  // private ELEMENT_TABLE = viewChild<any>('table');

  private ELEMENT_MODAL_CREATE = viewChild<any>('modal_create');
  private ELEMENT_MODAL_UPDATE = viewChild<any>('modal_update');
  private ELEMENT_MODAL_DELETE = viewChild<any>('modal_delete');

  private ELEMENT_FORM_UPDATE = viewChild<any>('form_update');
  private ELEMENT_FORM_CREATE = viewChild<any>('form_create');

  /////////////////////////////////////////////////////////////

  private tmpEditOperationKey: number | undefined = undefined;

  constructor(protected localStorage: LocalStorage) { }

  async createOperation({ value, category, date }: { value: number, category: string, date: Date }) {
    this.modalIsLoad = true;
    const type = <string>this.type();
    await this.localStorage.createOperation({ type, value, category, date });
    this.modalIsLoad = false;
    this.ELEMENT_MODAL_CREATE().hide();
  }

  async updateOperation({ value, category, date }: { value: number, category: string, date: Date }) {
    this.modalIsLoad = true;
    const type = <string>this.type();
    if (this.tmpEditOperationKey == undefined) {
      alert("Ошибка на стороне клиента");
      this.ELEMENT_MODAL_UPDATE().hide();
      return
    }
    const id = <number>this.tmpEditOperationKey;
    await this.localStorage.updateOperation({ id, type, value, category, date });
    this.modalIsLoad = false;
    this.ELEMENT_MODAL_UPDATE().hide();
  }

  async deleteSelectedOperations(): Promise<void> {
    this.modalIsLoad = true;
    await this.localStorage.deleteOperations(this.selectedOperations);
    this.modalIsLoad = false;
    this.selectedOperations = [];
    this.ELEMENT_MODAL_DELETE().hide();
  }

  formatToStringArr(categoryArr: ICategory[]): string[] {
    return categoryArr.map((a) => a.name);
  }

  openUpdateForm(operation: IOperation): void {
    this.ELEMENT_MODAL_UPDATE().show();
    this.ELEMENT_FORM_UPDATE().setValue(operation.value);
    this.ELEMENT_FORM_UPDATE().setCategory(operation.category);
    this.ELEMENT_FORM_UPDATE().setDate(operation.date);
    this.tmpEditOperationKey = operation.id
  }

  openCreateForm() {
    this.ELEMENT_MODAL_CREATE().show();
    this.ELEMENT_FORM_CREATE().setDefault()
  }



}
