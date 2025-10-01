import { Injectable } from '@angular/core';
import { IOperation, ICategory } from '../models/dataTypes.model';
import testData from '../shared/documents/testData.json';

@Injectable({ providedIn: 'root' })
export default class localDB {
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
  private async add(storeKey: string, object: IOperation | ICategory | {type: string, value: number, category: string, date: Date}) {
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
    let result: IOperation[] = [];
    try {
      result = await this.getAll<IOperation>('operations');
    } catch (error) {
      console.error('Ошибка в возвращении операций: ', error);
    }
    return result;
  }

  public async createOperation(newObj: {type: string, value: number, category: string, date: Date}) {
    ///Как обрабатывать создание? что возвращать? и.т.д
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
    let result: any;
    try {
      result = await this.deleteByKey('operations', itemKey);
    } catch (error) {
      console.error('Ошибка в удалении операции: ', error);
    }
    return result;
  }

  public async updateOperation(newObj: IOperation) {
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

  // public async clearAllOperations() {
  //   let result: any;
  //   try {
  //     result = await this.clear('operations');
  //   } catch (error) {
  //     console.error('error');
  //   }
  //   return result;
  // }

  //////////////////////////////////////////////////////////////////////////////////////////////////////Категории

  public async getAllCategories() {
    let result: ICategory[] = [];
    try {
      result = await this.getAll<ICategory>('categories');
    } catch (error) {
      console.error('Ошибка в возвращении категорий: ', error);
    }
    return result;
  }

  public async createCategory(newObj: ICategory) {
    let result: any;
    try {
      result = await this.add('categories', newObj);
    } catch (error) {
      console.error('Ошибка в создании категории: ', error);
    }
    return result;
  }

  public async deleteCategoryByKey(itemKey: string) {
    let result: any;
    try {
      result = await this.deleteByKey('categories', itemKey);
    } catch (error) {
      console.error('Ошибка в удалении категории: ', error);
    }
    return result;
  }

  public async updateCategoryByKey(itemKey: string, newObj: ICategory) {
    let result: any;
    try {
      result = await this.set('categories', newObj);
    } catch (error) {
      console.error('Ошибка в обновлении категории: ', error);
    }
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////Установка дефолтных значений

  public async setDefaultData() {
    await this.clear('operations');
    await this.clear('categories');

    for (const element of testData.operations) {
      await this.createOperation({
        type: element.type,
        value: element.value,
        date: new Date(element.date),
        category: element.category,
      });
    }
  }

  //   public async getIncomeSortOptions() {}

  //   public async updateIncomeSortOptions() {}

  //   //////////////////////////////////////////////////////////////////////////////////////////////////////Операции

  //   public async getExpensSortOptions() {}

  //   public async updateExpensSortOptions() {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////Операции

  //   public async getFilterOptions() {}

  //   public async updateFilterOptions() {}

  //   //поиск id категории по имени
  //   checkCategory: async (categoryName) => {
  //     const allCategories = await localDB.getAll('categories');
  //     return allCategories.find((category) => category.name === categoryName)?.id;
  //   },

  //   formatDate: (dateObj) => {
  //     const addNul = (number) => (number < 10 ? `0${number}` : number);
  //     return `${addNul(dateObj.getDate())}.${addNul(dateObj.getMonth() + 1)}.${addNul(
  //       dateObj.getFullYear()
  //     )}`;
  //   },

  //   isInTimeInterval: (dateAObj, dateBObj, intervalType) => {
  //     const dateA = new Date(dateAObj);
  //     const dateB = new Date(dateBObj);
  //     switch (intervalType) {
  //       case 'day':
  //         const startOfDay = new Date(dateB);
  //         startOfDay.setHours(0, 0, 0, 0);
  //         const endOfDay = new Date(dateB);
  //         endOfDay.setHours(23, 59, 59, 999);
  //         return dateA >= startOfDay && dateA <= endOfDay;
  //       case 'month':
  //         const startOfMonth = new Date(dateB.getFullYear(), dateB.getMonth(), 1);
  //         const endOfMonth = new Date(dateB.getFullYear(), dateB.getMonth() + 1, 0, 23, 59, 59, 999);
  //         return dateA >= startOfMonth && dateA <= endOfMonth;
  //       case 'year':
  //         const startOfYear = new Date(dateB.getFullYear(), 0, 1);
  //         const endOfYear = new Date(dateB.getFullYear(), 11, 31, 23, 59, 59, 999);
  //         return dateA >= startOfYear && dateA <= endOfYear;
  //       default:
  //         return false;
  //     }
  //   },

  //   ////////////////////////////////////////////////////////////////////////////////////////////////////Подготовленные данные для графиков

  //   //собирает массив для статичтики - chart_1
  //   //Требуемый результат [[ 'Декабрь 2021',  720, 5300 ],[...]]
  //   getDateFormat: async () => {
  //     const allOperations = await localDB.getAll('operations');
  //     const time_delay = await localDB.get('sortOption', 'time_delay');

  //     const resultMap = new Map();
  //     allOperations.sort((a, b) => a.date.getTime() - b.date.getTime());
  //     allOperations.forEach((item) => {
  //       const date = new Date(item.date);

  //       const key = `
  //                 ${time_delay.length == 'day' ? date.getDate() : ''}.
  //                 ${
  //                   time_delay.length == 'day' || time_delay.length == 'month' ? date.getMonth() : ''
  //                 }.
  //                 ${date.getFullYear()}`;

  //       const name = `${localDB.formatDate(date)}`;
  //       if (!resultMap.has(key)) {
  //         resultMap.set(key, [name, 0, 0]);
  //       }
  //       const [_, income, expense] = resultMap.get(key);
  //       if (item.type > 0) {
  //         resultMap.set(key, [name, income + item.value, expense]);
  //       } else {
  //         resultMap.set(key, [name, income, expense + item.value]);
  //       }
  //     });

  //     return Array.from(resultMap.values());
  //   },

  //   //собирает массив для статичтики - chart_2_1
  //   //{ value: 300, name: 'Video Ads' }
  //   getIncomeCategoryFormat: async () => {
  //     const allOperations = await localDB.getAll('operations');
  //     const time_delay = await localDB.get('sortOption', 'time_delay');

  //     const resultMap = new Map();

  //     allOperations.forEach((item) => {
  //       if (
  //         item.type > 0 &&
  //         localDB.isInTimeInterval(item.date, time_delay.date, time_delay.length)
  //       ) {
  //         const category = item.category;

  //         if (!resultMap.has(category)) {
  //           resultMap.set(category, 0);
  //         }
  //         const currentValue = resultMap.get(category);
  //         resultMap.set(category, currentValue + item.value);
  //       }
  //     });
  //     return Array.from(resultMap.entries()).map(([name, value]) => ({
  //       value: value,
  //       name: name,
  //     }));
  //   },

  //   //собирает массив для статичтики- chart_2_2
  //   //[{ value: 300, name: 'Video Ads' }]
  //   getExpensCategoryFormat: async () => {
  //     const allOperations = await localDB.getAll('operations');
  //     const time_delay = await localDB.get('sortOption', 'time_delay');
  //     const resultMap = new Map();

  //     allOperations.forEach((item) => {
  //       if (
  //         item.type < 0 &&
  //         localDB.isInTimeInterval(item.date, time_delay.date, time_delay.length)
  //       ) {
  //         const category = item.category;

  //         if (!resultMap.has(category)) {
  //           resultMap.set(category, 0);
  //         }
  //         const currentValue = resultMap.get(category);
  //         resultMap.set(category, currentValue + item.value);
  //       }
  //     });
  //     return Array.from(resultMap.entries()).map(([name, value]) => ({
  //       value: value,
  //       name: name,
  //     }));
  //   },

  //   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   //собирает асси для датаселектора
  //   getCurrentTimeArray: async (intervalType) => {
  //     const allOperations = await localDB.getAll('operations');
  //     allOperations.sort((a, b) => a.date.getTime() - b.date.getTime());
  //     const resultMap = new Map();

  //     switch (intervalType) {
  //       case 'day':
  //         allOperations.forEach((item) => {
  //           resultMap.set(formatDate(item.date), {
  //             date: item.date,
  //             isCurrent: formatDate(item.date) == formatDate(new Date()),
  //           });
  //         });
  //         break;
  //       case 'month':
  //         allOperations.forEach((item) => {
  //           resultMap.set(formatDate(item.date).slice(3), {
  //             date: item.date,
  //             isCurrent: formatDate(item.date).slice(3) == formatDate(new Date()).slice(3),
  //           });
  //         });
  //         break;
  //       case 'year':
  //         allOperations.forEach((item) => {
  //           resultMap.set(formatDate(item.date).slice(6), {
  //             date: item.date,
  //             isCurrent: item.date.getFullYear() == new Date().getFullYear(),
  //           });
  //         });
  //         break;
  //       default:
  //     }

  //     function formatDate(dateObj) {
  //       const addNul = (number) => (number < 10 ? `0${number}` : number);
  //       return `${addNul(dateObj.getDate())}.${addNul(dateObj.getMonth() + 1)}.${addNul(
  //         dateObj.getFullYear()
  //       )}`;
  //     }

  //     return Array.from(resultMap.entries()).map(([name, value]) => ({
  //       value: value,
  //       name: name,
  //     }));
  //   },
}
