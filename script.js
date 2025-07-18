// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
getAnalytics(app);  // Optional

// Function to check ESP32 status
function checkESP32Status() {
  const statusRef = ref(database, "/status/lastSeen");

  get(statusRef)
    .then((snapshot) => {
      const lastSeen = snapshot.val();
      const now = Date.now();

      if (!lastSeen) {
        alert("❌ ESP32 is OFFLINE");
        return;
      }

      const timeDiff = now - lastSeen;

      if (timeDiff < 10000) {
        alert("✅ ESP32 is ONLINE");
      } else {
        alert("❌ ESP32 is OFFLINE");
      }
    })
    .catch((error) => {
      console.error("Error fetching status:", error);
      alert("Error checking ESP32 status.");
    });
}

// Button click listener
document.addEventListener("DOMContentLoaded", () => {
  const statusBtn = document.getElementById("checkStatusBtn");
  if (statusBtn) {
    statusBtn.addEventListener("click", checkESP32Status);
  }
});
