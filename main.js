// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const axios = require('axios');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, loginWindow, upclaveWindow;

ipcMain.on('upclaveWindow', (event, args) => {
  console.log(args.show);
  console.log(args.apps);
  // if(args.show === true){
  //   createUpclaveWindow();
  // }
})
ipcMain.on('loginWin', (event, args) => {
  console.log(args.show);
  if(args.show === true){
    createLoginWindow();
  }
})



ipcMain.on('register', (event, args) => {
  let email = args.email;
  let password = args.password;
console.log("Email: " + email);
console.log("Password: " + password);

axios.post("http://localhost:3000/register", {email: email, password: password, plan: "basic", isRechargeDone: false, isActive: false, isBlocked: false})
.then((response) => {
  console.log(response['data'].userId);
  event.reply('userId', response.userId);
  loginWindow.loadFile('login.html')



}).catch((err) => {
  console.log(err);
  event.reply('error', err);
})




})


ipcMain.on('login', (event, args) => {
  let email = args.email;
  let password = args.password;
console.log("Email: " + email);
console.log("Password: " + password);

axios.post("http://localhost:3000/login", {email: email, password: password})
.then((response) => {
  console.log(response['data'].userId);
  loginWindow.loadFile('select-apps.html')
  
  event.reply('userId', response.userId);
}).catch((err) => {
  console.log(err);
  event.reply('error', err);
})




})



function createUpclaveWindow(){
  upclaveWindow = new BrowserWindow({
    width: 1080, height: 1920,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
    },
   resizable: true
  })

  // Load index.html into the new BrowserWindow
  upclaveWindow.loadFile('upclave.html')

  // Open DevTools - Remove for PRODUCTION!
  upclaveWindow.webContents.openDevTools();

  // Listen for window being closed
  upclaveWindow.on('closed',  () => {
    upclaveWindow = null
  })
}
function createLoginWindow(){
  loginWindow = new BrowserWindow({
    width: 1200, height: 700,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
   resizable: false,

  })

  // Load index.html into the new BrowserWindow
  loginWindow.loadFile('select-apps.html')

  // Open DevTools - Remove for PRODUCTION!
  loginWindow.webContents.openDevTools();

  // Listen for window being closed
  loginWindow.on('closed',  () => {
    loginWindow = null
  })
}
// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800, height: 700,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
    resizable: false,
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createLoginWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
