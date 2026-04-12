import { useParams } from 'react-router';
import {useTasks} from '../../domain/task/hooks/useTasks';
import Skeleton from '../../shared/components/ui/Skeleton';
import Card from '../../shared/components/ui/Card';

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 text-red-700 p-6 text-sm bg-red-50">
        Failed to load task.
      </div>
    );
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Task not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Task Dtail
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">{task.title}</h1>
        <p className="text-sm text-slate-500">review task status and timing</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-slate-500">Task type</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {task.type}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">Due time</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {task.dueTime}
          </p>
        </Card>

        <Card>
          <p>Status</p>
          <p
            className={`mt-2 text-lg font-semibold ${
              task.completed ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {task.completed ? 'Completed' : 'pending'}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">Task ID</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {task.id}
          </p>
        </Card>
      </div>
    </div>
  );
}

/**
 * ⚡ جمله مهم

👉 "useParams reads dynamic parts of the URL."
 */
