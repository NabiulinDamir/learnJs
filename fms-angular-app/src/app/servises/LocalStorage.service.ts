import { Injectable, EventEmitter } from '@angular/core';
import { IOperation, ICategory, IFilterOption } from '../models/dataTypes.model';
import localDB from './indexDB.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations: IOperation[] = [];
  private _categories: ICategory[] = [];

  public filterOption: IFilterOption = { length: 'year', date: new Date() };

  onOperationsChanged = new EventEmitter<IOperation[]>();
  onCategoriesChanged = new EventEmitter<ICategory[]>();
  onFilterOptionLengthChanged = new EventEmitter<string>();
  onFilterOptionDateChanged = new EventEmitter<Date>();

  constructor(private _localDb: localDB) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  get filterOperations(): IOperation[] {
    return this.filter(this._operations);
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

  async setFilterOptionsLength(option: string): Promise<void> {
    this.filterOption.length = option;
    this.onFilterOptionLengthChanged.emit(option);
  }

  async setFilterOptionsDate(option: Date): Promise<void> {
    this.filterOption.date = option;
    this.onFilterOptionDateChanged.emit(option);
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Фильтрация

  private filter(array: IOperation[]): IOperation[] {
    switch (this.filterOption.length) {
      case 'day':
        return array.filter(
          (a) => a.date.getDate() === this.filterOption.date.getDate()
        );
      case 'month':
        return array.filter(
          (a) => a.date.getMonth() === this.filterOption.date.getMonth()
        );
      case 'year':
        return array.filter(
          (a) => a.date.getFullYear() === this.filterOption.date.getFullYear()
        );
      case 'all':
        return array;
    }
    return array;
  }

  public get datePattern(): string{
      switch(this.filterOption.length) {
        case "day":
        case "nedela":
          return "dd.MM.yyyy";
        case "month":
          return "MM.yyyy";
        case "year":
          return "yyyy";
        default:
          return "dd.MM.yyyy";
      }
    }
}
