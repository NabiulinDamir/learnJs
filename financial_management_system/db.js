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


    ////////////////////////////////////////////////////////////////////////////////////////////////////Вспомогашки

    //поиск id категории по имени
    checkCategory: async (categoryName) => {
        const allCategories = await localDB.getAll("categories")
        return allCategories.find(category => category.name === categoryName)?.id
    },


    ////////////////////////////////////////////////////////////////////////////////////////////////////Подготовленные данные для графиков

    //Требуемый результат [[ 'Декабрь 2021',  720, 5300 ],[...]]
    getOperationsStatistic: async () => {
        const allOperations = await localDB.getAll("operations")
        const resultMap = new Map();
        allOperations.sort((a,b) => a.date.getTime() - b.date.getTime())
        allOperations.forEach(item => {
            const date = new Date(item.date);
            const key = `${date.getFullYear()}-${date.getMonth()}`; // ключ "год-месяц"
            const monthName = `${formatDate(date)}`;

            if (!resultMap.has(key)) {
                resultMap.set(key, [monthName, 0, 0]);
            }

            const [_, income, expense] = resultMap.get(key);

            if (item.type > 0) {
                resultMap.set(key, [monthName, income + item.value, expense]);
            } else {
                resultMap.set(key, [monthName, income, expense + item.value]);
            }
        });
        return Array.from(resultMap.values())

        function formatDate(date){
            const MONTH_NAME = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            return MONTH_NAME[date.getMonth()] + " " + date.getFullYear()
        }

    }

};

// console.log(await localDB.getOperationsStatistic())

export default localDB

