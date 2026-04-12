import type { Task } from '../../../domain/task/types/task.types';
import Card from '../../../shared/components/ui/Card';

interface Props {
  tasks: Task[];
}

export default function PendingTsksWidget({ tasks }: Props) {
  const pendingTasks = tasks.filter((task) => !task.completed).slice(0, 4);

  return (
    <Card
      title="Pending Tasks"
      actions={
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {pendingTasks.length} next up
        </span>
      }
    >
      {pendingTasks.length === 0 ? (
        <p className="bg-white p-4 text-sm text-slate-500">No pending tasks.</p>
      ) : (
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-medium text-slate-900">{task.title}</p>
              <p className="mt-1 text-sm text-slate-500">
                {task.type} • Due {task.dueTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
