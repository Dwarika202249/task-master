import TaskForm from './components/task/TaskForm';
import TaskList from './components/task/TaskList';
import { FilterBar } from './components/filters/FilterBar';
import { SearchBar } from './components/filters/SearchBar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-secondary text-white">

      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-6">
          <Dashboard />
        </section>
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