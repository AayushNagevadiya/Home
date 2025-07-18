<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
    authDomain: "home-automation-89830.firebaseapp.com",
    databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
    projectId: "home-automation-89830",
    storageBucket: "home-automation-89830.firebasestorage.app",
    messagingSenderId: "186474964680",
    appId: "1:186474964680:web:768fbe82134fb1a435e7fd",
    measurementId: "G-5RB59X6NNL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Elements
const checkBtn = document.getElementById("checkStatusBtn");
const statusText = document.getElementById("statusText");

// Auto check every 5 seconds
function checkESP32Status() {
  const lastSeenRef = ref(db, "status/lastSeen");

  onValue(lastSeenRef, (snapshot) => {
    const lastSeen = snapshot.val();
    const now = Date.now();

    if (lastSeen && now - lastSeen < 10000) {
      statusText.textContent = "ESP32 is ONLINE ✅";
      statusText.style.color = "lime";
    } else {
      statusText.textContent = "ESP32 is OFFLINE ❌";
      statusText.style.color = "red";
    }
  });
}

checkBtn.addEventListener("click", checkESP32Status);
setInterval(checkESP32Status, 5000);
