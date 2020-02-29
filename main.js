const { app, BrowserWindow, Menu, Tray, globalShortcut } = require('electron')
const path = require('path')
const spawn = require('child_process').spawn

// 托盘对象
let tray = null

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  tray = new Tray(path.join(__dirname, 'resources/icons/tray.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: '设置', type: 'normal' },
    { label: '意见反馈', type: 'normal' },
    { label: '帮助', type: 'normal' },
    { label: '设置', type: 'normal' },
    { label: '关于', type: 'normal' },
    { label: '退出', type: 'normal', click: () => { app.quit() } }
  ])
  tray.setToolTip('ShowKeys')
  tray.setContextMenu(contextMenu)
  // 单击托盘图标，显示主窗口
  tray.on("click", () => win.show())

  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)
app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
    let childProcess = spawn('./resources/cpp/getPid.exe');
    childProcess.stdout.on('data', (data) => { console.log(data.toString())});
  })
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。