// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ---- LOGIN PAGE SCRIPT ----
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "12345" && password === "Aayush@1111") {
    window.location.href = "home.html";
  } else {
    alert("❌ Invalid Username or Password");
  }
}

// ---- HOME PAGE: ESP32 ONLINE CHECK ----
function checkESP32Status() {
  const statusPath = "/status/lastSeen";

  database.ref(statusPath).once("value")
    .then((snapshot) => {
      const lastSeen = snapshot.val();
      const now = Date.now();

      if (lastSeen && now - lastSeen < 10000) {
        alert("✅ ESP32 is Online");
      } else {
        alert("❌ ESP32 is Offline");
      }
    })
    .catch((error) => {
      console.error("Firebase read error:", error);
      alert("❌ Error checking ESP32 status");
    });
}
