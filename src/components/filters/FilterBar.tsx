import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectFilter } from '../../features/tasks/tasksSlice';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';

const filterConfig = [
  { id: 'all', label: 'All Tasks', icon: ListTodo },
  { id: 'active', label: 'Active', icon: Circle },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
] as const;

import Button from '../common/Button';

export function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-2 items-center justify-center">
      {filterConfig.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          onClick={() => dispatch(setFilter(id))}
          variant={filter === id ? 'primary' : 'secondary'}
          size="sm"
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
          aria-pressed={filter === id}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}