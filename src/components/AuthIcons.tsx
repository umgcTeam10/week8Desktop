import React from 'react';

interface IconProps {
  className?: string;
}

export function HeartBadgeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="currentColor" />
      <path
        d="M12 17.2c-.2 0-.4-.1-.6-.2C8.8 15 7 13.3 7 10.9c0-1.7 1.3-3.1 3-3.1 1 0 1.9.5 2.5 1.3.6-.8 1.6-1.3 2.5-1.3 1.8 0 3 1.4 3 3.1 0 2.4-1.8 4.1-4.4 6.1-.2.1-.4.2-.6.2h0Z"
        fill="#fff"
      />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 18 6v5.3c0 4.2-2.4 7.4-6 9.2-3.6-1.8-6-5-6-9.2V6l6-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.7v4.7l3.1 1.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m7.5 4.8 2 3.6c.2.4.1.8-.2 1.1l-1.2 1.2c1.1 2.2 3 4.1 5.2 5.2l1.2-1.2c.3-.3.7-.3 1.1-.2l3.6 2c.5.3.7.9.4 1.4l-1 1.9c-.3.6-.9.9-1.5.8-8.1-1-12.8-5.8-13.8-13.8-.1-.6.2-1.2.8-1.5l1.9-1c.5-.3 1.1-.1 1.4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HelpCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.9 9.4a2.2 2.2 0 1 1 3.7 1.7c-.6.5-1.2 1-1.2 1.8v.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function CaregiverIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.7 18c0-2.4 2-4.2 4.3-4.2s4.3 1.8 4.3 4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.6" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13.8 17.8c.4-1.6 1.7-2.8 3.4-2.8 1.9 0 3.5 1.4 3.5 3.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CareRecipientIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.6" r="3.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.2 18.4c0-3.2 2.6-5.6 5.8-5.6s5.8 2.4 5.8 5.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.2" y="5.8" width="17.6" height="12.4" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4.5 8 7.5 5.1L19.5 8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5.2" y="10.5" width="13.6" height="9.1" rx="2.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.7 10.5V8.1a3.3 3.3 0 1 1 6.6 0v2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.8 12c1.5-3.1 4.5-5.3 9.2-5.3 4.7 0 7.7 2.2 9.2 5.3-1.5 3.1-4.5 5.3-9.2 5.3-4.7 0-7.7-2.2-9.2-5.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function FingerprintIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.4 9.7a4.6 4.6 0 0 1 9.2 0v2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 10.4a7 7 0 0 1 14 0v2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 14.5v3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.8 14.5v2.2a4 4 0 0 0 2 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15.2 14.5v2.2a4 4 0 0 1-2 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11.1v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function AlertCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.6v5.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="16.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function WarningTriangleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 4.6c.5-.9 1.7-.9 2.2 0l7 12.2c.5.9-.1 2.1-1.1 2.1H4.1c-1 0-1.7-1.2-1.1-2.1L11 4.6Z"
        fill="currentColor"
      />
      <path d="M12 9v4.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="15.9" r="1" fill="#fff" />
    </svg>
  );
}

export function KeyboardIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 9.4h.1M10 9.4h.1M13 9.4h.1M16 9.4h.1M7 12.2h.1M10 12.2h.1M13 12.2h.1M16 12.2h.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.3 15h7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
