import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/ui/Button';
import type { Task } from '../types/task.types';

interface Props {
  task: Task;
  onComplete?: () => void;
  isCompleting?: boolean;
  patientName?: string;
  patientRoom?: string;
}

export default function TaskRow({
  task,
  onComplete,
  isCompleting = false,
  patientName,
  patientRoom,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:bg-slate-50 cursor-pointer"
    >
      <div>
        <p className="font-medium text-slate-900">{task.title}</p>

        <p className="mt-1 text-sm text-slate-500">
          {patientName ? `${patientName} • ` : ''}
          {patientRoom ? `Room ${patientRoom} • ` : ''}
          {task.type} • Due {task.dueTime}
        </p>

        <p className="mt-2 text-sm">
          {task.completed ? (
            <span className="font-medium text-emerald-600">Completed</span>
          ) : (
            <span className="font-medium text-amber-600">Pending</span>
          )}
        </p>
      </div>

      {!task.completed && onComplete && (
        <div className="ml-4">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onComplete?.();
            }}
            disabled={isCompleting}
          >
            {isCompleting ? 'Loading...' : 'Complete'}
          </Button>
        </div>
      )}
    </div>
  );
}

// taskRow just show a task means: title, type, dueTime, completed/ pending status

// why we need taskrow beacuse we want next list some tasks if we seperate from row cod will be clean and reusable,

// what this component do?
// it not to do data fetch, it has not hook, just get props and show UI
//so this is a presentational component
