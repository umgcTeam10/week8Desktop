import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAuthenticatedApp } from '../testUtils';

describe('HealthLogsScreen', () => {
  it('shows health log entries after sign in and navigate to Health Logs', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /health logs/i }));
    expect(screen.getByRole('heading', { name: 'Health Logs' })).toBeInTheDocument();
    expect(screen.getAllByText(/120\/80/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the View Report action as a link to the recent logs section', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /health logs/i }));

    expect(screen.getByRole('link', { name: /view report/i })).toHaveAttribute('href', '#recent-logs');
  });
});
