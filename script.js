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

function checkESP32Status() {
  const statusDiv = document.getElementById("status");
  const lastSeenRef = ref(database, "status/lastSeen");

  get(lastSeenRef).then((snapshot) => {
    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const diff = now - lastSeen;
      if (diff < 10000) {
        statusDiv.innerText = "✅ ESP32 is Online";
        statusDiv.style.backgroundColor = "#d4edda";
        statusDiv.style.color = "#155724";
      } else {
        statusDiv.innerText = "❌ ESP32 is Offline";
        statusDiv.style.backgroundColor = "#f8d7da";
        statusDiv.style.color = "#721c24";
      }
    } else {
      statusDiv.innerText = "⚠ No ESP32 status found";
    }
  }).catch((error) => {
    console.error("Error checking ESP32 status:", error);
    statusDiv.innerText = "❌ Error checking ESP32 status";
  });
}

setInterval(checkESP32Status, 5000);
checkESP32Status(); // First check on page load
