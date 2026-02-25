import React, { useState } from 'react';
import { mockHealthLogs } from '../data/mockData';
import { mockMessages } from '../data/mockData';

/**
 * Global search (Ctrl+F). Design: Search settings / global search bar.
 */
export function SearchScreen() {
  const [query, setQuery] = useState('');

  const logsMatch = mockHealthLogs.filter(
    (l) =>
      l.type.toLowerCase().includes(query.toLowerCase()) ||
      l.notes.toLowerCase().includes(query.toLowerCase())
  );
  const messagesMatch = mockMessages.filter(
    (m) =>
      m.from.toLowerCase().includes(query.toLowerCase()) ||
      m.subject.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-content">
      <h2>Search</h2>
      <div className="form-group">
        <label htmlFor="search-input">Search (Ctrl+F)</label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search logs and messages..."
          aria-label="Search"
        />
      </div>
      {query && (
        <>
          <h3>Health logs</h3>
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
          <h3>Messages</h3>
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
        </>
      )}
    </div>
  );
}
