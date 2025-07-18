// Firebase v9 SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
  authDomain: "home-automation-89830.firebaseapp.com",
  databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
  projectId: "home-automation-89830",
  storageBucket: "home-automation-89830.appspot.com",
  messagingSenderId: "743430850988",
  appId: "1:743430850988:web:8c50c67dc36ff131c0160f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Check ESP32 status
window.checkESP32 = async function () {
  const statusRef = ref(db, '/status/lastSeen');
  try {
    const snapshot = await get(statusRef);
    if (snapshot.exists()) {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const diff = now - lastSeen;
      const statusText = diff < 10000 ? '🟢 Online' : '🔴 Offline';
      document.getElementById('status').innerText = 'Status: ' + statusText;

      if (diff < 10000) {
        document.getElementById('ledControls').style.display = 'block';
      } else {
        document.getElementById('ledControls').style.display = 'none';
      }
    } else {
      document.getElementById('status').innerText = 'Status: Not found';
    }
  } catch (error) {
    document.getElementById('status').innerText = 'Error checking status';
  }
};

// Toggle LED on Firebase
window.toggleLED = function (ledNumber) {
  const ledPath = /leds/led${ledNumber};
  const ledRef = ref(db, ledPath);
  get(ledRef).then(snapshot => {
    const currentState = snapshot.exists() ? snapshot.val() : 0;
    const newState = currentState === 1 ? 0 : 1;
    set(ledRef, newState);
    alert(LED ${ledNumber} turned ${newState ? 'ON' : 'OFF'});
  });
};
