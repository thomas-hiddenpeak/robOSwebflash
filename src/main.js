const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { SerialPort } = require('serialport');
const path = require('path');

// 保持对窗口对象的全局引用
let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,  // 允许访问本地文件和Web APIs
      experimentalFeatures: true,  // 启用实验性功能
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    show: false
  });

  // 加载应用的HTML文件
  mainWindow.loadFile('robflash.htm');

  // 当窗口准备好时显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 当窗口被关闭时触发
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 开发模式下打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// 启用 Web Serial API 支持
app.commandLine.appendSwitch('enable-experimental-web-platform-features');
app.commandLine.appendSwitch('enable-web-serial');

// Electron初始化完成后创建窗口
app.whenReady().then(createWindow);

// macOS上当所有窗口都被关闭时不退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 串口API处理
ipcMain.handle('get-serial-ports', async () => {
  try {
    const ports = await SerialPort.list();
    return ports;
  } catch (error) {
    throw error;
  }
});

ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});