import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    update,
    remove
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "loveme3-a12ce.firebaseapp.com",
    databaseURL: "https://loveme3-a12ce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "loveme3-a12ce",
    storageBucket: "loveme3-a12ce.firebasestorage.app",
    messagingSenderId: "695872095336",
    appId: "1:695872095336:web:094a5ee6b65f45ed0827dd"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {
    db,
    ref,
    set,
    push,
    onValue,
    update,
    remove
};