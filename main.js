/* eslint-disable no-undef */
import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(process.cwd(), "preload.js"), // إذا كنت بحاجة إلى ملف preload
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadFile("index.html"); // تحميل ملف index.html
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
