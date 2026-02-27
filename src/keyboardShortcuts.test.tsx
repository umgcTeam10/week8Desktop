import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAuthenticatedApp } from './testUtils';

describe('Keyboard shortcuts', () => {
  it('Ctrl+H navigates to Health Logs when authenticated', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}h{/Control}');
    expect(screen.getByRole('heading', { name: 'Health Logs' })).toBeInTheDocument();
  });

  it('Ctrl+M navigates to Messages when authenticated', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}m{/Control}');
    expect(screen.getByRole('heading', { name: 'Robert Martinez' })).toBeInTheDocument();
  });

  it('Ctrl+K navigates to Calendar when authenticated', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}k{/Control}');
    expect(screen.getByRole('heading', { name: 'Calendar' })).toBeInTheDocument();
  });

  it('Ctrl+N opens New Log modal when authenticated', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}n{/Control}');
    expect(screen.getByRole('dialog', { name: /new log entry/i })).toBeInTheDocument();
  });

  it('Ctrl+F navigates to Search when authenticated', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}f{/Control}');
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
  });

  it('Ctrl+Comma navigates to Profile when authenticated', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>},');
    expect(screen.getByRole('heading', { name: /profile & settings/i })).toBeInTheDocument();
  });

  it('Ctrl+Shift+E opens SOS confirmation modal', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}{Shift>}e{/Shift}{/Control}');
    expect(screen.getByRole('alertdialog', { name: /emergency sos/i })).toBeInTheDocument();
  });

  it('Escape closes keyboard shortcuts modal', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole('button', { name: /open keyboard shortcuts/i }));
    expect(screen.getByRole('dialog', { name: /keyboard shortcuts/i })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
