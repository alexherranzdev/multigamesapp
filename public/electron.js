const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    titleBarStyle: 'hidden',
    resizable: false,
    fullscreenable: true,
    maximizable: true,
    fullscreen: true,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const step = process.env.STEP || 'podium'

  mainWindow.loadURL('http://localhost:3000/' + step)

  // mainWindow.webContents.openDevTools({ mode: 'detach' })
  mainWindow.maximize()
  mainWindow.show()

  mainWindow.on('closed', () => (mainWindow = null))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
