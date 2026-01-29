"use client"

import React, { useEffect, useMemo } from "react";
import { useTodos } from "@/hooks/use-create-todo";
import { useTodoStore } from "@/store/todo-store";

import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import TodoItem from "./todo-item";
const TodoList = () => {
  const { data, isLoading, error } = useTodos();
  const setTodos = useTodoStore((state) => state.setTodos);
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);

  const filterTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data, setTodos]);

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center">
            Something went wrong: {error}
          </div>
        </CardContent>
      </Card>
    );
  }
  if (filterTodos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            {filterTodos?.length === 0
              ? "No todos yet"
              : "No todos match your filter"}
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {filterTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
