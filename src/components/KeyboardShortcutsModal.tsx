import React, { useEffect, useRef } from 'react';
import { useDesktop } from '../context/DesktopContext';
import { KeyboardIcon } from './AuthIcons';

const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const mod = isMac ? 'Cmd' : 'Ctrl';
const altKey = isMac ? 'Option' : 'Alt';

/**
 * Design 2.5: Keyboard Shortcuts modal — Form Navigation + Actions.
 */
const formNavShortcuts = [
  { keys: 'Tab', action: 'Move to next field or button' },
  { keys: 'Shift + Tab', action: 'Move to previous field or button' },
  { keys: `${altKey} + E`, action: 'Focus Email field' },
  { keys: `${altKey} + P`, action: 'Focus Password field' },
];

const actionShortcuts = [
  { keys: 'Esc', action: 'Close / Cancel — Dismisses dialogs and cancels current action' },
];

const navShortcuts = [
  { keys: `${mod}+H`, action: 'Health Logs' },
  { keys: `${mod}+M`, action: 'Messages' },
  { keys: `${mod}+K`, action: 'Calendar' },
  { keys: `${mod}+N`, action: 'New Log' },
  { keys: `${mod}+S`, action: 'Save' },
  { keys: `${mod}+F`, action: 'Search' },
  { keys: `${mod}+,`, action: 'Profile & Settings' },
  { keys: `${mod}+Shift+E`, action: 'Emergency SOS (confirmation required)' },
];

export function KeyboardShortcutsModal() {
  const { closeModal } = useDesktop();
  const dialogRef = useRef<HTMLDivElement>(null);

  const renderKeyCombo = (combo: string) => {
    const keys = combo.split('+');
    return (
      <span className="shortcut-keys" aria-label={combo}>
        <span className="sr-only">{combo}</span>
        {keys.map((key, index) => (
          <React.Fragment key={`${combo}-${key}-${index}`}>
            <kbd className="keycap" aria-hidden="true">{key}</kbd>
            {index < keys.length - 1 && (
              <span className="shortcut-plus" aria-hidden="true">+</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const list = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActive?.focus();
    };
  }, []);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      ref={dialogRef}
    >
      <div className="modal-dialog modal-dialog-shortcuts">
        <div className="shortcuts-header">
          <div className="shortcuts-title-row">
            <KeyboardIcon className="shortcuts-title-icon" />
            <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
          </div>
          <button type="button" className="shortcuts-close-button" onClick={closeModal} aria-label="Dismiss shortcuts">
            ×
          </button>
        </div>
        <p className="modal-description">Use these shortcuts to navigate CareConnect efficiently.</p>

        <div className="shortcuts-content">
          <section className="shortcuts-section" aria-labelledby="form-nav-heading">
            <h3 id="form-nav-heading">Form Navigation</h3>
            <ul className="shortcuts-list">
              {formNavShortcuts.map((s, i) => (
                <li className="shortcut-row" key={i}>
                  <span className="shortcut-action">{s.action}</span>
                  {renderKeyCombo(s.keys)}
                </li>
              ))}
            </ul>
          </section>

          <section className="shortcuts-section" aria-labelledby="actions-heading">
            <h3 id="actions-heading">Actions</h3>
            <ul className="shortcuts-list">
              {actionShortcuts.map((s, i) => (
                <li className="shortcut-row" key={i}>
                  <span className="shortcut-action">{s.action}</span>
                  {renderKeyCombo(s.keys)}
                </li>
              ))}
              {navShortcuts.map((s, i) => (
                <li className="shortcut-row" key={i}>
                  <span className="shortcut-action">{s.action}</span>
                  {renderKeyCombo(s.keys)}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="shortcuts-footer">
          <p className="shortcuts-hint">
            Press <kbd className="keycap keycap-inline">Esc</kbd> to close
          </p>
          <button type="button" onClick={closeModal} className="btn-primary shortcuts-footer-close" autoFocus>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
