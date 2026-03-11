import React from 'react';
import { render, screen } from '@testing-library/react';
import { DesktopProvider } from '../context/DesktopContext';
import { RoleSelectionScreen } from './RoleSelectionScreen';
import { SignInScreen } from './SignInScreen';

function renderWithDesktop(ui: React.ReactElement) {
  return render(<DesktopProvider>{ui}</DesktopProvider>);
}

describe('RoleSelectionScreen', () => {
  it('shows the role help action as a button with a clear accessible name', () => {
    renderWithDesktop(<RoleSelectionScreen />);

    expect(screen.getByRole('button', { name: /not sure which one/i })).toBeInTheDocument();
  });
});

describe('SignInScreen', () => {
  it('renders the forgot password action as a link', () => {
    renderWithDesktop(<SignInScreen />);

    expect(screen.getByRole('link', { name: /forgot password/i })).toHaveAttribute('href', '#forgot');
  });
});
