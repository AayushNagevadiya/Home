// Firebase 12.0.0 Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Check ESP32 connection on button press
window.checkESP32Status = async function () {
  const statusRef = ref(db, "status/lastSeen");
  try {
    const snapshot = await get(statusRef);
    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const diff = now - lastSeen;
      const isOnline = diff < 10000;

      const message = isOnline
        ? "✅ ESP32 is ONLINE"
        : "❌ ESP32 is OFFLINE";
      document.getElementById("espStatus").textContent = message;
      document.getElementById("espStatus").style.color = isOnline ? "green" : "red";
    } else {
      document.getElementById("espStatus").textContent = "No data found!";
    }
  } catch (error) {
    console.error("Error reading Firebase:", error);
    document.getElementById("espStatus").textContent = "Error checking ESP32!";
  }
};

// Login logic
window.login = function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "aayush" && password === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password");
  }
};
