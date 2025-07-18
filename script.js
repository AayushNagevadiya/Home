<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAht7TWN8NlbICl0VbEIuc19Mri7oPlXvc",
    authDomain: "home-automation-89830.firebaseapp.com",
    databaseURL: "https://home-automation-89830-default-rtdb.firebaseio.com",
    projectId: "home-automation-89830",
    storageBucket: "home-automation-89830.appspot.com",
    messagingSenderId: "your_sender_id",
    appId: "your_app_id"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  window.login = function () {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "12345" && pass === "Aayush@1111") {
      checkESP32Status(); // check immediately
      setInterval(checkESP32Status, 5000); // repeat every 5s
    } else {
      alert("Invalid username or password!");
    }
  };

  function checkESP32Status() {
    const statusRef = ref(db, "/status/lastSeen");
    onValue(statusRef, (snapshot) => {
      const lastSeen = snapshot.val();
      const now = Date.now();
      const timeDiff = now - lastSeen;
      const statusDiv = document.getElementById("esp32Status");

      if (lastSeen && timeDiff < 10000) {
        statusDiv.textContent = "✅ ESP32 is ONLINE";
        statusDiv.className = "notification online";
        statusDiv.style.display = "block";
      } else {
        statusDiv.textContent = "❌ ESP32 is OFFLINE";
        statusDiv.className = "notification offline";
        statusDiv.style.display = "block";
      }
    });
  }
</script>
