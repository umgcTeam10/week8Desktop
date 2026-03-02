import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { CalendarIcon, CheckCircleIcon, ClockIconSmall } from '../components/AppIcons';
import { PersistentNowBar } from '../components/PersistentNowBar';

/**
 * Design 2.7 Tasks Screen.
 */
export function TasksScreen() {
  const { openModal } = useDesktop();
  const tabs = ['Upcoming', 'Today', 'Overdue', 'Done'] as const;
  const [activeTab, setActiveTab] = React.useState<(typeof tabs)[number]>('Today');
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="app-page tasks-page">
      <header className="app-page-topbar" aria-label="Tasks status">
        <h2>Tasks</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">Robert <span className="tag tag-blue">Patient</span></div>
      </header>
      <PersistentNowBar />

      <section className="dashboard-heading" aria-labelledby="tasks-page-heading">
        <h3 id="tasks-page-heading">Task Overview</h3>
        <p>Manage your daily health tasks and activities</p>
      </section>

      <div className="tasks-summary dashboard-cards">
        <article className="dashboard-card">
          <span className="dashboard-card-icon"><CalendarIcon className="dashboard-card-icon-svg" /></span>
          <div><strong>3</strong><span>Today</span></div>
        </article>
        <article className="dashboard-card">
          <span className="dashboard-card-icon"><ClockIconSmall className="dashboard-card-icon-svg" /></span>
          <div><strong>2</strong><span>Overdue</span></div>
        </article>
        <article className="dashboard-card">
          <span className="dashboard-card-icon"><CheckCircleIcon className="dashboard-card-icon-svg" /></span>
          <div><strong>1</strong><span>Done</span></div>
        </article>
      </div>

      <div className="tasks-actions">
        <button type="button" className="btn-primary tasks-add-btn" onClick={() => openModal('new-log')}>+ Add Task</button>
        <button type="button" className="tasks-filter-btn" aria-label="Task filters">Filter</button>
        <input type="search" placeholder="Search tasks..." aria-label="Search tasks" className="search-input tasks-search-input" />
      </div>
      <div className="alert-banner" role="alert">
        <span>You have 2 overdue tasks</span>
        <button type="button" className="link-button">View →</button>
      </div>
      <div className="tasks-tabs" role="tablist" aria-orientation="horizontal">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tasks-layout">
        <ul className="tasks-list" aria-label="Today's tasks">
          <li className="list-item task-item-card">
            <div className="task-item-main">
              <input type="checkbox" aria-label="Mark Blood Pressure Check done" />
              <div>
                <div className="task-item-header">
                  <strong>Blood Pressure Check</strong>
                  <span className="tag">medium</span>
                </div>
                <p>Record morning blood pressure reading</p>
                <p className="task-item-meta">09:00 AM | Jan 27</p>
                <span className="task-item-chip">With breakfast</span>
              </div>
            </div>
            <div className="task-item-actions">
              <button type="button" className="btn-primary task-btn">Done</button>
              <button type="button" className="btn-secondary task-btn">Reschedule</button>
            </div>
          </li>
          <li className="list-item task-item-card">
            <div className="task-item-main">
              <input type="checkbox" aria-label="Mark Prepare Lunch done" />
              <div>
                <div className="task-item-header">
                  <strong>Prepare Lunch</strong>
                  <span className="tag">medium</span>
                </div>
                <p>Low-sodium, diabetic-friendly meal</p>
                <p className="task-item-meta">12:00 PM | Jan 27</p>
              </div>
            </div>
          </li>
        </ul>

        <aside className="tasks-now-card">
          <p className="tasks-now-label">Now</p>
          <h3>Physical Therapy Appointment</h3>
          <p>Due now - 02:00 PM - At clinic</p>
          <div className="tasks-now-actions">
            <button type="button" className="btn-primary task-btn">Start</button>
            <button type="button" className="btn-secondary task-btn">Snooze 10 min</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
