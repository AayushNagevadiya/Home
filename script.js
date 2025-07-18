// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.firebasestorage.app",
  messagingSenderId: "186474964680",
  appId: "1:186474964680:web:768fbe82134fb1a435e7fd",
  measurementId: "G-5RB59X6NNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// --- Login Function ---
window.login = function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Aayush" && password === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    document.getElementById("error-message").innerText = "Invalid username or password!";
  }
};

// --- ESP32 Status Check Function ---
window.checkESP32 = async function () {
  const statusText = document.getElementById("esp32-status");
  const lastSeenRef = ref(database, "status/lastSeen");

  try {
    const snapshot = await get(lastSeenRef);
    const lastSeen = snapshot.val();

    if (!lastSeen) {
      statusText.innerText = "ESP32: Offline (No data found)";
      return;
    }

    const now = Date.now();
    const diff = now - lastSeen;

    if (diff <= 10000) {
      statusText.innerText = "ESP32 is ONLINE ✅";
    } else {
      statusText.innerText = "ESP32 is OFFLINE ❌";
    }
  } catch (err) {
    statusText.innerText = "Error checking status: " + err.message;
  }
};
