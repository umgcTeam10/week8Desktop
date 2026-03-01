import React from 'react';
import {
  ClockIcon,
  HeartBadgeIcon,
  HelpCircleIcon,
  PhoneIcon,
  ShieldIcon,
} from './AuthIcons';

/**
 * Left panel for Welcome / Role Selection and Sign In (design 2.1, 2.2).
 * Branding, reassurance, and support resources.
 */
export function LeftPanelWelcome() {
  return (
    <aside className="panel-welcome" aria-label="CareConnect information and support">
      <div className="panel-welcome-branding">
        <HeartBadgeIcon className="panel-welcome-logo" />
        <div>
          <h2 className="panel-welcome-title">CareConnect</h2>
          <p className="panel-welcome-subtitle">Patient Portal</p>
        </div>
      </div>
      <p className="panel-welcome-heading">Welcome back</p>
      <p className="panel-welcome-text">
        Sign in to access your appointments, medications, test results, and care team messages.
        We&apos;re here to support you every step of the way.
      </p>
      <div className="panel-welcome-features">
        <div className="panel-welcome-feature">
          <div className="panel-welcome-feature-icon-wrap" aria-hidden="true">
            <ShieldIcon className="panel-welcome-feature-icon" />
          </div>
          <div className="panel-welcome-feature-content">
            <strong>Secure &amp; Private</strong>
            <p>Your health information is protected with bank-level encryption and HIPAA compliance.</p>
          </div>
        </div>
        <div className="panel-welcome-feature">
          <div className="panel-welcome-feature-icon-wrap" aria-hidden="true">
            <ClockIcon className="panel-welcome-feature-icon" />
          </div>
          <div className="panel-welcome-feature-content">
            <strong>24/7 Access</strong>
            <p>View your health records, upcoming appointments, and messages anytime you need.</p>
          </div>
        </div>
      </div>
      <div className="panel-welcome-help">
        <p className="panel-welcome-heading">Need help signing in?</p>
        <a href="#support" className="support-card">
          <span className="support-card-icon" aria-hidden="true">
            <PhoneIcon className="support-card-icon-svg" />
          </span>
          <span className="support-card-content">
            <strong>Call Support</strong>
            <span>1-800-CARE-HELP - Available 24/7</span>
          </span>
        </a>
        <a href="#help-center" className="support-card">
          <span className="support-card-icon" aria-hidden="true">
            <HelpCircleIcon className="support-card-icon-svg" />
          </span>
          <span className="support-card-content">
            <strong>Help Center</strong>
            <span>View sign-in guides and FAQs</span>
          </span>
        </a>
      </div>
    </aside>
  );
}
