import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilter } from '../../features/tasks/tasksSlice';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';

const filterConfig = [
  { id: 'all', label: 'All Tasks', icon: ListTodo },
  { id: 'active', label: 'Active', icon: Circle },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
] as const;

export function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className="flex gap-2 flex-wrap">
      {filterConfig.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => dispatch(setFilter(id))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === id
              ? 'bg-linear-to-r from-primary to-blue-500 text-white shadow-lg'
              : 'bg-surface border border-border/50 text-muted hover:border-primary/30 hover:text-white'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}