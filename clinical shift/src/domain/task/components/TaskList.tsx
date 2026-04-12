import type { Task } from '../types/task.types';
import TaskRow from './TaskRow';

interface Props {
  tasks: Task[];
  onComplete?: (taskId: string) => void;
  completingTaskId?: string | null;
  patientNames?: Record<string, string>;
  patientRooms?: Record<string, string>;
}

export default function TaskList({
  tasks,
  onComplete,
  completingTaskId,
  patientNames,
  patientRooms,
}: Props) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          patientName={patientNames?.[task.patientId]}
          patientRoom={patientRooms?.[task.patientId]}
          onComplete={
            onComplete && !task.completed
              ? () => onComplete(task.id)
              : undefined
          }
          isCompleting={completingTaskId === task.id}
        />
      ))}
    </div>
  );
}
//inja map yani roye tamameh tasks ha loop mizaneh va
//baraye har task yek taskRow besaz va task ro bean bedeh
