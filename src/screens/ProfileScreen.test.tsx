import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAuthenticatedApp } from '../testUtils';

describe('ProfileScreen', () => {
  it('navigates to Profile and shows Notifications, Preferences, Accessibility', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /profile/i }));
    expect(screen.getByRole('heading', { name: /profile & settings/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /preferences/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /accessibility/i })).toBeInTheDocument();
  });

  it('text size slider is present', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /profile/i }));
    expect(screen.getByLabelText(/text size/i)).toBeInTheDocument();
  });
});
