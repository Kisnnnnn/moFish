const Store = require('electron-store');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const isDev = process.env.NODE_ENV === 'development';
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

// store
const option = {
  name: 'config', //文件名称,默认 config
  fileExtension: 'json', //文件后缀,默认json
  cwd: app.getPath('userData'), //文件位置,尽量不要动，默认情况下，它将通过遵循系统约定来选择最佳位置。C:\Users\xxx\AppData\Roaming\test\config.json
  clearInvalidConfig: true, // 发生 SyntaxError  则清空配置,
};

const store = new Store(option);

function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs
      contextIsolation: false,
    },
  });
  // 加载应用----适用于 react 项目
  if (isDev) {
    mainWindow.loadURL('http://localhost:8000/');
  } else {
    Menu.setApplicationMenu(null);
    // 打开开发者工具，默认不打开
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile(`${__dirname}/index.html`);
  }

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

// 监听打开新的页面
ipcMain.on('openBlankUrl', function (event, url) {
  let exec = require('child_process').exec;
  switch (process.platform) {
    case 'darwin':
      exec('open ' + url);
      break;
    case 'win32':
      exec('start ' + url);
      break;
    default:
      exec('xdg-open', [url]);
  }
});

ipcMain.handle('setVal', (e, key, val) => {
  return store.set(key, val);
});

ipcMain.handle('getVal', (e, key, defaultVal) => {
  return store.get(key, defaultVal);
});

ipcMain.handle('clearVal', (e) => {
  return store.clear();
});

ipcMain.handle('delVal', (e, key) => {
  return store.delete(key);
});

ipcMain.handle('hasVal', (e, key) => {
  return store.hasVal(key);
});
