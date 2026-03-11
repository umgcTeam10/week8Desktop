import React from "react";
import { useDesktop } from "../context/DesktopContext";
import { mockMessages } from "../data/mockData";
import { PersistentNowBar } from "../components/PersistentNowBar";
import { MessageIcon, UserIcon } from "../components/AppIcons";

const patientTagStyle: React.CSSProperties = { color: "#1f5f91" };
const sectionHeadingStyle: React.CSSProperties = { color: "#51697f" };
const quickContactMetaStyle: React.CSSProperties = { color: "#556d83" };
const conversationMetaStyle: React.CSSProperties = { color: "#587187" };
const threadTimeStyle: React.CSSProperties = { color: "#5f778d" };
const typingStyle: React.CSSProperties = { color: "#5d758c" };
const sosLabelStyle: React.CSSProperties = { color: "#9c4955" };
const sosButtonStyle: React.CSSProperties = { background: "#be3148" };
const sharedFileMetaStyle: React.CSSProperties = { color: "#5d768d" };
const actionButtonStyle: React.CSSProperties = { color: "#48627a" };
const dangerActionStyle: React.CSSProperties = { color: "#a43748" };

/**
 * Design 2.10 Messages: conversation list, active thread, Emergency SOS, contextual panel.
 * A11y fixes:
 *  - Wrapped layout in <div> (app shell provides the <main> landmark)
 *  - Fixed header aria-label
 *  - Added aria-label to both <aside> landmarks
 *  - Demoted "Robert Martinez" from h2 → h3 (fixes duplicate h2 heading hierarchy)
 *  - Wrapped quick contacts in <section aria-labelledby>
 *  - Added role="log" to message thread (WAI-ARIA live region for chat)
 *  - Added sr-only sender labels to incoming/outgoing messages
 *  - Added aria-live="polite" to typing indicator
 *  - Added role="group" + aria-label to quick replies
 *  - Added role="group" to message input area
 *  - Added aria-hidden to all decorative icon characters
 *  - Added aria-labelledby to Shared Files section
 *  - Added aria-hidden to decorative MessageIcon
 *  - Fixed messages-actions-list to use proper <ul>/<li> markup
 *  - Added aria-label to badge count in Scheduled Messages
 *  - Added role="region" + aria-label to reminder card
 *  - Added aria-hidden to initials inside quick contact buttons
 */
export function MessagesScreen() {
  const { openModal } = useDesktop();

  const quickContacts = [
    { initials: "SJ", name: "Sarah", role: "Primary Care" },
    { initials: "DM", name: "Dr.", role: "Doctor" },
    { initials: "NC", name: "Nurse", role: "Home Care" },
  ];
  const sharedFiles = [
    { name: "Lab_Results_Dec.pdf", size: "2.4 MB · Yesterday" },
    { name: "Prescription_Refill.jpg", size: "1.1 MB · Oct 24" },
    { name: "Exercise_Plan_v2.docx", size: "450 KB · Oct 20" },
  ];

  return (
    <div className="app-page messages-page">
      <header className="app-page-topbar" aria-label="Messages page header">
        <h2>Messages</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">
          Robert <span className="tag tag-blue" style={patientTagStyle}>Patient</span>
        </div>
      </header>

      <div className="messages-layout layout-two-panel">
        <PersistentNowBar />

        {/* ── Left panel: contacts + conversation list ─────────────── */}
        <aside
          className="panel-side messages-side"
          aria-label="Contacts and conversations"
        >
          <section aria-labelledby="quick-contact-heading">
            <h3 id="quick-contact-heading" style={sectionHeadingStyle}>Quick Contact</h3>
            <div className="quick-contacts">
              {quickContacts.map((contact) => (
                <div key={contact.initials} className="quick-contact-item">
                  <button
                    type="button"
                    className="quick-contact"
                    aria-label={`${contact.name}, ${contact.role}`}
                  >
                    <span aria-hidden="true">{contact.initials}</span>
                  </button>
                  <strong>{contact.name}</strong>
                  <small style={quickContactMetaStyle}>{contact.role}</small>
                </div>
              ))}
            </div>
          </section>

          <input
            type="search"
            placeholder="Search messages..."
            aria-label="Search messages"
            className="search-input messages-search"
          />

          <ul aria-label="Conversations" className="messages-thread-list">
            {mockMessages.map((msg) => (
              <li
                key={msg.id}
                className={`list-item ${msg.read ? "" : "active"}`}
              >
                <strong>{msg.from}</strong>
                <p style={conversationMetaStyle}>{msg.subject}</p>
                <small style={conversationMetaStyle}>{msg.date}</small>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Centre panel: active thread ──────────────────────────── */}
        <section
          className="panel-main messages-main"
          aria-labelledby="conversation-heading"
        >
          <header className="messages-main-header">
            <div className="messages-user-meta">
              <span className="messages-user-avatar" aria-hidden="true">
                <UserIcon className="messages-user-avatar-icon" />
              </span>
              <div>
                <h3 id="conversation-heading">Robert Martinez</h3>
                <p className="panel-subtitle">Active now</p>
              </div>
            </div>
            <div className="messages-header-actions">
              <button type="button" aria-label="Video call">
                <span aria-hidden="true">◻</span>
              </button>
              <button type="button" aria-label="Phone call">
                <span aria-hidden="true">☎</span>
              </button>
              <button type="button" aria-label="Conversation info">
                <span aria-hidden="true">i</span>
              </button>
            </div>
          </header>

          <section
            className="messages-thread"
            role="log"
            aria-label="Message thread with Robert Martinez"
            aria-live="polite"
          >
            <p className="thread-time" style={threadTimeStyle}>1 hour ago</p>
            <p className="incoming">
              <span className="sr-only">Robert Martinez: </span>
              Morning walk completed! Felt great today.
            </p>
            <p className="incoming">
              <span className="sr-only">Robert Martinez: </span>
              About 30 minutes around the neighborhood
            </p>
            <p className="outgoing">
              <span className="sr-only">You: </span>
              That&apos;s wonderful! How long did you walk?
            </p>
            <p
              className="typing"
              aria-live="polite"
              aria-atomic="true"
              style={typingStyle}
            >
              Robert is typing...
            </p>
          </section>

          <div
            className="quick-replies"
            role="group"
            aria-label="Quick reply options"
          >
            <button type="button">Yes</button>
            <button type="button">On my way</button>
            <button type="button">Call me</button>
            <button type="button">Thanks</button>
          </div>

          <div
            className="messages-input-area"
            role="group"
            aria-label="Compose message"
          >
            <button
              type="button"
              className="messages-input-icon"
              aria-label="Attach file"
            >
              <span aria-hidden="true">+</span>
            </button>
            <button
              type="button"
              className="messages-input-icon"
              aria-label="Add emoji"
            >
              <span aria-hidden="true">☺</span>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button type="button" className="btn-primary messages-send-btn">
              Send
            </button>
          </div>
        </section>

        {/* ── Right panel: SOS, reminder, files, actions ───────────── */}
        <aside
          className="messages-context-panel"
          aria-label="Conversation context and emergency"
        >
          <div className="sos-banner" role="region" aria-label="Emergency SOS">
            <p className="sos-banner-label" style={sosLabelStyle}>Emergency</p>
            <button
              type="button"
              className="btn-sos"
              onClick={() => openModal("sos-confirm")}
              aria-label="Emergency SOS (Ctrl+Shift+E)"
              style={sosButtonStyle}
            >
              EMERGENCY SOS
            </button>
            <p>Immediately contact emergency contacts (Ctrl+Shift+E)</p>
          </div>

          <section className="reminder-card" aria-labelledby="reminder-heading">
            <h4 id="reminder-heading">Upcoming Reminder</h4>
            <p>
              <strong>Physical Therapy</strong> Starts in 30 minutes
            </p>
            <p className="panel-subtitle">
              Reminder: Physical therapy appointment at 2:00 PM.
            </p>
            <button type="button" className="btn-secondary">
              Acknowledge
            </button>
            <button type="button" className="btn-secondary">
              Snooze
            </button>
          </section>

          <section
            className="messages-shared-files"
            aria-labelledby="shared-files-heading"
          >
            <h4 id="shared-files-heading">Shared Files</h4>
            <ul className="messages-files-list">
              {sharedFiles.map((file) => (
                <li key={file.name}>
                  <MessageIcon
                    className="messages-file-icon"
                    aria-hidden="true"
                  />
                  <div>
                    <strong>{file.name}</strong>
                    <small style={sharedFileMetaStyle}>{file.size}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <ul
            className="messages-actions-list"
            aria-label="Conversation actions"
          >
            <li>
              <button type="button" style={actionButtonStyle}>
                Scheduled Messages{" "}
                <span aria-label="2 scheduled messages" style={actionButtonStyle}>2</span>
              </button>
            </li>
            <li>
              <button type="button" style={actionButtonStyle}>Mute Notifications</button>
            </li>
            <li>
              <button type="button" className="danger" style={dangerActionStyle}>
                Block Contact
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
