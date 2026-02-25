import React from 'react';

/**
 * Left panel for Welcome / Role Selection and Sign In (design 2.1, 2.2).
 * Branding, reassurance, and support resources.
 */
export function LeftPanelWelcome() {
  return (
    <aside className="panel-welcome" aria-label="CareConnect information and support">
      <div className="panel-welcome-branding">
        <span className="panel-welcome-logo" aria-hidden="true">♥</span>
        <h2 className="panel-welcome-title">CareConnect</h2>
        <p className="panel-welcome-subtitle">Patient Portal</p>
      </div>
      <p className="panel-welcome-heading">Welcome back</p>
      <p className="panel-welcome-text">
        Sign in to access your appointments, medications, test results, and care team messages.
        We&apos;re here to support you every step of the way.
      </p>
      <div className="panel-welcome-features">
        <div className="panel-welcome-feature">
          <span className="panel-welcome-feature-icon" aria-hidden="true">🛡</span>
          <strong>Secure & Private</strong>
          <p>Your health information is protected with bank-level encryption and HIPAA compliance.</p>
        </div>
        <div className="panel-welcome-feature">
          <span className="panel-welcome-feature-icon" aria-hidden="true">🕐</span>
          <strong>24/7 Access</strong>
          <p>View your health records, upcoming appointments, and messages anytime you need.</p>
        </div>
      </div>
      <div className="panel-welcome-help">
        <p className="panel-welcome-heading">Need help signing in?</p>
        <p><span aria-hidden="true">📞</span> <strong>Call Support</strong> 1-800-CARE-HELP — Available 24/7</p>
        <p><span aria-hidden="true">?</span> <strong>Help Center</strong> — View sign-in guides and FAQs</p>
      </div>
    </aside>
  );
}
