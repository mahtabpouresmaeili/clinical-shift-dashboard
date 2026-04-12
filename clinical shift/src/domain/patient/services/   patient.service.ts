import type { Patient } from "../types/patient.typs";

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Amina Harvest",
    room: "ICU-03",
    age: 45,
    diagnosis: "Sepsis",
    assignedNurseId: "1",
    status: { type: "critical", codeRisk: true },
  },
  {
    id: "2",
    name: "Lina Patel",
    room: "Ward-09",
    age: 49,
    diagnosis: "Post-op Recovery",
    assignedNurseId: "2",
    status: { type: "monitoring", frequency: "q4h" },
  },
  {
    id: "3",
    name: "David Kim",
    room: "Ward-12",
    age: 60,
    diagnosis: "Hypertension",
    assignedNurseId: "1",
    status: { type: "stable" },
  },
];

export async function getPatients (): Promise<Patient[]> {
    return new Promise ((resolve)=> {
        setTimeout (()=> resolve(mockPatients),500)
    })
}

/**
 * 👉 چرا Promise + setTimeout استفاده کردی؟

بگو:

I used a Promise with a delay to simulate a real API call, so the UI and data layer behave the same as they would with a backend.
 */