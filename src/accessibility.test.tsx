import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Accessibility', () => {
  it('tab order: skip link is first focusable', async () => {
    render(<App />);
    await userEvent.tab();
    const skip = screen.getByText('Skip to main content');
    expect(skip).toHaveFocus();
  });

  it('skip link has href to main content', () => {
    render(<App />);
    expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main-content');
  });

  it('main has id main-content', () => {
    render(<App />);
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });

  it('toolbar has role toolbar', () => {
    render(<App />);
    expect(screen.getByRole('toolbar', { name: /main toolbar/i })).toBeInTheDocument();
  });

  it('status bar has role contentinfo', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
