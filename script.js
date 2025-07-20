// Firebase v12.0.0 initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase Config
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
  if (intervalId) clearInterval(intervalId); // avoid duplicate

  checkESP32Status(); // immediate
  intervalId = setInterval(checkESP32Status, 5000); // every 5 sec
});

function checkESP32Status() {
  const statusRef = ref(database, "/status/lastSeen");
  get(statusRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const lastSeen = snapshot.val();
        const now = Date.now();
        const diff = now - lastSeen;

        if (diff <= 10000) {
          showToast("ESP32 is online ✅", "#4CAF50"); // green
        } else {
          showToast("ESP32 is offline ❌", "#f44336"); // red
        }
      } else {
        showToast("ESP32 status not found ❓", "#9E9E9E"); // grey
      }
    })
    .catch((error) => {
      console.error("Firebase error:", error);
      showToast("Error checking status!", "#ff9800"); // orange
    });
}

function showToast(message, bgColor) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = bgColor;
  toast.style.color = "#fff";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "10px";
  toast.style.fontWeight = "bold";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000); // show for 3 sec
}
