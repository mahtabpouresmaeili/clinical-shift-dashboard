import { useMemo } from "react";
import { usePatients } from "../../domain/patient/hooks/usePatients";
import { useTasks } from "../../domain/task/hooks/useTasks";
import { getPendingTasks } from "../../domain/task/utils/taskSelectors";
import Skeleton from "../../shared/components/ui/Skeleton";
import Card from "../../shared/components/ui/Card";
import PatientStatusIndicator from "../../shared/components/Badge/PatientStatusIndicator";

export default function ShiftReportPage() {
  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useTasks();

  const pendingTasks = getPendingTasks(tasks).sort((a, b) =>
    a.dueTime.localeCompare(b.dueTime)
  );

  const criticalPatients = patients.filter(
    (patient) => patient.status?.type === "critical"
  );

  const monitoringPatients = patients.filter(
    (patient) => patient.status?.type === "monitoring"
  );

  const reportTimestamp = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    []
  );

  const nurses = [
    { id: "1", name: "Nurse A", role: "nurse" },
    { id: "2", name: "Nurse B", role: "nurse" },
    { id: "3", name: "Charge Nurse", role: "charge-nurse" },
  ];

  const nurseAssignments = nurses
    .map((teamMember) => {
      const assignedPatients = patients.filter(
        (patient) => patient.assignedNurseId === teamMember.id
      );

      const highAcuityCount = assignedPatients.filter(
        (patient) =>
          patient.status?.type === "critical" ||
          patient.status?.type === "monitoring"
      ).length;

      return {
        ...teamMember,
        assignedCount: assignedPatients.length,
        highAcuityCount,
      };
    })
    .filter((teamMember) => teamMember.assignedCount > 0);

  if (patientsLoading || tasksLoading) {
    return <Skeleton />;
  }

  if (patientsError || tasksError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Failed to load shift report data.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
            Shift Handoff
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Shift Report</h1>
          <p className="mt-2 text-sm text-slate-200">
            Prepare a concise handoff summary for the next shift.
          </p>
        </div>

        <div className="grid gap-2 text-sm text-slate-200">
          <p>Generated: {reportTimestamp}</p>
          <p>Pending tasks: {pendingTasks.length}</p>
          <p>
            High-acuity patients:{" "}
            {criticalPatients.length + monitoringPatients.length}
          </p>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <Card title="Critical Watchlist">
          <div className="space-y-3">
            {criticalPatients.length === 0 ? (
              <p className="text-sm text-slate-500">
                No critical patients this shift.
              </p>
            ) : (
              criticalPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="rounded-lg border border-red-100 bg-red-50/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {patient.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        Room {patient.room} • {patient.age} y/o •{" "}
                        {patient.diagnosis}
                      </p>
                    </div>

                    <PatientStatusIndicator status={patient.status?.type} />
                  </div>

                  <p className="mt-3 text-sm text-red-700">
                    {patient.status?.type === "critical" &&
                    patient.status?.codeRisk
                      ? "Code risk flagged. Requires immediate escalation if condition worsens."
                      : "Critical status without active code-risk flag. Continue close surveillance."}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card title="Monitoring Rounds">
          <div className="space-y-3">
            {monitoringPatients.length === 0 ? (
              <p className="text-sm text-slate-500">
                No monitoring-round patients right now.
              </p>
            ) : (
              monitoringPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50/60 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {patient.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      Room {patient.room} • {patient.diagnosis}
                    </p>
                  </div>

                  <div className="text-right">
                    <PatientStatusIndicator status={patient.status?.type} />
                    <p className="mt-2 text-xs uppercase tracking-wide text-amber-700">
                      {patient.status?.type === "monitoring"
                        ? patient.status.frequency
                        : ""}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card title="Outstanding Tasks">
          <div className="space-y-3">
            {pendingTasks.length === 0 ? (
              <p className="text-sm text-slate-500">
                All tasks are complete for this shift.
              </p>
            ) : (
              pendingTasks.map((task) => {
                const patient = patients.find((p) => p.id === task.patientId);

                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{task.title}</p>
                      <p className="text-sm text-slate-600">
                        {patient
                          ? `${patient.name} • Room ${patient.room}`
                          : "Unassigned patient"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">
                        {task.dueTime}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {task.type}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card title="Assignment Snapshot">
          <div className="space-y-3">
            {nurseAssignments.length === 0 ? (
              <p className="text-sm text-slate-500">
                No nurse assignments available.
              </p>
            ) : (
              nurseAssignments.map((teamMember) => (
                <div
                  key={teamMember.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {teamMember.name}
                      </p>
                      <p className="text-sm capitalize text-slate-600">
                        {teamMember.role.replace("-", " ")}
                      </p>
                    </div>

                    <div className="text-right text-sm text-slate-700">
                      <p>{teamMember.assignedCount} patients</p>
                      <p>{teamMember.highAcuityCount} high acuity</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}