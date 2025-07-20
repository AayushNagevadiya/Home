// Firebase Setup (12.0.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "72030311017",
  appId: "1:72030311017:web:ae16ea239f9e8e2fa0e7cc"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.checkESP32Status = async function () {
  const statusRef = ref(db, "status/lastSeen");

  try {
    const snapshot = await get(statusRef);
    const notification = document.getElementById("notification");

    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const difference = now - lastSeen;

      if (difference < 10000) {
        notification.textContent = "✅ ESP32 is online";
        notification.style.color = "green";
      } else {
        notification.textContent = "❌ ESP32 is offline";
        notification.style.color = "red";
      }
    } else {
      notification.textContent = "❌ No status found";
      notification.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("notification").textContent = "❌ Error checking status";
  }
};
