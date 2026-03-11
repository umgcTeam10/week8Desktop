import React, { useEffect, useRef } from "react";
import { useDesktop } from "../context/DesktopContext";

export function SOSConfirmModal() {
  const { closeModal } = useDesktop();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousActive.current = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0] as HTMLElement | undefined;
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape dismisses the modal (WCAG 2.1.1)
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ) as HTMLElement[];
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActive.current?.focus();
    };
  }, [closeModal]);

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <div
      className="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="sos-title"
      aria-describedby="sos-desc"
      ref={dialogRef}
    >
      <div className="modal-dialog">
        <h2 id="sos-title">Emergency SOS</h2>
        <p id="sos-desc">
          Are you sure you want to trigger Emergency SOS? This will notify your
          emergency contacts.
        </p>
        <div className="modal-actions">
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button
            type="button"
            className="primary"
            onClick={handleConfirm}
            autoFocus
          >
            Confirm SOS
          </button>
        </div>
      </div>
    </div>
  );
}
