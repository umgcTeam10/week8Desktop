import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesktopProvider, useDesktop } from '../context/DesktopContext';
import { NewLogModal } from './NewLogModal';

function TestWrapper() {
  const { modal, openModal } = useDesktop();
  return (
    <>
      <button type="button" onClick={() => openModal('new-log')}>Open New Log</button>
      {modal === 'new-log' && <NewLogModal />}
    </>
  );
}

function renderWithProvider() {
  return render(
    <DesktopProvider>
      <TestWrapper />
    </DesktopProvider>
  );
}

describe('NewLogModal', () => {
  it('renders dialog with Blood Pressure fields when opened', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: /open new log/i }));
    expect(screen.getByRole('dialog', { name: /new log entry/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/systolic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diastolic/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('SP-01: Save with empty Systolic shows required error', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: /open new log/i }));
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/systolic value is required/i)).toBeInTheDocument();
  });

  it('SP-02: Systolic out of range shows validation error', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: /open new log/i }));
    await userEvent.type(screen.getByLabelText(/systolic/i), '999');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/between 50 and 300/i)).toBeInTheDocument();
  });

  it('HP-01: Valid Blood Pressure saves and closes', async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole('button', { name: /open new log/i }));
    await userEvent.type(screen.getByLabelText(/systolic/i), '120');
    await userEvent.type(screen.getByLabelText(/diastolic/i), '80');
    await userEvent.type(screen.getByLabelText(/heart rate/i), '72');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Cancel closes modal', async () => {
    renderWithProvider();
    const openButton = screen.getByRole('button', { name: /open new log/i });
    await userEvent.click(openButton);
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  });
});
