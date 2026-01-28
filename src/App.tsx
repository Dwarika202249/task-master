import Header from './components/Header';
import TaskForm from './components/task/TaskForm';
import TaskList from './components/task/TaskList';
import { FilterBar } from './components/filters/FilterBar';
import { SearchBar } from './components/filters/SearchBar';

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-secondary via-slate-900 to-secondary">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Task Form Section */}
        <section className="mb-8">
          <TaskForm />
        </section>

        {/* Filter & Search Section */}
        <section className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <FilterBar />
          </div>
          <SearchBar />
        </section>

        {/* Task List Section */}
        <section>
          <TaskList />
        </section>
      </main>
    </div>
  );
}