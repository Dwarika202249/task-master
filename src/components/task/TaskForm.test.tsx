import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import tasksReducer from '../../features/tasks/tasksSlice';
import TaskForm from './TaskForm';

// Helper function to render component with a fresh Redux store
const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  });
  return {
    store,
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe('TaskForm Component', () => {
  it('renders all form elements correctly', () => {
    renderWithRedux(<TaskForm />);

    // Check Inputs
    expect(screen.getByLabelText(/Task Title \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    
    // Check Selects
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    
    // Check Button
    expect(screen.getByRole('button', { name: /Create Task/i })).toBeInTheDocument();
  });

  it('allows typing in input fields', () => {
    renderWithRedux(<TaskForm />);

    const titleInput = screen.getByLabelText(/Task Title \*/i) as HTMLInputElement;
    const descInput = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Learn Vitest' } });
    fireEvent.change(descInput, { target: { value: 'Write unit tests' } });

    expect(titleInput.value).toBe('Learn Vitest');
    expect(descInput.value).toBe('Write unit tests');
  });

  it('adds a new task to the store on submission', () => {
    const { store } = renderWithRedux(<TaskForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Task Title \*/i), { target: { value: 'New Redux Task' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Testing dispatch' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Work' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'high' } });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    // Check Redux State
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(1);
    expect(state.tasks.tasks[0].title).toBe('New Redux Task');
    expect(state.tasks.tasks[0].priority).toBe('high');
  });

  it('clears the form after successful submission', () => {
    renderWithRedux(<TaskForm />);

    const titleInput = screen.getByLabelText(/Task Title \*/i) as HTMLInputElement;
    const descInput = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;

    // Fill and submit
    fireEvent.change(titleInput, { target: { value: 'Task to Clear' } });
    fireEvent.change(descInput, { target: { value: 'Should be gone' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    // Verify inputs are empty
    expect(titleInput.value).toBe('');
    expect(descInput.value).toBe('');
  });

  it('does not submit if the title is empty', () => {
    const { store } = renderWithRedux(<TaskForm />);

    // Try to submit without title
    fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));

    // Check that no task was added
    const state = store.getState();
    expect(state.tasks.tasks).toHaveLength(0);
  });
});