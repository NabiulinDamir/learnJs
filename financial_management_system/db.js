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
                    db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
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
        let transaction = db.transaction(name, "readwrite");
        let store = transaction.objectStore(name);
        return new Promise((resolve, reject) => {
            let request = store.add(object);

            request.onsuccess = () => {
                resolve(request.result); // Вернет ID созданного элемента
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },


    getAll: async (name) => {
        const db = await localDB.open();
        let transaction = db.transaction(name, "readonly");
        let store = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },


    get: async (name, id) => {
        const db = await localDB.open();
        let transaction = db.transaction(name, "readonly");
        let store = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    update: async (name, id, newObject) => {
        const db = await localDB.open();
        const transaction = db.transaction(name, "readwrite");
        const store = transaction.objectStore(name);

        const data = await localDB.get(name, id);
        if (!data) throw new Error("Объект не найден");

        return await new Promise((resolve, reject) => {
            const request = store.put({ ...data, ...newObject });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },


    ////////////////////////////////////////////////////////////////////////////////////////////////////Вспомогалки

    getCategoryIdForName: async (categoryName) => {
        const allCategories = await localDB.getAll("categories")
        return allCategories.find(category => category.name === categoryName).id ?? null
    }
};


export default localDB

