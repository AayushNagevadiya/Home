// Firebase Setup using Firebase v12
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "1058472573300",
  appId: "1:1058472573300:web:5f44bcd0dcf680b5c937a3"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Login validation
window.login = function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "aayush" && pass === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    document.getElementById("error").textContent = "Invalid username or password";
  }
};

// Check ESP32 manually
window.checkESP32Status = async function () {
  const statusRef = ref(database, "/status/lastSeen");
  try {
    const snapshot = await get(statusRef);
    const lastSeen = snapshot.val();
    const now = Date.now();
    const diff = now - lastSeen;

    const notification = document.getElementById("notification");
    notification.style.display = "block";

    if (diff < 10000) {
      notification.textContent = "✅ ESP32 is Online";
      notification.style.backgroundColor = "#c1f0c1";
    } else {
      notification.textContent = "❌ ESP32 is Offline";
      notification.style.backgroundColor = "#f8d7da";
    }
  } catch (err) {
    alert("Error checking ESP32 status.");
    console.error(err);
  }
};
