import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { mockMessages } from '../data/mockData';

/**
 * Design 2.10 Messages: conversation list, active thread, Emergency SOS, contextual panel.
 */
export function MessagesScreen() {
  const { openModal } = useDesktop();

  return (
    <div className="messages-layout layout-two-panel">
      <div className="panel-side">
        <h3>QUICK CONTACT</h3>
        <div className="quick-contacts">
          <button type="button" className="quick-contact" aria-label="Sarah Primary Care">Sarah (Primary Care)</button>
          <button type="button" className="quick-contact" aria-label="Dr">Dr.</button>
          <button type="button" className="quick-contact" aria-label="Nurse Home Care">Nurse (HOME CARE)</button>
        </div>
        <input type="search" placeholder="Search messages..." aria-label="Search messages" className="search-input" />
        <ul aria-label="Conversations">
          {mockMessages.map((msg) => (
            <li key={msg.id} className="list-item">
              <strong>{msg.from}</strong> — {msg.subject} ({msg.date})
              {!msg.read && ' [Unread]'}
            </li>
          ))}
        </ul>
      </div>
      <div className="panel-main">
        <h2>Robert Martinez</h2>
        <p className="panel-subtitle">Active now</p>
        <div className="messages-thread" aria-label="Message thread">
          <p>Morning walk completed! Felt great today — 1 hour ago</p>
          <p>About 30 minutes around the neighborhood</p>
          <p><strong>You:</strong> That&apos;s wonderful! How long did you walk?</p>
        </div>
        <div className="messages-input-area">
          <input type="text" placeholder="Type your message..." aria-label="Type your message" />
          <div className="quick-replies">
            <button type="button">Yes</button>
            <button type="button">On my way</button>
            <button type="button">Call me</button>
            <button type="button">Thanks</button>
          </div>
          <button type="button" className="btn-primary">Send</button>
        </div>
      </div>
      <aside className="messages-context-panel">
        <div className="sos-banner" role="region" aria-label="Emergency SOS">
          <button
            type="button"
            className="btn-sos"
            onClick={() => openModal('sos-confirm')}
            aria-label="Emergency SOS (Ctrl+Shift+E)"
          >
            EMERGENCY SOS
          </button>
          <p>Immediately contact emergency contacts (Ctrl+Shift+E).</p>
        </div>
        <div className="reminder-card">
          <p><strong>Physical Therapy</strong> Starts in 30 minutes — 2:00 PM</p>
          <button type="button" className="btn-secondary">Acknowledge</button>
          <button type="button" className="btn-secondary">Snooze</button>
        </div>
        <h4>Shared Files</h4>
        <ul>
          <li>Lab_Results_Dec.pdf</li>
          <li>Prescription_Refill.jpg</li>
        </ul>
      </aside>
    </div>
  );
}
