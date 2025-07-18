// Firebase v12 SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to check ESP32 online/offline
function checkESP32Status() {
  const notification = document.getElementById("notification");
  const statusRef = ref(db, "status/lastSeen");

  get(statusRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const lastSeen = snapshot.val();
        const now = Date.now();
        const diff = now - lastSeen;

        if (diff < 10000) {
          notification.textContent = "✅ ESP32 is ONLINE";
          notification.style.backgroundColor = "#d4f1f9";
          notification.style.color = "#0077b6";
        } else {
          notification.textContent = "❌ ESP32 is OFFLINE";
          notification.style.backgroundColor = "#ffe0e0";
          notification.style.color = "#b00020";
        }
      } else {
        notification.textContent = "⚠ No data found for ESP32";
        notification.style.backgroundColor = "#fff8dc";
        notification.style.color = "#555";
      }
    })
    .catch((error) => {
      console.error("Error reading
