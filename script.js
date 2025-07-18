// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ESP32 status check
document.getElementById('checkStatusBtn').addEventListener('click', async () => {
  const statusElement = document.getElementById('statusNotification');
  statusElement.innerText = "Checking ESP32 status...";

  try {
    const snapshot = await get(ref(database, '/status/lastSeen'));
    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const diff = now - lastSeen;
      if (diff <= 10000) {
        statusElement.innerText = "✅ ESP32 is Online";
        statusElement.className = "online";
      } else {
        statusElement.innerText = "🔴 ESP32 is Offline";
        statusElement.className = "offline";
      }
    } else {
      statusElement.innerText = "❌ Status not found in database.";
      statusElement.className = "offline";
    }
  } catch (error) {
    statusElement.innerText = "❌ Error checking ESP32 Status";
    statusElement.className = "offline";
    console.error("Error:", error);
  }
});
