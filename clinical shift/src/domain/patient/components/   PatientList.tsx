
import type { Patient } from "../types/patient.typs";
import PatientRow from "./  PatientRow";


interface Props {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
}

export default function PatientList({ patients, onPatientClick }: Props) {
  return (
    <div className="space-y-3">
      {patients.map((patient) => (
        <PatientRow
          key={patient.id}
          patient={patient}
          onClick={() => onPatientClick(patient)}
        />
      ))}
    </div>
  );
}

//onClick handles the DOM event, while onPatientClick is a custom callback used to lift the event up to the parent component.
//onClick → event واقعی UI
//onPatientClick → انتقال event به parent + همراه data