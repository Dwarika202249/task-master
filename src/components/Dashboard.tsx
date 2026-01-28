import { ClipboardList, PieChart, Tag } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTaskStats, selectTasksByCategory } from '../features/tasks/tasksSlice';

export default function Dashboard() {
  const stats = useSelector(selectTaskStats);
  const byCategory = useSelector(selectTasksByCategory);

  const pct = (num: number) => (stats.total === 0 ? 0 : Math.round((num / stats.total) * 100));
  const pctCls = (n:number) => `w-pct-${Math.round(n/10)*10}`;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="space-y-4">

        {/* First Row: Total + Completion (two columns, equal height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Total Tasks */}
          <div className="p-6 rounded-xl bg-primary bg-[#cc8f00] text-white shadow-card hover:shadow-xl transition transform hover:-translate-y-1 animate-fade-in h-full">
            <div className="flex items-center gap-4 h-full">
              <div className="p-3 rounded-lg bg-white/12">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-medium text-white/90">Total tasks</div>
                  <div className="text-3xl font-extrabold mt-1 leading-tight text-white">{stats.total}</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-white text-xs">{stats.active} Active</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-white text-xs">{stats.completed} Done</span>
                </div>
              </div>
            </div>
          </div>

          {/* Completion */}
          <div className="p-6 rounded-xl bg-accent bg-[#22C55E] text-white shadow-card hover:shadow-xl transition transform hover:-translate-y-1 animate-fade-in h-full">
            <div className="flex items-center gap-4 h-full">
              <div className="p-3 rounded-lg bg-white/12">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-medium text-white/90">Completion</div>
                  <div className="text-3xl font-extrabold mt-1 leading-tight text-white">{pct(stats.completed)}%</div>

                  <div className="mt-4 w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div className={`h-3 rounded-full bg-white ${pctCls(pct(stats.completed))}`} />
                  </div>
                </div>

                <div className="text-xs text-white/80 mt-3">{stats.completed} completed • {stats.active} active</div>
              </div>
            </div>
          </div>

        </div>

        {/* Second Row: Category - full width and scrollable (fixed max height) */}
        <div className="p-6 rounded-xl bg-info bg-[#1682b1] text-white shadow-card hover:shadow-xl transition transform hover:-translate-y-1 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-white/12">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white/90">By Category</div>
              <div className="mt-3 space-y-2 max-h-60 overflow-auto">
                {Object.entries(byCategory).map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between gap-3 bg-white/6 rounded px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-6 rounded bg-white/20" />
                      <div>
                        <div className="text-sm font-semibold text-white">{cat}</div>
                        <div className="text-xs text-white/80">{count} task{count>1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white">{count}</div>
                  </div>
                ))}
                {Object.keys(byCategory).length === 0 && <div className="text-sm text-white/80">No categories yet</div>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}