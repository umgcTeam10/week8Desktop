import React, { useState, useEffect, useRef } from 'react';
import { useDesktop } from '../context/DesktopContext';

const SYS_MIN = 50;
const SYS_MAX = 300;

/**
 * New Log dialog (design: Ctrl+N opens). Test plan HP-01, SP-01, SP-02.
 */
export function NewLogModal() {
  const { closeModal, setError } = useDesktop();
  const [logType, setLogType] = useState('Blood Pressure');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const first = dialogRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (logType === 'Blood Pressure') {
      if (!systolic.trim()) next.systolic = 'Systolic value is required.';
      else {
        const n = Number(systolic);
        if (Number.isNaN(n) || n < SYS_MIN || n > SYS_MAX) {
          next.systolic = `Systolic value must be between ${SYS_MIN} and ${SYS_MAX} mmHg.`;
        }
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setError(null);
    closeModal();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-log-title"
      ref={dialogRef}
    >
      <div className="modal-dialog">
        <h2 id="new-log-title">New Log Entry</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="newlog-type">Log type</label>
            <select
              id="newlog-type"
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
              aria-label="Log type"
            >
              <option value="Blood Pressure">Blood Pressure</option>
              <option value="Glucose">Glucose</option>
              <option value="Weight">Weight</option>
            </select>
          </div>
          {logType === 'Blood Pressure' && (
            <>
              <div className="form-group">
                <label htmlFor="newlog-systolic">Systolic (mmHg) *</label>
                <input
                  id="newlog-systolic"
                  type="number"
                  min={SYS_MIN}
                  max={SYS_MAX}
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.systolic}
                  className={errors.systolic ? 'input-error' : ''}
                />
                {errors.systolic && <p className="form-error" role="alert">{errors.systolic}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="newlog-diastolic">Diastolic (mmHg)</label>
                <input
                  id="newlog-diastolic"
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newlog-hr">Heart Rate</label>
                <input
                  id="newlog-hr"
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="modal-actions">
            <button type="button" onClick={closeModal}>Cancel</button>
            <button type="submit" className="primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
