import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete, updateTask } from '../../features/tasks/tasksSlice';
import type { Task } from '../../types/task.types';
import { Trash2, Edit2, Save, X, GripVertical } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState(task.category || '');
  const [priority, setPriority] = useState<Task['priority']>(task.priority);

  const CATEGORY_OPTIONS = ['Work','Personal','Shopping','Health','Other'];

  const save = () => {
    if (title.trim()) {
      dispatch(updateTask({ id: task.id, changes: { title, description, category, priority } }));
      setEditing(false);
    }
  };

  return (
    <div
      className={`group relative bg-surface bg-[#111827] border border-border rounded-xl p-4 mb-3 transition-all duration-200 hover:border-primary hover:shadow-lg transform hover:-translate-y-0.5 ${
        task.completed ? 'opacity-60' : ''
      } ${task.priority === 'high' ? 'border-l-4 border-danger border-l-[#EF4444]' : task.priority === 'medium' ? 'border-l-4 border-warning border-l-[#F59E0B]' : 'border-l-4 border-accent border-l-[#22C55E]'}`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <button aria-label="Drag handle" className="hidden sm:inline-flex items-center pt-1 text-muted transition-colors cursor-grab p-2">
          <GripVertical className="w-4 h-4 text-muted" />
        </button>

        {/* Checkbox */}
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTaskComplete(task.id))}
            aria-label={task.completed ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as complete`}
            className="w-5 h-5 rounded-md border border-border bg-secondary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors accent-[#22C55E]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#302f40] border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Edit category"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c} className="bg-[#302f40] text-white">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value as Task['priority'])}
                    className="w-full px-3 py-2 rounded-lg bg-[#302f40] border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Edit priority"
                  >
                    <option value="high" className="bg-[#302f40] text-white">High</option>
                    <option value="medium" className="bg-[#302f40] text-white">Medium</option>
                    <option value="low" className="bg-[#302f40] text-white">Low</option>
                  </select>
                </div>
              </div>

              <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Task title"
                aria-label="Edit task title"
              />
              <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Description"
                rows={2}
                aria-label="Edit task description"
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
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge variant="default">{task.category}</Badge>
                <Badge variant={task.priority}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</Badge>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {editing ? (
            <>
              <Button onClick={save} variant="ghost" size="sm" className="text-accent" aria-label="Save changes">
                <Save className="w-4 h-4" />
              </Button>
              <Button onClick={()=>setEditing(false)} variant="ghost" size="sm" className="text-danger" aria-label="Cancel editing">
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => { setTitle(task.title); setDescription(task.description || ''); setCategory(task.category || ''); setPriority(task.priority); setEditing(true); }} variant="ghost" size="sm" className="text-primary" aria-label="Edit task">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button onClick={()=>dispatch(deleteTask(task.id))} variant="ghost" size="sm" className="text-danger" aria-label="Delete task">
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}