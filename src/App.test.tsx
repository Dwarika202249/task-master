import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeAll } from 'vitest';
import tasksReducer from './features/tasks/tasksSlice';
import App from './App';
import type { Filter, Task } from './types/task.types';

interface TasksState {
  tasks: Task[];
  filter: Filter;
  searchQuery: string;
}

// --- MOCKS & SETUP ---

// Mock ResizeObserver for @hello-pangea/dnd to work in JSDOM
beforeAll(() => {
  window.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  };
});

// Helper to render App with a fresh Redux store for every test
const renderApp = () => {
  // Explicitly type the initial state for the 'tasks' slice
  const initialTasksState: TasksState = {
    tasks: [],
    filter: 'all', // Now, 'all' will be checked against the 'Filter' type defined within TasksState
    searchQuery: ''
  };
  const store = configureStore({
    reducer: { tasks: tasksReducer },
    // Provide the preloadedState, ensuring the 'tasks' property has the correct type
    preloadedState: {
      tasks: initialTasksState
    }
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  };
};

describe('SyncQuark Application Flow (A to Z)', () => {

  it('handles the full lifecycle of a task: Create, Edit, Complete, Delete', async () => {
    renderApp();

    // 1. INITIAL STATE: Check for Empty State
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();

    // --- CREATE PHASE ---
    const titleInput = screen.getByPlaceholderText(/What needs to be done/i);
    const descInput = screen.getByPlaceholderText(/Add details/i);
    const categorySelect = screen.getByLabelText(/Category/i);
    const prioritySelect = screen.getByLabelText(/Priority/i);
    const createBtn = screen.getByRole('button', { name: /Create Task/i });

    // Fill Form
    fireEvent.change(titleInput, { target: { value: 'Fix Unit Tests' } });
    fireEvent.change(descInput, { target: { value: 'Write integration tests for App' } });
    fireEvent.change(categorySelect, { target: { value: 'Work' } });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });

    // Submit
    fireEvent.click(createBtn);

    // Verify Creation
    expect(screen.getByText('Fix Unit Tests')).toBeInTheDocument();
    expect(screen.getByText('Write integration tests for App')).toBeInTheDocument();
    expect(screen.getByText('Work', { selector: 'span.badge-solid' })).toBeInTheDocument(); // Badge
    expect(screen.getByText('High', { selector: 'span.badge-solid' })).toBeInTheDocument(); // Badge

    // Verify Input Clearing
    expect(titleInput).toHaveValue('');

    // --- EDIT PHASE ---
    // Find the task card
    const taskCard = screen.getByText('Fix Unit Tests').closest('div.group') as HTMLElement;
    const editBtn = within(taskCard).getByLabelText(/Edit task/i);

    // Enter Edit Mode
    fireEvent.click(editBtn);

    // Check if inputs are populated
    const editTitleInput = within(taskCard).getByLabelText(/Edit task title/i);
    const editCategorySelect = within(taskCard).getByLabelText(/Edit category/i);

    expect(editTitleInput).toHaveValue('Fix Unit Tests');
    expect(editCategorySelect).toHaveValue('Work');

    // Change Values
    fireEvent.change(editTitleInput, { target: { value: 'Fix ALL Tests' } });
    fireEvent.change(editCategorySelect, { target: { value: 'Personal' } });

    // Save
    const saveBtn = within(taskCard).getByLabelText(/Save changes/i);
    fireEvent.click(saveBtn);

    // Verify Updates
    expect(screen.getByText('Fix ALL Tests')).toBeInTheDocument();
    expect(screen.getByText('Personal', { selector: 'span.badge-solid' })).toBeInTheDocument();
    expect(screen.queryByText('Fix Unit Tests')).not.toBeInTheDocument();

    // --- COMPLETE PHASE ---
    const checkbox = within(taskCard).getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    // Toggle Complete
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Check Visual Indication (Opacity/Strikethrough)
    // Note: Checking specific classes depends on Tailwind setup, but we can verify class presence
    expect(taskCard).toHaveClass('opacity-60');
    expect(screen.getByText('Fix ALL Tests')).toHaveClass('line-through');

    // --- DELETE PHASE ---
    const deleteBtn = within(taskCard).getByLabelText(/Delete task/i);
    fireEvent.click(deleteBtn);

    // Verify Removal
    expect(screen.queryByText('Fix ALL Tests')).not.toBeInTheDocument();
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it('filters tasks correctly using Search (with Debounce)', async () => {
    renderApp();

    const titleInput = screen.getByPlaceholderText(/What needs to be done/i);
    const createBtn = screen.getByRole('button', { name: /Create Task/i });

    // Helper to add task
    const addTask = (title: string) => {
      fireEvent.change(titleInput, { target: { value: title } });
      fireEvent.click(createBtn);
    };

    // Add 3 Tasks
    addTask('Buy Groceries');
    addTask('Walk the Dog');
    addTask('Buy Milk');

    // Verify all are present
    expect(screen.getByText('Buy Groceries')).toBeInTheDocument();
    expect(screen.getByText('Walk the Dog')).toBeInTheDocument();
    expect(screen.getByText('Buy Milk')).toBeInTheDocument();

    // Perform Search
    const searchInput = screen.getByPlaceholderText(/Search tasks/i);
    fireEvent.change(searchInput, { target: { value: 'Buy' } });

    // Wait for Debounce and Filter
    await waitFor(() => {
      // 'Walk the Dog' should disappear
      expect(screen.queryByText('Walk the Dog')).not.toBeInTheDocument();
    }, { timeout: 1000 });

    // 'Buy' items should remain
    expect(screen.getByText('Buy Groceries')).toBeInTheDocument();
    expect(screen.getByText('Buy Milk')).toBeInTheDocument();

    // Clear Search
    const clearBtn = screen.getByLabelText(/Clear search/i);
    fireEvent.click(clearBtn);

    // Wait for 'Walk the Dog' to return
    await waitFor(() => {
      expect(screen.getByText('Walk the Dog')).toBeInTheDocument();
    });
  });

  


});