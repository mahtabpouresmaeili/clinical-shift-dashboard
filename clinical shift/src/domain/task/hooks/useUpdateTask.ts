import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../services/task.service';


export function useUpdatTask() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: ({
      taskId,
      updates,
    }: {
      taskId: string;
      updates: Parameters<typeof updateTask>[1];
    }) => updateTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
      update: (taskId: string, updates: Parameters<typeof updateTask>[1]) =>
        mutation.mutateAsync({taskId, updates}),
      loading: mutation.isPending,
      error: mutation.error,
  };
}

/**
 * 👉 یعنی:

mutationFn → چی اجرا بشه (عملیات اصلی)
onSuccess → بعد از موفقیت چی کار کنیم
 */

/**
 * اگر بپرسند چرا بعد از update از invalidateQueries استفاده کردی:
گو:
After a mutation, I invalidate the related query 
so React Query refetches fresh data and keeps the UI in sync with the source of truth.
 */

/**
useMutation = ✏️ add / edit / delete
useQuery = 📥 read
queryClient = 🔄 refresh / control cache
 */
