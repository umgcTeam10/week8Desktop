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
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
  });

  it('toolbar has role toolbar', () => {
    render(<App />);
    expect(screen.getByRole('toolbar', { name: /main toolbar/i })).toBeInTheDocument();
  });

  it('status bar has role contentinfo', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('ArrowDown and ArrowUp move focus between controls', async () => {
    render(<App />);
    const skip = screen.getByRole('link', { name: /skip to main content/i });
    const highContrastToggle = screen.getByRole('button', { name: /toggle high contrast/i });

    skip.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(highContrastToggle).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    expect(skip).toHaveFocus();
  });

  it('ArrowRight and ArrowLeft move focus sequentially', async () => {
    render(<App />);
    const highContrastToggle = screen.getByRole('button', { name: /toggle high contrast/i });
    const shortcutsButton = screen.getByRole('button', { name: /open keyboard shortcuts/i });

    highContrastToggle.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(shortcutsButton).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(highContrastToggle).toHaveFocus();
  });

  it('Home and End jump to first and last focusable controls', async () => {
    render(<App />);
    const skip = screen.getByRole('link', { name: /skip to main content/i });
    const highContrastToggle = screen.getByRole('button', { name: /toggle high contrast/i });
    const roleHelpButton = screen.getByRole('button', { name: /not sure which one/i });

    highContrastToggle.focus();
    await userEvent.keyboard('{End}');
    expect(roleHelpButton).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(skip).toHaveFocus();
  });
});
