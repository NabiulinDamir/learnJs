import { Injectable } from '@angular/core';
import { IOperation, ICategory } from '../models/dataTypes.model';
import localDB from './indexDB.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations: IOperation[] = [];
  private _categories: ICategory[] = [];

  // private _filterOption: IFilterOption = { length: 'day', date: new Date() };

  constructor(private _localDb: localDB) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  get operations(): IOperation[] {
    return this._operations;
  }

  get incomeOperations(): IOperation[] {
    return this._operations.filter((obj) => obj.type === 'income') || [];
  }

  get expensOperations(): IOperation[] {
    return this._operations.filter((obj) => obj.type === 'expens') || [];
  }

  get incomeCategories(): ICategory[] {
    return this._categories.filter((obj) => obj.type === 'income') || [];
  }

  get expensCategories(): ICategory[] {
    return this._categories.filter((obj) => obj.type === 'expens') || [];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  async setDaefaultData(): Promise<void> {
    // await this._localDb.setDefaultData();
  }

  async setOperations(): Promise<void> {
    this._operations = await this._localDb.getAllOperations();
  }

  async setCategories(): Promise<void> {
    this._categories = await this._localDb.getAllCategories();
  }
}
