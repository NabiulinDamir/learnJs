const localDB = {
    open: () => {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open("localDB", 2);
            openRequest.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('data')) {
                    db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
                }
            };

            openRequest.onsuccess = () => {
                const db = openRequest.result;
                resolve(db);
            };
        });
    },

    add: async (object) => {

        const db = await localDB.open();

        let transaction = db.transaction("data", "readwrite");
        let data = transaction.objectStore("data");
        // data.clear()
        data.add(object);

        console.log(db)
    },

    getAll: async () => {
        const db = await localDB.open();
        let transaction = db.transaction("data", "readonly");
        let data = transaction.objectStore("data");

        return new Promise((resolve, reject) => {
            let request = data.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

    }

};


export default localDB

