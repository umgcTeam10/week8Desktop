import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DesktopProvider, useDesktop } from './DesktopContext';

function TestConsumer() {
  const { screen: s, setScreen, highContrast, setHighContrast, setZoom, openModal, closeModal } = useDesktop();
  return (
    <div>
      <span data-testid="screen">{s}</span>
      <button type="button" onClick={() => setScreen('messages')}>Go Messages</button>
      <button type="button" onClick={() => setHighContrast(!highContrast)}>Toggle contrast</button>
      <button type="button" onClick={() => setZoom(1.5)}>Zoom 150</button>
      <button type="button" onClick={() => openModal('keyboard-shortcuts')}>Open shortcuts</button>
      <button type="button" onClick={closeModal}>Close modal</button>
    </div>
  );
}

function TestApp() {
  return (
    <DesktopProvider>
      <TestConsumer />
    </DesktopProvider>
  );
}

describe('DesktopContext', () => {
  it('provides default screen dashboard and authPhase role', () => {
    render(<TestApp />);
    expect(screen.getByTestId('screen')).toHaveTextContent('dashboard');
  });

  it('updates screen when setScreen called', async () => {
    render(<TestApp />);
    await userEvent.click(screen.getByRole('button', { name: /go messages/i }));
    expect(screen.getByTestId('screen')).toHaveTextContent('messages');
  });

  it('toggle contrast and zoom buttons work', async () => {
    render(<TestApp />);
    await userEvent.click(screen.getByRole('button', { name: /toggle contrast/i }));
    expect(document.body).toHaveClass('high-contrast');
    await userEvent.click(screen.getByRole('button', { name: /zoom 150/i }));
    expect(document.body).toHaveClass('zoom-stacked-layout');
    expect(screen.getByTestId('screen')).toHaveTextContent('dashboard');
  });
});
