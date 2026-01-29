import { describe, it, expect } from 'vitest';
import tasksReducer, { addTask, deleteTask, toggleTaskComplete } from './tasksSlice';
import type { Task, Filter } from '../../types/task.types';

interface TasksState {
  tasks: Task[];
  filter: Filter;
  searchQuery: string;
}

describe('tasksSlice', () => {
  // Initial state mein 'filter' aur 'searchQuery' add
  const initialState: TasksState = {
    tasks: [],
    filter: 'all',
    searchQuery: '',
  };

  it('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTask', () => {
    // Note: addTask action creator naya ID aur timestamp generate karega (prepare callback ke through),
    // isliye hum input mein ID ya dates pass nahi karte.
    const taskInput = {
      title: 'Test Task',
      description: 'Test Desc',
      category: 'Work',
      priority: 'high' as const,
    };

    const actual = tasksReducer(initialState, addTask(taskInput));

    expect(actual.tasks.length).toEqual(1);
    expect(actual.tasks[0].title).toEqual('Test Task');
    expect(actual.tasks[0].completed).toEqual(false); // Default false hona chahiye
    expect(actual.tasks[0].id).toBeDefined(); // ID generate honi chahiye
  });

  it('should handle toggleTaskComplete', () => {
    const task: Task = {
      id: '1',
      title: 'Test Task',
      description: 'Desc',
      completed: false,      //Start with false to test toggle to true
      priority: 'low',
      category: 'Other',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Fix 3: State object poora define kiya (tasks + filter + searchQuery)
    const stateWithTask: TasksState = {
      tasks: [task],
      filter: 'all',
      searchQuery: ''
    };

    const actual = tasksReducer(stateWithTask, toggleTaskComplete('1'));
    
    // Toggle ke baad true hona chahiye
    expect(actual.tasks[0].completed).toEqual(true);
  });

  it('should handle deleteTask', () => {
    const task: Task = {
      id: '1',
      title: 'Delete Me',
      description: 'Desc',
      completed: false,
      priority: 'low',
      category: 'Other',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const stateWithTask: TasksState = {
      tasks: [task],
      filter: 'all',
      searchQuery: ''
    };

    const actual = tasksReducer(stateWithTask, deleteTask('1'));
    
    expect(actual.tasks.length).toEqual(0);
  });
});