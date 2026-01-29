import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice';
import type { Priority } from '../../types/task.types';
import { Plus, Tag, Zap } from 'lucide-react';
import Button from '../common/Button';

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState<Priority>('medium');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [priorityError, setPriorityError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError(null);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (descriptionError) {
      setDescriptionError(null);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    if (categoryError) {
      setCategoryError(null);
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
    if (priorityError) {
      setPriorityError(null);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Clear all previous errors
    setTitleError(null);
    setDescriptionError(null);
    setCategoryError(null);
    setPriorityError(null);

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    // Validate Title
    if (!trimmedTitle) {
      setTitleError('Task title cannot be empty.');
      hasError = true;
    }

    // Validate Description
    if (trimmedDescription.length > 0 && trimmedDescription.length < 5) {
      setDescriptionError('Description must be at least 5 characters long.');
      hasError = true;
    }
    if (trimmedDescription.length > 200) {
        setDescriptionError('Description cannot exceed 200 characters.');
        hasError = true;
    }

    // Validate Category
    const allowedCategories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];
    if (!allowedCategories.includes(category)) {
      setCategoryError('Invalid category selected.');
      hasError = true;
    }

    // Validate Priority
    const allowedPriorities: Priority[] = ['high', 'medium', 'low'];
    if (!allowedPriorities.includes(priority)) {
      setPriorityError('Invalid priority selected.');
      hasError = true;
    }

    if (hasError) {
      return; // Prevent form submission if there are errors
    }

    dispatch(addTask({ title: trimmedTitle, description: trimmedDescription, category, priority }));
    setTitle('');
    setDescription('');
    setCategory('Work');
    setPriority('medium');
  };

  return (
    <form onSubmit={submit} className="bg-[#11111a] border border-border rounded-2xl p-6 shadow-card space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-muted mb-2">Task Title *</label>
        <input
          id="title"
          className={`w-full px-4 py-3 rounded-xl bg-[#302f40] border ${titleError ? 'border-red-500' : 'border-border'} text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
          onChange={handleTitleChange}
          placeholder="What needs to be done?"
          value={title}
          type="text"
        />
        {titleError && (
          <p id="title-error" className="text-red-500 text-xs mt-1">{titleError}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-muted mb-2">Description</label>
        <textarea
          id="description"
          className={`w-full px-4 py-3 rounded-xl bg-[#302f40] border ${descriptionError ? 'border-red-500' : 'border-border'} text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none`}
          placeholder="Add details (optional)"
          rows={2}
          value={description}
          onChange={handleDescriptionChange}
        />
        {descriptionError && (
          <p id="description-error" className="text-red-500 text-xs mt-1">{descriptionError}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor="category" className="text-sm font-semibold text-muted mb-2 flex items-center gap-1">
            <Tag className="w-4 h-4" /> Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={`w-full px-4 py-2 rounded-lg bg-[#302f40] border ${categoryError ? 'border-red-500' : 'border-border'} text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Other</option>
          </select>
          {categoryError && (
            <p id="category-error" className="text-red-500 text-xs mt-1">{categoryError}</p>
          )}
        </div>

        <div>
          <label htmlFor="priority" className="text-sm font-semibold text-muted mb-2 flex items-center gap-1">
            <Zap className="w-4 h-4" /> Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
            className={`w-full px-4 py-2 rounded-lg bg-[#302f40] border ${priorityError ? 'border-red-500' : 'border-border'} text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {priorityError && (
            <p id="priority-error" className="text-red-500 text-xs mt-1">{priorityError}</p>
          )}
        </div>

        <div className="flex items-end">
          <Button type="submit" size="md" icon={<Plus className="w-4 h-4" />} className="w-full">
            Create Task
          </Button>
        </div>
      </div>
    </form>
  );
}