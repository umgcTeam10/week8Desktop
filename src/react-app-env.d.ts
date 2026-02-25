/// <reference types="react-scripts" />

declare global {
  interface Window {
    electronAPI?: {
      onMenuZoomIn: (cb: () => void) => void;
      onMenuZoomOut: (cb: () => void) => void;
      onMenuZoomReset: (cb: () => void) => void;
      onMenuToggleHighContrast: (cb: () => void) => void;
      onMenuKeyboardShortcuts: (cb: () => void) => void;
    };
  }
}

export {};
