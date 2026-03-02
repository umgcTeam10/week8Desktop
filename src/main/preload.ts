import { contextBridge, ipcRenderer } from 'electron';

function registerMenuListener(channel: string, cb: () => void): () => void {
  const listener = () => cb();
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.removeListener(channel, listener);
}

contextBridge.exposeInMainWorld('electronAPI', {
  onMenuZoomIn: (cb: () => void) => registerMenuListener('menu-zoom-in', cb),
  onMenuZoomOut: (cb: () => void) => registerMenuListener('menu-zoom-out', cb),
  onMenuZoomReset: (cb: () => void) => registerMenuListener('menu-zoom-reset', cb),
  onMenuToggleHighContrast: (cb: () => void) =>
    registerMenuListener('menu-toggle-high-contrast', cb),
  onMenuKeyboardShortcuts: (cb: () => void) =>
    registerMenuListener('menu-keyboard-shortcuts', cb),
});
