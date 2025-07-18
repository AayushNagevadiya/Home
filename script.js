// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function checkESP32Status() {
  const statusBox = document.getElementById("statusBox");
  const dbRef = ref(db);

  get(child(dbRef, "status/lastSeen"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const lastSeen = snapshot.val();
        const now = Date.now();
        const diff = now - lastSeen;

        if (diff < 10000) {
          statusBox.textContent = "✅ ESP32 is Online";
          statusBox.style.backgroundColor = "#d2f0ff";
          statusBox.style.color = "#2a7ca3";
        } else {
          statusBox.textContent = "❌ ESP32 is Offline";
          statusBox.style.backgroundColor = "#ffe5e5";
          statusBox.style.color = "#cc0000";
        }
      } else {
        statusBox.textContent = "⚠ No status found in Firebase.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      statusBox.textContent = "❌ Error checking ESP32 Status";
    });
}
