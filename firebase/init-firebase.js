const axios = require("axios");
const { remote } = require("electron");

const backdrop = document.querySelector("#backdrop");
const loader = document.querySelector("#loader");

const alertsuccess = document.querySelector("#alert-success");

let win = remote.getCurrentWindow();

let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");



async function register() {
  console.log("Google Register");
  showLoader();
  axios
    .post(
      "http://localhost:3000/register",
      {
        email: emailInput.value,
        password: passwordInput.value,
      },
      {
        adapter: require("axios/lib/adapters/http"),
      }
    )
    .then((response) => {
      console.log(response);
      hideLoader();

      win.loadFile("login.html");
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
    });
}

async function login() {
    console.log("Google login");
    showLoader();
    axios
      .post(
        "http://localhost:3000/login",
        {
          email: emailInput.value,
          password: passwordInput.value,
        },
        {
          adapter: require("axios/lib/adapters/http"),
        }
      )
      .then((response) => {
        console.log(response);
        hideLoader();
  
        win.loadFile("select-apps.html");
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
      });
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
