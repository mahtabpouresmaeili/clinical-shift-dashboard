import type { Patient } from "../../../domain/patient/types/patient.typs";
import Card from "../../../shared/components/ui/Card";

interface Props {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
}

export default function CriticalPatientsWidget({
  patients,
  onPatientClick,
}: Props) {
  const criticalPatients = patients.filter(
    (patient) => patient.status.type === "critical"
  );

  return (
    <Card
      title="Critical Patients"
      actions={
        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          {criticalPatients.length} urgent
        </span>
      }
    >
      {criticalPatients.length === 0 ? (
        <p className="text-sm text-slate-500">No critical patients.</p>
      ) : (
        <div className="space-y-3">
          {criticalPatients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => onPatientClick(patient)}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:bg-slate-50"
            >
              <p className="font-medium text-slate-900">{patient.name}</p>
              <p className="mt-1 text-sm text-slate-500">
                Room {patient.room} • {patient.diagnosis}
              </p>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}