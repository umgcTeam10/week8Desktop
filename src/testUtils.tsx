import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

/**
 * Renders App, completes role selection (Care Recipient) and sign-in with valid credentials,
 * so the main app (Dashboard + sidebar) is visible. Use for tests that need authenticated state.
 */
export async function renderAuthenticatedApp() {
  render(<App />);
  await userEvent.click(screen.getByRole('radio', { name: /i'm a care recipient/i }));
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
  await userEvent.type(screen.getByLabelText(/email address/i), 'user@example.com');
  await userEvent.type(screen.getByLabelText('Password *'), 'password1');
  await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByRole('heading', { name: /home dashboard/i })).toBeInTheDocument();
}
