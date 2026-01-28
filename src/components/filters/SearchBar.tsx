import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../features/tasks/tasksSlice';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const dispatch = useDispatch();
  const [q, setQ] = useState('');

  useEffect(() => {
    const t = setTimeout(() => dispatch(setSearchQuery(q)), 250);
    return () => clearTimeout(t);
  }, [q, dispatch]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
      <input
        className="w-full pl-12 pr-10 py-3 rounded-xl bg-surface border border-border text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        placeholder="Search tasks..."
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      {q && (
        <button
          type="button"
          aria-label="Clear search"
          title="Clear search"
          onClick={() => setQ('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}