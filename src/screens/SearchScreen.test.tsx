import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAuthenticatedApp } from '../testUtils';

describe('SearchScreen', () => {
  it('navigates to Search via Ctrl+F and shows search input', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}f{/Control}');
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: /search/i })).toBeInTheDocument();
  });

  it('typing in search filters and shows results', async () => {
    await renderAuthenticatedApp();
    await userEvent.keyboard('{Control>}f{/Control}');
    await userEvent.type(screen.getByRole('searchbox'), 'blood');
    expect(screen.getByRole('heading', { name: 'Health logs' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /search results - health logs/i })).toHaveTextContent('Blood pressure');
  });
});
