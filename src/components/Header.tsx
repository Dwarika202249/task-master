import { Zap, CheckCircle, LayoutGrid } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTaskStats } from '../features/tasks/tasksSlice';

export default function Header() {
  const stats = useSelector(selectTaskStats);

  return (
    <header className="bg-[#2563EB] border-b border-border sticky top-0 z-50 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Task Master</h1>
              <p className="text-xs text-muted">Organize. Execute. Win.</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border">
              <LayoutGrid className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted"><span className="font-bold text-white">{stats.total}</span> tasks</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted"><span className="font-bold text-accent">{stats.completed}</span> done</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}