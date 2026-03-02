jest.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn(),
  },
  ipcRenderer: {
    on: jest.fn(),
    removeListener: jest.fn(),
  },
}));

describe('preload IPC bridge', () => {
  let api: Record<string, (cb: () => void) => void>;
  let exposeInMainWorldMock: jest.Mock;
  let ipcOnMock: jest.Mock;
  let ipcRemoveListenerMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.isolateModules(() => {
      require('./preload');
      const { contextBridge, ipcRenderer } = require('electron');
      exposeInMainWorldMock = contextBridge.exposeInMainWorld as jest.Mock;
      ipcOnMock = ipcRenderer.on as jest.Mock;
      ipcRemoveListenerMock = ipcRenderer.removeListener as jest.Mock;
      const [, exposedApi] = exposeInMainWorldMock.mock.calls[0];
      api = exposedApi;
    });
  });

  it('exposes electronAPI with expected menu listeners', () => {
    expect(exposeInMainWorldMock).toHaveBeenCalledTimes(1);
    const [apiName, exposedApi] = exposeInMainWorldMock.mock.calls[0];
    expect(apiName).toBe('electronAPI');
    expect(exposedApi).toMatchObject({
      onMenuZoomIn: expect.any(Function),
      onMenuZoomOut: expect.any(Function),
      onMenuZoomReset: expect.any(Function),
      onMenuToggleHighContrast: expect.any(Function),
      onMenuKeyboardShortcuts: expect.any(Function),
    });
  });

  it.each([
    ['onMenuZoomIn', 'menu-zoom-in'],
    ['onMenuZoomOut', 'menu-zoom-out'],
    ['onMenuZoomReset', 'menu-zoom-reset'],
    ['onMenuToggleHighContrast', 'menu-toggle-high-contrast'],
    ['onMenuKeyboardShortcuts', 'menu-keyboard-shortcuts'],
  ] as const)('%s wires callback to %s', (apiMethod, channel) => {
    const cb = jest.fn();

    const unsubscribe = api[apiMethod](cb);

    expect(ipcOnMock).toHaveBeenCalledWith(channel, expect.any(Function));
    const handler = ipcOnMock.mock.calls[0][1] as () => void;
    handler();
    expect(cb).toHaveBeenCalledTimes(1);

    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
    expect(ipcRemoveListenerMock).toHaveBeenCalledWith(channel, handler);
  });
});
