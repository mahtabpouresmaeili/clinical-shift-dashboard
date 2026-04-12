export type TaskType = "medication" | "vital-check" | "assessment"

export interface Task {
    id:string;
    patientId:string;
    type:TaskType;
    title:string;
    dueTime:string;
    completed: boolean;
}