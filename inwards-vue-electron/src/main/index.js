
// 'use strict';
import { app, BrowserWindow, Menu, MenuItem } from 'electron';
const path = require('path');
//import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar";
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');
//app.commandLine.appendSwitch('disable-site-isolation-trials')
//process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
//app.commandLine.appendSwitch('auto-detect', 'false');
//app.commandLine.appendSwitch('no-proxy-server');
require('@electron/remote/main').initialize()

setupTitlebar();
// set app name
app.name = "INWARDS"
// to hide deprecation message
app.allowRendererProcessReuse = true

// disable electron warning
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = false

const gotTheLock = app.requestSingleInstanceLock()
const isDev = process.env.NODE_ENV === 'development'
const isDebug = process.argv.includes('--debug')
let mainWindow
const menu = new Menu();
menu.append(new MenuItem({
  label: 'Home',
  click: () => realTime('home')
}));

menu.append(new MenuItem({
  label: 'Dashboards',
  submenu: [
    {
      label: 'Real-time Discharge',
      click: () => realTime('unverified')
    },
    {
      type: 'separator'
    },
    {
      label: 'uMhlathuze Dashboard',
      click: () => realTime('home')
    }
  ]
}));
menu.append(new MenuItem({
  label: 'Your Dashboard',
  click: () => realTime('userDash')
}));
menu.append(new MenuItem({
  label: 'Options',
  submenu: [
    {
      label: 'Reset Application',
      click: () => realTime('reset')
    }]
}));



// only allow single instance of application
if (!isDev) {
  if (gotTheLock) {
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow && mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    })
  } else {
    app.quit()
    process.exit(0)
  }
} else {
  // process.env.ELECTRON_ENABLE_LOGGING = true

  require('electron-debug')({
    showDevTools: false,
  })
}

async function installDevTools() {
  app.whenReady().then(() => {
    installExtension(VUEJS_DEVTOOLS, { loadExtensionOptions: { allowFileAccess: true } })
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

  })
}


function createWindow() {
  /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    width: 960,
    height: 540,
    minWidth: 960,
    minHeight: 540,
    setFullScreen: true,
    useContentSize: true,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      webSecurity: false,
    }
    //show: false
  })
  // eslint-disable-next-line
  //setupTitlebar();

  // load root file/url
  Menu.setApplicationMenu(menu);
  if (isDev) {
    mainWindow.loadURL('http://localhost:9080')
    attachTitlebarToWindow(mainWindow);
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  } else {
    mainWindow.loadFile(`${__dirname}/index.html`)
    attachTitlebarToWindow(mainWindow);
    global.__static = require('path')
      .join(__dirname, '/static')
      .replace(/\\/g, '\\\\')
  }
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })
  mainWindow.on('closed', () => {
    console.log('\nApplication exiting...')
  })
  mainWindow.maximize();
}

app.on('ready', () => {
  createWindow()
  if (isDev) {
    installDevTools()
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.once("devtools-opened", () => {
      });
      setTimeout(() => {
        mainWindow.webContents.openDevTools();
      }, 3000);
    });
  }
  if (isDebug) {
    setTimeout(() => {
      mainWindow.webContents.openDevTools();
    }, 3000);
  }
  if (!isDebug || !isDev){
    mainWindow.show()
    mainWindow.focus();
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
  if (mainWindow === null) {
    //Menu.setApplicationMenu(menu);
    createWindow()
  }
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function realTime (dash) {
  // mainWindow.webContents.send('goToKnpDashboard', 'Yay');
  mainWindow.webContents.executeJavaScript(`document.getElementById('` + dash + `').click();`);
}
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
