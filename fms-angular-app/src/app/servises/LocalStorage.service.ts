import { Injectable, EventEmitter } from '@angular/core';
import { IOperation, ICategory, IFilterOption } from '../models/dataTypes.model';
import localDB from './indexDB.service';
import { Filter } from './filter.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations: IOperation[] = [];
  private _categories: ICategory[] = [];

  onOperationsChanged = new EventEmitter<IOperation[]>();
  onCategoriesChanged = new EventEmitter<ICategory[]>();

  constructor(private _localDb: localDB, private _filter: Filter) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  get filterOperations(): IOperation[] {
    return this._filter.filter(this._operations);
  }

  get allOperations(): IOperation[] {
    return this._operations;
  }
  
  get incomeOperations(): IOperation[] {
    return this.filterOperations.filter((obj) => obj.type === 'income') || [];
  }

  get expensOperations(): IOperation[] {
    return this.filterOperations.filter((obj) => obj.type === 'expens') || [];
  }

  get incomeCategories(): ICategory[] {
    return this._categories.filter((obj) => obj.type === 'income') || [];
  }

  get expensCategories(): ICategory[] {
    return this._categories.filter((obj) => obj.type === 'expens') || [];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры

  async setDaefaultData(): Promise<void> {
    // await this._localDb.setDefaultData();
  }

  async setOperations(): Promise<void> {
    this._operations = await this._localDb.getAllOperations();
    this.onOperationsChanged.emit(this._operations);
  }

  async setCategories(): Promise<void> {
    this._categories = await this._localDb.getAllCategories();
    this.onCategoriesChanged.emit(this._categories);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Создатторы

  async createOperation(newOperation: {
    type: string;
    value: number;
    category: string;
    date: Date;
  }): Promise<void> {
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
