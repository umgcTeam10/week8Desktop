import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('StatusBar', () => {
  it('shows Choose your role when on role selection', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Choose your role');
  });

  it('shows Sign in when on sign-in screen', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: /care recipient/i }));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Sign in');
  });

  it('shows Home Dashboard when authenticated on dashboard', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: /care recipient/i }));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    await userEvent.type(screen.getByLabelText(/email address/i), 'u@e.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'password1');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Home Dashboard');
  });

  it('updates status when navigating to Health Logs', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: /care recipient/i }));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    await userEvent.type(screen.getByLabelText(/email address/i), 'u@e.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'password1');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    await userEvent.click(screen.getByRole('button', { name: /health logs/i }));
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Health Logs');
  });
});
