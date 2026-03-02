import React from 'react';
import { mockCalendarEvents } from '../data/mockData';
import { PersistentNowBar } from '../components/PersistentNowBar';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const REFERENCE_DATE = new Date(2026, 0, 26);

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildCalendarRows(month: Date): Array<Array<Date | null>> {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingEmptyCells = firstDayOfMonth.getDay();

  const cells: Array<Date | null> = Array.from({ length: leadingEmptyCells }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const rows: Array<Array<Date | null>> = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

function shiftMonthClamped(date: Date, deltaMonths: number): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const targetMonthDate = new Date(year, month + deltaMonths, 1);
  const lastDayInTargetMonth = new Date(
    targetMonthDate.getFullYear(),
    targetMonthDate.getMonth() + 1,
    0
  ).getDate();
  return new Date(
    targetMonthDate.getFullYear(),
    targetMonthDate.getMonth(),
    Math.min(day, lastDayInTargetMonth)
  );
}

/**
 * Design 2.8 Calendar: interactive month view with keyboard and per-day schedule.
 */
export function CalendarScreen() {
  const monthFormatter = React.useMemo(
    () => new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }),
    []
  );
  const longDateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    []
  );
  const shortDateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    []
  );

  const [selectedDate, setSelectedDate] = React.useState<Date>(() => normalizeDate(REFERENCE_DATE));
  const [visibleMonth, setVisibleMonth] = React.useState<Date>(() => startOfMonth(REFERENCE_DATE));

  const dayButtonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const focusDateKeyRef = React.useRef<string | null>(null);

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, typeof mockCalendarEvents>();
    mockCalendarEvents.forEach((event) => {
      const existing = map.get(event.date);
      if (existing) existing.push(event);
      else map.set(event.date, [event]);
    });
    return map;
  }, []);

  const selectedDateKey = React.useMemo(() => toDateKey(selectedDate), [selectedDate]);
  const monthRows = React.useMemo(() => buildCalendarRows(visibleMonth), [visibleMonth]);
  const monthLabel = React.useMemo(() => monthFormatter.format(visibleMonth), [monthFormatter, visibleMonth]);
  const selectedDateLabel = React.useMemo(
    () => longDateFormatter.format(selectedDate),
    [longDateFormatter, selectedDate]
  );
  const selectedDateSubtitle = React.useMemo(
    () => shortDateFormatter.format(selectedDate),
    [selectedDate, shortDateFormatter]
  );
  const eventsForSelectedDate = eventsByDate.get(selectedDateKey) ?? [];

  const applySelection = React.useCallback(
    (nextDate: Date, focusButton: boolean) => {
      const normalized = normalizeDate(nextDate);
      const key = toDateKey(normalized);
      if (focusButton) focusDateKeyRef.current = key;
      setSelectedDate(normalized);
      setVisibleMonth(startOfMonth(normalized));
    },
    []
  );

  const moveByDays = React.useCallback(
    (baseDate: Date, deltaDays: number, focusButton = true) => {
      const next = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + deltaDays);
      applySelection(next, focusButton);
    },
    [applySelection]
  );

  const moveByMonths = React.useCallback(
    (baseDate: Date, deltaMonths: number, focusButton = true) => {
      const next = shiftMonthClamped(baseDate, deltaMonths);
      applySelection(next, focusButton);
    },
    [applySelection]
  );

  React.useEffect(() => {
    if (!focusDateKeyRef.current) return;
    const target = dayButtonRefs.current[focusDateKeyRef.current];
    if (target) {
      target.focus();
      focusDateKeyRef.current = null;
    }
  }, [selectedDate, visibleMonth]);

  const handleDayKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, day: Date) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveByDays(day, -1);
        return;
      case 'ArrowRight':
        event.preventDefault();
        moveByDays(day, 1);
        return;
      case 'ArrowUp':
        event.preventDefault();
        moveByDays(day, -7);
        return;
      case 'ArrowDown':
        event.preventDefault();
        moveByDays(day, 7);
        return;
      case 'Home':
        event.preventDefault();
        moveByDays(day, -day.getDay());
        return;
      case 'End':
        event.preventDefault();
        moveByDays(day, 6 - day.getDay());
        return;
      case 'PageUp':
        event.preventDefault();
        moveByMonths(day, -1);
        return;
      case 'PageDown':
        event.preventDefault();
        moveByMonths(day, 1);
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        applySelection(day, true);
        return;
      default:
        return;
    }
  };

  return (
    <div className="app-page calendar-page">
      <header className="app-page-topbar" aria-label="Calendar status">
        <h2>Calendar</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">Robert <span className="tag tag-blue">Patient</span></div>
      </header>
      <PersistentNowBar />

      <section className="dashboard-heading" aria-labelledby="calendar-heading">
        <h3 id="calendar-heading">Calendar Overview</h3>
        <p>View your schedule and upcoming appointments</p>
      </section>

      <section className="calendar-shell app-surface-card" aria-label={`${monthLabel} calendar`}>
        <div className="calendar-month-nav">
          <button
            type="button"
            aria-label={`Previous month, ${monthFormatter.format(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}`}
            onClick={() => moveByMonths(selectedDate, -1, true)}
          >
            ←
          </button>
          <span aria-live="polite" aria-atomic="true">{monthLabel}</span>
          <button
            type="button"
            aria-label={`Next month, ${monthFormatter.format(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}`}
            onClick={() => moveByMonths(selectedDate, 1, true)}
          >
            →
          </button>
        </div>

        <table className="calendar-grid">
          <thead className="calendar-weekdays">
            <tr>
              {WEEKDAY_LABELS.map((weekday) => (
                <th key={weekday} scope="col">{weekday}</th>
              ))}
            </tr>
          </thead>
          <tbody className="calendar-days">
            {monthRows.map((week, weekIndex) => (
              <tr key={`week-${weekIndex}`}>
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return (
                      <td key={`empty-${weekIndex}-${dayIndex}`}>
                        <span className="calendar-day empty" aria-hidden="true" />
                      </td>
                    );
                  }

                  const dayKey = toDateKey(day);
                  const dayEvents = eventsByDate.get(dayKey) ?? [];
                  const isSelected = dayKey === selectedDateKey;
                  const isReferenceDay = dayKey === toDateKey(REFERENCE_DATE);
                  const dayLabel = longDateFormatter.format(day);
                  const todayMessage = isReferenceDay ? 'Today. ' : '';
                  const eventMessage =
                    dayEvents.length === 0
                      ? 'No appointments'
                      : `${dayEvents.length} appointment${dayEvents.length === 1 ? '' : 's'}`;
                  const selectedMessage = isSelected ? ' Selected.' : '';

                  return (
                    <td key={dayKey}>
                      <button
                        type="button"
                        ref={(el) => {
                          dayButtonRefs.current[dayKey] = el;
                        }}
                        className={`calendar-day ${isReferenceDay ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-event' : ''}`}
                        onClick={() => applySelection(day, false)}
                        onKeyDown={(event) => handleDayKeyDown(event, day)}
                        tabIndex={isSelected ? 0 : -1}
                        aria-label={`${dayLabel}. ${todayMessage}${eventMessage}.${selectedMessage}`}
                        aria-current={isSelected ? 'date' : undefined}
                      >
                        <span className="calendar-day-number">{day.getDate()}</span>
                        {dayEvents.length > 0 && <span className="calendar-event-dot" aria-hidden="true" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="today-schedule-heading" className="calendar-schedule">
        <h3 id="today-schedule-heading">Schedule for {selectedDateLabel}</h3>
        <p className="panel-subtitle">{selectedDateSubtitle}</p>
        <ul aria-label={`Appointments for ${selectedDateLabel}`} className="calendar-schedule-list">
          {eventsForSelectedDate.length === 0 ? (
            <li className="list-item calendar-schedule-empty">No appointments scheduled.</li>
          ) : (
            eventsForSelectedDate.map((event) => (
              <li key={event.id} className="list-item calendar-schedule-card">
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.time}</p>
                </div>
                <span className="tag">scheduled</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
