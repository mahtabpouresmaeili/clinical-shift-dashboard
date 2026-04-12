import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../services/task.service";

export function useAddTask (){
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {(
            queryClient.invalidateQueries ({queryKey: ["task"]})
    )},
    })

    return {
        add: mutation.mutateAsync,
        loading: mutation.isPending,
        error:mutation.error
    }
}