import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { DesktopProvider } from '../context/DesktopContext';
import { TasksScreen } from './TasksScreen';

describe('TasksScreen', () => {
  it('renders the overdue alert action as a button', () => {
    render(
      <DesktopProvider>
        <TasksScreen />
      </DesktopProvider>
    );

    const overdueAlert = screen.getByRole('alert');
    expect(within(overdueAlert).getByRole('button', { name: /view/i })).toBeInTheDocument();
  });
});
