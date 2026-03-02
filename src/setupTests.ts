import '@testing-library/jest-dom';

Object.defineProperty(window, 'electronAPI', {
  value: {
    onMenuZoomIn: jest.fn(() => jest.fn()),
    onMenuZoomOut: jest.fn(() => jest.fn()),
    onMenuZoomReset: jest.fn(() => jest.fn()),
    onMenuToggleHighContrast: jest.fn(() => jest.fn()),
    onMenuKeyboardShortcuts: jest.fn(() => jest.fn()),
  },
  writable: true,
});
