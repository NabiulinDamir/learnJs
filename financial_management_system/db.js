const localDB = {
    open: () => {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open("localDB", 2);
            openRequest.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('operations')) {
                    db.createObjectStore('operations', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('categories')) {
                    db.createObjectStore('categories', { keyPath: 'name', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('sortOption')) {
                    db.createObjectStore('sortOption', { keyPath: 'name' });
                }
            };

            openRequest.onsuccess = () => {
                const db = openRequest.result;
                resolve(db);
            };
        });
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////Основные

    //Добавление
    //name = "operations" || "categories"
    add: async (name, object) => {
        const db = await localDB.open();
        const transaction = db.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        return new Promise((resolve, reject) => {
            let request = store.add(object);

            request.onsuccess = () => { resolve(request.result); };
            request.onerror = () => { reject(request.error); };
        });
    },

    //Вернуть всё
    //name = "operations" || "categories"
    getAll: async (name) => {
        const db = await localDB.open();
        const transaction = db.transaction(name, "readonly");
        const store = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    //Вернуть по id
    //name = "operations" || "categories"
    get: async (name, id) => {
        const db = await localDB.open();
        const transaction = db.transaction(name, "readonly");
        const store = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    //Редактировать операцию по Id
    setOperation: async (id, newObj) => {
        const oldData = await localDB.get("operations", id)
        const type = oldData.type
        const db = await localDB.open();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("operations", "readwrite");
            const store = transaction.objectStore("operations");

            const putRequest = store.put({ type, ...newObj, id });

            putRequest.onsuccess = () => resolve(putRequest.result);
            putRequest.onerror = () => reject(putRequest.error);
        });
    },

    //редактировать настройки сортировки
    setSortOption: async (name, newObj) => {
        const db = await localDB.open();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("sortOption", "readwrite");
            const store = transaction.objectStore("sortOption");

            const putRequest = store.put({ name, ...newObj });

            putRequest.onsuccess = () => resolve(putRequest.result);
            putRequest.onerror = () => reject(putRequest.error);
        });
    },

    //Удалить по Id
    //name = "operations" || "categories"
    delete: async (name, id) => {
        const db = await localDB.open();
        const transaction = db.transaction(name, "readwrite");
        const store = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = store.delete(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    clear: async (name) => {
        const db = await localDB.open();
        const transaction = db.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        return new Promise((resolve, reject) => {
            let request = store.clear();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },


    ////////////////////////////////////////////////////////////////////////////////////////////////////Вспомогашки

    //поиск id категории по имени
    checkCategory: async (categoryName) => {
        const allCategories = await localDB.getAll("categories")
        return allCategories.find(category => category.name === categoryName)?.id
    },

    formatDate: (dateObj) => {
        const addNul = (number) => number < 10 ? `0${number}` : number
        return `${addNul(dateObj.getDate())}.${addNul(dateObj.getMonth() + 1)}.${addNul(dateObj.getFullYear())}`
    },

    isInTimeInterval: (dateAObj, dateBObj, intervalType) => {
        const dateA = new Date(dateAObj);
        const dateB = new Date(dateBObj);
        switch (intervalType) {
            case "day":
                const startOfDay = new Date(dateB);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(dateB);
                endOfDay.setHours(23, 59, 59, 999);
                return dateA >= startOfDay && dateA <= endOfDay;
            case "month":
                const startOfMonth = new Date(dateB.getFullYear(), dateB.getMonth(), 1);
                const endOfMonth = new Date(dateB.getFullYear(), dateB.getMonth() + 1, 0, 23, 59, 59, 999);
                return dateA >= startOfMonth && dateA <= endOfMonth;
            case "year":
                const startOfYear = new Date(dateB.getFullYear(), 0, 1);
                const endOfYear = new Date(dateB.getFullYear(), 11, 31, 23, 59, 59, 999);
                return dateA >= startOfYear && dateA <= endOfYear;
            default:
                return false
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////Подготовленные данные для графиков

    //собирает массив для статичтики - chart_1
    //Требуемый результат [[ 'Декабрь 2021',  720, 5300 ],[...]]
    getDateFormat: async () => {


        const allOperations = await localDB.getAll("operations")
        const time_delay = await localDB.get("sortOption", "time_delay")

        const resultMap = new Map();
        allOperations.sort((a, b) => a.date.getTime() - b.date.getTime())
        allOperations.forEach(item => {
            const date = new Date(item.date);

            const key = `
                ${time_delay.length == "day" ? date.getDate() : ''}.
                ${time_delay.length == "day" || time_delay.length == "month" ? date.getMonth() : ''}.
                ${date.getFullYear()}`;

            const name = `${localDB.formatDate(date)}`;
            if (!resultMap.has(key)) { resultMap.set(key, [name, 0, 0]); }
            const [_, income, expense] = resultMap.get(key);
            if (item.type > 0) {
                resultMap.set(key, [name, income + item.value, expense]);
            } else {
                resultMap.set(key, [name, income, expense + item.value]);
            }
        });

        return Array.from(resultMap.values())

    },

    //собирает массив для статичтики - chart_2_1
    //{ value: 300, name: 'Video Ads' }
    getIncomeCategoryFormat: async () => {
        const allOperations = await localDB.getAll("operations")
        const time_delay = await localDB.get("sortOption", "time_delay")

        const resultMap = new Map();

        allOperations.forEach(item => {
            if (item.type > 0 && localDB.isInTimeInterval(item.date, time_delay.date, time_delay.length)) {
                const category = item.category;

                if (!resultMap.has(category)) { resultMap.set(category, 0) }
                const currentValue = resultMap.get(category);
                resultMap.set(category, currentValue + item.value);
            }
        });
        return Array.from(resultMap.entries()).map(([name, value]) => ({
            value: value,
            name: name
        }));
    },

    //собирает массив для статичтики- chart_2_2
    //[{ value: 300, name: 'Video Ads' }]
    getExpensCategoryFormat: async () => {
        const allOperations = await localDB.getAll("operations")
        const time_delay = await localDB.get("sortOption", "time_delay")
        const resultMap = new Map();

        allOperations.forEach(item => {
            if (item.type < 0 && localDB.isInTimeInterval(item.date, time_delay.date, time_delay.length)) {
                const category = item.category;

                if (!resultMap.has(category)) { resultMap.set(category, 0) }
                const currentValue = resultMap.get(category);
                resultMap.set(category, currentValue + item.value);
            }
        });
        return Array.from(resultMap.entries()).map(([name, value]) => ({
            value: value,
            name: name
        }));
    },


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //собирает асси для датаселектора
    getCurrentTimeArray: async (intervalType) => {
        const allOperations = await localDB.getAll("operations")
        allOperations.sort((a, b) => a.date.getTime() - b.date.getTime())
        const resultMap = new Map();

        switch (intervalType) {
            case "day":
                allOperations.forEach(item => { resultMap.set(formatDate(item.date), { date: item.date, isCurrent: (formatDate(item.date) == formatDate(new Date())) }) })
                break
            case "month":
                allOperations.forEach(item => { resultMap.set(formatDate(item.date).slice(3), { date: item.date, isCurrent: (formatDate(item.date).slice(3) == formatDate(new Date()).slice(3)) }) })
                break
            case "year":
                allOperations.forEach(item => { resultMap.set(formatDate(item.date).slice(6), { date: item.date, isCurrent: (item.date.getFullYear() == new Date().getFullYear()) }) })
                break
            default:
        }

        function formatDate(dateObj) {
            const addNul = (number) => number < 10 ? `0${number}` : number
            return `${addNul(dateObj.getDate())}.${addNul(dateObj.getMonth() + 1)}.${addNul(dateObj.getFullYear())}`
        }

        return Array.from(resultMap.entries()).map(([name, value]) => ({
            value: value,
            name: name
        }));
    },
}
















export default localDB

