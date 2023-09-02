
if (!('indexedDB' in window)) {
    alert("This browser doesn't support IndexedDB.");
}

let db;

const DBOpenRequest = window.indexedDB.open('twiperdb', 2);

DBOpenRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('tasks', {
        keyPath: 'uuid',
    })
}

DBOpenRequest.onerror = (event) => {
    console.error('failed to initialize indexedDb')
};

DBOpenRequest.onsuccess = (event) => {
    console.log('initialized indexDb');
    db = event.target.result;
};

export default {
    tasks: {
        add: (task) => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction('tasks', 'readwrite');
                const store = tx.objectStore('tasks');
                const request = store.add(task);
                
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(request.error);
                };

                tx.oncomplete = () => {
                    console.log("Transaction completed.");
                };

                tx.onerror = () => {
                    reject(tx.error);
                };
            });
        },
        edit: (task) => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction('tasks', 'readwrite');
                const store = tx.objectStore('tasks');
                const request = store.put(task);
                
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(request.error);
                };

                tx.oncomplete = () => {
                    console.log("Transaction completed.");
                };

                tx.onerror = () => {
                    reject(tx.error);
                };
            });
        },
        get: (uuid) => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction('tasks', 'readonly');
                const store = tx.objectStore('tasks');
                const request = store.get(uuid);
                
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(request.error);
                };

                tx.oncomplete = () => {
                    console.log("Transaction completed.");
                };

                tx.onerror = () => {
                    reject(tx.error);
                };
            });
        },
        getAll: () => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction('tasks', 'readonly');
                const store = tx.objectStore('tasks');
                const request = store.getAll();
                
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(request.error);
                };

                tx.oncomplete = () => {
                    console.log("Transaction completed.");
                };

                tx.onerror = () => {
                    reject(tx.error);
                };
            });
        },
        delete: (uuid) => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction('tasks', 'readwrite');
                const store = tx.objectStore('tasks');
                const request = store.delete(uuid);
                
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(request.error);
                };

                tx.oncomplete = () => {
                    console.log("Transaction completed.");
                };

                tx.onerror = () => {
                    reject(tx.error);
                };
            });
        }
    }
}