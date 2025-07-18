// ✅ LOGIN VALIDATION
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "Aayush" && password === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    document.getElementById("error").innerText = "Invalid username or password!";
  }
}

// ✅ FIREBASE SETUP + ESP32 STATUS CHECK (Only on home.html)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "186474964680",
  appId: "1:186474964680:web:768fbe82134fb1a435e7fd",
  measurementId: "G-5RB59X6NNL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ CHECK ESP32 STATUS FUNCTION
function checkESP32() {
  const statusRef = ref(database, "/status/lastSeen");
  onValue(statusRef, (snapshot) => {
    const lastSeen = snapshot.val();
    const now = Date.now();
    if (lastSeen && now - lastSeen < 10000) {
      document.getElementById("status").innerText = "Status: ESP32 is ONLINE ✅";
    } else {
      document.getElementById("status").innerText = "Status: ESP32 is OFFLINE ❌";
    }
  }, (error) => {
    document.getElementById("status").innerText = "Status: Error reading status";
    console.error("Error checking ESP32:", error);
  });
}
