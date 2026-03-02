import React, { useCallback, useEffect, useRef } from 'react';
import { DesktopProvider, useDesktop } from './context/DesktopContext';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { AppSidebar } from './components/AppSidebar';
import { RoleSelectionScreen } from './screens/RoleSelectionScreen';
import { SignInScreen } from './screens/SignInScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { HealthLogsScreen } from './screens/HealthLogsScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { TasksScreen } from './screens/TasksScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SearchScreen } from './screens/SearchScreen';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { SOSConfirmModal } from './components/SOSConfirmModal';
import { NewLogModal } from './components/NewLogModal';
import './App.css';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function isTypingElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  if (target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return true;
  if (target.tagName !== 'INPUT') return false;

  const type = (target as HTMLInputElement).type.toLowerCase();
  const textEntryTypes = new Set([
    'text',
    'search',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'date',
    'datetime-local',
    'month',
    'time',
    'week',
  ]);
  return textEntryTypes.has(type);
}

function isSearchInput(target: EventTarget | null): target is HTMLInputElement {
  return target instanceof HTMLInputElement && target.type.toLowerCase() === 'search';
}

function isTextEntryControl(
  target: EventTarget | null
): target is HTMLInputElement | HTMLTextAreaElement {
  if (target instanceof HTMLTextAreaElement) return true;
  if (!(target instanceof HTMLInputElement)) return false;
  return isTypingElement(target);
}

function isAtHorizontalEdge(
  el: HTMLInputElement | HTMLTextAreaElement,
  key: 'ArrowLeft' | 'ArrowRight'
): boolean {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  if (start === null || end === null) return false;

  if (key === 'ArrowLeft') return start === 0 && end === 0;
  const valueLength = el.value.length;
  return start === valueLength && end === valueLength;
}

function getFocusableElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && el.getAttribute('aria-hidden') !== 'true';
  });
}

function AppContent() {
  const { authPhase, screen, setScreen, modal, closeModal, openModal } = useDesktop();
  const activeSearchInputRef = useRef<HTMLInputElement | null>(null);

  const moveFocusSequential = useCallback((delta: number) => {
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const currentIndex = active ? focusable.indexOf(active) : -1;
    const nextIndex =
      currentIndex < 0
        ? delta > 0
          ? 0
          : focusable.length - 1
        : (currentIndex + delta + focusable.length) % focusable.length;
    focusable[nextIndex]?.focus();
  }, []);

  const focusBoundary = useCallback((position: 'start' | 'end') => {
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    if (position === 'start') focusable[0]?.focus();
    else focusable[focusable.length - 1]?.focus();
  }, []);

  const handleDirectionalKeys = useCallback(
    (e: KeyboardEvent): boolean => {
      if (e.ctrlKey || e.metaKey || e.altKey) return false;
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          moveFocusSequential(1);
          e.preventDefault();
          return true;
        case 'ArrowUp':
        case 'ArrowLeft':
          moveFocusSequential(-1);
          e.preventDefault();
          return true;
        case 'Home':
          focusBoundary('start');
          e.preventDefault();
          return true;
        case 'End':
          focusBoundary('end');
          e.preventDefault();
          return true;
        default:
          return false;
      }
    },
    [moveFocusSequential, focusBoundary]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (activeSearchInputRef.current && document.activeElement !== activeSearchInputRef.current) {
        activeSearchInputRef.current = null;
      }
      if (modal) {
        if (e.key === 'Escape') {
          closeModal();
          e.preventDefault();
        }
        return;
      }

      if (isTextEntryControl(e.target)) {
        const textEntry = e.target;
        const searchEditing = isSearchInput(textEntry) && activeSearchInputRef.current === textEntry;

        if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          if (isAtHorizontalEdge(textEntry, e.key)) {
            moveFocusSequential(e.key === 'ArrowLeft' ? -1 : 1);
            e.preventDefault();
          }
          return;
        }

        if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
          moveFocusSequential(e.key === 'ArrowUp' ? -1 : 1);
          e.preventDefault();
          return;
        }

        if (isSearchInput(textEntry) && !searchEditing) {
          if (e.key === 'Enter' || e.key === ' ') {
            activeSearchInputRef.current = textEntry;
            e.preventDefault();
            return;
          }
          if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete')) {
            e.preventDefault();
            return;
          }
          return;
        }

        if (isSearchInput(textEntry) && searchEditing) {
          if (e.key === 'Escape') {
            activeSearchInputRef.current = null;
            textEntry.blur();
            e.preventDefault();
          }
          return;
        }

        return;
      }

      if (!isTypingElement(e.target) && handleDirectionalKeys(e)) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (!mod) return;
      switch (e.key.toLowerCase()) {
        case 'h':
          if (authPhase === 'authenticated') setScreen('health-logs');
          e.preventDefault();
          break;
        case 'm':
          if (authPhase === 'authenticated') setScreen('messages');
          e.preventDefault();
          break;
        case 'k':
          if (authPhase === 'authenticated') setScreen('calendar');
          e.preventDefault();
          break;
        case 'n':
          if (authPhase === 'authenticated') {
            openModal('new-log');
            e.preventDefault();
          }
          break;
        case 's':
          e.preventDefault();
          break;
        case 'f':
          if (authPhase === 'authenticated') setScreen('search');
          e.preventDefault();
          break;
        case ',':
          if (authPhase === 'authenticated') setScreen('profile');
          e.preventDefault();
          break;
        case 'e':
          if (e.shiftKey) {
            openModal('sos-confirm');
            e.preventDefault();
          }
          break;
        default:
          break;
      }
    },
    [authPhase, modal, closeModal, openModal, setScreen, handleDirectionalKeys, moveFocusSequential]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'health-logs':
        return <HealthLogsScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'search':
        return <SearchScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  if (authPhase === 'role') {
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <header className="app-title-bar" role="banner">
          <h1 className="app-title">CareConnect</h1>
        </header>
        <Toolbar />
        <main id="main-content" className="app-main" role="main" tabIndex={-1}>
          <RoleSelectionScreen />
        </main>
        <StatusBar />
        {modal === 'keyboard-shortcuts' && <KeyboardShortcutsModal />}
        {modal === 'sos-confirm' && <SOSConfirmModal />}
      </>
    );
  }

  if (authPhase === 'signin') {
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <header className="app-title-bar" role="banner">
          <h1 className="app-title">CareConnect</h1>
        </header>
        <Toolbar />
        <main id="main-content" className="app-main" role="main" tabIndex={-1}>
          <SignInScreen />
        </main>
        <StatusBar />
        {modal === 'keyboard-shortcuts' && <KeyboardShortcutsModal />}
        {modal === 'sos-confirm' && <SOSConfirmModal />}
      </>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="app-title-bar" role="banner">
        <h1 className="app-title">CareConnect</h1>
      </header>
      <Toolbar />
      <div className="app-authenticated">
        <AppSidebar />
        <main id="main-content" className="app-main" role="main" tabIndex={-1}>
          {renderScreen()}
        </main>
      </div>
      <StatusBar />
      {modal === 'keyboard-shortcuts' && <KeyboardShortcutsModal />}
      {modal === 'sos-confirm' && <SOSConfirmModal />}
      {modal === 'new-log' && <NewLogModal />}
    </>
  );
}

export default function App() {
  return (
    <DesktopProvider>
      <AppContent />
    </DesktopProvider>
  );
}
