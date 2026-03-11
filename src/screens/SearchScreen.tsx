import React, { useState } from "react";
import { mockHealthLogs } from "../data/mockData";
import { mockMessages } from "../data/mockData";
import { PersistentNowBar } from "../components/PersistentNowBar";

/**
 * Global search (Ctrl+F). Design: Search settings / global search bar.
 * A11y fixes:
 *  - Wrapped main content in <div> (app shell provides the <main> landmark)
 *  - Removed redundant aria-label on input (htmlFor/id already provides accessible name)
 *  - Wrapped result groups in <section aria-labelledby> elements
 *  - Fixed header aria-label to be more descriptive
 */
export function SearchScreen() {
  const [query, setQuery] = useState("");

  const logsMatch = mockHealthLogs.filter(
    (l) =>
      l.type.toLowerCase().includes(query.toLowerCase()) ||
      l.notes.toLowerCase().includes(query.toLowerCase()),
  );
  const messagesMatch = mockMessages.filter(
    (m) =>
      m.from.toLowerCase().includes(query.toLowerCase()) ||
      m.subject.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app-page search-page">
      <header className="app-page-topbar" aria-label="Search page header">
        <h2>Search</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">
          Robert <span className="tag tag-blue">Patient</span>
        </div>
      </header>

      <PersistentNowBar />

      <div className="search-content">
        <div className="form-group">
          <label htmlFor="search-input">Search (Ctrl+F)</label>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs and messages..."
          />
        </div>

        {query && (
          <>
            <section aria-labelledby="logs-heading">
              <h3 id="logs-heading">Health logs</h3>
              <ul aria-label="Search results - health logs">
                {logsMatch.length === 0 ? (
                  <li>No matching logs.</li>
                ) : (
                  logsMatch.map((log) => (
                    <li key={log.id} className="list-item">
                      {log.date} — {log.type}: {log.notes}
                    </li>
                  ))
                )}
              </ul>
            </section>

            <section aria-labelledby="messages-heading">
              <h3 id="messages-heading">Messages</h3>
              <ul aria-label="Search results - messages">
                {messagesMatch.length === 0 ? (
                  <li>No matching messages.</li>
                ) : (
                  messagesMatch.map((msg) => (
                    <li key={msg.id} className="list-item">
                      {msg.from} — {msg.subject}
                    </li>
                  ))
                )}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
