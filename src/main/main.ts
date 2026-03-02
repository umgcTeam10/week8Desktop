import { app, BrowserWindow, Menu, Rectangle } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

const isMac = process.platform === 'darwin';
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;
const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;
const WINDOW_STATE_FILE = 'window-state.json';

type StoredWindowState = Partial<Rectangle> & { isMaximized?: boolean };

let mainWindow: BrowserWindow | null = null;
let persistTimer: NodeJS.Timeout | null = null;

function toFiniteNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function getWindowStatePath(): string {
  return path.join(app.getPath('userData'), WINDOW_STATE_FILE);
}

function readWindowState(): StoredWindowState {
  try {
    const file = fs.readFileSync(getWindowStatePath(), 'utf8');
    const parsed: unknown = JSON.parse(file);
    if (!parsed || typeof parsed !== 'object') return {};

    const state = parsed as Record<string, unknown>;
    return {
      x: toFiniteNumber(state.x),
      y: toFiniteNumber(state.y),
      width: toFiniteNumber(state.width),
      height: toFiniteNumber(state.height),
      isMaximized: state.isMaximized === true,
    };
  } catch {
    return {};
  }
}

function writeWindowState(window: BrowserWindow): void {
  if (window.isDestroyed()) return;

  try {
    const bounds = window.getBounds();
    const state: StoredWindowState = {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      isMaximized: window.isMaximized(),
    };
    fs.writeFileSync(getWindowStatePath(), JSON.stringify(state), 'utf8');
  } catch {
    // Ignore persistence errors and continue running.
  }
}

function scheduleWindowStateWrite(window: BrowserWindow): void {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => writeWindowState(window), 200);
}

export function createWindow(): void {
  const state = readWindowState();
  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width ?? DEFAULT_WIDTH,
    height: state.height ?? DEFAULT_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  if (state.isMaximized) mainWindow.maximize();

  const htmlPath = path.join(__dirname, '../../build/index.html');
  mainWindow.loadFile(htmlPath);
  mainWindow.once('ready-to-show', () => mainWindow?.show());

  mainWindow.on('move', () => {
    if (mainWindow) scheduleWindowStateWrite(mainWindow);
  });
  mainWindow.on('resize', () => {
    if (mainWindow) scheduleWindowStateWrite(mainWindow);
  });
  mainWindow.on('close', () => {
    if (mainWindow) writeWindowState(mainWindow);
  });
  mainWindow.on('closed', () => {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = null;
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

export function createMenu(): void {
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

export function initializeApp(): void {
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
}

if (!process.env.JEST_WORKER_ID) {
  initializeApp();
}
