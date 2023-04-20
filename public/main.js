const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  session,
  screen,
} = require('electron');
const isDev = process.env.NODE_ENV === 'development';
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
// 百度翻译窗口
let translateWin;
// 游戏窗口
let FCGameWin;
// 屏幕宽高度
let screenWidth = 0;
let screenHeight = 0;
function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs
      contextIsolation: false,
      nodeIntegrationInWorker: true,
    },
    show: false,
    backgroundColor: '#2e2c29',
  });
  // 加载应用----适用于 react 项目
  if (isDev) {
    mainWindow.loadURL('http://localhost:8000/');
  } else {
    Menu.setApplicationMenu(null);
    // 打开开发者工具，默认不打开
    // mainWindow.webContents.openDevTools();
    mainWindow.loadFile(`${__dirname}/index.html`);
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  screenWidth = width;
  screenHeight = height;
});

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

// 监听打开新的页面
ipcMain.on('openTranslateWindow', function (event, url) {
  if (translateWin) {
    return;
  }
  translateWin = new BrowserWindow({
    width: 390,
    height: 850,
    minHeight: 667,
    minWidth: 375,
    parent: mainWindow,
  });
  // translateWin.setAutoResize({ horizontal: true, vertical: true });
  translateWin.setBounds({ x: screenWidth - 30 - 390, y: 100 });
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  translateWin.loadURL(url);
  translateWin.on('close', () => {
    translateWin = null;
  });
});

// 打开FC窗口
ipcMain.on('openFCGameWindow', function (event, url) {
  if (FCGameWin) {
    return;
  }
  FCGameWin = new BrowserWindow({
    width: 375,
    height: 667,
    minHeight: 667,
    minWidth: 375,
    parent: mainWindow,
  });
  FCGameWin.setBounds({ x: screenWidth - 30 - 390, y: 100 });
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  if (isDev) {
    FCGameWin.loadURL(`http://localhost:8000/fcgame/index.html`);
  } else {
    FCGameWin.loadFile(`${__dirname}/fcgame/index.html`);
  }
  FCGameWin.on('close', () => {
    FCGameWin = null;
  });
});
