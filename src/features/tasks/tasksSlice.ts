import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Task, Priority, Filter } from '../../types/task.types';
import { v4 as uuid } from 'uuid';

interface TasksState {
  tasks: Task[];
  filter: Filter;
  searchQuery: string;
}

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
  searchQuery: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.tasks.unshift(action.payload);
      },
      prepare(payload: { title: string; description?: string; category: string; priority: Priority }) {
        const now = Date.now();
        return {
          payload: {
            id: uuid(),
            title: payload.title,
            description: payload.description || '',
            category: payload.category,
            priority: payload.priority,
            completed: false,
            createdAt: now,
            updatedAt: now,
          } as Task,
        };
      },
    },
    updateTask(state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) {
      const t = state.tasks.find((x) => x.id === action.payload.id);
      if (t) {
        Object.assign(t, action.payload.changes, { updatedAt: Date.now() });
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskComplete(state, action: PayloadAction<string>) {
      const t = state.tasks.find((x) => x.id === action.payload);
      if (t) {
        t.completed = !t.completed;
        t.updatedAt = Date.now();
      }
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    reorderTasks(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const [item] = state.tasks.splice(from, 1);
      if (item) state.tasks.splice(to, 0, item);
    },
    replaceAllTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setFilter,
  setSearchQuery,
  reorderTasks,
  replaceAllTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;

/* SELECTORS */
export const selectTasksState = (state: any) => state.tasks as TasksState;
export const selectAllTasks = (state: any) => selectTasksState(state).tasks;
export const selectFilter = (state: any) => selectTasksState(state).filter;
export const selectSearchQuery = (state: any) => selectTasksState(state).searchQuery;

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilter, selectSearchQuery],
  (tasks, filter, query) => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filter === 'active' && t.completed) return false;
      if (filter === 'completed' && !t.completed) return false;
      if (!q) return true;
      return t.title.toLowerCase().includes(q);
    });
  }
);