import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete, updateTask } from '../../features/tasks/tasksSlice';
import type { Task } from '../../types/task.types';
import { Trash2, Edit2, Save, X, GripVertical } from 'lucide-react';
import Badge from '../common/Badge';

const priorityColors = {
  high: { icon: '🔴', label: 'High' },
  medium: { icon: '🟡', label: 'Medium' },
  low: { icon: '🟢', label: 'Low' },
};

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const save = () => {
    if (title.trim()) {
      dispatch(updateTask({ id: task.id, changes: { title, description } }));
      setEditing(false);
    }
  };

  return (
    <div
      className={`group relative bg-linear-to-r from-surface to-secondary border border-border/50 rounded-xl p-4 mb-3 transition-all duration-200 hover:border-primary/30 hover:shadow-lg ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div className="hidden sm:flex items-center pt-1 text-muted group-hover:text-primary transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Checkbox */}
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTaskComplete(task.id))}
            aria-label={task.completed ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as complete`}
            className="w-5 h-5 cursor-pointer accent-accent"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-primary/50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Task title"
              />
              <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-primary/50 text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Description"
                rows={2}
              />
            </div>
          ) : (
            <>
              <div className={`font-semibold text-lg ${task.completed ? 'line-through text-muted' : 'text-white'}`}>
                {task.title}
              </div>
              {task.description && (
                <div className="text-sm text-muted mt-1">{task.description}</div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="default">
                  {task.category}
                </Badge>
                <Badge variant={task.priority as 'high' | 'medium' | 'low'}>
                  <span className="mr-1">{priorityColors[task.priority].icon}</span>
                  {priorityColors[task.priority].label}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {editing ? (
            <>
              <button
                onClick={save}
                className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-accent"
                title="Save changes"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={()=>setEditing(false)}
                className="p-2 hover:bg-danger/20 rounded-lg transition-colors text-danger"
                title="Cancel editing"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={()=>setEditing(true)}
                className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={()=>dispatch(deleteTask(task.id))}
                className="p-2 hover:bg-danger/20 rounded-lg transition-colors text-danger"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}