const { app, BrowserWindow, dialog } = require('electron');
const WebSocket = require('ws');
const path = require('path');
const { ipcMain } = require('electron');

ipcMain.on("music-pause", () => {
  if (ws && ws.readyState === ws.OPEN) {
    ws.send("pause");
  }
});

ipcMain.on("music-next", () => {
  if (ws && ws.readyState === ws.OPEN) {
    ws.send("next");
  }
});

ipcMain.on("music-previous", () => {
  if (ws && ws.readyState === ws.OPEN) {
    ws.send("previous");
  }
});

let artist = "";
let title = "";

const ws = new WebSocket("ws://localhost:8083/");

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 220,
    frame: false,
    icon: "assets/icon.png",
    roundedCorners: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    },
  });

  win.loadFile("public/index.html");
  win.setAlwaysOnTop(true);

  ws.on('message', msg => {
    const data = JSON.parse(msg.toString());

    artist = data.artist;
    title = data.title;
    isPlaying = data.isPlaying;
    thumbnail = data.thumbnail;
    timeremaining = data.timeremaining;
    duration = data.duration;

    win.webContents.send("now-playing", { artist, title, isPlaying, thumbnail, timeremaining, duration });

  });
}

app.whenReady().then(createWindow);
