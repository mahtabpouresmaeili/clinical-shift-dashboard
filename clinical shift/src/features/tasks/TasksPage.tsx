import { useState } from 'react';
import TaskList from '../../domain/task/components/TaskList';
import { usePatients } from '../../domain/patient/hooks/usePatients';
import type { Patient } from '../../domain/patient/types/patient.typs';

import {
  getCompletedTasks,
  getPendingTasks,
  getTaskSummary,
  searchTasks,
} from '../../domain/task/utils/taskSelectors';
import Input from '../../shared/components/ui/Input';
import Skeleton from '../../shared/components/ui/Skeleton';
import {useTasks} from '../../domain/task/hooks/useTasks';
import Card from '../../shared/components/ui/Card';
import { useUpdatTask } from '../../domain/task/hooks/useUpdateTask';
import AddTaskForm from '../../domain/task/components/AddtaskForm';

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { patients } = usePatients();
  const { update, loading: updating } = useUpdatTask();
  const [search, setSearch] = useState('');

  const visibleTasks = searchTasks(tasks, search);
  const summary = getTaskSummary(tasks);
  const pendingTasks = getPendingTasks(visibleTasks);
  const completedTasks = getCompletedTasks(visibleTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const patientNames = Object.fromEntries(
    patients.map((p: Patient) => [p.id, p.name])
  );

  const patientRooms = Object.fromEntries(
    patients.map((p: Patient) => [p.id, p.room])
  );

  async function handelCompletetTask(taskId: string) {
    setActiveTaskId(taskId);

    try {
      await update(taskId, { completed: true });
    } finally {
      setActiveTaskId(null);
    }
  }

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load tasks.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
        <p className="text-sm text-slate-500">
          Monitor and manage patient tasks
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Pending Tsks</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {summary.pendingCount}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-emerald-600">Completed</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {summary.pendingCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-rose-700">Medication due</p>
          <p className="mt-2 text-3xl font-bold text-rose-700">
            {summary.medicationDueCount}
          </p>
        </Card>
      </div>

      <AddTaskForm/>

      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Search task title, type, or due time"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {pendingTasks.length > 0 && (
        <section className="space-y-3">
          <div className="">
            <h2 className="text-lg font-semibold text-slate-900">
              Outstanding now
            </h2>
            <p className="text-sm text-slate-500">
              Complete tasks to keep the handoff board current.
            </p>
          </div>
          <TaskList
            tasks={pendingTasks}
            onComplete={handelCompletetTask}
            completingTaskId={updating ? activeTaskId : null}
            patientNames={patientNames}
            patientRooms={patientRooms}
          />
        </section>
      )}

      {completedTasks.length > 0 && (
        <section className="space-x-3">
          <div className="">
            <h2 className="text-lg font-semibold text-slate-900">Completed</h2>
            <p className="text-sm text-slate-500">
              Recently completed work remains visible for quick review
            </p>
          </div>
          <TaskList
            tasks={completedTasks}
            patientNames={patientNames}
            patientRooms={patientRooms}
          />
        </section>
      )}
    </div>
  );
}
