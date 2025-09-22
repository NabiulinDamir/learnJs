import { Injectable } from '@angular/core';
import { IOperation, ICategory, ISortOption, IFilterOption } from '../models/dataTypes.model';
import localDB from './indexDB.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations: IOperation[] = [];
  private _categories: ICategory[] = [];

  private _incomeSortedOptoin: ISortOption = { factor: 'date', increasing: false };
  private _expensSortedOptoin: ISortOption = { factor: 'date', increasing: false };

  private _filterOption: IFilterOption = { length: 'day', date: new Date() };

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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  async setDaefaultData(): Promise<void> {
    // await this._localDb.setDefaultData();
  }

  async setOperations(): Promise<void> {
    this._operations = await this._localDb.getAllOperations();
  }
}
