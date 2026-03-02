/// <reference types="react-scripts" />

declare global {
  interface Window {
    electronAPI?: {
      onMenuZoomIn: (cb: () => void) => void | (() => void);
      onMenuZoomOut: (cb: () => void) => void | (() => void);
      onMenuZoomReset: (cb: () => void) => void | (() => void);
      onMenuToggleHighContrast: (cb: () => void) => void | (() => void);
      onMenuKeyboardShortcuts: (cb: () => void) => void | (() => void);
    };
  }
}

export {};
