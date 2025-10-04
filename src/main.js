const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { SerialPort } = require('serialport');
const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');

// 保持对窗口对象的全局引用
let mainWindow;
let localServer;

// 获取 MIME 类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.bin': 'application/octet-stream'
  };
  return mimeTypes[ext] || 'text/plain';
}

// 创建本地HTTP服务器
function createLocalServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      // 解析URL
      const parsedUrl = url.parse(req.url);
      let pathname = parsedUrl.pathname;
      
      // 默认路径
      if (pathname === '/') {
        pathname = '/robflash.htm';
      }
      
      // 构建文件路径
      const filePath = path.join(__dirname, '..', pathname.substring(1));
      
      // 检查文件是否存在
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // 文件不存在
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
          return;
        }
        
        // 读取文件
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal server error');
            return;
          }
          
          // 设置响应头
          const mimeType = getMimeType(filePath);
          res.writeHead(200, { 
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          });
          res.end(data);
        });
      });
    });
    
    // 监听端口
    server.listen(51097, 'localhost', () => {
      console.log('本地服务器已启动: http://localhost:51097');
      resolve(server);
    });
    
    server.on('error', (err) => {
      console.error('服务器启动失败:', err);
      reject(err);
    });
  });
}

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
      webSecurity: false,  // 需要禁用以支持 Web Serial API
      experimentalFeatures: true,  // 启用实验性功能包括 Web Serial API
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    show: false
  });

  // 处理权限请求 - 这是关键！
  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    console.log('Permission request:', permission);
    if (permission === 'serial') {
      // 自动允许串口权限
      callback(true);
    } else {
      callback(false);
    }
  });

  // 处理权限检查
  mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    console.log('Permission check:', permission, requestingOrigin);
    if (permission === 'serial') {
      return true;
    }
    return false;
  });

  // 通过本地服务器加载应用
  mainWindow.loadURL('http://localhost:51097/');

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

// 启用 Web Serial API 支持 - 需要这些关键的命令行开关
app.commandLine.appendSwitch('enable-experimental-web-platform-features');
app.commandLine.appendSwitch('enable-web-serial');
app.commandLine.appendSwitch('enable-serial-chooser');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors'); // 禁用某些CORS限制

// 设置用户代理以避免某些检测
app.setName('RM-01 robOS Flasher');

// Electron初始化完成后启动服务器和创建窗口
app.whenReady().then(async () => {
  try {
    // 先启动本地服务器
    localServer = await createLocalServer();
    // 然后创建窗口
    createWindow();
  } catch (error) {
    console.error('应用启动失败:', error);
    app.quit();
  }
});

// macOS上当所有窗口都被关闭时不退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // 关闭本地服务器
    if (localServer) {
      localServer.close();
    }
    app.quit();
  }
});

// 应用即将退出时关闭服务器
app.on('before-quit', () => {
  if (localServer) {
    localServer.close();
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