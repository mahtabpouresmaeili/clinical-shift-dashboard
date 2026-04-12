import type { Task } from "../types/task.types";

let mockTasks: Task[] = [
  {
    id: "t1",
    patientId: "1",
    type: "medication",
    title: "Administer antibiotics",
    dueTime: "08:00",
    completed: false,
  },
  {
    id: "t2",
    patientId: "2",
    type: "vital-check",
    title: "Check vital signs",
    dueTime: "09:00",
    completed: false,
  },
  {
    id: "t3",
    patientId: "3",
    type: "assessment",
    title: "Reassess pain score",
    dueTime: "10:30",
    completed: true,
  },
];

export async function getTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockTasks]), 500);
  });
}
//in functiom yek promis barmigardoneh ke dar nahayat dakhelesh yek array az tasks ha hast



export async function updateTask(
  taskId: string,
  updates: Partial<Task>
): Promise<Task> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskIndex = mockTasks.findIndex((task) => task.id === taskId);

      if (taskIndex === -1) {
        reject(new Error("Task not found"));
        return;
      }

      mockTasks[taskIndex] = {
        ...mockTasks[taskIndex],
        ...updates,
      };

      resolve(mockTasks[taskIndex]);
    }, 500);
  });
}

export async function addTask (
 newTask: Omit<Task,"id">
): Promise <Task> {
  return new Promise ((resolve) => {
    setTimeout (()=> {
      const createdTask :Task = {
        id: crypto.randomUUID(),
        ...newTask
      }
      mockTasks = [createdTask, ...mockTasks];
      resolve(createdTask)
    },500)
  })

}

//Omit <Task, "id" > it means get all of filds in Task insted id beacusw whe want make id 
// crypto/randomUUId() it make a id

// function addTask say: give me a new task i will make an id for it next add to tasks list and last i wil return a new task that make it 