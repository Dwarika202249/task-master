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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title: title.trim(), description, category, priority }));
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={submit} className="bg-[#111827] border border-border rounded-2xl p-6 shadow-card space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-muted mb-2">Task Title *</label>
        <input
          id="title"
          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-border text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-muted mb-2">Description</label>
        <textarea
          id="description"
          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-border text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
          placeholder="Add details (optional)"
          rows={2}
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor="category" className="text-sm font-semibold text-muted mb-2 flex items-center gap-1">
            <Tag className="w-4 h-4" /> Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0F172A] border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="text-sm font-semibold text-muted mb-2 flex items-center gap-1">
            <Zap className="w-4 h-4" /> Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e)=>setPriority(e.target.value as Priority)}
            className="w-full px-4 py-2 rounded-lg bg-[#0F172A] border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
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