import { useSelector } from 'react-redux';
import { selectTaskStats, selectTasksByCategory } from '../features/tasks/tasksSlice';

export default function Dashboard() {
  const stats = useSelector(selectTaskStats);
  const byCategory = useSelector(selectTasksByCategory);

  const pct = (num: number) => (stats.total === 0 ? 0 : Math.round((num / stats.total) * 100));
  const pctCls = (n:number) => `w-pct-${Math.round(n/10)*10}`;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface bg-[#111827] border border-border">
          <div className="text-sm text-muted">Total tasks</div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-xs text-muted">{stats.active} active • {stats.completed} completed</div>
        </div>

        <div className="p-4 rounded-xl bg-surface bg-[#111827] border border-border">
          <div className="text-sm text-muted">Completion</div>
          <div className="mt-2 w-full bg-border rounded-full h-3 overflow-hidden">
            <div className={`h-3 rounded-full bg-accent ${pctCls(pct(stats.completed))}`} />
          </div>
          <div className="text-xs text-muted mt-2">{pct(stats.completed)}% completed</div>
        </div>

        <div className="p-4 rounded-xl bg-surface bg-[#111827] border border-border">
          <div className="text-sm text-muted">By Category</div>
          <div className="mt-2 space-y-2">
            {Object.entries(byCategory).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className="w-2 h-6 rounded bg-primary" />
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">{cat}</div>
                  <div className="text-xs text-muted">{count} task{count>1 ? 's' : ''}</div>
                </div>
                <div className="text-sm font-bold text-white">{count}</div>
              </div>
            ))}
            {Object.keys(byCategory).length === 0 && <div className="text-sm text-muted">No categories yet</div>}
          </div>
        </div>
      </div>
    </section>
  );
}