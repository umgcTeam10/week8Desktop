const mockLoadFile = jest.fn();
const mockOnce = jest.fn();
const mockOn = jest.fn();
const mockShow = jest.fn();
const mockMaximize = jest.fn();
const mockGetBounds = jest.fn();
const mockIsMaximized = jest.fn();
const mockIsDestroyed = jest.fn();
const mockSend = jest.fn();

const mockWindow = {
  loadFile: mockLoadFile,
  once: mockOnce,
  on: mockOn,
  show: mockShow,
  maximize: mockMaximize,
  getBounds: mockGetBounds,
  isMaximized: mockIsMaximized,
  isDestroyed: mockIsDestroyed,
  webContents: {
    send: mockSend,
  },
};

const mockBrowserWindowCtor = jest.fn(() => mockWindow);
const mockGetAllWindows = jest.fn();
(mockBrowserWindowCtor as unknown as { getAllWindows: jest.Mock }).getAllWindows = mockGetAllWindows;

const mockBuildFromTemplate = jest.fn(() => ({ id: 'menu' }));
const mockSetApplicationMenu = jest.fn();

const mockWhenReady = jest.fn(() => Promise.resolve());
const mockAppOn = jest.fn();
const mockAppQuit = jest.fn();
const mockAppGetPath = jest.fn(() => '/tmp');

jest.mock('electron', () => ({
  app: {
    name: 'CareConnect',
    whenReady: mockWhenReady,
    on: mockAppOn,
    quit: mockAppQuit,
    getPath: mockAppGetPath,
  },
  BrowserWindow: mockBrowserWindowCtor,
  Menu: {
    buildFromTemplate: mockBuildFromTemplate,
    setApplicationMenu: mockSetApplicationMenu,
  },
}));

const mockReadFileSync = jest.fn();
const mockWriteFileSync = jest.fn();

jest.mock('fs', () => ({
  readFileSync: mockReadFileSync,
  writeFileSync: mockWriteFileSync,
}));

describe('main process', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockGetBounds.mockReturnValue({ x: 5, y: 10, width: 1110, height: 740 });
    mockIsMaximized.mockReturnValue(false);
    mockIsDestroyed.mockReturnValue(false);
    mockReadFileSync.mockImplementation(() => {
      throw new Error('not found');
    });
  });

  it('creates BrowserWindow with secure defaults and restores saved state', async () => {
    mockReadFileSync.mockReturnValue(
      JSON.stringify({ x: 20, y: 30, width: 1280, height: 860, isMaximized: true }),
    );

    const { createWindow } = await import('./main');
    createWindow();

    expect(mockBrowserWindowCtor).toHaveBeenCalledTimes(1);
    expect(mockBrowserWindowCtor).toHaveBeenCalledWith(
      expect.objectContaining({
        x: 20,
        y: 30,
        width: 1280,
        height: 860,
        minWidth: 800,
        minHeight: 600,
        show: false,
        webPreferences: expect.objectContaining({
          nodeIntegration: false,
          contextIsolation: true,
          webSecurity: true,
          preload: expect.stringContaining('preload.js'),
        }),
      }),
    );
    expect(mockMaximize).toHaveBeenCalledTimes(1);
    expect(mockLoadFile).toHaveBeenCalledWith(expect.stringContaining('build/index.html'));
  });

  it('persists window state on close', async () => {
    const { createWindow } = await import('./main');
    createWindow();

    const closeHandler = mockOn.mock.calls.find(([event]) => event === 'close')?.[1] as
      | (() => void)
      | undefined;
    expect(closeHandler).toBeDefined();

    closeHandler?.();

    expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expect.stringContaining('window-state.json'),
      expect.stringContaining('"width":1110'),
      'utf8',
    );
  });

  it('builds a menu that dispatches view/help IPC events', async () => {
    const { createWindow, createMenu } = await import('./main');
    createWindow();
    createMenu();

    expect(mockBuildFromTemplate).toHaveBeenCalledTimes(1);
    const template = mockBuildFromTemplate.mock.calls[0][0];
    const viewMenu = template.find((item: { label: string }) => item.label === 'View');
    const helpMenu = template.find((item: { label: string }) => item.label === 'Help');

    const zoomIn = viewMenu.submenu.find((item: { label: string }) => item.label === 'Zoom In');
    const zoomOut = viewMenu.submenu.find((item: { label: string }) => item.label === 'Zoom Out');
    const zoomReset = viewMenu.submenu.find((item: { label: string }) => item.label === 'Reset Zoom');
    const highContrast = viewMenu.submenu.find(
      (item: { label: string }) => item.label === 'Toggle High Contrast',
    );
    const shortcuts = helpMenu.submenu.find(
      (item: { label: string }) => item.label === 'Keyboard Shortcuts',
    );

    zoomIn.click();
    zoomOut.click();
    zoomReset.click();
    highContrast.click();
    shortcuts.click();

    expect(mockSend).toHaveBeenCalledWith('menu-zoom-in');
    expect(mockSend).toHaveBeenCalledWith('menu-zoom-out');
    expect(mockSend).toHaveBeenCalledWith('menu-zoom-reset');
    expect(mockSend).toHaveBeenCalledWith('menu-toggle-high-contrast');
    expect(mockSend).toHaveBeenCalledWith('menu-keyboard-shortcuts');
    expect(mockSetApplicationMenu).toHaveBeenCalledTimes(1);
  });

  it('registers app lifecycle handlers', async () => {
    const { initializeApp } = await import('./main');
    mockGetAllWindows.mockReturnValue([]);

    initializeApp();
    await Promise.resolve();

    expect(mockWhenReady).toHaveBeenCalledTimes(1);
    expect(mockAppOn).toHaveBeenCalledWith('activate', expect.any(Function));
    expect(mockAppOn).toHaveBeenCalledWith('window-all-closed', expect.any(Function));

    const activateHandler = mockAppOn.mock.calls.find(([event]) => event === 'activate')?.[1] as
      | (() => void)
      | undefined;
    activateHandler?.();
    expect(mockBrowserWindowCtor).toHaveBeenCalled();

    const windowAllClosedHandler = mockAppOn.mock.calls.find(
      ([event]) => event === 'window-all-closed',
    )?.[1] as (() => void) | undefined;
    windowAllClosedHandler?.();
    expect(mockAppQuit).toHaveBeenCalledTimes(process.platform === 'darwin' ? 0 : 1);
  });
});
