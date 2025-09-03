const localDB = {
    open: () => {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open("localDB", 2);
            openRequest.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('operations')) {
                    db.createObjectStore('operations', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('expens_categories')) {
                    db.createObjectStore('expens_categories', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('income_categories')) {
                    db.createObjectStore('income_categories', { keyPath: 'id', autoIncrement: true });
                }
            };

            openRequest.onsuccess = () => {
                const db = openRequest.result;
                resolve(db);
            };
        });
    },

    add: async (name, object) => {

        const db = await localDB.open();

        let transaction = db.transaction(name, "readwrite");
        let data = transaction.objectStore(name);
        return new Promise((resolve, reject) => {
            let request = data.add(object);

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
        let data = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = data.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },


    get: async (name, id) => {
        const db = await localDB.open();
        let transaction = db.transaction(name, "readonly");
        let data = transaction.objectStore(name);

        return new Promise((resolve, reject) => {
            let request = data.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    set: async (id, newObject) => {
        
    }


};


export default localDB

