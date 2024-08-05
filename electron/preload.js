//import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFolderDialog: () => ipcRenderer.invoke("dialog:openFolder"),
});
