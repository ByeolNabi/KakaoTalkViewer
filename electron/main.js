import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as fs from 'fs';
import path from "path";
import isDev from "electron-is-dev";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: false,
      contextIsolation: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:5173" // Vite dev server default port
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

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

// IPC handler
ipcMain.handle("dialog:openFolder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled) {
    return null;
  } else {
    const selectedFolderPath = result.filePaths[0];
    const fileNames = fs.readdirSync(selectedFolderPath).map((fileName) => ({
      name: fileName,
      path: path.join(selectedFolderPath, fileName),
    }));
    return { folderPath: selectedFolderPath, fileNames };
  }
});
