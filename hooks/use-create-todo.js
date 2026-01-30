import { createtodo, deleteTodo, getTodos, toggleTodo } from "@/actions/todo-actions";
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

export function useToggleTodo() {
	const queryClient = useQueryClient();
	const updateTodoInStore = useTodoStore((state) => state.updateTodo);

	return useMutation({
		mutationFn: (id) => toggleTodo(id),
		onSuccess: (result, id) => {
			if(result.success) {
				updateTodoInStore(result.data);
				updateTodoInStore(id, {completed: result.data.completed});
				queryClient.invalidateQueries({queryKey: todoKeys.list()});
			}
		}
	})
	
}

export function useDeleteTodo() {
	const queryClient = useQueryClient();
	const deleteTodoInStore = useTodoStore((state) => state.deleteTodo);
	return useMutation({
		mutationFn: (id) => deleteTodo(id),
		onSuccess: (result, id) => {
			if(result.success) {
				deleteTodoInStore(id);
				queryClient.invalidateQueries({queryKey: todoKeys.list()});
			}
		}
	})
}