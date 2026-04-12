export type PatientStatus = 
| { type: "stable" }
| { type: "monitoring"; frequency: string }
| { type: "critical"; codeRisk: boolean };

export interface Patient {
    id:string
    name:string
    room:string
    age:number
    diagnosis:string
    status:PatientStatus
    assignedNurseId: string;
}




/**
 👉 چرا union object استفاده کردی؟

 بگو:
چون status shape بر اساس type تغییر می‌کند، union type باعث type safety و expressiveness بهتر می‌شود
 Because different patient statuses require different data shapes.
 A discriminated union ensures type safety and allows TypeScript to narrow types correctly.
 */
