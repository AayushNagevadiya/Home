// Firebase Config (already correct for your project)
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "1091051598127",
  appId: "1:1091051598127:web:2f7b0418ce4e8fe83b27c8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ========== LOGIN FUNCTION ==========
function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Aayush" && password === "Aayush@1982") {
    window.location.href = "home.html"; // ✅ Redirect to home
  } else {
    alert("Invalid credentials");
  }
}

// ========== ESP32 CONNECTION CHECK ==========
function checkESP32Status() {
  const statusRef = database.ref("/status/lastSeen");

  statusRef.once("value")
    .then((snapshot) => {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const difference = now - lastSeen;

      if (difference < 10000) {
        alert("✅ ESP32 is ONLINE");
      } else {
        alert("❌ ESP32 is OFFLINE");
      }
    })
    .catch((error) => {
      console.error("Error reading status:", error);
      alert("⚠ Failed to read ESP32 status");
    });
}

// ========== ADD EVENT LISTENERS ==========
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", loginUser);
  }

  const checkBtn = document.getElementById("checkBtn");
  if (checkBtn) {
    checkBtn.addEventListener("click", checkESP32Status);
  }
});
