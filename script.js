function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "aayush" && password === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    document.getElementById("error-message").innerText = "Invalid username or password";
  }
}

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830"
};
firebase.initializeApp(firebaseConfig);

// ESP32 status check button logic
function checkESP32Status() {
  const statusRef = firebase.database().ref("/status/lastSeen");
  statusRef.once("value", snapshot => {
    const lastSeen = snapshot.val();
    const now = Date.now();
    const isOnline = lastSeen && now - lastSeen < 10000;

    const statusEl = document.getElementById("esp32-status");
    if (isOnline) {
      statusEl.innerText = "✅ ESP32 is online";
      statusEl.style.color = "lightgreen";
    } else {
      statusEl.innerText = "❌ ESP32 is offline";
      statusEl.style.color = "red";
    }
  });
}
