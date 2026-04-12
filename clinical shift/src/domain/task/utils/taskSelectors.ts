import type { Task } from '../types/task.types';

export function searchTasks(tasks: Task[], search: string) {
  const q = search.trim().toLowerCase();

  return tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(q) ||
      task.type.toLowerCase().includes(q) ||
      task.dueTime.toLowerCase().includes(q)
    );
  });
}

export function getPendingTasks(tasks:Task[]) {
    return tasks.filter ((task) => !task.completed)
}

export function getCompletedTasks(tasks: Task[]) {
    return (tasks.filter ((task)=> task.completed))
}

export function getTaskSummary(tasks: Task[]) {
  return {
    total: tasks.length,
    pendingCount: tasks.filter((task) => !task.completed).length,
    completedCount: tasks.filter((task) => task.completed).length,
    medicationDueCount: tasks.filter(
      (task) => task.type === 'medication' && !task.completed
    ).length,
  };
}
