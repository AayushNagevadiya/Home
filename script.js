// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// ✅ Your updated Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "your_messaging_sender_id", // optional
  appId: "your_app_id",                           // optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const checkBtn = document.getElementById("checkStatusBtn");
const statusText = document.getElementById("statusText");

// Check ESP32 status
function checkESP32Status() {
  const lastSeenRef = ref(db, "status/lastSeen");

  onValue(lastSeenRef, (snapshot) => {
    const lastSeen = snapshot.val();
    const now = Date.now();

    if (lastSeen && now - lastSeen < 10000) {
      statusText.textContent = "ESP32 is ONLINE ✅";
      statusText.style.color = "green";
    } else {
      statusText.textContent = "ESP32 is OFFLINE ❌";
      statusText.style.color = "red";
    }
  });
}

checkBtn.addEventListener("click", checkESP32Status);
setInterval(checkESP32Status, 5000);
