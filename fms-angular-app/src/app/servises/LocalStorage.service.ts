import { Injectable, signal, computed } from '@angular/core';
import { IOperation, ICategory } from '../models/dataTypes.model';
import localDB from './indexDB.service';
import { Filter } from './filter.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations = signal<IOperation[]>([]);
  private _categories = signal<ICategory[]>([]);

  // onOperationsChanged = new EventEmitter<IOperation[]>();
  // onCategoriesChanged = new EventEmitter<ICategory[]>();

  constructor(private _localDb: localDB, private _filter: Filter) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  filterOperations = computed((): IOperation[] => {
    return this._filter.filter(this._operations());
  });

  allOperations = computed((): IOperation[] => {
    return this._operations();
  });

  getOperationsByType(type: string): IOperation[] {
    return this.filterOperations().filter((obj) => obj.type === type) || [];
  }

  getCategoriesByType(type: string): ICategory[] {
    return this._categories().filter((obj) => obj.type === type) || [];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры

  async setOperations(): Promise<void> {
    const newData = await this._localDb.getAllOperations();
    this._operations.set(newData);
    // this.onOperationsChanged.emit(this._operations());
  }

  async setCategories(): Promise<void> {
    const newData = await this._localDb.getAllCategories();
    this._categories.set(newData);
    // this.onCategoriesChanged.emit(this._categories());
  }

  async setDaefaultData(): Promise<void> {//!!!странности!!!
    await this._localDb.setDefaultData();
    // await this.setOperations();
    // await this.setCategories();
    location.reload();
    // console.log(this._operations());
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Создатторы

  async createOperation(newOperation: { type: string; value: number; category: string; date: Date; }): Promise<void> {
    await this._localDb.createOperation(newOperation);
    await this.setOperations();
    await this.setCategories();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Обновлятторы

  async updateOperation(operation: IOperation): Promise<void> {
    await this._localDb.updateOperation(operation);
    await this.setCategories();
    await this.setOperations();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Удалятторы

  async deleteOperations(operationsArray: IOperation[]): Promise<void> {
    for (const obj of operationsArray) {
      await this._localDb.deleteOperationByKey(<number>obj.id);
    }
    await this.setOperations();
  }
}
