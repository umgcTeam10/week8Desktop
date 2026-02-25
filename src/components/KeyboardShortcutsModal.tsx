import React, { useEffect, useRef } from 'react';
import { useDesktop } from '../context/DesktopContext';

const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const mod = isMac ? 'Cmd' : 'Ctrl';

/**
 * Design 2.5: Keyboard Shortcuts modal — Form Navigation + Actions.
 */
const formNavShortcuts = [
  { keys: 'Tab', action: 'Move to next field or button' },
  { keys: 'Shift + Tab', action: 'Move to previous field or button' },
  { keys: 'Alt + E', action: 'Focus Email field' },
  { keys: 'Alt + P', action: 'Focus Password field' },
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
        <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
        <p className="modal-description">Use these shortcuts to navigate CareConnect efficiently.</p>

        <section aria-labelledby="form-nav-heading">
          <h3 id="form-nav-heading">Form Navigation</h3>
          <table>
            <tbody>
              {formNavShortcuts.map((s, i) => (
                <tr key={i}>
                  <td><kbd>{s.keys}</kbd></td>
                  <td>{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="actions-heading">
          <h3 id="actions-heading">Actions</h3>
          <table>
            <tbody>
              {actionShortcuts.map((s, i) => (
                <tr key={i}>
                  <td><kbd>{s.keys}</kbd></td>
                  <td>{s.action}</td>
                </tr>
              ))}
              {navShortcuts.map((s, i) => (
                <tr key={i}>
                  <td><kbd>{s.keys}</kbd></td>
                  <td>{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="modal-actions">
          <button type="button" onClick={closeModal} autoFocus>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
