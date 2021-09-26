'use strict';

import { app, BrowserWindow, Menu, MenuItem } from 'electron';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
app.commandLine.appendSwitch('auto-detect', 'false');
app.commandLine.appendSwitch('no-proxy-server');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
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
      type: 'checkbox',
      checked: true,
      click: () => realTime('unverified')
    },
    {
      type: 'separator'
    },
    {
      label: 'Verified Discharge',
      type: 'checkbox',
      checked: true,
      click: () => realTime('home')
    },
    {
      type: 'separator'
    },
    {
      label: 'Kruger National Park (KNP) TPC Dashboard',
      type: 'checkbox',
      checked: true,
      click: () => realTime('knpDash')
    },
    {
      type: 'separator'
    },
    {
      label: 'IUCMA Operational Dashboard',
      type: 'checkbox',
      checked: true,
      click: () => realTime('iucmaDash')
    },
    {
      type: 'separator'
    },
    {
      label: 'Water Quality Dashboard',
      type: 'checkbox',
      checked: true,
      click: () => realTime('wqDash')
    },
    {
      type: 'separator'
    },
    {
      label: 'Fish Dashboard',
      type: 'checkbox',
      checked: true,
      click: () => realTime('fishDash')
    },
    {
      type: 'separator'
    }
  ]
}));
menu.append(new MenuItem({
  label: 'Your Dashboard',
  type: 'checkbox',
  click: () => realTime('userDash')
}));
menu.append(new MenuItem({
  label: 'Options',
  submenu: [
    {
      label: 'Reset Application',
      type: 'checkbox',
      checked: true,
      click: () => realTime('reset')
    }]
}));
let mainWindow;
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    setFullScreen: true,
    useContentSize: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  mainWindow.loadURL(winURL);
  mainWindow.maximize();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  Menu.setApplicationMenu(menu);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    Menu.setApplicationMenu(menu);
    createWindow();
  }
});
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
