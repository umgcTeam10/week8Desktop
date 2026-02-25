import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  const htmlPath = path.join(__dirname, '../../build/index.html');
  mainWindow.loadFile(htmlPath);
  mainWindow.once('ready-to-show', () => mainWindow?.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function getEditMenu(): Electron.MenuItemConstructorOptions {
  return {
    label: 'Edit',
    submenu: [
      { role: 'copy' as const, label: 'Copy' },
      { role: 'paste' as const, label: 'Paste' },
      { role: 'selectAll' as const, label: 'Select All' },
    ],
  };
}

function getViewMenu(): Electron.MenuItemConstructorOptions {
  return {
    label: 'View',
    submenu: [
      {
        label: 'Zoom In',
        accelerator: 'CmdOrCtrl+Plus',
        click: () => mainWindow?.webContents.send('menu-zoom-in'),
      },
      {
        label: 'Zoom Out',
        accelerator: 'CmdOrCtrl+-',
        click: () => mainWindow?.webContents.send('menu-zoom-out'),
      },
      {
        label: 'Reset Zoom',
        accelerator: 'CmdOrCtrl+0',
        click: () => mainWindow?.webContents.send('menu-zoom-reset'),
      },
      { type: 'separator' },
      {
        label: 'Toggle High Contrast',
        accelerator: 'CmdOrCtrl+Shift+H',
        click: () => mainWindow?.webContents.send('menu-toggle-high-contrast'),
      },
    ],
  };
}

function getHelpMenu(): Electron.MenuItemConstructorOptions {
  return {
    label: 'Help',
    submenu: [
      {
        label: 'Keyboard Shortcuts',
        accelerator: 'CmdOrCtrl+/',
        click: () => mainWindow?.webContents.send('menu-keyboard-shortcuts'),
      },
    ],
  };
}

function createMenu(): void {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' as const } : { role: 'quit' as const },
        ...(isMac ? [] : [{ role: 'quit' as const, label: 'Exit' }]),
      ].filter(Boolean) as Electron.MenuItemConstructorOptions[],
    },
    getEditMenu(),
    getViewMenu(),
    getHelpMenu(),
  ];

  if (isMac) {
    template.unshift({
      label: app.name,
      submenu: [
        { role: 'about' as const },
        { type: 'separator' as const },
        { role: 'services' as const },
        { type: 'separator' as const },
        { role: 'hide' as const },
        { role: 'hideOthers' as const },
        { role: 'unhide' as const },
        { type: 'separator' as const },
        { role: 'quit' as const },
      ],
    });
    (template.find((t) => t.label === 'File') as Electron.MenuItemConstructorOptions).submenu = [
      { role: 'close' as const },
      { type: 'separator' as const },
      { role: 'quit' as const, label: 'Exit' },
    ];
  } else {
    (template.find((t) => t.label === 'File') as Electron.MenuItemConstructorOptions).submenu = [
      { role: 'quit' as const, label: 'Exit' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
