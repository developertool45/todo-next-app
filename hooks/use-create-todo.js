import { createtodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const todoKeys = {
	all: ["todos"],
	list: () => [...todoKeys.all, "list"],
}


export function useCreateTodo() {
	const queryClient = useQueryClient();

	const addTodo = useTodoStore((state)=> state.addTodo);
	return useMutation({
		mutationFn: (data) => createtodo(data),
		onSuccess: (result) => {
			if(result.success) {
				addTodo(result.data);
				queryClient.invalidateQueries({queryKey: todoKeys.list()});
			}
		}
	})
}