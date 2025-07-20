import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "1058472573300",
  appId: "1:1058472573300:web:5f44bcd0dcf680b5c937a3"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function checkESP32Status() {
  try {
    const statusRef = ref(database, "/status/lastSeen");
    const snapshot = await get(statusRef);
    const lastSeen = snapshot.val();
    const now = Date.now();
    const diff = now - lastSeen;
    const notification = document.getElementById("notification");

    if (diff < 10000) {
      notification.textContent = "✅ ESP32 is Online";
      notification.style.backgroundColor = "#c1f0c1";
    } else {
      notification.textContent = "❌ ESP32 is Offline";
      notification.style.backgroundColor = "#f8d7da";
    }
  } catch (error) {
    console.error("Error checking ESP32 status:", error);
  }
}

async function disconnectESP32() {
  try {
    await set(ref(database, "/status/lastSeen"), 0);
    const notification = document.getElementById("notification");
    notification.textContent = "🚫 ESP32 Manually Disconnected";
    notification.style.backgroundColor = "#f8d7da";
  } catch (error) {
    console.error("Failed to disconnect:", error);
  }
}

// Auto check every 5 seconds
setInterval(checkESP32Status, 5000);

// Check on load
window.onload = () => {
  checkESP32Status();
};
