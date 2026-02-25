import React from 'react';
import { useDesktop } from '../context/DesktopContext';

export function Toolbar() {
  const { highContrast, setHighContrast, zoom, setZoom, openModal } = useDesktop();

  return (
    <div className="toolbar" role="toolbar" aria-label="Main toolbar">
      <button
        type="button"
        onClick={() => setHighContrast(!highContrast)}
        aria-pressed={highContrast}
        aria-label="Toggle high contrast"
      >
        {highContrast ? 'High contrast on' : 'High contrast off'}
      </button>
      <button
        type="button"
        onClick={() => openModal('keyboard-shortcuts')}
        aria-label="Open keyboard shortcuts"
      >
        Keyboard shortcuts
      </button>
      <span className="zoom-indicator" role="status" aria-live="polite">
        Zoom: {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        onClick={() => setZoom(Math.min(2, zoom + 0.25))}
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
        aria-label="Zoom out"
      >
        −
      </button>
    </div>
  );
}
