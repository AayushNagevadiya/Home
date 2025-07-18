// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830"
};

// --- Initialize Firebase ---
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- LOGIN FUNCTION ---
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // ✅ Updated credentials
  if (username === "Aayush" && password === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    document.getElementById("error-message").innerText = "Invalid username or password!";
  }
}

// --- ESP32 CONNECTION CHECK ---
function checkESP32() {
  const statusElement = document.getElementById("esp32-status");

  const lastSeenRef = database.ref("status/lastSeen");

  lastSeenRef.once("value")
    .then((snapshot) => {
      const lastSeen = snapshot.val();
      if (!lastSeen) {
        statusElement.innerText = "ESP32: Offline (No data found)";
        return;
      }

      const now = Date.now();
      const difference = now - lastSeen;

      if (difference <= 10000) {
        statusElement.innerText = "ESP32 is ONLINE ✅";
      } else {
        statusElement.innerText = "ESP32 is OFFLINE ❌";
      }
    })
    .catch((error) => {
      statusElement.innerText = "Error checking ESP32: " + error;
    });
}
