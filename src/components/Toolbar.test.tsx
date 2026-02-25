import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Toolbar', () => {
  it('shows high contrast toggle and zoom indicator', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /toggle high contrast/i })).toBeInTheDocument();
    expect(screen.getByText(/zoom: 100%/i)).toBeInTheDocument();
  });

  it('toggling high contrast updates button text', async () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /toggle high contrast/i });
    await userEvent.click(btn);
    expect(btn).toHaveTextContent('High contrast on');
  });

  it('zoom in increases zoom display', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /zoom in/i }));
    expect(screen.getByText(/zoom: 125%/i)).toBeInTheDocument();
  });

  it('zoom out decreases zoom display', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /zoom out/i }));
    expect(screen.getByText(/zoom: 75%/i)).toBeInTheDocument();
  });
});
