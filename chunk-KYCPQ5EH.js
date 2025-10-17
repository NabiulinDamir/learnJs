import {
  Injectable,
  __async,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2E3OQR6L.js";

// src/assets/testData.json
var testData_default = {
  categories: [
    { name: "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430", type: "income" },
    { name: "\u041F\u043E\u0434\u0440\u0430\u0431\u043E\u0442\u043A\u0430", type: "income" },
    { name: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441", type: "income" },
    { name: "\u0415\u0434\u0430", type: "expense" },
    { name: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442", type: "expense" },
    { name: "\u0416\u0438\u043B\u044C\u0435", type: "expense" },
    { name: "\u0420\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F", type: "expense" },
    { name: "\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435", type: "expense" },
    { name: "\u041E\u0434\u0435\u0436\u0434\u0430", type: "expense" },
    { name: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435", type: "expense" }
  ],
  operations: [
    { type: "income", value: 45e3, date: "2025-10-05T10:00:00", category: "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430" },
    { type: "income", value: 8e3, date: "2025-10-03T08:20:00", category: "\u041F\u043E\u0434\u0440\u0430\u0431\u043E\u0442\u043A\u0430" },
    { type: "income", value: 5e3, date: "2025-10-09T16:45:00", category: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    { type: "expens", value: 3500, date: "2025-10-09T09:15:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 2500, date: "2025-10-03T08:20:00", category: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442" },
    { type: "expens", value: 15e3, date: "2025-10-10T08:00:00", category: "\u0416\u0438\u043B\u044C\u0435" },
    { type: "expens", value: 2e3, date: "2025-10-05T10:30:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 3e3, date: "2025-10-05T20:00:00", category: "\u0420\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F" },
    { type: "expens", value: 800, date: "2025-10-05T20:45:00", category: "\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435" },
    { type: "expens", value: 1800, date: "2025-10-25T19:15:00", category: "\u0415\u0434\u0430" },
    { type: "income", value: 42e3, date: "2025-09-15T10:00:00", category: "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430" },
    { type: "income", value: 6e3, date: "2025-09-15T14:30:00", category: "\u041F\u043E\u0434\u0440\u0430\u0431\u043E\u0442\u043A\u0430" },
    { type: "expens", value: 14e3, date: "2025-09-15T08:00:00", category: "\u0416\u0438\u043B\u044C\u0435" },
    { type: "expens", value: 4500, date: "2025-09-15T20:30:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 3500, date: "2025-09-15T20:45:00", category: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442" },
    { type: "expens", value: 2500, date: "2025-09-15T21:00:00", category: "\u0420\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F" },
    { type: "income", value: 4e4, date: "2025-07-05T10:00:00", category: "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430" },
    { type: "income", value: 7e3, date: "2025-07-20T16:30:00", category: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    { type: "expens", value: 13500, date: "2025-07-05T08:00:00", category: "\u0416\u0438\u043B\u044C\u0435" },
    { type: "expens", value: 3800, date: "2025-07-05T10:15:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 4200, date: "2025-07-05T10:20:00", category: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442" },
    { type: "expens", value: 1800, date: "2025-07-14T10:30:00", category: "\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435" },
    { type: "expens", value: 800, date: "2025-08-15T18:45:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 1500, date: "2025-06-14T20:15:00", category: "\u0420\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F" },
    { type: "income", value: 3e3, date: "2025-08-25T08:00:00", category: "\u041F\u043E\u0434\u0440\u0430\u0431\u043E\u0442\u043A\u0430" },
    { type: "expens", value: 2200, date: "2025-09-10T14:20:00", category: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442" },
    { type: "expens", value: 3200, date: "2025-09-10T19:30:00", category: "\u041E\u0434\u0435\u0436\u0434\u0430" },
    { type: "expens", value: 5600, date: "2025-08-28T06:00:00", category: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" },
    { type: "income", value: 9e3, date: "2025-06-14T15:45:00", category: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    { type: "expens", value: 2700, date: "2025-10-10T16:10:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 5600, date: "2025-10-11T16:10:00", category: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" },
    { type: "income", value: 9e3, date: "2025-10-11T15:45:00", category: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    { type: "expens", value: 2700, date: "2025-10-11T16:10:00", category: "\u0415\u0434\u0430" },
    { type: "expens", value: 5600, date: "2025-10-12T06:00:00", category: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" },
    { type: "income", value: 9e3, date: "2025-10-12T15:45:00", category: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    { type: "expens", value: 2700, date: "2025-10-12T16:10:00", category: "\u0415\u0434\u0430" },
    { type: "income", value: 3e3, date: "2025-08-10T08:00:00", category: "\u041F\u043E\u0434\u0440\u0430\u0431\u043E\u0442\u043A\u0430" },
    { type: "expens", value: 2200, date: "2025-08-10T14:20:00", category: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442" },
    { type: "expens", value: 3200, date: "2025-08-10T19:30:00", category: "\u041E\u0434\u0435\u0436\u0434\u0430" },
    { type: "expens", value: 5600, date: "2025-08-28T06:00:00", category: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" },
    { type: "income", value: 9e3, date: "2025-08-28T15:45:00", category: "\u0424\u0440\u0438\u043B\u0430\u043D\u0441" },
    { type: "expens", value: 2700, date: "2025-08-28T16:10:00", category: "\u0415\u0434\u0430" }
  ]
};

// src/app/servises/indexDB.service.ts
var localDB = class _localDB {
  _timeDelay = 200;
  open() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open("localDB", 3);
      openRequest.onupgradeneeded = (event) => {
        const target = event.target;
        const db = target.result;
        if (!db.objectStoreNames.contains("operations")) {
          db.createObjectStore("operations", { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("categories")) {
          db.createObjectStore("categories", { keyPath: "name" });
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
  getAll(storeKey) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readonly");
      const store = transaction.objectStore(storeKey);
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  //Вернуть по id
  //storeKey = "operations" || "categories"
  getByKey(storeKey, itemKey) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readonly");
      const store = transaction.objectStore(storeKey);
      return new Promise((resolve, reject) => {
        const request = store.get(itemKey);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  //Добавление
  //storeKey = "operations" || "categories"
  add(storeKey, object) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readwrite");
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
    });
  }
  //Редактировать/заменить/добавить по ключу
  setByObject(storeKey, newObj) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readwrite");
      const store = transaction.objectStore(storeKey);
      return new Promise((resolve, reject) => {
        const request = store.put(newObj);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  //Удалить по Id
  //name = "operations" || "categories"
  deleteByKey(storeKey, itemKey) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readwrite");
      const store = transaction.objectStore(storeKey);
      return new Promise((resolve, reject) => {
        const request = store.delete(itemKey);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  //отчистить поле по ключу
  clearStore(storeKey) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readwrite");
      const store = transaction.objectStore(storeKey);
      return new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
  keyOf(storeKey, itemKey) {
    return __async(this, null, function* () {
      const db = yield this.open();
      const transaction = db.transaction(storeKey, "readonly");
      const store = transaction.objectStore(storeKey);
      return new Promise((resolve) => {
        const request = store.getKey(itemKey);
        request.onsuccess = () => resolve(request.result !== void 0);
        request.onerror = () => resolve(false);
      });
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////Операции
  getAllOperations() {
    return __async(this, null, function* () {
      console.log("--\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435 \u043E\u043F\u0440\u0435\u0440\u0430\u0446\u0438\u0438");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result = [];
      try {
        result = yield this.getAll("operations");
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439: ", error);
      }
      return result;
    });
  }
  createOperation(newObj) {
    return __async(this, null, function* () {
      console.log("--\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result;
      try {
        if (!(yield this.keyOf("categories", newObj.category))) {
          yield this.createCategory({ name: newObj.category, type: newObj.type });
        }
        result = yield this.add("operations", newObj);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438: ", error);
      }
      return result;
    });
  }
  deleteOperationByKey(itemKey) {
    return __async(this, null, function* () {
      console.log("--\u0423\u0434\u0430\u043B\u0435\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result;
      try {
        result = yield this.deleteByKey("operations", itemKey);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438: ", error);
      }
      return result;
    });
  }
  updateOperation(newObj) {
    return __async(this, null, function* () {
      console.log("--\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u043F\u0440\u0435\u0440\u0430\u0446\u0438\u0438");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result;
      try {
        if (!(yield this.keyOf("categories", newObj.category))) {
          yield this.createCategory({ name: newObj.category, type: newObj.type });
        }
        result = yield this.setByObject("operations", newObj);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u043F\u0446\u0438\u0438: ", error);
      }
      return result;
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////Категории
  getAllCategories() {
    return __async(this, null, function* () {
      console.log("--\u0412\u043E\u0437\u0432\u0440\u0449\u0435\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result = [];
      try {
        result = yield this.getAll("categories");
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439: ", error);
      }
      return result;
    });
  }
  createCategory(newObj) {
    return __async(this, null, function* () {
      console.log("--\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result;
      try {
        result = yield this.add("categories", newObj);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: ", error);
      }
      return result;
    });
  }
  deleteCategoryByKey(itemKey) {
    return __async(this, null, function* () {
      console.log("--\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result;
      try {
        result = yield this.deleteByKey("categories", itemKey);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: ", error);
      }
      return result;
    });
  }
  updateCategoryByKey(newObj) {
    return __async(this, null, function* () {
      console.log("--\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438");
      yield new Promise((resolve) => setTimeout(resolve, this._timeDelay));
      let result;
      try {
        result = yield this.setByObject("categories", newObj);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438: ", error);
      }
      return result;
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////Установка дефолтных значений
  setDefaultData() {
    return __async(this, null, function* () {
      yield this.clearStore("operations");
      yield this.clearStore("categories");
      for (const element of testData_default.operations) {
        const newObj = {
          type: element.type,
          value: element.value,
          date: new Date(element.date),
          category: element.category
        };
        if (!(yield this.keyOf("categories", newObj.category))) {
          yield this.add("categories", { name: newObj.category, type: newObj.type });
        }
        yield this.add("operations", newObj);
      }
      return;
    });
  }
  static \u0275fac = function localDB_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _localDB)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _localDB, factory: _localDB.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(localDB, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/servises/filter.service.ts
var Filter = class _Filter {
  interval = signal("month", ...ngDevMode ? [{ debugName: "interval" }] : []);
  date = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "date" }] : []);
  constructor() {
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры
  intervalLocale = computed(() => {
    switch (this.interval()) {
      case "day":
        return "\u0434\u0435\u043D\u044C";
      case "month":
        return "\u043C\u0435\u0441\u044F\u0446";
      case "year":
        return "\u0433\u043E\u0434";
      default:
        return "\u043F\u0430\u0441\u0445\u0430\u043B\u043A\u0430";
    }
  }, ...ngDevMode ? [{ debugName: "intervalLocale" }] : []);
  startInterval = computed(() => {
    const interval = this.interval();
    const result = new Date(this.date());
    if (!this.date()) {
      return /* @__PURE__ */ new Date();
    }
    result.setHours(0, 0, 0);
    if (interval === "month") {
      result.setDate(1);
    }
    if (interval === "year") {
      result.setDate(1);
      result.setMonth(0);
    }
    return result;
  }, ...ngDevMode ? [{ debugName: "startInterval" }] : []);
  endInterval = computed(() => {
    const interval = this.interval();
    const result = new Date(this.date());
    if (!this.date()) {
      return /* @__PURE__ */ new Date();
    }
    result.setHours(23, 59, 59);
    if (interval === "month") {
      result.setMonth(result.getMonth() + 1, 0);
    }
    if (interval === "year") {
      result.setMonth(11, 31);
    }
    return result;
  }, ...ngDevMode ? [{ debugName: "endInterval" }] : []);
  startYearInteval = computed(() => {
    const result = new Date(this.date());
    result.setHours(0, 0, 0);
    result.setDate(1);
    result.setMonth(0);
    return result;
  }, ...ngDevMode ? [{ debugName: "startYearInteval" }] : []);
  endYearInteval = computed(() => {
    const result = new Date(this.date());
    result.setHours(23, 59, 59);
    result.setMonth(11, 31);
    return result;
  }, ...ngDevMode ? [{ debugName: "endYearInteval" }] : []);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры
  setDate(newValue) {
    this.date.set(newValue);
  }
  setIntervalDay() {
    this.interval.set("day");
  }
  setIntervalMonth() {
    this.interval.set("month");
  }
  setIntervalYear() {
    this.interval.set("year");
  }
  downInterval() {
    if (this.interval() === "day") {
      return;
    } else if (this.interval() === "month") {
      this.setIntervalDay();
    } else if (this.interval() === "year") {
      this.setIntervalMonth();
    } else {
      return;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Фильтрация
  filter(array) {
    const result = structuredClone(array);
    const startInterval = this.startInterval();
    const endInterval = this.endInterval();
    return result.filter((a) => a.date >= startInterval && a.date <= endInterval);
  }
  static \u0275fac = function Filter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Filter)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Filter, factory: _Filter.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Filter, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/servises/LocalStorage.service.ts
var LocalStorage = class _LocalStorage {
  _localDb;
  _operations = signal([], ...ngDevMode ? [{ debugName: "_operations" }] : []);
  _categories = signal([], ...ngDevMode ? [{ debugName: "_categories" }] : []);
  loadOperationsStatus = signal(false, ...ngDevMode ? [{ debugName: "loadOperationsStatus" }] : []);
  loadCategoriesStatus = signal(false, ...ngDevMode ? [{ debugName: "loadCategoriesStatus" }] : []);
  // onOperationsChanged = new EventEmitter<IOperation[]>();
  // onCategoriesChanged = new EventEmitter<ICategory[]>();
  filterService = inject(Filter);
  constructor(_localDb) {
    this._localDb = _localDb;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры
  allOperations = computed(() => {
    return structuredClone(this._operations());
  }, ...ngDevMode ? [{ debugName: "allOperations" }] : []);
  getFilteredOperations() {
    const op = this._operations();
    return this.filterService.filter(op);
  }
  getFilteredOperationsByType(type) {
    return this.getFilteredOperations().filter((obj) => obj.type === type) || [];
  }
  getAllOperationsByType(type) {
    const result = structuredClone(this._operations());
    return result.filter((obj) => obj.type === type) || [];
  }
  getCategoriesByType(type) {
    return this._categories().filter((obj) => obj.type === type) || [];
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры
  setOperations() {
    return __async(this, null, function* () {
      console.log("\u0414\u0430\u043D\u043D\u044B\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u0438\u0441\u044C");
      this.loadOperationsStatus.set(true);
      const newData = yield this._localDb.getAllOperations();
      this._operations.set(newData);
      this.loadOperationsStatus.set(false);
    });
  }
  setCategories() {
    return __async(this, null, function* () {
      this.loadCategoriesStatus.set(true);
      const newData = yield this._localDb.getAllCategories();
      this._categories.set(newData);
      this.loadCategoriesStatus.set(false);
    });
  }
  setDaefaultData() {
    return __async(this, null, function* () {
      yield this._localDb.setDefaultData();
      location.reload();
      console.warn("Test data set");
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Создатторы
  createOperation(newOperation) {
    return __async(this, null, function* () {
      yield this._localDb.createOperation(newOperation);
      yield this.setOperations();
      yield this.setCategories();
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Обновлятторы
  updateOperation(operation) {
    return __async(this, null, function* () {
      yield this._localDb.updateOperation(operation);
      yield this.setCategories();
      yield this.setOperations();
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////Удалятторы
  deleteOperations(operationsArray) {
    return __async(this, null, function* () {
      for (const obj of operationsArray) {
        yield this._localDb.deleteOperationByKey(obj.id);
      }
      yield this.setOperations();
    });
  }
  static \u0275fac = function LocalStorage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalStorage)(\u0275\u0275inject(localDB));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LocalStorage, factory: _LocalStorage.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalStorage, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: localDB }], null);
})();

// src/app/components/Components_Chart/charts/chart/dataFormatter.service.ts
var DataFormatter = class _DataFormatter {
  filterService;
  constructor(filterService) {
    this.filterService = filterService;
  }
  megaFormatToMonth(data) {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = /* @__PURE__ */ new Map();
    let currentDate = new Date(this.filterService.startYearInteval());
    let endDate = new Date(this.filterService.endYearInteval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0 });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } while (currentDate <= endDate);
    for (const operation of allOperations) {
      const key = this.formatDate(currentDate);
      const mapElemet = resultMap.get(key);
      resultMap.set(key, {
        name: key,
        value: mapElemet.value + operation.value
      });
    }
    const res = Array.from(resultMap.values());
    return res;
  }
  megaFormatToCategory(data) {
    const resultMap = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const category = item.category;
      if (!resultMap.has(category)) {
        resultMap.set(category, { name: category, value: 0 });
      }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }
  roundedFormat(data) {
    const resultMap = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const category = item.category;
      if (!resultMap.has(category)) {
        resultMap.set(category, { name: category, value: 0 });
      }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }
  negativeFormat(data) {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = /* @__PURE__ */ new Map();
    let currentDate = new Date(this.filterService.startInterval());
    let endDate = new Date(this.filterService.endInterval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0, date: currentDate });
      if (this.filterService.interval() === "day") {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (this.filterService.interval() === "month") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (this.filterService.interval() === "year") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);
    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === "income" ? operation.value : 0;
      const expensValue = operation.type === "expens" ? -operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: key, value: incomeValue + expensValue, date: operation.date });
      } else {
        resultMap.set(key, {
          name: key,
          value: mapElemet.value + incomeValue + expensValue,
          date: operation.date
        });
      }
    }
    const res = Array.from(resultMap.values());
    return res;
  }
  datasetFormat(data) {
    const filterInterval = this.filterService.interval();
    const resultMap = /* @__PURE__ */ new Map();
    let currentDate = new Date(this.filterService.startInterval());
    let endDate = new Date(this.filterService.endInterval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, income: 0, expens: 0 });
      if (filterInterval === "day") {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (filterInterval === "month") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (filterInterval === "year") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);
    for (const operation of data) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === "income" ? operation.value : 0;
      const expensValue = operation.type === "expens" ? operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, {
          name: key,
          income: incomeValue,
          expens: expensValue,
          date: operation.date
        });
      } else {
        resultMap.set(key, {
          name: key,
          income: mapElemet.income + incomeValue,
          expens: mapElemet.expens + expensValue,
          date: operation.date
        });
      }
    }
    return Array.from(resultMap.values());
  }
  formatDate(date) {
    switch (this.filterService.interval()) {
      case "day":
        return date.getHours().toString();
      case "month":
        return date.getDate().toString();
      case "year":
        return date.getMonth().toString();
      default:
        return "dd.MM.yyyy";
    }
  }
  static \u0275fac = function DataFormatter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataFormatter)(\u0275\u0275inject(Filter));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DataFormatter, factory: _DataFormatter.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataFormatter, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: Filter }], null);
})();

// src/app/components/Components_Chart/charts/chart/chartOptions.service.ts
var ChartOptions = class _ChartOptions {
  localStorage;
  filterService;
  dataFormatter;
  constructor(localStorage, filterService, dataFormatter) {
    this.localStorage = localStorage;
    this.filterService = filterService;
    this.dataFormatter = dataFormatter;
  }
  MEGA = computed(() => {
    const incomeOperationsFormat = this.dataFormatter.megaFormatToMonth(this.localStorage.getAllOperationsByType("income"));
    const expensOperationsFormat = this.dataFormatter.megaFormatToMonth(this.localStorage.getAllOperationsByType("expens"));
    const incomeCategoriesFormat = this.dataFormatter.megaFormatToCategory(this.localStorage.getAllOperationsByType("income"));
    const expensCategoriesFormat = this.dataFormatter.megaFormatToCategory(this.localStorage.getAllOperationsByType("expens"));
    const sortedIncome = [...incomeOperationsFormat].sort((a, b) => a.value - b.value);
    const sortedExpens = [...expensOperationsFormat].sort((a, b) => a.value - b.value);
    const incomeValues = sortedIncome.map((a) => a.value);
    const expensValues = sortedExpens.map((a) => a.value);
    const maxCount = Math.max(...incomeValues, ...expensValues);
    const summIncome = incomeValues.reduce((sum, a) => sum + a, 0);
    const summExpens = expensValues.reduce((sum, a) => sum + a, 0);
    const incomeMonthsArr = sortedIncome.map((a) => a.name);
    const expensMonthsArr = sortedExpens.map((a) => a.name);
    const reverseIncomeValue = incomeValues.map((a) => maxCount - a);
    const reverseExpensValue = expensValues.map((a) => maxCount - a);
    const bestCategoryIncomeName = incomeCategoriesFormat[0]?.name || "...";
    const bestCategoryExpensName = expensCategoriesFormat[0]?.name || "...";
    const option = {
      backgroundColor: "transparent",
      tooltip: {},
      title: [
        {
          text: "\u0414\u043E\u0445\u043E\u0434\u044B",
          subtext: "\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u043E: " + summIncome,
          left: "25%",
          textAlign: "center"
        },
        {
          text: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0434\u043E\u0445\u043E\u0434\u043E\u0432",
          subtext: "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0434\u043E\u0445\u043E\u0434\u043E\u0432: " + bestCategoryIncomeName,
          left: "75%",
          textAlign: "center"
        },
        {
          text: "\u0420\u0430\u0441\u0445\u043E\u0434\u044B",
          subtext: "\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u043E: " + summExpens,
          left: "25%",
          top: "50%",
          textAlign: "center"
        },
        {
          text: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432",
          subtext: "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0442\u0440\u0430\u0442: " + bestCategoryExpensName,
          left: "75%",
          top: "50%",
          textAlign: "center"
        }
      ],
      grid: [
        {
          top: "8%",
          width: "50%",
          bottom: "50%",
          left: 10,
          containLabel: true
        },
        {
          top: "56%",
          width: "50%",
          bottom: 0,
          left: 10,
          containLabel: true
        }
      ],
      xAxis: [
        {
          type: "value",
          max: maxCount,
          splitLine: {
            show: false
          }
        },
        {
          type: "value",
          max: maxCount,
          gridIndex: 1,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          data: incomeMonthsArr,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        },
        {
          gridIndex: 1,
          type: "category",
          data: expensMonthsArr,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          type: "bar",
          stack: "chart",
          z: 3,
          label: {
            position: "right",
            show: true
          },
          data: incomeValues
        },
        {
          type: "bar",
          stack: "chart",
          silent: true,
          itemStyle: {
            // color: this.theme.darkTheme() ? '#353232ee' : '#eeee',
          },
          data: reverseIncomeValue
        },
        {
          type: "bar",
          stack: "component",
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            position: "right",
            show: true
          },
          data: expensValues
        },
        {
          type: "bar",
          stack: "component",
          silent: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            // color: this.theme.darkTheme() ? '#353232ee' : '#eeee',
          },
          data: reverseExpensValue
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["75%", "25%"],
          data: incomeCategoriesFormat
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["75%", "75%"],
          data: expensCategoriesFormat
        }
      ]
    };
    return option;
  }, ...ngDevMode ? [{ debugName: "MEGA" }] : []);
  ROUNDED = computed(() => {
    const formatIncomeData = this.dataFormatter.roundedFormat(this.localStorage.getFilteredOperationsByType("income"));
    const formatExpensData = this.dataFormatter.roundedFormat(this.localStorage.getFilteredOperationsByType("expens"));
    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item"
      },
      title: [
        {
          text: `${"\u0414\u043E\u0445\u043E\u0434\u044B"}: ${formatIncomeData.reduce((summ, a) => summ += a.value, 0)} \u0440\u0443\u0431.`,
          left: "30%",
          top: "10%",
          textAlign: "center"
        },
        {
          text: `${"\u0420\u0430\u0441\u0445\u043E\u0434\u044B"}: ${formatExpensData.reduce((summ, a) => summ += a.value, 0)} \u0440\u0443\u0431.`,
          left: "70%",
          top: "10%",
          textAlign: "center"
        }
      ],
      series: [
        {
          name: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
          type: "pie",
          radius: ["40%", "70%"],
          data: formatIncomeData,
          top: "10%",
          label: {
            show: true,
            position: "outside"
          },
          center: ["30%", "50%"],
          color: [
            "#0d6efd",
            // основной
            "#0a58ca",
            // темнее
            "#3d8bfd",
            // светлее
            "#6ea8fe",
            // еще светлее
            "#9fcdff",
            // самый светлый
            "#084298",
            // очень темный
            "#052c65"
            // максимально темный
          ]
        },
        {
          name: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
          type: "pie",
          radius: ["40%", "70%"],
          data: formatExpensData,
          top: "10%",
          label: {
            show: true,
            position: "outside"
          },
          center: ["70%", "50%"],
          color: ["#0d6efd", "#0a58ca", "#3d8bfd", "#6ea8fe", "#9fcdff", "#084298", "#052c65"]
        }
      ]
    };
  }, ...ngDevMode ? [{ debugName: "ROUNDED" }] : []);
  NEGATIVE = computed(() => {
    const intervalLocaleRu = this.filterService.intervalLocale();
    const allOperations = this.localStorage.getFilteredOperations().sort((a, b) => a.date.getTime() - b.date.getTime());
    const formattedData = this.dataFormatter.negativeFormat(allOperations);
    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      title: {
        text: `\u041E\u0440\u0435\u0440\u0430\u0446\u0438\u0438 \u0437\u0430 ${intervalLocaleRu}`,
        position: "top"
      },
      grid: {
        top: 80,
        bottom: 30
      },
      yAxis: {
        type: "value",
        position: "top",
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        }
      },
      xAxis: {
        data: formattedData.map((item) => item.name),
        type: "category",
        axisLine: { show: false },
        axisLabel: {},
        axisTick: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          markLine: {
            data: [
              {
                yAxis: 0,
                lineStyle: {
                  color: "#0d6efd",
                  width: 2
                },
                label: { show: false }
              }
            ]
          },
          name: "\u0418\u0442\u043E\u0433\u043E",
          type: "bar",
          stack: "Total",
          label: {
            show: true,
            formatter: "{c}"
          },
          itemStyle: {
            color: (params) => {
              if (params.value > 0) {
                return "#28a745";
              } else if (params.value < 0) {
                return "#dc3545";
              } else {
                return "#000000";
              }
            }
          },
          data: formattedData
        }
      ]
    };
    return option;
  }, ...ngDevMode ? [{ debugName: "NEGATIVE" }] : []);
  DATASET = computed(() => {
    const filteredOperations = this.localStorage.getFilteredOperations().sort((a, b) => a.date.getTime() - b.date.getTime());
    const intervalLocaleRu = this.filterService.intervalLocale();
    const formattedData = this.dataFormatter.datasetFormat(filteredOperations);
    const option = {
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      legend: {
        data: ["\u0414\u043E\u0445\u043E\u0434\u044B", "\u0420\u0430\u0441\u0445\u043E\u0434\u044B"],
        itemGap: 5
      },
      title: {
        text: `\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0437\u0430 ${intervalLocaleRu}`,
        position: "top"
      },
      dataset: {
        source: formattedData
      },
      grid: {
        top: "12%",
        left: "1%",
        right: "10%",
        containLabel: true
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        type: "value",
        name: "\u0421\u0443\u043C\u043C\u0430"
      },
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: "\u0414\u043E\u0445\u043E\u0434\u044B",
          type: "bar",
          color: "#0d6efd"
        },
        {
          name: "\u0420\u0430\u0441\u0445\u043E\u0434\u044B",
          type: "bar",
          color: "#6c757d"
        }
      ]
    };
    return option;
  }, ...ngDevMode ? [{ debugName: "DATASET" }] : []);
  static \u0275fac = function ChartOptions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartOptions)(\u0275\u0275inject(LocalStorage), \u0275\u0275inject(Filter), \u0275\u0275inject(DataFormatter));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChartOptions, factory: _ChartOptions.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartOptions, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: LocalStorage }, { type: Filter }, { type: DataFormatter }], null);
})();

export {
  Filter,
  LocalStorage,
  ChartOptions
};
//# sourceMappingURL=chunk-KYCPQ5EH.js.map
