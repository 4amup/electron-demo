const { app, BrowserWindow, Menu, Tray, globalShortcut, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

// 托盘对象
let tray = null
let sheet = null
let jsonfile = path.join(__dirname, './db.json')
let json = JSON.parse(fs.readFileSync(jsonfile))

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: './resources/icons/sheet.ico',
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

// 快捷键按键-绑定函数
function showSheet() {
  // 获取当前活动窗口运行的程序名称
  let processName = "chrome"

  // 映射获取当前程序对象的快捷键列表数据
  let data = json.filter(item => {
    return item.name == processName
  })
  let send = data[0].keys
  // 快捷键数据表传送至showkeys主页 
  sheet.webContents.send('main-process-messages', send);

  // 根据当前窗口状态显示或隐藏showkeys页面
  if (sheet.isVisible()) {
    sheet.hide()
  } else {
    // 显示窗口，却不聚焦
    sheet.showInactive()
  }

  // 打印showkeys页面状态
  let result = sheet.isVisible() ? "open" : "colse"
  console.log("CommandOrControl+X is pressed, sheet page is " + result)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// 注册快捷键
app.on('ready', () => {
  // const ret = globalShortcut.register('CommandOrControl+X', showSheet)
  const ret = globalShortcut.register('Alt+X', showSheet)

  // 检查快捷键是否注册成功
  console.log("快捷键是否注册成功？" + globalShortcut.isRegistered('Alt+X'))

  // 创建showkeys页面
  sheet = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    center: true,
    show: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      // devTools: true //关闭调试工具
    },
    icon: './resources/icons/sheet.ico'
  })
  sheet.loadFile('sheet.html')
  // 打开开发者工具
  // sheet.webContents.openDevTools()
  console.log("sheet page创建成功！")
})

// app.on('accessibility-support-changed')

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

// 进程间通信测试
ipcMain.on('asynchronous-message', (event, arg) => {
  let json = path.join(__dirname, './db.json')
  let data = json.ShowKeys
  event.sender.send('asynchronous-reply', data)
})