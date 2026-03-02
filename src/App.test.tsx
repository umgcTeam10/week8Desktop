import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderAuthenticatedApp } from './testUtils';

describe('App', () => {
  it('renders title and skip link', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'CareConnect' })).toBeInTheDocument();
    expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main-content');
  });

  it('skip link has correct class for focus visibility', () => {
    render(<App />);
    const skip = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skip).toHaveClass('skip-link');
  });

  it('main content has id for skip link target', () => {
    render(<App />);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('shows Choose Your Role (Step 1 of 2) by default', () => {
    render(<App />);
    expect(screen.getByText(/step 1 of 2/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /choose your role/i })).toBeInTheDocument();
  });

  it('Continue goes to Sign in when role selected', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: /care recipient/i }));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
  });

  it('Sign in with valid credentials shows Dashboard', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: /care recipient/i }));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    await userEvent.type(screen.getByLabelText(/email address/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByRole('heading', { name: /home dashboard/i })).toBeInTheDocument();
  });

  it('navigates to Health Logs from sidebar after sign in', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /health logs/i }));
    expect(screen.getByRole('heading', { name: 'Health Logs' })).toBeInTheDocument();
  });

  it('navigates to Messages from sidebar after sign in', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /^messages$/i }));
    expect(screen.getByRole('heading', { name: 'Robert Martinez' })).toBeInTheDocument();
  });

  it('navigates to Calendar from sidebar after sign in', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /calendar/i }));
    expect(screen.getByRole('heading', { name: 'Calendar' })).toBeInTheDocument();
  });

  it('navigates to Tasks from sidebar after sign in', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /tasks/i }));
    expect(screen.getByRole('heading', { name: /^tasks$/i })).toBeInTheDocument();
  });

  it('ArrowDown then Enter on role selection moves to sign-in', async () => {
    render(<App />);
    const caregiverRadio = screen.getByRole('radio', { name: /caregiver/i });
    caregiverRadio.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: /care recipient/i })).toBeChecked();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
  });

  it('navigates to Profile from sidebar after sign in', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /profile/i }));
    expect(screen.getByRole('heading', { name: /profile & settings/i })).toBeInTheDocument();
  });
});
