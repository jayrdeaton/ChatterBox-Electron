const electron = require('electron'),
  { app, BrowserWindow, ipcMain } = electron,
  path = require('path'),
  isDev = require('electron-is-dev'),
  Store = require('electron-store'),
  store = new Store(),
  internalIp = require('internal-ip'),
  server = require('./server')

let mainWindow
let listening_port = null
const ip = internalIp.v4.sync()

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: store.get('width') || 900,
    height: store.get('height') || 680,
    x: store.get('x'),
    y: store.get('y'),
    show: false,
    // required for ipcRenderer to work
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  })
  ipcMain.on('init', (e) => {
    e.reply('status', listening_port, ip)
  })
  ipcMain.on('start_server', (e, port) => {
    server.listen(port)
    listening_port = port
    e.reply('status', port, ip)
  })
  ipcMain.on('stop_server', (e) => {
    server.close()
    listening_port = null
  })
  mainWindow.once('ready-to-show', mainWindow.show)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)
  mainWindow.on('resize', (e) => {
    const { width, height } = mainWindow.getBounds()
    store.set('width', width)
    store.set('height', height)
  })
  mainWindow.on('move', (e) => {
    const { x, y } = mainWindow.getBounds()
    store.set('x', x)
    store.set('y', y)
  })
}
app.on('ready', () => {
  createMainWindow()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (mainWindow === null) createMainWindow()
})
