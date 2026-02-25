import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('SOSConfirmModal', () => {
  const openSOS = async () => {
    await userEvent.keyboard('{Control>}{Shift>}e{/Shift}{/Control}');
  };

  it('opens with Ctrl+Shift+E and shows alertdialog', async () => {
    render(<App />);
    await openSOS();
    expect(screen.getByRole('alertdialog', { name: /emergency sos/i })).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to trigger emergency sos/i)).toBeInTheDocument();
  });

  it('Cancel and Confirm buttons present', async () => {
    render(<App />);
    await openSOS();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm sos/i })).toBeInTheDocument();
  });

  it('Cancel closes modal', async () => {
    render(<App />);
    await openSOS();
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('Confirm SOS closes modal', async () => {
    render(<App />);
    await openSOS();
    await userEvent.click(screen.getByRole('button', { name: /confirm sos/i }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});
