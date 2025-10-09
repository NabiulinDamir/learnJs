import { Injectable } from '@angular/core';
import { IOperation, ICategory } from '../models/dataTypes.model';
import testData from '../shared/documents/testData.json';

@Injectable({ providedIn: 'root' })
export default class localDB {
  private _timeDelay = 200;
  private open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open('localDB', 1);

      openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const target = event.target as IDBOpenDBRequest;
        const db: IDBDatabase = target.result;

        if (!db.objectStoreNames.contains('operations')) {
          db.createObjectStore('operations', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains('sortOption')) {
          db.createObjectStore('sortOption', { keyPath: 'name' });
        }
      };

      openRequest.onsuccess = () => {
        const db = openRequest.result;
        resolve(db);
      };

      openRequest.onerror = () => {
        reject(openRequest.error);
      };
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////Основные

  //Вернуть всё
  //name = "operations" || "categories"
  private async getAll<T>(storeKey: string): Promise<T[]> {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readonly');
    const store = transaction.objectStore(storeKey);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  //Вернуть по id
  //storeKey = "operations" || "categories"
  private async getByKey<T>(storeKey: string, itemKey: number | string): Promise<T> {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readonly');
    const store = transaction.objectStore(storeKey);

    return new Promise((resolve, reject) => {
      const request = store.get(itemKey);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  //Добавление
  //storeKey = "operations" || "categories"
  private async add(
    storeKey: string,
    object: IOperation | ICategory | { type: string; value: number; category: string; date: Date }
  ) {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readwrite');
    const store = transaction.objectStore(storeKey);
    return new Promise((resolve, reject) => {
      const request = store.add(object);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  //Редактировать/заменить/добавить по ключу
  private async set(storeKey: string, newObj: IOperation | ICategory) {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readwrite');
    const store = transaction.objectStore(storeKey);
    return new Promise((resolve, reject) => {
      const request = store.put(newObj);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  //Удалить по Id
  //name = "operations" || "categories"
  private async deleteByKey(storeKey: string, itemKey: number | string) {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readwrite');
    const store = transaction.objectStore(storeKey);

    return new Promise((resolve, reject) => {
      const request = store.delete(itemKey);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  //отчистить поле по ключу
  private async clear(storeKey: string) {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readwrite');
    const store = transaction.objectStore(storeKey);
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async keyOf(storeKey: string, itemKey: number | string): Promise<boolean> {
    const db = await this.open();
    const transaction = db.transaction(storeKey, 'readonly');
    const store = transaction.objectStore(storeKey);
    return new Promise((resolve) => {
      const request = store.getKey(itemKey);
      request.onsuccess = () => resolve(request.result !== undefined);
      request.onerror = () => resolve(false);
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////Операции

  public async getAllOperations(): Promise<IOperation[]> {
    console.log('--Вернуть все опрерации');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: IOperation[] = [];
    try {
      result = await this.getAll<IOperation>('operations');
    } catch (error) {
      console.error('Ошибка в возвращении операций: ', error);
    }
    return result;
  }

  public async createOperation(newObj: { type: string; value: number; category: string; date: Date; }) {
    console.log('--Создание операции');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: any;
    try {
      if (!(await this.keyOf('categories', newObj.category))) {
        await this.createCategory({ name: newObj.category, type: newObj.type });
      }
      result = await this.add('operations', newObj);
    } catch (error) {
      console.error('Ошибка в создании операции: ', error);
    }
    return result;
  }

  public async deleteOperationByKey(itemKey: number) {
    console.log('--Удалеие операции');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: any;
    try {
      result = await this.deleteByKey('operations', itemKey);
    } catch (error) {
      console.error('Ошибка в удалении операции: ', error);
    }
    return result;
  }

  public async updateOperation(newObj: IOperation) {
    console.log('--Обновление опрерации');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: any;
    try {
      if (!(await this.keyOf('categories', newObj.category))) {
        await this.createCategory({ name: newObj.category, type: newObj.type });
      }
      result = await this.set('operations', newObj);
    } catch (error) {
      console.error('Ошибка в обновлении оперпции: ', error);
    }
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////Категории

  public async getAllCategories() {
    console.log('--Возврщение категорий');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: ICategory[] = [];
    try {
      result = await this.getAll<ICategory>('categories');
    } catch (error) {
      console.error('Ошибка в возвращении категорий: ', error);
    }
    return result;
  }

  public async createCategory(newObj: ICategory) {
    console.log('--Создание категории');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: any;
    try {
      result = await this.add('categories', newObj);
    } catch (error) {
      console.error('Ошибка в создании категории: ', error);
    }
    return result;
  }

  public async deleteCategoryByKey(itemKey: string) {
    console.log('--Удаление категорий');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: any;
    try {
      result = await this.deleteByKey('categories', itemKey);
    } catch (error) {
      console.error('Ошибка в удалении категории: ', error);
    }
    return result;
  }

  public async updateCategoryByKey(newObj: ICategory) {
    console.log('--Обновление категории');
    await new Promise((resolve) => setTimeout(resolve, this._timeDelay));
    let result: any;
    try {
      result = await this.set('categories', newObj);
    } catch (error) {
      console.error('Ошибка в обновлении категории: ', error);
    }
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////Установка дефолтных значений

  public async setDefaultData(): Promise<void> {
    await this.clear('operations');
    await this.clear('categories');

    for (const element of testData.operations) {
      const newObj = {
        type: element.type,
        value: element.value,
        date: new Date(element.date),
        category: element.category,
      };

      if (!(await this.keyOf('categories', newObj.category))) {
        await this.add('categories', { name: newObj.category, type: newObj.type });
      }
      await this.add('operations', newObj);
    }
    return;
  }
}
