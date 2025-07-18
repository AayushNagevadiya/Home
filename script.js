import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "45945567424",
  appId: "1:45945567424:web:ca1de9450c32d63f8d06c2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function checkESP32Status() {
  const statusRef = ref(database, "status/lastSeen");
  onValue(statusRef, (snapshot) => {
    const lastSeen = snapshot.val();
    const now = Date.now();
    const diff = now - lastSeen;
    const notification = document.getElementById("notification");

    if (diff < 10000) {
      notification.textContent = "✅ ESP32 is ONLINE";
      notification.style.backgroundColor = "#d4edda";
      notification.style.color = "#155724";
    } else {
      notification.textContent = "❌ ESP32 is OFFLINE";
      notification.style.backgroundColor = "#f8d7da";
      notification.style.color = "#721c24";
    }
  });
}

// ✅ Expose the function globally
window.checkESP32Status = checkESP32Status;
