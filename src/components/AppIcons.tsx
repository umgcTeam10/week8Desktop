import React from 'react';

interface IconProps {
  className?: string;
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 10.4 12 4l7.5 6.4V19a1 1 0 0 1-1 1h-4.8v-5.4h-3.4V20H5.5a1 1 0 0 1-1-1v-8.6Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ClipboardIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="4.4" width="12" height="15.6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="9" y="2.8" width="6" height="3.4" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 10h6M9 13.6h6M9 17.2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.2" width="17" height="14.4" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 3.6v3.2M16.5 3.6v3.2M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MessageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.8 5.2h14.4a2 2 0 0 1 2 2v8.6a2 2 0 0 1-2 2h-9.1l-4.3 2.6v-2.6H4.8a2 2 0 0 1-2-2V7.2a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.8 18.8c0-3.3 2.8-5.8 6.2-5.8s6.2 2.5 6.2 5.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function HeartOutlineIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19c-3.8-2.8-6.7-5.3-6.7-8.5 0-2.3 1.7-4 3.8-4 1.2 0 2.3.6 2.9 1.6.6-1 1.7-1.6 2.9-1.6 2.2 0 3.8 1.7 3.8 4 0 3.2-2.9 5.7-6.7 8.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.8 12.2 2.3 2.3 4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIconSmall({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v4.6l2.9 1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

