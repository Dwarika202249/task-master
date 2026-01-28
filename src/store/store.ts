import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloaded = loadState();

// derive the slice initial state from the reducer so types (e.g. Filter) align
const initialTasksState = tasksReducer(undefined, { type: '@@INIT' } as any);

export const store = configureStore({
  reducer: { tasks: tasksReducer },
  preloadedState: preloaded ? { tasks: { ...initialTasksState, ...preloaded } } : undefined,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({ tasks: state.tasks.tasks });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;