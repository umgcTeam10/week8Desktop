import React, { useCallback, useEffect } from 'react';
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

function AppContent() {
  const { authPhase, screen, setScreen, modal, closeModal, openModal } = useDesktop();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (modal) {
        if (e.key === 'Escape') {
          closeModal();
          e.preventDefault();
        }
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
    [authPhase, modal, closeModal, openModal, setScreen]
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
