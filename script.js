function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "Aayush" && password === "Aayush@1982") {
    window.location.href = "home.html";
  } else {
    document.getElementById("error-message").innerText = "Invalid username or password!";
  }
}
