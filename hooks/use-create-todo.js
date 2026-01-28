import { createtodo, getTodos } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useTodos() {
	const setTodos = useTodoStore((state) => state.setTodos);
	return useQuery({
		queryKey: todoKeys.list(),

		queryFn: async () => {
			const result = await getTodos();
			if (result.success) {
				// update store state
				setTodos(result.data);
				return result.data;
			}
			throw new Error(result.error);
		}		
	})
}