import type { Patient } from '../types/patient.typs';
import PatientStatusIndicator from '../../../shared/components/Badge/PatientStatusIndicator';

interface Props {
  patient: Patient;
  onClick: () => void;
}

export default function PatientRow({ patient, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
    >
      <div className=" flex items-center justify-between gaap-3">
        <div>
          <p className="font-semibold text-slate-900">{patient.name}</p>
          <p className="text-sm text-slate-500 mt-1">
            Room: {patient.room} | {patient.diagnosis}
          </p>
        </div>
        <PatientStatusIndicator status={patient.status.type} />
      </div>
    </div>
  );
}
