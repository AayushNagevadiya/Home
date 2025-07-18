// Import Firebase SDK modules (Modular v12)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Your Firebase config
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
const analytics = getAnalytics(app);
const db = getDatabase(app);

// ✅ Check ESP32 Status Function
async function checkESP32Status() {
  const statusRef = ref(db, "/status/lastSeen");

  try {
    const snapshot = await get(statusRef);
    if (!snapshot.exists()) {
      alert("❌ ESP32 status unknown.");
      return;
    }

    const lastSeen = snapshot.val();
    const now = Date.now();
    const timeDiff = now - lastSeen;

    if (timeDiff < 10000) {
      alert("✅ ESP32 is ONLINE");
    } else {
      alert("❌ ESP32 is OFFLINE");
    }
  } catch (error) {
    console.error("Error checking ESP32 status:", error);
    alert("⚠ Failed to check ESP32 status.");
  }
}

// ✅ Attach button listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const statusBtn = document.getElementById("checkStatusBtn");
  if (statusBtn) {
    statusBtn.addEventListener("click", checkESP32Status);
  }
});
