import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Screen = 'dashboard' | 'health-logs' | 'messages' | 'calendar' | 'tasks' | 'profile' | 'new-log' | 'search';

export type AuthPhase = 'role' | 'signin' | 'authenticated';
export type Role = 'caregiver' | 'care-recipient';

interface DesktopState {
  authPhase: AuthPhase;
  selectedRole: Role | null;
  screen: Screen;
  highContrast: boolean;
  zoom: number;
  modal: 'keyboard-shortcuts' | 'sos-confirm' | 'new-log' | null;
  setAuthPhase: (p: AuthPhase) => void;
  setSelectedRole: (r: Role | null) => void;
  setScreen: (s: Screen) => void;
  setHighContrast: (v: boolean) => void;
  setZoom: (z: number) => void;
  openModal: (m: 'keyboard-shortcuts' | 'sos-confirm' | 'new-log') => void;
  closeModal: () => void;
  error: string | null;
  setError: (e: string | null) => void;
}

const DesktopContext = createContext<DesktopState | null>(null);

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.25;

export function DesktopProvider({ children }: { children: React.ReactNode }) {
  const [authPhase, setAuthPhase] = useState<AuthPhase>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [highContrast, setHighContrast] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [modal, setModalState] = useState<'keyboard-shortcuts' | 'sos-confirm' | 'new-log' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.setProperty('zoom', String(zoom));
    document.documentElement.style.setProperty('--zoom', String(zoom));
    if (zoom > 1) document.body.classList.add('zoom-stacked-layout');
    else document.body.classList.remove('zoom-stacked-layout');
  }, [zoom]);

  useEffect(() => {
    if (highContrast) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
  }, [highContrast]);

  const openModal = useCallback((m: 'keyboard-shortcuts' | 'sos-confirm' | 'new-log') => setModalState(m), []);
  const closeModal = useCallback(() => setModalState(null), []);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP)), []);
  const zoomReset = useCallback(() => setZoom(1), []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.electronAPI) return;
    const unsubscribers = [
      window.electronAPI.onMenuZoomIn(zoomIn),
      window.electronAPI.onMenuZoomOut(zoomOut),
      window.electronAPI.onMenuZoomReset(zoomReset),
      window.electronAPI.onMenuToggleHighContrast(() => setHighContrast((h) => !h)),
      window.electronAPI.onMenuKeyboardShortcuts(() => openModal('keyboard-shortcuts')),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => {
        if (typeof unsubscribe === 'function') unsubscribe();
      });
    };
  }, [zoomIn, zoomOut, zoomReset, openModal]);

  const value: DesktopState = {
    authPhase,
    selectedRole,
    screen,
    highContrast,
    zoom,
    modal,
    setAuthPhase,
    setSelectedRole,
    setScreen,
    setHighContrast,
    setZoom,
    openModal,
    closeModal,
    error,
    setError,
  };

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktop must be used within DesktopProvider');
  return ctx;
}
