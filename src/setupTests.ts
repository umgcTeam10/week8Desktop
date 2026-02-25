import '@testing-library/jest-dom';

Object.defineProperty(window, 'electronAPI', {
  value: {
    onMenuZoomIn: jest.fn(),
    onMenuZoomOut: jest.fn(),
    onMenuZoomReset: jest.fn(),
    onMenuToggleHighContrast: jest.fn(),
    onMenuKeyboardShortcuts: jest.fn(),
  },
  writable: true,
});
