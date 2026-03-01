import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { mockMessages } from '../data/mockData';
import { PersistentNowBar } from '../components/PersistentNowBar';
import { MessageIcon, UserIcon } from '../components/AppIcons';

/**
 * Design 2.10 Messages: conversation list, active thread, Emergency SOS, contextual panel.
 */
export function MessagesScreen() {
  const { openModal } = useDesktop();
  const quickContacts = [
    { initials: 'SJ', name: 'Sarah', role: 'Primary Care' },
    { initials: 'DM', name: 'Dr.', role: 'Doctor' },
    { initials: 'NC', name: 'Nurse', role: 'Home Care' },
  ];
  const sharedFiles = [
    { name: 'Lab_Results_Dec.pdf', size: '2.4 MB · Yesterday' },
    { name: 'Prescription_Refill.jpg', size: '1.1 MB · Oct 24' },
    { name: 'Exercise_Plan_v2.docx', size: '450 KB · Oct 20' },
  ];

  return (
    <div className="app-page messages-page">
      <header className="app-page-topbar" aria-label="Messages status">
        <h2>Messages</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">Robert <span className="tag tag-blue">Patient</span></div>
      </header>
      <PersistentNowBar />

      <div className="messages-layout layout-two-panel">
        <aside className="panel-side messages-side">
          <h3>Quick Contact</h3>
          <div className="quick-contacts">
            {quickContacts.map((contact) => (
              <div key={contact.initials} className="quick-contact-item">
                <button type="button" className="quick-contact" aria-label={`${contact.name} ${contact.role}`}>
                  {contact.initials}
                </button>
                <strong>{contact.name}</strong>
                <small>{contact.role}</small>
              </div>
            ))}
          </div>
          <input type="search" placeholder="Search messages..." aria-label="Search messages" className="search-input messages-search" />
          <ul aria-label="Conversations" className="messages-thread-list">
            {mockMessages.map((msg) => (
              <li key={msg.id} className={`list-item ${msg.read ? '' : 'active'}`}>
                <strong>{msg.from}</strong>
                <p>{msg.subject}</p>
                <small>{msg.date}</small>
              </li>
            ))}
          </ul>
        </aside>

        <section className="panel-main messages-main">
          <header className="messages-main-header">
            <div className="messages-user-meta">
              <span className="messages-user-avatar" aria-hidden="true">
                <UserIcon className="messages-user-avatar-icon" />
              </span>
              <div>
                <h2>Robert Martinez</h2>
                <p className="panel-subtitle">Active now</p>
              </div>
            </div>
            <div className="messages-header-actions">
              <button type="button" aria-label="Video call">◻</button>
              <button type="button" aria-label="Call">☎</button>
              <button type="button" aria-label="Info">i</button>
            </div>
          </header>
          <div className="messages-thread" aria-label="Message thread">
            <p className="thread-time">1 hour ago</p>
            <p className="incoming">Morning walk completed! Felt great today.</p>
            <p className="incoming">About 30 minutes around the neighborhood</p>
            <p className="outgoing">That&apos;s wonderful! How long did you walk?</p>
            <p className="typing">Robert is typing...</p>
          </div>

          <div className="quick-replies">
            <button type="button">Yes</button>
            <button type="button">On my way</button>
            <button type="button">Call me</button>
            <button type="button">Thanks</button>
          </div>

          <div className="messages-input-area">
            <button type="button" className="messages-input-icon" aria-label="Attach file">+</button>
            <button type="button" className="messages-input-icon" aria-label="Add emoji">☺</button>
            <input type="text" placeholder="Type your message..." aria-label="Type your message" />
            <button type="button" className="btn-primary messages-send-btn">Send</button>
          </div>
        </section>

        <aside className="messages-context-panel">
          <div className="sos-banner" role="region" aria-label="Emergency SOS">
            <p className="sos-banner-label">Emergency</p>
            <button
              type="button"
              className="btn-sos"
              onClick={() => openModal('sos-confirm')}
              aria-label="Emergency SOS (Ctrl+Shift+E)"
            >
              EMERGENCY SOS
            </button>
            <p>Immediately contact emergency contacts (Ctrl+Shift+E)</p>
          </div>
          <div className="reminder-card">
            <p><strong>Physical Therapy</strong> Starts in 30 minutes</p>
            <p className="panel-subtitle">Reminder: Physical therapy appointment at 2:00 PM.</p>
            <button type="button" className="btn-secondary">Acknowledge</button>
            <button type="button" className="btn-secondary">Snooze</button>
          </div>
          <section className="messages-shared-files" aria-label="Shared files">
            <h4>Shared Files</h4>
            <ul className="messages-files-list">
              {sharedFiles.map((file) => (
                <li key={file.name}>
                  <MessageIcon className="messages-file-icon" />
                  <div>
                    <strong>{file.name}</strong>
                    <small>{file.size}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <div className="messages-actions-list" role="list" aria-label="Conversation actions">
            <button type="button">Scheduled Messages <span>2</span></button>
            <button type="button">Mute Notifications</button>
            <button type="button" className="danger">Block Contact</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
