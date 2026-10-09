const { app, BrowserWindow, ipcMain, dialog, shell, clipboard, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 850, minWidth: 640, minHeight: 520,
    title: 'Fast_WB_1', backgroundColor: '#f1f2f4',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, webviewTag: true }
  });
  win.loadFile('index.html');
}
app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_wc, permission, callback) => {
    // Only grant standard browsing permissions when explicitly supported by Electron.
    callback(['media', 'geolocation', 'notifications'].includes(permission));
  });
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

ipcMain.handle('choose-file', async () => {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog(win, { properties: ['openFile', 'multiSelections'], filters: [{ name: 'All files', extensions: ['*'] }] });
  return result.canceled ? [] : result.filePaths;
});
ipcMain.handle('save-page', async (_event, url) => {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showSaveDialog(win, { defaultPath: 'webpage.html', filters: [{ name: 'HTML', extensions: ['html'] }] });
  if (!result.canceled && url) {
    try {
      const fs = require('fs');
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      fs.writeFileSync(result.filePath, await response.text(), 'utf8');
      return { ok: true, path: result.filePath };
    } catch (e) { return { ok: false, error: e.message }; }
  }
  return { ok: false, canceled: true };
});
ipcMain.handle('copy-text', (_event, text) => { clipboard.writeText(String(text || '')); return true; });
ipcMain.handle('open-external', (_event, url) => shell.openExternal(url));
ipcMain.handle('download-dir', () => app.getPath('downloads'));
