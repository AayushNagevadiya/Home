// ✅ script.js

// Firebase v10+ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ Main Function: Check ESP32 Status
function checkESP32Status() {
  const statusRef = ref(database, "/status/lastSeen");
  get(statusRef)
    .then((snapshot) => {
      const lastSeen = snapshot.val();
      const currentTime = Date.now();
      const timeDiff = currentTime - lastSeen;

      const notification = document.getElementById("notification");
      if (timeDiff < 10000) {
        // < 10 seconds = online
        notification.innerText = "✅ ESP32 is Online";
        notification.style.backgroundColor = "#d0f0fd";
        notification.style.color = "#06466c";
      } else {
        // Otherwise offline
        notification.innerText = "❌ ESP32 is Offline";
        notification.style.backgroundColor = "#ffe0e0";
        notification.style.color = "#b00020";
      }
      notification.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching status:", error);
      const notification = document.getElementById("notification");
      notification.innerText = "⚠ Failed to check ESP32 status.";
      notification.style.backgroundColor = "#fff3cd";
      notification.style.color = "#856404";
      notification.style.display = "block";
    });
}

// ✅ Make function accessible from HTML button
window.checkESP32Status = checkESP32Status;
