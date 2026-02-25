import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  onMenuZoomIn: (cb: () => void) => ipcRenderer.on('menu-zoom-in', () => cb()),
  onMenuZoomOut: (cb: () => void) => ipcRenderer.on('menu-zoom-out', () => cb()),
  onMenuZoomReset: (cb: () => void) => ipcRenderer.on('menu-zoom-reset', () => cb()),
  onMenuToggleHighContrast: (cb: () => void) =>
    ipcRenderer.on('menu-toggle-high-contrast', () => cb()),
  onMenuKeyboardShortcuts: (cb: () => void) =>
    ipcRenderer.on('menu-keyboard-shortcuts', () => cb()),
});
