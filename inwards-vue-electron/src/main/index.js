
// 'use strict';
import { app, BrowserWindow, Menu, MenuItem, ipcMain, dialog  } from 'electron';
const fs = require('fs');
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
      label: 'Verified Discharge',
      click: () => realTime('home')
    },
    {
      type: 'separator'
    },
    {
      label: 'Kruger National Park (KNP) TPC Dashboard',
      click: () => realTime('knpDash')
    },
    {
      type: 'separator'
    },
    {
      label: 'IUCMA Operational Dashboard',
      click: () => realTime('iucmaDash')
    },
    {
      type: 'separator'
    },
    {
      label: 'Water Quality Dashboard',
      click: () => realTime('wqDash')
    },
    {
      type: 'separator'
    },
    {
      label: 'Fish Dashboard',
      click: () => realTime('fishDash')
    },
    {
      type: 'separator'
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
      label: 'Admin Dashboard',
      click: () => realTime('adminDash')
    },
    {
      label: 'Reset Application',
      click: () => realTime('reset')
    }
  ]
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
      })
    Menu.setApplicationMenu(menu);
    if (isDev) {
      mainWindow.loadURL('http://localhost:9080')
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    } else {
      mainWindow.loadFile(`${__dirname}/index.html`)
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
        mainWindow.webContents.openDevTools({ mode: 'right' });
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

/* autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available')
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded')
})
 */
/* ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})
ipcMain.handle('get-user-data-path', () => {
  return app.getPath('userData')
})
ipcMain.handle('get-app-path', () => {
  return app.getPath('userData')
})
ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(null, options)
  return result
})
ipcMain.handle('open-dialog', async (event, options) => {
  const result = await dialog.showOpenDialog(options)
  return result
})
ipcMain.handle('get-app-data-path', async () => {
  return app.getPath('userData')
}) */
