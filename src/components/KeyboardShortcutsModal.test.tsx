import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('KeyboardShortcutsModal', () => {
  it('opens from toolbar and shows title and shortcut list', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /open keyboard shortcuts/i }));
    const dialog = screen.getByRole('dialog', { name: /keyboard shortcuts/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent('Ctrl+H');
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('is accessible with aria-modal', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /open keyboard shortcuts/i }));
    const dialog = screen.getByRole('dialog', { name: /keyboard shortcuts/i });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('close button closes modal', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /open keyboard shortcuts/i }));
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
