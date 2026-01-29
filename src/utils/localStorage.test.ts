import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadState, saveState } from './localStorage';
import type { Task } from '../types/task.types';

describe('localStorage utils', () => {
  // Key must match the constant in localStorage.ts
  const KEY = 'task-tracker-state-v1';

  beforeEach(() => {
    // Restore mocks to ensure clean state for each test
    vi.restoreAllMocks();
    
    // Clear localStorage
    localStorage.clear();
    
    // Setup spies
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('should return undefined if localStorage is empty', () => {
    expect(loadState()).toBeUndefined();
  });

  it('should save and load state correctly', () => {
    // Ensure mockState follows the correct type shape
    const mockState: { tasks: Task[] } = { tasks: [] };
    
    saveState(mockState);
    
    // Use the correct KEY variable
    expect(localStorage.setItem).toHaveBeenCalledWith(KEY, JSON.stringify(mockState));
    
    // Mock return value for getItem
    // Using the spy directly is safer for TypeScript
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(mockState));
    
    const loaded = loadState();
    expect(loaded).toEqual(mockState);
  });
});