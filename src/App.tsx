import TaskForm from './components/task/TaskForm';
import TaskList from './components/task/TaskList';
import { FilterBar } from './components/filters/FilterBar';
import { SearchBar } from './components/filters/SearchBar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Background from './components/common/Background';

export default function App() {
  return (
    <div className="min-h-screen bg-secondary text-white relative">

      <Background />
      <Navbar />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-2">
          <section className="mb-6 flex-1">
          <Dashboard />
        </section>
        {/* Task Form Section */}
        <section className="mb-8 flex-1">
          <h2 className="text-4xl font-extrabold text-muted text-center mb-3 text-white">Add Task</h2>
          <TaskForm />
        </section>
        </section>

        {/* Filter & Search Section */}
        <section className="mb-6 space-y-4 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <FilterBar />
          </div>
          <SearchBar />
        </section>

        {/* Task List Section */}
        <section className="max-w-6xl mx-auto">
          <TaskList />
        </section>
      </main>
    </div>
  );
}