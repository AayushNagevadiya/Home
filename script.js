import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "663840454485",
  appId: "1:663840454485:web:6b7c4aa89a56b89b4c3ff4",
  measurementId: "G-N8EN57Z5FZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Check ESP32 status
async function checkESP32Status() {
  const statusBox = document.getElementById('esp32-status');
  try {
    const snapshot = await get(ref(database, "/status/lastSeen"));
    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const diff = now - lastSeen;
      if (diff < 10000) {
        statusBox.textContent = "✅ ESP32 is ONLINE";
        statusBox.style.backgroundColor = "#d0f0c0";
        statusBox.style.color = "#2e7d32";
      } else {
        statusBox.textContent = "❌ ESP32 is OFFLINE";
        statusBox.style.backgroundColor = "#ffcccb";
        statusBox.style.color = "#b71c1c";
      }
    } else {
      statusBox.textContent = "❌ ESP32 status not available";
    }
  } catch (error) {
    statusBox.textContent = "❌ Error checking ESP32 status";
    console.error(error);
  }
}

// Run on page load and every 5 seconds
checkESP32Status();
setInterval(checkESP32Status, 5000);
