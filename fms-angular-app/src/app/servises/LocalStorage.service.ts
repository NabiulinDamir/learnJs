import { Injectable } from '@angular/core';
import { IOperation, ICategory, ISortOption, IFilterOption } from '../models/dataTypes.model';
import testData from '../shared/documents/testData.json';
import localDB from './fakeBackend.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations: IOperation[] = [];
  private _categories: ICategory[] = [];

  private _incomeSortedOptoin: ISortOption = { factor: 'date', increasing: false };
  private _expensSortedOptoin: ISortOption = { factor: 'date', increasing: false };

  private _filterOption: IFilterOption = { length: 'day', date: new Date() };

  constructor(private _localDb: localDB) {}

  async setDaefaultData(){
    this._operations = await this._localDb.getAllOperations();

    console.log(this._operations);
  }

  // get operations(): string[] {
  //   return this._operations.filter();
  // }
}
