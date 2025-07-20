// ✅ Firebase & ESP32 Check (script.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "1058472573300",
  appId: "1:1058472573300:web:5f44bcd0dcf680b5c937a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ESP32 Status Check on Button Press
window.checkESP32Status = async function () {
  try {
    const statusRef = ref(database, "/status/lastSeen");
    const snapshot = await get(statusRef);
    const lastSeen = snapshot.val();

    const now = Date.now();
    const diff = now - lastSeen;

    const notification = document.getElementById("notification");
    const roomSection = document.getElementById("roomSection");

    if (diff < 10000) {
      notification.textContent = "✅ ESP32 is Online";
      notification.style.backgroundColor = "#c8f7c5";
      roomSection.style.display = "block";
    } else {
      notification.textContent = "❌ ESP32 is Offline";
      notification.style.backgroundColor = "#ffc9c9";
      roomSection.style.display = "none";
    }
  } catch (err) {
    console.error("Error checking status:", err);
  }
};
