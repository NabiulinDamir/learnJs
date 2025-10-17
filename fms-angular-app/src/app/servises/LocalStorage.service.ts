import { Injectable,inject,  signal, computed, effect } from '@angular/core';
import { IOperation, ICategory } from '../models/dataTypes.model';
import localDB from './indexDB.service';
import { Filter } from './filter.service';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  private _operations = signal<IOperation[]>([]);
  private _categories = signal<ICategory[]>([]);
  public loadOperationsStatus = signal<boolean>(false)
  public loadCategoriesStatus = signal<boolean>(false)
  // onOperationsChanged = new EventEmitter<IOperation[]>();
  // onCategoriesChanged = new EventEmitter<ICategory[]>();
  private filterService = inject(Filter);
  constructor(private _localDb: localDB) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

  public allOperations = computed((): IOperation[] => {
    return structuredClone(this._operations());
  });

  public getFilteredOperations(): IOperation[] {
    const op = this._operations();
    return this.filterService.filter(op)
  }

  public getFilteredOperationsByType(type: string): IOperation[] {
    return this.getFilteredOperations().filter((obj) => obj.type === type) || [];
  }

  public getAllOperationsByType(type: string): IOperation[] {
    const result = structuredClone(this._operations())
    return result.filter((obj) => obj.type === type) || [];
  }

  public getCategoriesByType(type: string): ICategory[] {
    return this._categories().filter((obj) => obj.type === type) || [];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры

  public async setOperations(): Promise<void> {
    this.loadOperationsStatus.set(true);
    const newData = await this._localDb.getAllOperations();
    this._operations.set(newData);
    this.loadOperationsStatus.set(false);
    // this.onOperationsChanged.emit(this._operations());
  }

  public async setCategories(): Promise<void> {
    this.loadCategoriesStatus.set(true);
    const newData = await this._localDb.getAllCategories();
    this._categories.set(newData);
    this.loadCategoriesStatus.set(false);
    // this.onCategoriesChanged.emit(this._categories());
  }

  public async setDaefaultData(): Promise<void> {//!!!странности!!!
    await this._localDb.setDefaultData();
    // await this.setOperations();
    // await this.setCategories();
    location.reload();
    console.warn("Test data set")
    // console.log(this._operations());
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Создатторы

  public async createOperation(newOperation: { type: string; value: number; category: string; date: Date; }): Promise<void> {
    await this._localDb.createOperation(newOperation);
    await this.setOperations();
    await this.setCategories();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Обновлятторы

  public async updateOperation(operation: IOperation): Promise<void> {
    await this._localDb.updateOperation(operation);
    await this.setCategories();
    await this.setOperations();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////Удалятторы

  public async deleteOperations(operationsArray: IOperation[]): Promise<void> {
    for (const obj of operationsArray) {
      await this._localDb.deleteOperationByKey(<number>obj.id);
    }
    await this.setOperations();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  // public filter(arr: IOperation[]): IOperation[] {
  //   console.log(arr)
  //   return this._filter.filter(arr);
  // };
}
