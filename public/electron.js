const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 768+35 + (isDev?15:0)
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
    if(!isDev) {
        mainWindow.setMenu(null);
    }
    mainWindow.setResizable(false);
}
app.on('ready', createWindow);
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});