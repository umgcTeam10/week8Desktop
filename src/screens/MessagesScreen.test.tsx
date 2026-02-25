import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderAuthenticatedApp } from '../testUtils';

describe('MessagesScreen', () => {
  it('navigates to Messages and shows conversation and SOS', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /^messages$/i }));
    expect(screen.getByRole('heading', { name: 'Robert Martinez' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /emergency sos/i })).toBeInTheDocument();
  });
});
