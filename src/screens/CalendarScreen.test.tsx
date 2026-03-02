import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAuthenticatedApp } from '../testUtils';

describe('CalendarScreen', () => {
  it('navigates to Calendar and shows schedule for selected day', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /calendar/i }));
    expect(screen.getByRole('heading', { name: 'Calendar' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /schedule for monday, january 26, 2026/i })).toBeInTheDocument();
    expect(screen.getByText('Check-up')).toBeInTheDocument();
  });

  it('selecting a different day updates schedule details', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /calendar/i }));

    await userEvent.click(screen.getByRole('button', { name: /tuesday, january 27, 2026/i }));

    expect(screen.getByRole('heading', { name: /schedule for tuesday, january 27, 2026/i })).toBeInTheDocument();
    expect(screen.getByText('Lab results')).toBeInTheDocument();
  });

  it('month navigation updates the month label and supports empty days', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /calendar/i }));

    await userEvent.click(screen.getByRole('button', { name: /next month/i }));

    expect(screen.getByText('February 2026')).toBeInTheDocument();
    expect(screen.getByText(/no appointments scheduled/i)).toBeInTheDocument();
  });
});
