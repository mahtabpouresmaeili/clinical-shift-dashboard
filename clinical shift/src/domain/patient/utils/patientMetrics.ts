import type { Patient } from '../types/patient.typs';

export default function filterpatients(patients: Patient[], search: string) {
  const q = search.trim().toLowerCase();

  return patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(q) ||
      patient.room.toLowerCase().includes(q) ||
      patient.diagnosis.toLowerCase().includes(q)
    );
  });
}

export function filterPatients(patients: Patient[], search: string) {
  return filterpatients(patients, search);
}

export function getPatientStatusSummery(patients: Patient[]) {
  return {
    total: patients.length,
    critical: patients.filter((patient) => patient.status.type === 'critical')
      .length,
    monitoring: patients.filter(
      (patient) => patient.status.type === 'monitoring'
    ).length,
    stable: patients.filter((patient) => patient.status.type === 'stable')
      .length,
  };
}

export function getPatientStatusSummary(patients: Patient[]) {
  return getPatientStatusSummery(patients);
}

export function groupPatientsByStatus(patients: Patient[]) {
  return {
    critical: patients.filter((patient) => patient.status.type === 'critical'),
    monitring: patients.filter(
      (patient) => patient.status.type === 'monitoring'
    ),
    satble: patients.filter((patient) => patient.status.type === 'stable'),
  };
}



/**
 * 👉 patientMetrics چیست؟

بگو:

Patient metrics are utility functions that derive computed data from raw patient data, 
such as summaries, filters, and groupings.
They help keep UI components clean and improve reusability and testability.
 */
