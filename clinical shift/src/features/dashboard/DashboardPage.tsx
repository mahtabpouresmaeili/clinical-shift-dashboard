
import { usePatients } from '../../domain/patient/hooks/usePatients';
import { getPatientStatusSummery } from '../../domain/patient/utils/patientMetrics';
import {useTasks} from '../../domain/task/hooks/useTasks';
import { getTaskSummary } from '../../domain/task/utils/taskSelectors';
import Card from '../../shared/components/ui/Card';
import Skeleton from '../../shared/components/ui/Skeleton';
import CriticalPatientsWidget from './widgets/CriticalPatientWidget';

import PendingTsksWidget from './widgets/PendingTsksWidget';

export default function DashboardPage() {
  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();
  const { tasks, loading: tasksloading, error: tasksError } = useTasks();

  const patientSummery = getPatientStatusSummery(patients);
  const tasksSummery = getTaskSummary(tasks);

  if (patientsError || tasksError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  if (patientsLoading || tasksloading) {
    return <Skeleton />;
  }

  if (patients.length === 0 && tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No data available for this shift.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
              Clinical Operations
            </p>

            <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Shift command center
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
              Track patient status, outstanding tasks, and shift activity from a
              single dashboard.
            </p>
          </div>

          <Card className="w-full max-w-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Active shift
              </p>
              <p className="text-lg font-semibold text-slate-950">Day Shift</p>
              <p className="text-sm text-slate-500">07:00 AM - 07:00 PM</p>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Patients on unit</p>
            <p className="mt-2 text-3xl font-bold">{patientSummery.total}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Critical now</p>
            <p className="mt-2 text-3xl font-bold text-rose-300">
              {patientSummery.critical}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300">Tasks pending</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">
              {tasksSummery.pendingCount}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CriticalPatientsWidget
          patients={patients}
          onPatientClick={(p) => console.log(p)}
        />

        <PendingTsksWidget tasks={tasks} />
      </section>
    </div>
  );
}
