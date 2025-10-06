import { Component, input, computed, Input, effect, viewChild, OnInit, OnDestroy, signal } from '@angular/core';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { Table } from '../table/table';
import { Modal } from '../../shared/ui/modal/modal';
import { Form } from '../form/form';
import { ICategory, IOperation } from '../../models/dataTypes.model';
import { Filter } from '../../servises/filter.service';

@Component({
  selector: 'my-crud-table',
  templateUrl: './crudTableComponent.html',
  imports: [Table, Modal, Form],
})
export class CrudTableComponent {

  dataType = input<string>("");

  //////////////////////////////////////////////////////////////

  public loadModal: boolean = false;
  public loadTable = input<boolean>(true);

  selectedOperations: IOperation[] = [];


  //////////////////////////////////////////////////////////////

  private ELEMENT_TABLE = viewChild<any>('table');

  private ELEMENT_MODAL_CREATE = viewChild<any>('modal_create');
  private ELEMENT_MODAL_UPDATE = viewChild<any>('modal_update');
  private ELEMENT_MODAL_DELETE = viewChild<any>('modal_delete');

  private ELEMENT_FORM_UPDATE = viewChild<any>('form_update');
  private ELEMENT_FORM_CREATE = viewChild<any>('form_create');

  /////////////////////////////////////////////////////////////

  private tmpEditOperationKey: number | undefined = undefined;

  constructor(protected localStorage: LocalStorage, public filter: Filter) { }


  /////////////////////////////////////////////////////////////

  operations = computed((): IOperation[] => this.localStorage.getOperationsByType(this.dataType()));

  categoriesStringArr = computed((): string[] => this.localStorage.getCategoriesByType(this.dataType()).map((a) => a.name));

  /////////////////////////////////////////////////////////////

  get tableTitleRu(): string {
    if (this.dataType() == "income") { return "Доходы" }
    else if (this.dataType() == "expens") { return "Расходы" }
    else { return "Неопределенно" }
  }

  get modalTypeRu(): string {
    if (this.dataType() == "income") { return "доход" }
    else if (this.dataType() == "expens") { return "расход" }
    else { return "Неопределенно" }
  }

  /////////////////////////////////////////////////////////////


  async createOperation({ value, category, date }: { value: number, category: string, date: Date }) {
    this.loadModal = true;
    const type = this.dataType();
    await this.localStorage.createOperation({ type, value, category, date });
    this.loadModal = false;
    this.ELEMENT_MODAL_CREATE().hide();
  }

  async updateOperation({ value, category, date }: { value: number, category: string, date: Date }) {
    this.loadModal = true;
    const type = this.dataType();
    if (this.tmpEditOperationKey == undefined) {
      alert("Произошла ошибка, попробуйте удалить виндовс");
      this.ELEMENT_MODAL_UPDATE().hide();
      return
    }
    const id = <number>this.tmpEditOperationKey;
    await this.localStorage.updateOperation({ id, type, value, category, date });
    this.loadModal = false;
    this.ELEMENT_MODAL_UPDATE().hide();
  }

  async deleteSelectedOperations(): Promise<void> {
    this.loadModal = true;
    await this.localStorage.deleteOperations(this.selectedOperations);
    this.loadModal = false;
    this.selectedOperations = [];
    this.ELEMENT_MODAL_DELETE().hide();
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

  ngOnInit() {
    // this.localStorage.onOperationsChanged.subscribe((value) => { this.loadTable = false; });
    // this.filter.onDateChange.subscribe((value) => { 
    //   this.ELEMENT_TABLE().sortData()
    //  });
  }
}
