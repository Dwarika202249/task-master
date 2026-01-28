import { Zap, CheckCircle, TrendingUp } from 'lucide-react';

export default function Header() {
  const totalStats = { total: 0, completed: 0, active: 0 };

  return (
    <header className="bg-linear-to-r from-secondary via-slate-800 to-secondary border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-primary to-blue-500 rounded-xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Task Master
              </h1>
              <p className="text-xs text-muted">Organize. Execute. Dominate.</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/50 border border-border/50">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted">
                <span className="font-bold text-white">{totalStats.total}</span> tasks
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/50 border border-border/50">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted">
                <span className="font-bold text-accent">{totalStats.completed}</span> done
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
