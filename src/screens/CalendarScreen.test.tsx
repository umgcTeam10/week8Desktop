import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAuthenticatedApp } from '../testUtils';

describe('CalendarScreen', () => {
  it('navigates to Calendar and shows events', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /calendar/i }));
    expect(screen.getByRole('heading', { name: 'Calendar' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /today's schedule/i })).toBeInTheDocument();
  });
});
