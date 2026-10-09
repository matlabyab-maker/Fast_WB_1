const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('fastWB', {
  chooseFile: () => ipcRenderer.invoke('choose-file'),
  savePage: (url) => ipcRenderer.invoke('save-page', url),
  copyText: (text) => ipcRenderer.invoke('copy-text', text),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  downloadDir: () => ipcRenderer.invoke('download-dir')
});
