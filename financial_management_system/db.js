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
        const transaction = db.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
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

    //Редактировать по Id
    //name = "operations" || "categories"
    set: async (name, id, newObject) => {
        console.log('hui')
        const oldData = await localDB.get(name, id)
        const type = oldData.type
        const db = await localDB.open();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(name, "readwrite");
            const store = transaction.objectStore(name);

            const putRequest = store.put({type, ...newObject, id }); 

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

    getCategoryIdForName: async (categoryName) => {
        const allCategories = await localDB.getAll("categories")
        return allCategories.find(category => category.name === categoryName).id ?? null
    }
};


export default localDB

