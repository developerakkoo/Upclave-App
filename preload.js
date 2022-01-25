// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const {remote} = require('electron');
const fs = require('fs');

let mainwindow = remote.getCurrentWindow();

const backdrop = document.querySelector("#backdrop");
const loader = document.querySelector("#loader");

const alertsuccess = document.querySelector("#alert-success");

let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let registerBtn = document.getElementById("registerBtn");

const signupBtn = document.getElementById("signupBtn");

registerBtn.addEventListener("click", () => {
  console.log("Register successful");

  fs.writeFile('user.txt', emailInput.value, (err, data) => {
      if (err) throw err;
      console.log("SAved");
  });

});

async function register() {
  console.log("Google Register");
  try {
    showLoader();
    const reg = await axios.post("http://localhost:3000/register", {
      email: emailInput.value,
      password: passwordInput.value,
    });

    ipcRenderer.invoke("register", { show: true }).then((response) => {
      console.log("response: " + response);
    });
  } catch (error) {
    hideLoader();
  }
}

signupBtn.addEventListener("click", () => {
  console.log("show signup");
  remote.getCurrentWindow().loadFile("login.html");
});

function openLogin() {
  console.log("open login");
  win.loadFile("login.html");
}

function showAlertDialog() {
  alertsuccess.style.display = "block";
  alertsuccess.textContent = "You have succefully logged in";
}

function showLoader() {
  loader.style.display = "block";
  backdrop.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
  backdrop.style.display = "none";
}
