import { Zap, CheckCircle, LayoutGrid } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskStats, selectAllTasks, replaceAllTasks } from '../features/tasks/tasksSlice';
import Button from './common/Button';
import { useRef } from 'react';

export default function Navbar() {
  const stats = useSelector(selectTaskStats);
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-export-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = async (f: File | null) => {
    if (!f) return;
    try {
      const text = await f.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('Invalid file format');

      // very light validation
      const valid = parsed.every((t: any) => typeof t.id === 'string' && typeof t.title === 'string');
      if (!valid) throw new Error('Invalid task objects in file');

      dispatch(replaceAllTasks(parsed));
      alert('Import successful');
    } catch (e: any) {
      console.error(e);
      alert('Failed to import tasks: ' + (e.message || e));
    }
  };

  return (
    <header className="bg-secondary bg-[#0F172A] border-b border-border sticky top-0 z-50 mb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary bg-[#2563EB] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">SyncQuark</h1>
              <p className="text-xs text-muted">Organize. Execute. Win.</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border">
              <LayoutGrid className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted"><span className="font-bold text-white">{stats.total}</span> tasks</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted"><span className="font-bold text-accent">{stats.completed}</span> done</span>
            </div>
            <div className="flex items-center gap-2">
              <input ref={fileRef} aria-label="Import tasks JSON file" onChange={(e)=>handleFile(e.target.files?.[0] ?? null)} type="file" accept="application/json" className="hidden" />
              <Button variant="secondary" size="sm" onClick={handleExport}>Export</Button>
              <Button variant="secondary" size="sm" onClick={()=>fileRef.current?.click()}>Import</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}