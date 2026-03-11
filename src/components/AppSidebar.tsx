import React from 'react';
import { useDesktop, Screen } from '../context/DesktopContext';
import { HeartBadgeIcon } from './AuthIcons';
import { CalendarIcon, ClipboardIcon, HeartOutlineIcon, HomeIcon, MessageIcon, UserIcon } from './AppIcons';

const navItems: { key: Screen; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: HomeIcon },
  { key: 'health-logs', label: 'Health Logs', Icon: HeartOutlineIcon },
  { key: 'messages', label: 'Messages', Icon: MessageIcon },
  { key: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { key: 'tasks', label: 'Tasks', Icon: ClipboardIcon },
  { key: 'profile', label: 'Profile', Icon: UserIcon },
];

export function AppSidebar() {
  const { screen, setScreen } = useDesktop();

  return (
    <aside className="app-sidebar" aria-label="App sidebar">
      <div className="app-sidebar-brand">
        <HeartBadgeIcon className="app-sidebar-brand-icon" />
        <span>CareConnect</span>
      </div>
      <nav className="app-sidebar-nav" aria-label="Main navigation">
        {navItems.map(({ key, label, Icon }) => (
          <button
            type="button"
            key={key}
            className={screen === key ? 'active' : ''}
            onClick={() => setScreen(key)}
            aria-current={screen === key ? 'page' : undefined}
          >
            <span className="app-sidebar-nav-icon" aria-hidden="true">
              <Icon className="app-sidebar-nav-icon-svg" />
            </span>
            <span className="app-sidebar-nav-label">{label}</span>
            <span className="app-sidebar-nav-dot" aria-hidden="true" />
          </button>
        ))}
      </nav>
      <div className="app-sidebar-user">
        <span className="app-sidebar-user-avatar" aria-hidden="true">RP</span>
        <span className="app-sidebar-user-meta">
          <strong>Robert</strong>
          <span>Patient</span>
        </span>
      </div>
    </aside>
  );
}
