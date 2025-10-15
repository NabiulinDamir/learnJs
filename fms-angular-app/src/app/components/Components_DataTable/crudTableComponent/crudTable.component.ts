import { Component, input, computed, viewChild, effect, signal} from '@angular/core';
import { LocalStorage } from '../../../servises/LocalStorage.service';
import { Table } from '../table/table.component';
import { Modal } from '../../../shared/ui/modal/modal';
import { Form } from '../../form/form.component';
import { IOperation } from '../../../models/dataTypes.model';
import { Filter } from '../../../servises/filter.service';

@Component({
  selector: 'my-crud-table',
  templateUrl: './crudTable.html',
  imports: [Table, Modal, Form],
})
export class CrudTableComponent {
  public dataType = input<string>('');
  public loadModal = signal(false);
  public selectedOperations: IOperation[] = [];

  private tmpEditOperationKey: number | undefined = undefined;
  private ELEMENT_TABLE = viewChild<any>('table');

  private ELEMENT_MODAL_CREATE = viewChild<any>('modal_create');
  private ELEMENT_MODAL_UPDATE = viewChild<any>('modal_update');
  private ELEMENT_MODAL_DELETE = viewChild<any>('modal_delete');

  private ELEMENT_FORM_UPDATE = viewChild<any>('form_update');
  private ELEMENT_FORM_CREATE = viewChild<any>('form_create');

  constructor(protected localStorage: LocalStorage, public filter: Filter) {
    effect(() => {
      const changeElem = filter.date();
      this.ELEMENT_TABLE().clearSelectedData();
    })
  }

  /////////////////////////////////////////////////////////////

  operations = computed((): IOperation[] => {
    const dataType = this.dataType(); 
    return this.localStorage.filter(this.localStorage.getOperationsByType(dataType))
  });

  categoriesStringArr = computed((): string[] => this.localStorage.getCategoriesByType(this.dataType()).map((a) => a.name));

  /////////////////////////////////////////////////////////////

  public tableTitleRu = computed((): string => {
    const dataType = this.dataType();
    if (dataType == 'income') { return 'Доходы'; } 
    else if (dataType == 'expens') { return 'Расходы'; } 
    else { return 'Неопределенно'; }
  })

  public modalTypeRu = computed((): string => {
    const dataType = this.dataType();
    if (dataType == 'income') { return 'доход'; } 
    else if (dataType == 'expens') { return 'расход'; } 
    else { return 'Неопределенно'; }
  })

  /////////////////////////////////////////////////////////////

  async createOperation({ value, category, date}: { value: number; category: string; date: Date; }): Promise<void>  {
    this.loadModal.set(true);
    const type = this.dataType();
    await this.localStorage.createOperation({ type, value, category, date });
    this.loadModal.set(false);
    this.ELEMENT_MODAL_CREATE().hide();
  }

  async updateOperation({ value, category, date, }: { value: number; category: string; date: Date; }): Promise<void>  {
    this.loadModal.set(true);
    const type = this.dataType();
    if (this.tmpEditOperationKey == undefined) {
      alert('Произошла ошибка, попробуйте удалить виндовс');
      this.ELEMENT_MODAL_UPDATE().hide();
      return;
    }
    const id = <number>this.tmpEditOperationKey;
    await this.localStorage.updateOperation({ id, type, value, category, date });
    this.loadModal.set(false);
    this.ELEMENT_MODAL_UPDATE().hide();
  }

  async deleteSelectedOperations(): Promise<void> {
    this.loadModal.set(true);
    await this.localStorage.deleteOperations(this.selectedOperations);
    this.loadModal.set(false);
    this.selectedOperations = [];
    this.ELEMENT_MODAL_DELETE().hide();
  }

  openUpdateForm(operation: IOperation): void {
    this.ELEMENT_MODAL_UPDATE().show();
    this.ELEMENT_FORM_UPDATE().setValue(operation.value);
    this.ELEMENT_FORM_UPDATE().setCategory(operation.category);
    this.ELEMENT_FORM_UPDATE().setDate(operation.date);
    this.tmpEditOperationKey = operation.id;
    this.clearSelectedOperations();
  }

  openCreateForm(): void {
    this.ELEMENT_MODAL_CREATE().show();
    this.ELEMENT_FORM_CREATE().setDefault();
    this.clearSelectedOperations();
  }

  clearSelectedOperations(): void {
    this.selectedOperations = [];
  }
}
