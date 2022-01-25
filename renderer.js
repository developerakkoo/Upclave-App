// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
const {remote} = require('electron');

let mainwindow = remote.getCurrentWindow();



const getStartedButton = document.getElementById('startButton');

const backdrop = document.querySelector("#backdrop");
const loader = document.querySelector("#loader");

const alertsuccess = document.querySelector("#alert-success");




let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let registerBtn = document.getElementById("registerBtn");

const signupBtn = document.getElementById("signupBtn");

registerBtn.addEventListener("click", () => {
  console.log("Register successful");
 
  ipcRenderer.send('register');


})

const setStatus = status => {
    // const statusNode = document.getElementById('status')
    // statusNode.innerText = status ? 'Online' : 'Offline'
    console.log("Network Status: " + status);
  }

  setStatus( navigator.onLine )

  window.addEventListener( 'online', e => {
    setStatus(true)
  })

  window.addEventListener( 'offline', e => {
    setStatus(false)
  })


getStartedButton.addEventListener('click', () => {
    ipcRenderer.send("loginWin", {show: true});
    console.log("loginWin opened");
    mainwindow.hide();
})