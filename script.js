// Firebase v12 SDK Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase config (replace with your own if needed)
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "529106303981",
  appId: "1:529106303981:web:e967a3f8a2d2a38c135cb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Check ESP32 Connection on button click
document.getElementById("checkEsp32Btn").addEventListener("click", () => {
  const lastSeenRef = ref(database, "/status/lastSeen");

  onValue(lastSeenRef, (snapshot) => {
    const lastSeen = snapshot.val();
    const currentTime = Date.now();
    const difference = currentTime - lastSeen;

    if (difference < 10000) {
      alert("✅ ESP32 is Online");
    } else {
      alert("❌ ESP32 is Offline");
    }
  }, {
    onlyOnce: true
  });
});
