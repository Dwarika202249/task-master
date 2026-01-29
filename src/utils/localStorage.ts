import type { Task } from '../types/task.types';

const KEY = 'task-tracker-state-v1';

export function loadState(): { tasks: Task[] } | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function saveState(state: { tasks: Task[] }) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage', error);
    
  }
}