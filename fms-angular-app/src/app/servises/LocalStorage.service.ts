import { Injectable, EventEmitter } from '@angular/core';
import { IOperation, ICategory, IFilterOption } from '../models/dataTypes.model';
import localDB from './indexDB.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations: IOperation[] = [];
  private _categories: ICategory[] = [];

  public filterOption: IFilterOption = { length: 'month', date: new Date() };

  onOperationsChanged = new EventEmitter<IOperation[]>();
  onCategoriesChanged = new EventEmitter<ICategory[]>();
  onFilterOptionChanged = new EventEmitter<IFilterOption>();

  constructor(private _localDb: localDB) { }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  get operations(): IOperation[] {
    return this.filterData;
  }

  get incomeOperations(): IOperation[] {
    return this.operations.filter((obj) => obj.type === 'income') || [];
  }

  get expensOperations(): IOperation[] {
    return this.operations.filter((obj) => obj.type === 'expens') || [];
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

  async createOperation(newOperation: { type: string, value: number, category: string, date: Date }): Promise<void> {
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Фильтрация

  get filterData(): IOperation[] {
    switch (this.filterOption.length) {
      case "day":
        return this._operations.filter(a => a.date.getDate() === this.filterOption.date.getDate());
      case "month":
        return this._operations.filter(a => a.date.getMonth() === this.filterOption.date.getMonth());
      case "year":
        return this._operations.filter(a => a.date.getFullYear() === this.filterOption.date.getFullYear());
      case "all":
        return this._operations
    }
    return []
  }

}
