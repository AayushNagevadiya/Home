// Firebase v12.0.0 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
  get
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const checkBtn = document.getElementById("checkEsp32Btn");
const statusDiv = document.getElementById("esp32Status");
const moodLightBtn = document.getElementById("moodLightBtn");
const ledSwitchDiv = document.getElementById("ledSwitchDiv");
const onBtn = document.getElementById("ledOn");
const offBtn = document.getElementById("ledOff");

// Hide mood light and LED buttons initially
moodLightBtn.style.display = "none";
ledSwitchDiv.style.display = "none";

// Function to check ESP32 status
async function checkESP32Status() {
  const statusRef = ref(db, "status/lastSeen");

  try {
    const snapshot = await get(statusRef);

    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const diff = now - lastSeen;

      if (diff < 10000) {
        // ESP32 is online
        statusDiv.innerText = "✅ ESP32 is Online";
        moodLightBtn.style.display = "block";
        autoRefreshStatus();
      } else {
        statusDiv.innerText = "❌ ESP32 is Offline";
        moodLightBtn.style.display = "none";
        ledSwitchDiv.style.display = "none";
      }
    } else {
      statusDiv.innerText = "❌ ESP32 status not available.";
    }
  } catch (err) {
    statusDiv.innerText = "⚠ Error checking status.";
    console.error(err);
  }
}

// Auto refresh every 5 sec
function autoRefreshStatus() {
  setInterval(() => {
    checkESP32Status();
  }, 5000);
}

// Mood Light Control Icon Click
moodLightBtn.addEventListener("click", () => {
  ledSwitchDiv.style.display = "block";
});

// LED ON
onBtn.addEventListener("click", () => {
  set(ref(db, "leds/led1"), true);
  onBtn.disabled = true;
  offBtn.disabled = false;
});

// LED OFF
offBtn.addEventListener("click", () => {
  set(ref(db, "leds/led1"), false);
  onBtn.disabled = false;
  offBtn.disabled = true;
});

// Check on page load
checkBtn.addEventListener("click", checkESP32Status);
