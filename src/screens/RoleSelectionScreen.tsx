import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { LeftPanelWelcome } from '../components/LeftPanelWelcome';

/**
 * Design 2.1: Welcome and Choose Your Role (Step 1 of 2).
 */
export function RoleSelectionScreen() {
  const { selectedRole, setSelectedRole, setAuthPhase } = useDesktop();

  const handleContinue = () => {
    if (selectedRole) setAuthPhase('signin');
  };

  return (
    <div className="layout-two-panel layout-auth">
      <LeftPanelWelcome />
      <div className="panel-main panel-auth">
        <p className="step-indicator" aria-live="polite">Step 1 of 2</p>
        <h2 id="role-heading">Choose Your Role</h2>
        <p className="panel-subtitle">
          This helps us show you the most relevant information and features for your needs.
        </p>
        <div
          className="role-cards"
          role="radiogroup"
          aria-labelledby="role-heading"
          aria-describedby="role-desc"
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
            <span className="role-card-icon" aria-hidden="true">👥</span>
            <strong>I&apos;m a Caregiver</strong>
            <p>You help someone manage their healthcare, appointments, or daily care needs.</p>
            <ul>
              <li>Manage appointments and medications for your care recipient</li>
              <li>Communicate with their care team on their behalf</li>
            </ul>
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
            <span className="role-card-icon" aria-hidden="true">👤</span>
            <strong>I&apos;m a Care Recipient</strong>
            <p>You&apos;re managing your own healthcare and may receive support from caregivers.</p>
            <ul>
              <li>View your appointments, test results, and medications</li>
              <li>Message your care team and manage your health records</li>
            </ul>
          </label>
        </div>
        <p><button type="button" className="link-button">Not sure which one?</button></p>
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
          Keyboard tip: Use Up arrow and Down arrow keys to switch roles, then press Enter to continue.
        </p>
      </div>
    </div>
  );
}
