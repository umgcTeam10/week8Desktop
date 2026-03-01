import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { LeftPanelWelcome } from '../components/LeftPanelWelcome';
import { CaregiverIcon, CareRecipientIcon, InfoIcon } from '../components/AuthIcons';

/**
 * Design 2.1: Welcome and Choose Your Role (Step 1 of 2).
 */
export function RoleSelectionScreen() {
  const { selectedRole, setSelectedRole, setAuthPhase } = useDesktop();

  const handleContinue = () => {
    if (selectedRole) setAuthPhase('signin');
  };

  const handleRoleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!selectedRole || selectedRole === 'caregiver') setSelectedRole('care-recipient');
      else setSelectedRole('caregiver');
    }
    if (event.key === 'Enter' && selectedRole) {
      event.preventDefault();
      setAuthPhase('signin');
    }
  };

  return (
    <div className="layout-two-panel layout-auth">
      <LeftPanelWelcome />
      <div className="panel-main panel-auth">
        <p className="step-indicator" aria-live="polite">
          <span className="step-indicator-dot" aria-hidden="true">1</span>
          Step 1 of 2
        </p>
        <h2 id="role-heading">Choose Your Role</h2>
        <p className="panel-subtitle">
          This helps us show you the most relevant information and features for your needs.
        </p>
        <div
          className="role-cards"
          role="radiogroup"
          aria-labelledby="role-heading"
          aria-describedby="role-desc"
          onKeyDown={handleRoleKeyDown}
        >
          <div id="role-desc" className="sr-only">
            Use Up arrow and Down arrow keys to switch roles, then press Enter to continue.
          </div>
          <label className={`role-card ${selectedRole === 'caregiver' ? 'role-card-selected' : ''}`}>
            <input
              type="radio"
              name="role"
              value="caregiver"
              checked={selectedRole === 'caregiver'}
              onChange={() => setSelectedRole('caregiver')}
              className="role-card-input"
              aria-label="I'm a Caregiver"
            />
            <span className="role-card-icon" aria-hidden="true">
              <CaregiverIcon className="role-card-icon-svg" />
            </span>
            <span className="role-card-content">
              <strong>I&apos;m a Caregiver</strong>
              <p>You help someone manage their healthcare, appointments, or daily care needs.</p>
              <ul>
                <li>Manage appointments and medications for your care recipient</li>
                <li>Communicate with their care team on their behalf</li>
              </ul>
            </span>
          </label>
          <label className={`role-card ${selectedRole === 'care-recipient' ? 'role-card-selected' : ''}`}>
            <input
              type="radio"
              name="role"
              value="care-recipient"
              checked={selectedRole === 'care-recipient'}
              onChange={() => setSelectedRole('care-recipient')}
              className="role-card-input"
              aria-label="I'm a Care Recipient"
            />
            <span className="role-card-icon" aria-hidden="true">
              <CareRecipientIcon className="role-card-icon-svg" />
            </span>
            <span className="role-card-content">
              <strong>I&apos;m a Care Recipient</strong>
              <p>You&apos;re managing your own healthcare and may receive support from caregivers.</p>
              <ul>
                <li>View your appointments, test results, and medications</li>
                <li>Message your care team and manage your health records</li>
              </ul>
            </span>
          </label>
        </div>
        <p className="role-help-link-wrap">
          <button type="button" className="link-button role-help-link">
            <InfoIcon className="role-help-icon" />
            Not sure which one?
          </button>
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={handleContinue}
          disabled={!selectedRole}
          aria-disabled={!selectedRole}
        >
          Continue →
        </button>
        <p className="next-hint">Next: Sign in to your account</p>
        <p className="keyboard-tip" role="status">
          <strong>Keyboard tip:</strong> Use <kbd>Up</kbd> <kbd>Down</kbd> arrow keys to switch roles, then press
          {' '}
          <kbd>Enter</kbd>
          {' '}
          to continue.
        </p>
      </div>
    </div>
  );
}
