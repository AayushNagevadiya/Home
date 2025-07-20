// Firebase v12.0.0 initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Your Firebase config (replace if needed)
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "187771650350",
  appId: "1:187771650350:web:190356c951e3e9a37325cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let intervalId = null;

document.getElementById("checkBtn").addEventListener("click", () => {
  checkESP32Status(); // Check once on click

  // Clear any previous interval to avoid multiple checks
  if (intervalId) clearInterval(intervalId);

  // Check status every 5 seconds
  intervalId = setInterval(() => {
    checkESP32Status();
  }, 5000);
});

function checkESP32Status() {
  const statusRef = ref(database, "/status/lastSeen");
  get(statusRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const lastSeen = snapshot.val();
        const now = Date.now();
        const diff = now - lastSeen;

        const notif = document.getElementById("espStatus");

        if (diff <= 10000) {
          notif.textContent = "ESP32 is online ✅";
          notif.style.color = "green";
        } else {
          notif.textContent = "ESP32 is offline ❌";
          notif.style.color = "red";
        }
      } else {
        document.getElementById("espStatus").textContent = "Status not found ❓";
      }
    })
    .catch((error) => {
      console.error("Error reading Firebase:", error);
    });
}
